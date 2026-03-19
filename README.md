

# 🚀 URL Shortener (Full Stack)

A full-stack URL shortener built with Flask, React (Vite), PostgreSQL, and deployed using Render & Vercel.
It allows users to register, log in, shorten URLs, and track analytics.

## 🔥 Features

🔐 User Authentication (JWT-based)

🔗 URL Shortening

📊 Analytics for each shortened link

🧠 Protected Routes (Frontend + Backend)

🌐 Fully deployed (Frontend + Backend + Database)

⚡ REST API with clean architecture

## 🏗 Tech Stack
####  Frontend

```
React (Vite)

TypeScript

Material UI

Axios
```

#### Backend

```
Flask

Flask-SQLAlchemy

Flask-Migrate

Flask-JWT-Extended

Flask-Bcrypt

Flask-CORS
```

#### Database

```
PostgreSQL (Render)
```
## Deployment

Frontend → Vercel

Backend → Render

Database → Render PostgreSQL

## 📁 Project Structure
```
Backend/
 ├── app/
 │   ├── __init__.py
 │   ├── extensions.py
 │   ├── models.py
 │   ├── routes/
 │   │   ├── auth.py
 │   │   ├── urls.py
 │   │   ├── analytics.py
 │
 ├── migrations/
 ├── config.py
 ├── run.py
 ├── requirements.txt

Frontend/
 ├── src/
 ├── public/
 ├── .env
 ```
## ⚙️ Setup Instructions

### 1️⃣ Clone the repository
```
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```
#### 🔧 Backend Setup
```
cd Backend
python -m venv venv
source venv/bin/activate 

###Windows: venv\Scripts\activate###
pip install -r requirements.txt
```


### Environment Variables (.env)
```
SECRET_KEY=your_secret
JWT_SECRET_KEY=your_jwt_secret
DATABASE_URL=your_database_url
```

### Run migrations
```
flask db upgrade
```

### Start server
```
python run.py
```

## 🎨 Frontend Setup

```
cd Frontend
npm install
```

## .env
```
VITE_API_URL=http://localhost:5000
Run frontend
npm run dev
```

### 🌍 Deployment Backend (Render)


#### Create Web Service

Start Command:
```
gunicorn run:app --bind 0.0.0.0:$PORT
```
Add Environment Variables:
```
DATABASE_URL

SECRET_KEY

JWT_SECRET_KEY
```
#### Frontend (Vercel)

Add environment variable:
```
VITE_API_URL=https://your-backend.onrender.com
```
Deploy via GitHub

## 🔗 API Endpoints
```
Auth
POST /api/auth/register
POST /api/auth/login
URLs
POST /api/urls/shorten
GET /<short_code>
Analytics
GET /api/analytics/<url_id>
```
## 🧪 Testing

Use Postman / Thunder Client

Test endpoints:
```
Register

Login

Create short URL

Fetch analytics

```
## ⚠️ Common Issues
```

CORS errors → check frontend URL in backend

502 on Render → check PORT binding

DB errors → ensure migrations are applied

Env variables not working → redeploy after setting
```

#### 🏆 Resume Description
```
Built and deployed a full-stack URL shortener with authentication and analytics using Flask, React, and PostgreSQL, integrating CI/CD-style deployment on Render and Vercel.
```
#### 🚀 Future Improvements

-Custom domains for short links

-Rate limiting

-QR code generation

-Link expiration

-Click heatmaps
