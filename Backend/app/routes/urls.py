from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import URL
import string
import random
from flask import redirect, request
from app.models import Click

url_bp = Blueprint("urls", __name__)

def generate_short_code(length=6):
    characters = string.ascii_letters + string.digits
    return "".join(random.choice(characters) for _ in range(length))


@url_bp.route("/", methods=["POST"])
@jwt_required()
def create_url():
    data = request.get_json()
    original_url = data.get("original_url")

    if not original_url:
        return jsonify({"msg": "Original URL required"}), 400

    short_code = generate_short_code()

    # prevent collision
    while URL.query.filter_by(short_code=short_code).first():
        short_code = generate_short_code()

    user_id = get_jwt_identity()

    new_url = URL(
        original_url=original_url,
        short_code=short_code,
        user_id=user_id
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

    urls = URL.query.filter_by(user_id=user_id).all()

    result = [
        {
            "id": url.id,
            "original_url": url.original_url,
            "short_code": url.short_code,
            "created_at": url.created_at
        }
        for url in urls
    ]

    return jsonify(result), 200


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