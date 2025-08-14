# Blog API (Node.js + Express + MongoDB Atlas)

A simple RESTful API for user authentication and blog management using **Node.js**, **Express**, and **MongoDB Atlas**.  
This API implements **JWT-based authentication** without using a `utils` folder — authentication logic is handled directly in controllers and middleware.

---

## 📁 Project Structure
```

project-root/
├── controllers/       # Controller functions for routes
├── models/            # Mongoose models
├── routes/            # API route definitions
├── middleware/        # Custom middleware (JWT auth, error handling)
├── config/            # Database connection setup
├── tests/             # API tests (optional)
├── app.js             # Express app setup
├── server.js          # Server entry point
├── .env               # Environment variables
├── .gitignore         # Files and folders to ignore in git
├── README.md          # Project documentation

````

---

## 🚀 Features
- **User Registration** (with hashed passwords)
- **User Login** (JWT token generation)
- **Protected Routes** (middleware-based JWT verification)
- **MongoDB Atlas** integration
- **Environment variables** for sensitive data

---

## 🛠 Tech Stack
- **Node.js** + **Express**
- **MongoDB Atlas** (Mongoose ODM)
- **bcrypt** for password hashing
- **jsonwebtoken** for authentication
- **dotenv** for environment configuration

---

## ⚙️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/blog-api.git
cd blog-api
````

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file**

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-name>.mongodb.net/blog-api?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret
```

4. **Start development server**

```bash
npm run dev
```

---

## 📬 API Endpoints

### Auth
- `POST /api/users/register` – Register
- `POST /api/users/login` – Login
- `GET /api/users/protected` – Test JWT (auth)

### Posts
- `POST /api/posts` – Create post (auth)
- `GET /api/posts` – List posts (public, pagination & filtering)
  - Query: `page`, `limit`, `author`, `tags` (comma-separated), `startDate`, `endDate`
- `GET /api/posts/:id` – Get single post (public)
- `PATCH /api/posts/:id` – Update post (owner or admin)
- `DELETE /api/posts/:id` – Delete post (owner or admin)

### Comments
- `POST /api/posts/:postId/comments` – Add comment (auth)
- `GET /api/posts/:postId/comments` – List comments (public)
- `DELETE /api/posts/:postId/comments/:commentId` – Delete comment (owner or admin)

### Security
- Helmet for HTTP headers
- Rate limiting on `/api`
- Input sanitization (xss-clean, express-mongo-sanitize)
- HPP protection

## 🧪 Testing in Postman

1. **Register** → `POST /api/users/register`
2. **Login** → `POST /api/users/login` (copy token from response)
3. **Protected Route** → `GET /api/users/protected` (add `Authorization` header with token)