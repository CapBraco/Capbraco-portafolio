# CapBraco Portfolio

Full-stack portfolio and development hub built with Django and React.

## 🚀 Tech Stack

**Frontend:**
- React 19 + Vite
- Modern CSS with custom fire effects

**Backend:**
- Django 5.1
- PostgreSQL 15
- Django REST Framework

**Deployment:**
- Railway (Backend + Database)
- Cloudflare (CDN, Domain, R2 Storage)

## 📁 Project Structure
```
Capbraco-Portafolio/
├── backend/              # Django backend
│   ├── apps/
│   │   ├── core/        # Site settings & homepage
│   │   ├── portfolio/   # Project management
│   │   ├── blog/        # Blog functionality
│   │   └── contact/     # Contact forms
│   ├── static/          # CSS, JS, components
│   ├── templates/       # Django templates
│   └── media/           # User uploads
│
├── frontend/            # React frontend
└── venv/               # Python virtual environment
```

## 🛠️ Development Setup

### Backend
```bash
# Create & activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
cd backend
pip install -r requirements.txt

# Setup database
python manage.py migrate
python manage.py createsuperuser

# Run server
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Access Points

- Django: http://127.0.0.1:8000/
- Admin: http://127.0.0.1:8000/admin/
- React: http://localhost:5173/

## ✨ Features

- 🔥 WebGL Fire Effect Animation
- 📱 Responsive Design
- 🎨 Dynamic Content Management via Django Admin
- 🖼️ Project Portfolio System
- 📝 Blog Platform (Coming Soon)
- 📧 Contact Forms (Coming Soon)

## 🎯 Current Progress

- [x] Django backend setup
- [x] PostgreSQL integration
- [x] Admin panel configuration
- [x] Fire effect on homepage
- [x] Base template structure
- [x] Project models & admin
- [ ] Project listing page
- [ ] Project detail page
- [ ] Blog functionality
- [ ] Contact form
- [ ] Full React integration

## 📄 License

Private - All Rights Reserved

---

Built with ❤️ by Cap Braco
