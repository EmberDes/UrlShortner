from flask import Flask, app
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from sqlalchemy import text
from flask_jwt_extended import JWTManager
from config import Config
from flask_cors import CORS
from app.routes.auth import auth_bp
from app.routes.urls import url_bp
from app.routes.analytics import analytics_bp


db = SQLAlchemy()
migrate = Migrate()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    
    app = Flask(__name__)
    app.config.from_object(Config)


    CORS(app,origins=["https://url-shortner-kt7c.vercel.app/"])



    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)

    

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(url_bp, url_prefix="/api/urls")
    app.register_blueprint(analytics_bp, url_prefix="/api/analytics")

    from sqlalchemy import text

    @app.route("/health")
    def health():
        return {"status": "Backend running"}

    @app.route("/db-test")
    def db_test():
        try:
            db.session.execute(text("SELECT 1"))
            return {"db": "connected"}
        except Exception as e:
            return {"error": str(e)}



    return app