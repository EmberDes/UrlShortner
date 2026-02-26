from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import URL, Click
from app.extensions import db
from sqlalchemy import func
from datetime import datetime

analytics_bp = Blueprint("analytics", __name__)


@analytics_bp.route("/overview", methods=["GET"])
@jwt_required()
def overview():
    user_id = get_jwt_identity()

    total_urls = URL.query.filter_by(user_id=user_id).count()

    total_clicks = (
        db.session.query(func.count(Click.id))
        .join(URL)
        .filter(URL.user_id == user_id)
        .scalar()
    )

    return jsonify({
        "total_urls": total_urls,
        "total_clicks": total_clicks or 0
    })


@analytics_bp.route("/daily", methods=["GET"])
@jwt_required()
def daily_clicks():
    user_id = get_jwt_identity()

    results = (
        db.session.query(
            func.date(Click.clicked_at).label("date"),
            func.count(Click.id).label("clicks")
        )
        .join(URL)
        .filter(URL.user_id == user_id)
        .group_by(func.date(Click.clicked_at))
        .all()
    )

    data = [
        {
            "date": str(row.date),
            "clicks": row.clicks
        }
        for row in results
    ]

    return jsonify(data)