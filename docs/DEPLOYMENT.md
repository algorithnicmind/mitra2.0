# 🌐 Deployment Guide

> Deploy Mitra 2.0 to production

---

## 🏗️ Deployment Architecture

```
┌───────────────────────────────────────────────────────────┐
│                    PRODUCTION SETUP                        │
│                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │
│  │   Vercel     │  │   Render     │  │ MongoDB Atlas │   │
│  │  (Frontend)  │  │  (Backend)   │  │  (Database)   │   │
│  │              │  │              │  │               │   │
│  │  React App   │  │  Node.js     │  │  M0 Free Tier │   │
│  │  Static CDN  │  │  Express     │  │  512MB        │   │
│  └──────┬───────┘  └──────┬───────┘  └───────┬───────┘   │
│         │                 │                   │           │
│         │  HTTPS          │  HTTPS            │           │
│         ▼                 ▼                   ▼           │
│  ┌──────────────────────────────────────────────────┐    │
│  │              Internet / Users                     │    │
│  └──────────────────────────────────────────────────┘    │
│                                                           │
│  ┌──────────────┐                                        │
│  │   Render     │                                        │
│  │ (AI Service) │                                        │
│  │  Python      │                                        │
│  │  FastAPI     │                                        │
│  └──────────────┘                                        │
└───────────────────────────────────────────────────────────┘
```

---

## 1. Deploy Frontend to Vercel

### Steps

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repo
5. Configure:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework        | Vite            |
| Root Directory   | `client`        |
| Build Command    | `npm run build` |
| Output Directory | `dist`          |

6. Add Environment Variables:

```
VITE_API_URL=https://your-backend.onrender.com/api
VITE_SOCKET_URL=https://your-backend.onrender.com
```

7. Click "Deploy"

### Custom Domain (Optional)

- Go to Settings → Domains
- Add your custom domain
- Update DNS records

---

## 2. Deploy Backend to Render

### Steps

1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repo
4. Configure:

| Setting        | Value            |
| -------------- | ---------------- |
| Name           | mitra-backend    |
| Root Directory | `server`         |
| Runtime        | Node             |
| Build Command  | `npm install`    |
| Start Command  | `node server.js` |
| Plan           | Free             |

5. Add Environment Variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_production_jwt_secret
AI_SERVICE_URL=https://your-ai-service.onrender.com
CORS_ORIGIN=https://your-app.vercel.app
```

6. Click "Create Web Service"

> **Note**: Render free tier apps sleep after 15 min of inactivity. First request may take ~30 seconds.

---

## 3. Deploy AI Service to Render

### Steps

1. New → Web Service
2. Configure:

| Setting        | Value                                              |
| -------------- | -------------------------------------------------- |
| Name           | mitra-ai-service                                   |
| Root Directory | `ai-service`                                       |
| Runtime        | Python 3                                           |
| Build Command  | `pip install -r requirements.txt`                  |
| Start Command  | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
| Plan           | Free (or Starter for more RAM)                     |

3. Add Environment Variables:

```
GEMINI_API_KEY=your_key
PORT=8000
```

> **⚠️ Note**: HuggingFace models require ~1GB+ RAM. Free tier may not be sufficient. Consider:
>
> - Using only the LLM API (Gemini) instead of local models for the hackathon
> - Using Render Starter plan ($7/mo) for more RAM
> - Using Railway or Fly.io as alternatives

---

## 4. MongoDB Atlas Configuration

### Production Settings

1. **Network Access**: Whitelist Render's IP addresses (or use `0.0.0.0/0` with strong auth)
2. **Database Access**: Create a production user with limited permissions
3. **Cluster**: Use M0 Free Tier (512MB) for hackathon

### Backup

- MongoDB Atlas includes automated backups on M10+ clusters
- For M0: Regularly export data using `mongodump`

---

## 5. Alternative: Deploy Everything on Railway

[Railway](https://railway.app) supports all three services in one place:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy backend
cd server
railway init
railway up

# Deploy frontend
cd ../client
railway init
railway up

# Deploy AI service
cd ../ai-service
railway init
railway up
```

---

## 6. Pre-Deployment Checklist

### Security

- [ ] All secrets in environment variables (not in code)
- [ ] `.env` files in `.gitignore`
- [ ] CORS restricted to frontend domain
- [ ] Rate limiting configured
- [ ] HTTPS enforced
- [ ] Security headers enabled (Helmet)

### Performance

- [ ] Frontend built with production mode
- [ ] Backend running with `NODE_ENV=production`
- [ ] MongoDB indexes created
- [ ] Static assets optimized

### Functionality

- [ ] All API endpoints working
- [ ] Authentication flow complete
- [ ] AI chat responding
- [ ] Database connections stable
- [ ] Error handling for edge cases

---

## 7. CI/CD with GitHub Actions (Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy Mitra 2.0

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          working-directory: ./client
```

---

## 8. Monitoring & Logging

### Free Tools

| Tool                     | Purpose                   |
| ------------------------ | ------------------------- |
| Render Logs              | Backend & AI service logs |
| Vercel Analytics         | Frontend performance      |
| MongoDB Atlas Monitoring | Database metrics          |
| UptimeRobot              | Uptime monitoring (free)  |

### Keep Services Awake

For Render free tier (to avoid 30s cold starts during demo):

```bash
# Use a cron job or UptimeRobot to ping every 14 minutes
# Endpoint: https://your-backend.onrender.com/api/health
```

---

_Deploy early, test often! 🚀_
