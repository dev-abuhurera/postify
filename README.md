# Postify

A simple post management app that lets users create, edit, and delete posts — designed to bring together most core backend concepts in one project.

---

## 🚀 Features
- Create, edit, and delete posts
- User authentication & profiles
- Organized MVC structure
- EJS templating for views
- Backend concepts (routing, models, controllers, middleware, etc.)

---

## 🛠 Tech Stack
- **Node.js** + **Express.js**
- **MongoDB** (Mongoose ODM)
- **EJS** (templating engine)
- **JavaScript (ES6)**

---

## 📂 Project Structure
```

├── models/ # Mongoose models (Post, User)
├── views/ # EJS templates (index, edit, login, profile)
├── app.js # Main application entry point
├── package.json # Project dependencies
├── .gitignore # Ignored files
└── README.md # Project documentation

```

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/dev-abuhurera/postify.git
   cd postify

   ```

2. Install dependencies:
```
   npm install
```

3. Create a .env file in the root directory:

```
  PORT=5000
  MONGO_URI=your_mongo_connection_string
  JWT_SECRET=your_secret_key
```

4. Start the server:
```
  npm start
```

or (for development with auto-reload):
```
npm run dev
```
