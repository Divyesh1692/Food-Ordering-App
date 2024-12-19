# **Food Ordering API**

## **Description**

This project is a backend application for a food ordering system built with Node.js and Express.js. It supports multiple user roles: Superadmin, Admin, and User, each with specific functionalities. The API allows managing restaurants, food items, and orders, with secure role-based access and robust error handling.

## Deployment Url

https://food-ordering-app-yzg2.onrender.com/

## **Features**

### **User Roles and Functionalities**

1. **Superadmin**:

   - Manage restaurants (CRUD operations).
   - Assign admins to restaurants.

2. **Admin**:

   - Manage food items (CRUD operations) for their assigned restaurant.

3. **User**:
   - View restaurants and their food items.
   - Place and view orders.

### **Technical Highlights**

- **JWT Authentication** for secure access.
- **Role-Based Access Control (RBAC)** to restrict API endpoints based on roles.
- **MongoDB** as the database with Mongoose as the ORM.
- Centralized error handling for consistent and clear responses.
- Input validation using **Joi** or **Express Validator**.

---

## **Technologies Used**

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT** for authentication.
- **bcrypt.js** for password hashing.
- **Joi** for input validation.

---

## **API Endpoints**

### **Authentication**

- **Signup**: `POST /api/auth/signup`
- **Login**: `POST /api/auth/login`

### **Superadmin Endpoints**

- **Create Restaurant**: `POST /api/restaurants`
- **View All Restaurants**: `GET /api/restaurants`
- **Update Restaurant**: `PUT /api/restaurants/:id`
- **Delete Restaurant**: `DELETE /api/restaurants/:id`
- **Assign Admin**: `POST /api/restaurants/:id/assign-admin`

### **Admin Endpoints**

- **Add Food Item**: `POST /api/foods/:restaurantId`
- **View Food Items**: `GET /api/foods/:restaurantId`
- **Update Food Item**: `PUT /api/foods/:id`
- **Delete Food Item**: `DELETE /api/foods/:id`

### **User Endpoints**

- **View Restaurants**: `GET /api/restaurants`
- **View Food Items in a Restaurant**: `GET /api/foods/:restaurantId`
- **Place Order**: `POST /api/orders`
- **View Orders**: `GET /api/orders/:userId`

---

## **Installation and Setup**

### **Prerequisites**

- Node.js (v16 or higher).
- MongoDB installed locally or access to a MongoDB Atlas cluster.

### **Steps**

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd food-ordering-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:

   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Test the API endpoints using tools like Postman.

---

## **Folder Structure**

```plaintext
/backend
|-- models
|   |-- User.js
|   |-- Restaurant.js
|   |-- Food.js
|   |-- Order.js
|-- routes
|   |-- authRoutes.js
|   |-- restaurantRoutes.js
|   |-- foodRoutes.js
|   |-- orderRoutes.js
|-- controllers
|   |-- authController.js
|   |-- restaurantController.js
|   |-- foodController.js
|   |-- orderController.js
|-- middleware
|   |-- authMiddleware.js
|   |-- errorMiddleware.js
|-- config
|   |-- db.js
|-- utils
|   |-- errorHandler.js
|-- server.js
```

---

## **Features To Be Added** (Optional Enhancements)

- Pagination for restaurants and food items.
- Search functionality for food items.
- Real-time order status updates using WebSockets.
