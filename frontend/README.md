# 🚀 CapBraco Portfolio - Railway Deployment Guide

Complete guide for deploying the CapBraco full-stack portfolio to Railway.

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Local Setup](#local-setup)
4. [Railway Deployment](#railway-deployment)
5. [Environment Variables](#environment-variables)
6. [Database Setup](#database-setup)
7. [Static Files & Media](#static-files--media)
8. [Domain Configuration](#domain-configuration)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**CapBraco Portfolio** is a full-stack web application showcasing professional work with:

- **Frontend**: React 19 + Vite (SPA)
- **Backend**: Django 5.1 + Django REST Framework
- **Database**: PostgreSQL
- **Static Assets**: Cloudflare R2 (assets.capbraco.com)
- **Email**: Gmail SMTP
- **Deployment**: Railway

### Project Structure

```
capbraco-portfolio/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/
│   │   ├── sections/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Django application
│   ├── apps/
│   │   ├── portfolio/       # Portfolio projects
│   │   ├── blog/            # Blog posts
│   │   ├── core/            # Core functionality
│   │   └── contact/         # Contact form with spam protection
│   ├── capbraco/            # Django settings
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── manage.py
│   └── requirements.txt
├── .gitignore
└── README.md
```

---

## ✅ Prerequisites

Before deploying, ensure you have:

- [x] Railway account (https://railway.app)
- [x] GitHub account with repo access
- [x] Gmail account with App Password
- [x] Cloudflare account (optional, for R2 assets)
- [x] Node.js 18+ and Python 3.11+ (for local dev)

---

## 💻 Local Setup

### 1. Clone Repository

```bash
git clone https://github.com/CapBraco/capbraco-portfolio.git
cd capbraco-portfolio
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (SQLite for local)
DATABASE_URL=sqlite:///db.sqlite3

# Email
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-16-char-app-password

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
EOF

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start server
python manage.py runserver
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:8000
EOF

# Start dev server
npm run dev
```

Visit:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Admin: http://localhost:8000/admin

---

## 🚂 Railway Deployment

### Step 1: Create Railway Project

1. Go to https://railway.app
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Connect your repository
5. Railway will auto-detect your project

### Step 2: Configure Services

You need **TWO separate services**:

#### **Service 1: Backend (Django)**

**Root Directory**: `/backend`

**Build Command**: (Auto-detected from Procfile)
```
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
```

**Start Command**:
```
gunicorn capbraco.wsgi:application --bind 0.0.0.0:$PORT
```

#### **Service 2: Frontend (React)**

**Root Directory**: `/frontend`

**Build Command**:
```
npm install
npm run build
```

**Start Command**:
```
npm run preview
```

### Step 3: Add PostgreSQL Database

1. In Railway project, click **"New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway auto-creates `DATABASE_URL`
4. Link database to **Backend service**

### Step 4: Configure Environment Variables

#### **Backend Environment Variables**

Go to Backend service → **Variables** → Add:

```env
# Django Secret Key (generate new one)
SECRET_KEY=django-insecure-GENERATE-NEW-KEY-HERE

# Debug (False for production)
DEBUG=False

# Allowed Hosts (Railway provides domain)
ALLOWED_HOSTS=*.railway.app,capbraco.com,www.capbraco.com

# Database (Auto-configured by Railway)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Email Configuration
EMAIL_HOST_USER=bracosmo@gmail.com
EMAIL_HOST_PASSWORD=your-16-char-app-password

# CORS Settings
CORS_ALLOWED_ORIGINS=https://your-frontend.railway.app,https://capbraco.com,https://www.capbraco.com

# Static Files (if using Cloudflare R2)
AWS_ACCESS_KEY_ID=your-r2-access-key
AWS_SECRET_ACCESS_KEY=your-r2-secret-key
AWS_STORAGE_BUCKET_NAME=capbraco-assets
AWS_S3_ENDPOINT_URL=https://your-account-id.r2.cloudflarestorage.com
AWS_S3_CUSTOM_DOMAIN=assets.capbraco.com

# Security
SECURE_SSL_REDIRECT=True
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

#### **Frontend Environment Variables**

Go to Frontend service → **Variables** → Add:

```env
# API URL (Backend Railway URL)
VITE_API_URL=https://your-backend.railway.app
```

### Step 5: Generate Django Secret Key

```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Copy output and use as `SECRET_KEY`

---

## 📧 Email Setup (Gmail SMTP)

### 1. Enable 2-Factor Authentication

1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification**

### 2. Create App Password

1. Go to https://myaccount.google.com/apppasswords
2. Select **"Mail"** and **"Other"**
3. Name it: "CapBraco Portfolio"
4. Click **Generate**
5. Copy 16-character password (no spaces)

### 3. Add to Railway

In Backend service variables:
```env
EMAIL_HOST_USER=your-email
EMAIL_HOST_PASSWORD=your-16-char-password
```

---

## 🗄️ Database Setup

### Automatic (Recommended)

Railway auto-configures PostgreSQL:
- Creates database
- Provides `DATABASE_URL`
- Runs migrations on deploy

### Manual Migration

If needed, run migrations manually:

```bash
# In Railway project
railway run python manage.py migrate
railway run python manage.py createsuperuser
```

### Database Backup

```bash
# Export database
railway run python manage.py dumpdata > backup.json

# Import database
railway run python manage.py loaddata backup.json
```

---

## 📦 Static Files & Media

### Option 1: Cloudflare R2 (Recommended)

**Setup:**

1. Create Cloudflare R2 bucket: `capbraco-assets`
2. Generate R2 API tokens
3. Configure custom domain: `assets.capbraco.com`
4. Add to backend `.env`:

```env
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_STORAGE_BUCKET_NAME=capbraco-assets
AWS_S3_ENDPOINT_URL=https://account-id.r2.cloudflarestorage.com
AWS_S3_CUSTOM_DOMAIN=assets.capbraco.com
```

**Backend settings.py:**

```python
# Static files
if os.environ.get('AWS_STORAGE_BUCKET_NAME'):
    # Use Cloudflare R2
    AWS_S3_CUSTOM_DOMAIN = os.environ.get('AWS_S3_CUSTOM_DOMAIN')
    STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/static/'
    MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'
    
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
    STATICFILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'
else:
    # Use local storage
    STATIC_URL = '/static/'
    MEDIA_URL = '/media/'
```

### Option 2: WhiteNoise (Local Storage)

**Install:**
```bash
pip install whitenoise
```

**settings.py:**
```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Add this
    # ... other middleware
]

STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

---

## 🌐 Domain Configuration

### Backend Domain (API)

1. In Railway Backend service → **Settings** → **Domains**
2. Add custom domain: `api.capbraco.com`
3. Add DNS records in your domain provider:

```
Type: CNAME
Name: api
Value: your-backend.railway.app
```

### Frontend Domain

1. In Railway Frontend service → **Settings** → **Domains**
2. Add custom domain: `capbraco.com` and `www.capbraco.com`
3. Add DNS records:

```
Type: CNAME
Name: @
Value: your-frontend.railway.app

Type: CNAME  
Name: www
Value: your-frontend.railway.app
```

### Update Environment Variables

**Backend:**
```env
ALLOWED_HOSTS=api.capbraco.com,*.railway.app
CORS_ALLOWED_ORIGINS=https://capbraco.com,https://www.capbraco.com
```

**Frontend:**
```env
VITE_API_URL=https://api.capbraco.com
```

---

## 🔒 Security Checklist

- [x] `DEBUG=False` in production
- [x] Strong `SECRET_KEY` (not in git)
- [x] `ALLOWED_HOSTS` configured
- [x] `CORS_ALLOWED_ORIGINS` restricted
- [x] SSL/HTTPS enabled
- [x] Secure cookies enabled
- [x] Rate limiting active (3/hour)
- [x] Spam protection enabled
- [x] Email credentials in env vars
- [x] Database password secure
- [x] `.env` in `.gitignore`

---

## 🐛 Troubleshooting

### Issue: "DisallowedHost at /"

**Solution**: Add Railway domain to `ALLOWED_HOSTS`

```env
ALLOWED_HOSTS=your-app.railway.app,*.railway.app
```

### Issue: "CORS Error" from Frontend

**Solution**: Add frontend URL to `CORS_ALLOWED_ORIGINS`

```env
CORS_ALLOWED_ORIGINS=https://your-frontend.railway.app
```

### Issue: Static Files Not Loading

**Solution**: Run collectstatic

```bash
railway run python manage.py collectstatic --noinput
```

### Issue: Database Connection Error

**Solution**: Check `DATABASE_URL` is set

```bash
railway variables
```

### Issue: Email Not Sending

**Solution**: Verify Gmail app password

1. Check 16-char password (no spaces)
2. Check 2FA enabled on Gmail
3. Check logs: `railway logs`

### Issue: 500 Server Error

**Solution**: Check Railway logs

```bash
railway logs --service backend
```

Look for:
- Import errors
- Missing dependencies
- Database errors
- Permission issues

### Issue: Rate Limit Not Working

**Solution**: Install django-ratelimit

```bash
pip install django-ratelimit
pip freeze > requirements.txt
git push
```

---

## 📊 Monitoring

### View Logs

```bash
# Backend logs
railway logs --service backend

# Frontend logs
railway logs --service frontend

# Database logs
railway logs --service postgres
```

### Metrics

Railway provides:
- CPU usage
- Memory usage
- Request count
- Response times

Access in Railway dashboard → Service → **Metrics**

---

## 🔄 Deployment Workflow

### Automatic Deployment

Railway auto-deploys on `git push`:

```bash
git add .
git commit -m "Update contact form"
git push origin main
```

Railway will:
1. Detect changes
2. Build services
3. Run migrations
4. Deploy new version

### Manual Deployment

```bash
# Deploy specific service
railway up --service backend

# Run commands
railway run python manage.py migrate
railway run python manage.py createsuperuser
```

---

## 📚 Additional Resources

- [Railway Docs](https://docs.railway.app)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/)
- [Vite Production Build](https://vitejs.dev/guide/build.html)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)

---

## 🆘 Support

For issues:
1. Check Railway logs
2. Review this guide
3. Check Django/React docs
4. Open GitHub issue

---

## 📝 License

MIT License - See LICENSE file

---

**Built with ❤️ by Braco**
**Portfolio: https://capbraco.com**
