# 🛒 MERN Ecommerce - Complete Source Code Documentation

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Source Code Documentation](#source-code-documentation)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Development Guidelines](#development-guidelines)

---

## 🎯 Overview

**MERN Ecommerce** is a production-ready, full-stack ecommerce platform built with the **MERN stack (MongoDB, Express.js, React, Node.js)**. The application features a modern microservices architecture with Docker containerization, role-based access control, real-time features via Socket.IO, and cloud deployment capabilities.

### Key Highlights

* 🌐 **Full-Stack MERN Architecture** – Seamless integration between React frontend and Express backend
* 🎨 **Modern UI/UX** – Built with React, Redux, Sass (SCSS Modules), and responsive design
* 🐳 **Docker-Ready** – Multi-stage Dockerfiles with production optimization
* 🔐 **Secure Authentication** – JWT-based auth with Passport.js (Google & Facebook OAuth)
* 👥 **Role-Based Access Control** – Admin, Merchant, and Customer roles
* 📦 **RESTful API** – Well-structured API with proper error handling
* 💳 **Complete Ecommerce Features** – Products, Cart, Orders, Reviews, Wishlist
* 📧 **Email Integration** – Mailgun for transactional emails, Mailchimp for newsletters
* ☁️ **AWS S3 Integration** – Cloud storage for product images
* 🔄 **Real-time Support** – Socket.IO for live customer support chat
* 🧪 **Database Seeding** – Faker.js integration for test data generation

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   React App (Webpack + Babel)                        │   │
│  │   - Redux Store (State Management)                   │   │
│  │   - React Router (Navigation)                        │   │
│  │   - Sass Modules (Styling)                           │   │
│  │   - Socket.IO Client (Real-time)                     │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ HTTP/WebSocket
┌─────────────────────────────────────────────────────────────┐
│                         Server Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   Express.js API Server                              │   │
│  │   - RESTful Routes                                   │   │
│  │   - JWT Authentication                               │   │
│  │   - Passport OAuth                                   │   │
│  │   - Socket.IO Server                                 │   │
│  │   - Middleware (Auth, Role, Validation)              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                       Database Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   MongoDB                                            │   │
│  │   - Users, Products, Orders, Reviews                 │   │
│  │   - Categories, Brands, Merchants                    │   │
│  │   - Cart, Wishlist, Addresses                        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

External Services:
├── AWS S3 (Image Storage)
├── Mailgun (Transactional Emails)
├── Mailchimp (Newsletter)
└── OAuth Providers (Google, Facebook)
```

### Docker Architecture

The application uses a **multi-container Docker setup** with three services:

1. **Client Container** (Nginx + React Build)
   - Multi-stage build (Node.js build → Nginx serve)
   - Optimized production bundle
   - Health checks enabled

2. **Server Container** (Node.js API)
   - Multi-stage build (dependencies → production)
   - Non-root user for security
   - Dumb-init for proper signal handling

3. **MongoDB Container**
   - Official MongoDB image
   - Persistent volume storage
   - Health checks via mongosh

---

## 📁 Project Structure

```
ecommerce-mern/
├── client/                          # Frontend React Application
│   ├── app/                         # Main application code
│   │   ├── actions.js               # Redux action creators
│   │   ├── app.js                   # Root React component
│   │   ├── reducers.js              # Redux reducers
│   │   ├── store.js                 # Redux store configuration
│   │   ├── components/              # Reusable UI components (76 files)
│   │   │   ├── Common/              # Shared components
│   │   │   ├── Manager/             # Admin/Merchant components
│   │   │   └── Store/               # Customer-facing components
│   │   ├── containers/              # Page containers (37 directories)
│   │   │   ├── Account/             # User account management
│   │   │   ├── Authentication/      # Login, Signup, Password Reset
│   │   │   ├── Brand/               # Brand management
│   │   │   ├── Cart/                # Shopping cart
│   │   │   ├── Category/            # Category management
│   │   │   ├── Dashboard/           # Admin/Merchant dashboard
│   │   │   ├── Homepage/            # Landing page
│   │   │   ├── Merchant/            # Merchant management
│   │   │   ├── Order/               # Order management
│   │   │   ├── Product/             # Product management
│   │   │   ├── Shop/                # Product browsing
│   │   │   ├── Support/             # Customer support chat
│   │   │   └── WishList/            # Wishlist functionality
│   │   ├── contexts/                # React Context providers
│   │   ├── styles/                  # Sass/SCSS modules (47 files)
│   │   └── utils/                   # Helper functions
│   ├── public/                      # Static assets
│   ├── webpack/                     # Webpack configurations
│   │   ├── webpack.common.js        # Shared config
│   │   ├── webpack.dev.js           # Development config
│   │   └── webpack.prod.js          # Production config
│   ├── Dockerfile                   # Multi-stage Docker build
│   ├── nginx.conf                   # Nginx configuration
│   ├── package.json                 # Dependencies & scripts
│   └── .env.example                 # Environment variables template
│
├── server/                          # Backend Node.js/Express API
│   ├── config/                      # Configuration files
│   │   ├── keys.js                  # Environment variables handler
│   │   ├── passport.js              # Passport.js authentication
│   │   ├── tax.js                   # Tax calculation config
│   │   └── template.js              # Email templates
│   ├── constants/                   # Application constants
│   │   └── index.js                 # Roles, statuses, etc.
│   ├── middleware/                  # Express middleware
│   │   ├── auth.js                  # JWT authentication
│   │   └── role.js                  # Role-based authorization
│   ├── models/                      # Mongoose schemas (11 models)
│   │   ├── address.js               # User addresses
│   │   ├── brand.js                 # Product brands
│   │   ├── cart.js                  # Shopping cart
│   │   ├── category.js              # Product categories
│   │   ├── contact.js               # Contact form submissions
│   │   ├── merchant.js              # Merchant/seller accounts
│   │   ├── order.js                 # Customer orders
│   │   ├── product.js               # Products
│   │   ├── review.js                # Product reviews
│   │   ├── user.js                  # User accounts
│   │   └── wishlist.js              # User wishlists
│   ├── routes/                      # API routes
│   │   ├── api/                     # API endpoints (14 route files)
│   │   │   ├── address.js           # Address CRUD
│   │   │   ├── auth.js              # Authentication & OAuth
│   │   │   ├── brand.js             # Brand management
│   │   │   ├── cart.js              # Cart operations
│   │   │   ├── category.js          # Category management
│   │   │   ├── contact.js           # Contact form
│   │   │   ├── merchant.js          # Merchant operations
│   │   │   ├── newsletter.js        # Newsletter subscription
│   │   │   ├── order.js             # Order management
│   │   │   ├── product.js           # Product CRUD & search
│   │   │   ├── review.js            # Review management
│   │   │   ├── user.js              # User management
│   │   │   └── wishlist.js          # Wishlist operations
│   │   └── index.js                 # Route aggregator
│   ├── services/                    # External service integrations
│   │   ├── mailchimp.js             # Newsletter service
│   │   └── mailgun.js               # Email service
│   ├── socket/                      # WebSocket functionality
│   │   ├── index.js                 # Socket.IO setup
│   │   └── support.js               # Support chat handlers
│   ├── utils/                       # Utility functions
│   │   ├── auth.js                  # Auth helpers
│   │   ├── db.js                    # Database connection
│   │   ├── queries.js               # Common DB queries
│   │   ├── seed.js                  # Database seeding script
│   │   ├── storage.js               # AWS S3 integration
│   │   ├── store.js                 # Store helpers
│   │   └── utils.js                 # General utilities
│   ├── Dockerfile                   # Multi-stage Docker build
│   ├── index.js                     # Application entry point
│   ├── package.json                 # Dependencies & scripts
│   └── .env.example                 # Environment variables template
│
├── docker-compose.yml               # Docker orchestration
├── .env.example                     # Root environment variables
├── .gitignore                       # Git ignore rules
└── README.md                        # This file
```

---

## ✨ Features

### 🛍️ Customer Features

- **Product Browsing**
  - Browse products by category and brand
  - Advanced search and filtering
  - Product details with image gallery
  - Product reviews and ratings
  - Related products suggestions

- **Shopping Experience**
  - Add to cart functionality
  - Wishlist management
  - Multiple shipping addresses
  - Order tracking
  - Order history

- **User Account**
  - Registration and login
  - Social login (Google, Facebook)
  - Profile management
  - Password reset
  - Address book

- **Communication**
  - Contact form
  - Newsletter subscription
  - Live support chat (Socket.IO)

### 👨‍💼 Merchant Features

- **Product Management**
  - Create, edit, delete products
  - Image upload to AWS S3
  - Inventory management
  - Product categorization

- **Order Management**
  - View and process orders
  - Update order status
  - Order fulfillment

- **Business Analytics**
  - Sales dashboard
  - Product performance
  - Customer insights

### 🔧 Admin Features

- **User Management**
  - View all users
  - Role assignment
  - Account activation/deactivation

- **Merchant Management**
  - Approve/reject merchant applications
  - Merchant monitoring

- **Catalog Management**
  - Category management
  - Brand management
  - Product oversight

- **System Administration**
  - Platform configuration
  - Content moderation
  - Analytics and reporting

---

## 🧩 Technology Stack

### Frontend

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 16.8.6 |
| **Redux** | State Management | 4.0.1 |
| **Redux Thunk** | Async Actions | 2.3.0 |
| **React Router** | Navigation | 5.0.1 |
| **Sass** | Styling | 1.32.12 |
| **Webpack** | Module Bundler | 4.47.0 |
| **Babel** | JavaScript Compiler | 7.4.5 |
| **Axios** | HTTP Client | 0.21.1 |
| **Socket.IO Client** | Real-time Communication | 4.2.0 |
| **Bootstrap** | UI Components | 4.3.1 |
| **Reactstrap** | React Bootstrap | 8.0.0 |
| **React Select** | Dropdown Component | 3.0.4 |
| **RC Slider** | Range Slider | 9.7.2 |
| **React Paginate** | Pagination | 8.1.3 |
| **DOMPurify** | XSS Protection | 2.3.8 |
| **Validator.js** | Form Validation | 3.18.1 |

### Backend

| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime Environment | 24 (Alpine) |
| **Express** | Web Framework | 4.17.1 |
| **MongoDB** | Database | Latest |
| **Mongoose** | ODM | 5.5.11 |
| **JWT** | Authentication | 8.5.1 |
| **Passport** | OAuth Strategy | 0.4.0 |
| **bcryptjs** | Password Hashing | 2.4.3 |
| **Socket.IO** | WebSocket Server | 4.2.0 |
| **Helmet** | Security Headers | 4.6.0 |
| **CORS** | Cross-Origin Requests | 2.8.5 |
| **AWS SDK** | S3 Integration | 2.799.0 |
| **Mailgun** | Email Service | 0.22.0 |
| **Mailchimp** | Newsletter Service | 1.14.0 |
| **Multer** | File Upload | 1.4.2 |
| **Faker** | Test Data Generation | 8.4.1 |
| **Validator.js** | Input Validation | 3.18.1 |

### DevOps & Tools

| Technology | Purpose |
|------------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-container orchestration |
| **Nginx** | Web server (production) |
| **Nodemon** | Development auto-reload |
| **Prettier** | Code formatting |
| **ESLint** | Code linting |
| **Git** | Version control |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 24+ (Alpine recommended for Docker)
- **npm** or **yarn**
- **Docker** and **Docker Compose** (for containerized setup)
- **MongoDB** (if running locally without Docker)

### Installation

#### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/phuquocchamp/ecommerce-mern.git
   cd ecommerce-mern
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Build and start containers**
   ```bash
   docker-compose build
   docker-compose up
   ```

4. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8080/api`
   - MongoDB: `localhost:27017`

#### Option 2: Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/phuquocchamp/ecommerce-mern.git
   cd ecommerce-mern
   ```

2. **Install server dependencies**
   ```bash
   cd server
   cp .env.example .env
   # Configure server/.env
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   cp .env.example .env
   # Configure client/.env
   npm install
   ```

4. **Start MongoDB**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   
   # Or use local MongoDB installation
   mongod
   ```

5. **Seed the database (optional)**
   ```bash
   cd server
   npm run seed:db admin@example.com SecurePassword123
   ```

6. **Start development servers**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

### Environment Variables

#### Root `.env` (Docker Compose)

```bash
# Client Configuration
CLIENT_PORT=3000
API_URL=http://localhost:8080/api

# Server Configuration
SERVER_PORT=8080
BASE_API_URL=api
CLIENT_URL=http://localhost:3000
JWT_SECRET=your_jwt_secret_here

# Database Configuration
MONGO_URI=mongodb://mongo:27017/ecommerce-mern
MONGO_PORT=27017

# Admin Seed Configuration
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SecurePassword123

# Third Party Services
MAILCHIMP_KEY=
MAILCHIMP_LIST_KEY=
MAILGUN_KEY=
MAILGUN_DOMAIN=
MAILGUN_EMAIL_SENDER=

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:8080/api/auth/google/callback
FACEBOOK_CLIENT_ID=
FACEBOOK_CLIENT_SECRET=
FACEBOOK_CALLBACK_URL=http://localhost:8080/api/auth/facebook/callback

# AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_BUCKET_NAME=
```

---

## 📚 Source Code Documentation

### Client Architecture

#### Redux Store Structure

```javascript
// app/store.js
{
  account: { user, resetFormData, signupFormData },
  authentication: { authenticated, user, isLoading },
  cart: { cartItems, cartTotal },
  product: { products, product, searchResults },
  category: { categories },
  brand: { brands },
  order: { orders },
  review: { reviews },
  wishlist: { wishlist },
  merchant: { merchants },
  // ... more slices
}
```

#### Key Components

**Authentication Flow**
- `containers/Login/` - User login
- `containers/Signup/` - User registration
- `containers/ForgotPassword/` - Password recovery
- `containers/ResetPassword/` - Password reset
- `containers/AuthSuccess/` - OAuth callback handler

**Product Management**
- `containers/Product/` - Product CRUD operations
- `containers/ProductPage/` - Product detail view
- `containers/Shop/` - Product listing and filtering
- `containers/ProductsShop/` - All products view
- `containers/BrandsShop/` - Brand-specific products
- `containers/CategoryShop/` - Category-specific products

**Shopping Features**
- `containers/Cart/` - Shopping cart management
- `containers/WishList/` - Wishlist functionality
- `containers/Order/` - Order placement and tracking
- `containers/OrderSuccess/` - Order confirmation

**User Dashboard**
- `containers/Dashboard/` - Main dashboard
- `containers/Account/` - Profile management
- `containers/Address/` - Address management
- `containers/AccountSecurity/` - Security settings

### Server Architecture

#### API Endpoints

**Authentication** (`/api/auth`)
```javascript
POST   /login              // User login
POST   /register           // User registration
POST   /forgot             // Password reset request
POST   /reset/:token       // Password reset
GET    /google             // Google OAuth
GET    /google/callback    // Google OAuth callback
GET    /facebook           // Facebook OAuth
GET    /facebook/callback  // Facebook OAuth callback
```

**Products** (`/api/product`)
```javascript
GET    /list               // List all products
GET    /item/:slug         // Get product by slug
GET    /list/search/:name  // Search products
POST   /add                // Create product (Merchant)
PUT    /:id                // Update product (Merchant)
DELETE /:id                // Delete product (Merchant)
```

**Cart** (`/api/cart`)
```javascript
POST   /add                // Add to cart
DELETE /delete/:id         // Remove from cart
POST   /add                // Update cart item
```

**Orders** (`/api/order`)
```javascript
POST   /add                // Create order
GET    /                   // Get user orders
GET    /:id                // Get order details
PUT    /status/:id         // Update order status (Merchant)
PUT    /cancel/:id         // Cancel order
```

**Categories** (`/api/category`)
```javascript
GET    /list               // List categories
POST   /add                // Create category (Admin)
PUT    /:id                // Update category (Admin)
DELETE /:id                // Delete category (Admin)
```

**Brands** (`/api/brand`)
```javascript
GET    /list               // List brands
POST   /add                // Create brand (Admin)
PUT    /:id                // Update brand (Admin)
DELETE /:id                // Delete brand (Admin)
```

**Reviews** (`/api/review`)
```javascript
POST   /add                // Add review
GET    /:slug              // Get product reviews
PUT    /approve/:id        // Approve review (Admin)
DELETE /:id                // Delete review
```

**Users** (`/api/user`)
```javascript
GET    /                   // Get all users (Admin)
PUT    /:id                // Update user (Admin)
DELETE /:id                // Delete user (Admin)
```

**Merchants** (`/api/merchant`)
```javascript
POST   /signup             // Merchant registration
GET    /list               // List merchants (Admin)
PUT    /approve/:id        // Approve merchant (Admin)
PUT    /reject/:id         // Reject merchant (Admin)
```

**Wishlist** (`/api/wishlist`)
```javascript
POST   /add                // Add to wishlist
GET    /                   // Get wishlist
DELETE /:id                // Remove from wishlist
```

**Address** (`/api/address`)
```javascript
POST   /add                // Add address
GET    /                   // Get addresses
PUT    /:id                // Update address
DELETE /:id                // Delete address
```

**Contact** (`/api/contact`)
```javascript
POST   /add                // Submit contact form
```

**Newsletter** (`/api/newsletter`)
```javascript
POST   /subscribe          // Subscribe to newsletter
```

#### Database Models

**User Model** (`models/user.js`)
```javascript
{
  email: String (unique, required),
  phoneNumber: String,
  firstName: String,
  lastName: String,
  password: String (hashed),
  merchant: ObjectId (ref: Merchant),
  provider: String (local/google/facebook),
  googleId: String,
  facebookId: String,
  avatar: String,
  role: String (ROLES.Admin/Merchant/Member),
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  updated: Date,
  created: Date
}
```

**Product Model** (`models/product.js`)
```javascript
{
  sku: String,
  name: String (required),
  slug: String (unique),
  imageUrl: String,
  imageKey: String,
  description: String,
  quantity: Number,
  price: Number (required),
  taxable: Boolean,
  isActive: Boolean,
  brand: ObjectId (ref: Brand),
  category: ObjectId (ref: Category),
  merchant: ObjectId (ref: Merchant),
  updated: Date,
  created: Date
}
```

**Order Model** (`models/order.js`)
```javascript
{
  cart: ObjectId (ref: Cart),
  user: ObjectId (ref: User),
  total: Number,
  status: String (Not processed/Processing/Shipped/Delivered/Cancelled),
  updated: Date,
  created: Date
}
```

**Cart Model** (`models/cart.js`)
```javascript
{
  products: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    purchasePrice: Number,
    totalPrice: Number,
    priceWithTax: Number,
    totalTax: Number,
    status: String
  }],
  user: ObjectId (ref: User),
  updated: Date,
  created: Date
}
```

#### Middleware

**Authentication** (`middleware/auth.js`)
```javascript
// JWT verification
requireSignin: passport.authenticate('jwt', { session: false })
```

**Authorization** (`middleware/role.js`)
```javascript
// Role-based access control
ROLES.Admin    // Full system access
ROLES.Merchant // Merchant-specific operations
ROLES.Member   // Customer operations
```

#### Services

**AWS S3 Storage** (`utils/storage.js`)
- Image upload to S3
- Image deletion from S3
- Secure URL generation

**Email Services**
- `services/mailgun.js` - Transactional emails (order confirmations, password reset)
- `services/mailchimp.js` - Newsletter management

**Socket.IO** (`socket/support.js`)
- Real-time customer support chat
- Admin-customer messaging
- Connection management

---

## 🐳 Deployment

### Docker Deployment

The application uses **multi-stage Docker builds** for optimization:

#### Client Dockerfile
```dockerfile
# Stage 1: Build
FROM node:24-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Production (Nginx)
FROM nginx:1.27-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
```

#### Server Dockerfile
```dockerfile
# Stage 1: Dependencies
FROM node:24-alpine AS dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Stage 2: Production Dependencies
FROM node:24-alpine AS prod-dependencies
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --omit=dev --legacy-peer-deps

# Stage 3: Production
FROM node:24-alpine AS production
RUN apk add --no-cache dumb-init curl
WORKDIR /usr/src/app
COPY --from=prod-dependencies /usr/src/app/node_modules ./node_modules
COPY . .
EXPOSE 8080
CMD ["node", "index.js"]
```

### Cloud Deployment (Vercel)

The project is configured for **Vercel serverless deployment**:

1. **Frontend Deployment**
   - Root directory: `client`
   - Build command: `npm run build`
   - Output directory: `dist`

2. **Backend Deployment**
   - Root directory: `server`
   - Entry point: `index.js`
   - Serverless functions

---

## 👨‍💻 Development Guidelines

### Code Style

**Prettier Configuration**
```json
{
  "singleQuote": true,
  "arrowParens": "avoid",
  "jsxSingleQuote": true,
  "trailingComma": "none"
}
```

### Git Workflow

1. Create feature branch from `main`
2. Make changes and commit
3. Push to remote and create PR
4. Code review and merge

### Testing

```bash
# Run tests (when implemented)
npm test

# Lint code
npm run lint
```

### Database Seeding

```bash
# Seed with admin user
npm run seed:db admin@example.com SecurePassword123

# The seed script uses Faker.js to generate:
# - Sample products
# - Categories
# - Brands
# - Test users
```

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using the MERN Stack**