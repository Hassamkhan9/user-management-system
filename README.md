Inventory Management System
A full-stack inventory tracking application built with Node.js, Express, PostgreSQL, and React.
Features

Add, update, and delete products and categories
Track stock levels with low-stock alerts
JWT authentication with role-based access for admin and staff
React dashboard with search and filter functionality
RESTful API with 12+ endpoints

Tech Stack
Backend: Node.js, Express.js, PostgreSQL, JWT
Frontend: React.js
Deployment: Render
Getting Started
Prerequisites

Node.js v18+
PostgreSQL
npm

Installation
bashgit clone https://github.com/Hassamkhan9/inventory-management-system.git
cd inventory-management-system
npm install
Environment Variables
Create a .env file in the root directory:
PORT=5000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
Run the App
bash# Run backend
npm run server

# Run frontend
cd client
npm install
npm start
API Endpoints
MethodEndpointDescriptionGET/api/productsGet all productsPOST/api/productsAdd a productPUT/api/products/:idUpdate a productDELETE/api/products/:idDelete a productGET/api/categoriesGet all categoriesPOST/auth/loginUser loginPOST/auth/registerRegister user
