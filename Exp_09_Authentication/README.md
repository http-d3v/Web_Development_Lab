# Experiment 09: User Authentication & Authorization System

**Student Name:** Dev Kumar Tiwari  
**Enrollment / Roll:** 2nd Year B.Tech Computer Science & Engineering (Data Science)  
**Academic Year:** 2nd Year (IV Semester)  
**Course:** Web Development Laboratory  
**GitHub Profile:** [@http-d3v](https://github.com/http-d3v)  
**Vercel Profile:** [@httpd3v](https://vercel.com/httpd3v)  
**Live URL:** [https://exp-09-authentication.vercel.app](https://exp-09-authentication.vercel.app)

---

## 1. Aim of the Experiment
To implement a secure, production-grade User Authentication and Authorization subsystem in Node.js and Express utilizing salted password hashing (`bcryptjs`), cryptographic token generation (`jsonwebtoken`), Bearer authorization middleware for private route guarding, environment variable isolation (`dotenv`), and an interactive client inspection console.

---

## 2. Technologies Used
- **Backend Runtime:** Node.js (v24 LTS)
- **Framework:** Express.js (v4.21)
- **Password Hashing:** `bcryptjs` (10 salt rounds with Adaptive Blowfish cryptographic cipher)
- **Token Format:** JSON Web Tokens (`jsonwebtoken` with HMAC-SHA256 signature)
- **Environment Management:** `dotenv`
- **Data Persistence:** JSON Data Store (`data/users.json`) with safe filesystem synchronization
- **Frontend / Client:** Semantic HTML5, CSS3 Custom Properties, Vanilla JavaScript
- **Deployment Platform:** Vercel (Serverless Functions & Static Web Hosting)

---

## 3. REST Authentication Endpoints

| Method | Endpoint | Access | Header Requirement | Description | Status Code |
|:---:|:---|:---:|:---|:---|:---:|
| `POST` | `/api/auth/register` | Public | None | Register new user account; hashes password with bcrypt | `201 Created` / `400 Bad Request` |
| `POST` | `/api/auth/login` | Public | None | Verify password hash against stored record; returns JWT | `200 OK` / `401 Unauthorized` |
| `GET` | `/api/auth/profile` | Private | `Authorization: Bearer <token>` | Decodes token, returns authenticated user details | `200 OK` / `401 Unauthorized` |
| `GET` | `/api/auth/protected-resource` | Private | `Authorization: Bearer <token>` | Accesses confidential lab dataset reserved for active students | `200 OK` / `401 Unauthorized` |
| `POST` | `/api/auth/logout` | Public | None | Informs client to flush stored token | `200 OK` |

---

## 4. Key Security & Functional Features
- **Salted Password Hashing:** User passwords never enter persistence in plain text. Salting with 10 rounds guarantees protection against rainbow table and dictionary attacks.
- **Stateless Session Management:** The server maintains zero session state in memory; all authentication state travels inside the signed, compact JWT.
- **Middleware Guarding (`middleware/auth.js`):** Intercepts requests, validates authorization headers, checks token expiry, verifies cryptographic signatures, and assigns `req.user`.
- **Live JWT Inspector:** Frontend interface extracts and decodes claims (`id`, `name`, `email`, `role`, `iat`, `exp`) in real time.
- **Pre-configured Student Demo:** Instant pre-fill credentials for examination and testing without manual typing.

---

## 5. File Structure
```text
Exp_09_Authentication/
├── server.js               # Express application entry, auth controllers, and routes
├── package.json            # Dependencies (express, bcryptjs, jsonwebtoken, cors, dotenv)
├── vercel.json             # Vercel serverless routing configuration
├── .env.example            # Template for environment keys
├── .env                    # Local environment keys (PORT, JWT_SECRET)
├── .gitignore              # Ignores node_modules, .env, and sensitive files
├── README.md               # Complete lab documentation
├── api/
│   └── index.js            # Serverless entry point for Vercel deployment
├── data/
│   └── users.json          # File-backed user repository
├── middleware/
│   └── auth.js             # JWT verification middleware
└── public/
    ├── index.html          # Interactive authentication and inspector UI
    ├── style.css           # Warm minimalist editorial styling
    ├── app.js              # Client authentication and JWT decoding logic
    └── favicon.svg         # SVG shield and keyhole icon
```

---

## 6. How to Run Locally

### Prerequisites
- Node.js (version 18 or newer)
- npm

### Step-by-Step Execution
1. Navigate into the experiment directory:
   ```bash
   cd Web_Development_Lab/Exp_09_Authentication
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Start the authentication server:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000` in your web browser.

### Testing Protected Routes via cURL
```bash
# 1. Login to retrieve token
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"dev.cse.ds@college.edu","password":"Password123"}'

# 2. Access protected profile using received token
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer <PASTE_TOKEN_HERE>"

# 3. Access protected student resource
curl -X GET http://localhost:3000/api/auth/protected-resource \
  -H "Authorization: Bearer <PASTE_TOKEN_HERE>"
```

---

## 7. Expected Output
- Starting `node server.js` logs confirmation that the authentication service is active on port 3000.
- Visiting `http://localhost:3000` displays the warm-styled Sign In / Sign Up portal alongside the Token Inspector.
- Signing in successfully renders the user dashboard, displays the active JWT, decodes the claims payload, and allows testing private endpoints with automatic Bearer token injection.
- Attempting to query protected endpoints without a token returns a structured `401 Unauthorized` JSON response.
