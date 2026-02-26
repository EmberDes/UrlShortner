from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models import URL
import string
import random
from flask import redirect, request
from app.models import Click

from sqlalchemy import func
from datetime import datetime



url_bp = Blueprint("urls", __name__)

def generate_short_code(length=6):
    characters = string.ascii_letters + string.digits
    return "".join(random.choice(characters) for _ in range(length))



@url_bp.route("/", methods=["POST"])
@jwt_required()
def create_url():
    data = request.get_json()

    original_url = data.get("original_url")
    custom_code = data.get("custom_code")
    expiry_date = data.get("expiry_date")

    if not original_url:
        return jsonify({"msg": "Original URL required"}), 400

    short_code = custom_code or generate_short_code()

    if URL.query.filter_by(short_code=short_code).first():
        return jsonify({"msg": "Short code already exists"}), 400

    user_id = get_jwt_identity()

    new_url = URL(
        original_url=original_url,
        short_code=short_code,
        user_id=user_id,
        expiry_date=datetime.fromisoformat(expiry_date) if expiry_date else None
    )

    db.session.add(new_url)
    db.session.commit()

    return jsonify({
        "short_code": short_code,
        "original_url": original_url
    }), 201


@url_bp.route("/", methods=["GET"])
@jwt_required()
def get_user_urls():
    user_id = get_jwt_identity()

    results = (
        db.session.query(
            URL,
            func.count(Click.id).label("click_count"),
            func.count(func.distinct(Click.ip_address)).label("unique_visitors")
        )
        .outerjoin(Click)
        .filter(URL.user_id == user_id)
        .group_by(URL.id)
        .all()
    )

    data = [
        {
            "id": url.id,
            "original_url": url.original_url,
            "short_code": url.short_code,
            "created_at": url.created_at,
            "click_count": click_count,
            "unique_visitors": unique_visitors
        }
        for url, click_count, unique_visitors in results
    ]

    return jsonify(data)

   


@url_bp.route("/r/<short_code>", methods=["GET"])
def redirect_url(short_code):
    url = URL.query.filter_by(short_code=short_code).first()

    if not url:
        return {"msg": "URL not found"}, 404

    # log click
    click = Click(
        url_id=url.id,
        ip_address=request.remote_addr,
        user_agent=request.headers.get("User-Agent"),
    )

    db.session.add(click)
    db.session.commit()

    return redirect(url.original_url)