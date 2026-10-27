# Cold-Mailer 🚀

Cold-Mailer is an AI-powered cold email generation and recruiter outreach platform built with Node.js, Express, MongoDB, Cloudinary, and OpenRouter AI.

---

## 🛠 Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **AI Integration**: OpenRouter AI (Nemotron/custom models)
- **Email Delivery**: Nodemailer (SMTP)
- **File & Media Storage**: Cloudinary & Multer (Memory Storage)
- **Deployment Platform**: Vercel Serverless

---

## 📂 Project Structure

```text
├── config/
│   ├── cloud.config.js       # Cloudinary configuration
│   └── db.js                 # Serverless-cached MongoDB connection
├── controller/
│   ├── auth.controller.js    # Register & Login controllers
│   ├── extraction.controller.js # AI extraction from recruitment images/resumes
│   ├── file.controller.js    # File upload handling (Cloudinary)
│   └── mail.controller.js    # Email generation, CRUD & SMTP dispatch
├── middleware/
│   ├── auth.middleware.js    # JWT bearer authentication
│   └── multer.middleware.js  # In-memory file upload middleware
├── model/
│   ├── auth.model.js         # User model
│   ├── extraction.model.js   # Extracted recruitment data model
│   ├── file.model.js         # Uploaded files model
│   └── mail.model.js         # Generated cold emails model
├── routes/
│   ├── auth.routes.js        # /api/auth routes
│   ├── file.routes.js        # /api/files routes
│   └── mail.routes.js        # /api/mail routes
├── services/
│   ├── email.service.js      # SMTP transport & mail sender
│   └── mail.service.js       # AI prompt logic for cold email drafting
├── utils/
│   └── ai.utils.js           # OpenRouter API caller
├── .env.example              # Template for environment variables
├── .gitignore                # Safeguard against pushing secrets & dependencies
├── index.js                  # Main Express app & Vercel serverless entry point
├── package.json              # Project dependencies & scripts
└── vercel.json               # Vercel serverless deployment routing
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (based on `.env.example`):

| Variable | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Local server port | `5000` |
| `JWT_SECRET` | Secret key for signing JWT auth tokens | `your_jwt_secret_key` |
| `MONGODB_URL` | MongoDB connection URI string | `mongodb+srv://...` |
| `CLOUD_NAME` | Cloudinary cloud name | `your_cloud_name` |
| `CLOUD_API_KEY` | Cloudinary API key | `your_api_key` |
| `CLOUD_API_SECRET`| Cloudinary API secret | `your_api_secret` |
| `OPENROUTER_API_KEY` | OpenRouter API Key for AI features | `sk-or-v1-...` |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP port (`587` for TLS, `465` for SSL) | `587` |
| `SMTP_USER` | SMTP username / Sender email | `your_email@gmail.com` |
| `SMTP_PASS` | SMTP password (e.g. Gmail App Password) | `your_app_password` |

> ⚠️ **Security Note**: Never commit `.env` to GitHub. It is ignored by `.gitignore`.

---

## 💻 Local Setup & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nehachaudhari1819-debug/Cold-Mailer.git
   cd Cold-Mailer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   Copy `.env.example` to `.env` and fill in your credentials:
   ```bash
   cp .env.example .env
   ```

4. **Run the server in development mode:**
   ```bash
   npm run dev
   ```

5. **Run in production mode:**
   ```bash
   npm start
   ```

The server will be available at `http://localhost:5000`.

---

## 🚀 Deploying to Vercel

This repository is pre-configured for seamless Vercel deployment via `vercel.json` and `@vercel/node`.

### Option 1: Deploy via Vercel Web Dashboard (Recommended)

1. Push your latest code to your GitHub repository.
2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **Add New...** -> **Project**.
3. Select and import the `Cold-Mailer` repository.
4. Keep the **Framework Preset** as **Other** (or Node.js) and the **Root Directory** as `./`.
5. Under **Environment Variables**, add all keys listed in the [Environment Variables](#️-environment-variables) section.
6. Click **Deploy**.

### Option 2: Deploy via Vercel CLI

1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Log in and deploy from the project root:
   ```bash
   vercel
   ```

3. Follow the prompts, add your environment variables in the Vercel Dashboard project settings, and run:
   ```bash
   vercel --prod
   ```

---

## 📡 API Endpoints

### Health Check
- `GET /` - Root status endpoint
- `GET /health` - Service health & uptime

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new user (`name`, `email`, `password`, `domain`, `skills`)
- `POST /api/auth/login` - Login with `email` and `password`

### File Management (`/api/files`)
- `POST /api/files/upload` - Upload resume or document to Cloudinary (Multipart form with `file` and `fileName`)
- `POST /api/files/extract` - Upload recruitment screenshot to extract info via AI (`screenshot`)

### Cold Email Operations (`/api/mail`)
- `POST /api/mail/generate` - Generate 3 customized email drafts based on extraction (`extractionId`)
- `GET /api/mail` - Get all generated email drafts for logged-in user
- `GET /api/mail/:id` - Get specific email draft by ID
- `PUT /api/mail/:id` - Update email draft subject or body
- `DELETE /api/mail/:id` - Delete email draft
- `POST /api/mail/send` - Send email via SMTP to recruiter with attached resume (`emailId`, `to`)
