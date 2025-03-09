markdown
Copy

# Node.js Express MySQL - Marketplace API

This application is a **Marketplace API** built using Node.js, Express, and MySQL. This application provides API endpoints to manage products, users, and transactions in a marketplace.

## Description

This E-Commerce website is built using **Node.js** and **Express.js** as backend frameworks, with **EJS** as a template engine to render dynamic pages. This website uses **MySQL** as a database to store product, user, and transaction data. Several security features such as user authentication are implemented using **JSON Web Token (JWT)** and **bcrypt** for password hashing. In addition, this website also supports file uploads using **Multer** and session management with **Express Session** stored in MySQL.

## Key Features

- **User Management**: User registration, login, and authentication.
- **Product Management**: Add, edit, delete, and view products.
- **Transaction Management**: Make product purchase transactions.
- **Security**: Uses JWT (JSON Web Token) for authentication and bcrypt for password hashing.
- **File Upload**: Uses Multer to upload product images.
- **Session Management**: Uses Express Session and MySQL Session Store to store session data.
- **Environment Management**: Uses Dotenv to manage environment variables.
- **Compression**: Uses Compression Middleware to compress HTTP responses.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JSON Web Token (JWT), bcrypt
- **File Upload**: Multer
- **Template Engine**: EJS
- **Session Management**: Express Session, MySQL Session Store
- **Environment Management**: Dotenv
- **Compression**: Compression Middleware
- **Development Tool**: Nodemon (to auto-restart the server during development)

## Libraries Used

Here is a list of libraries used in this project:

- **bcrypt**: ^5.1.1 (for password hashing)
- **body-parser**: ^1.20.3 (for request body parsing)
- **bootstrap**: ^5.3.2 (for frontend styling)
- **compression**: ^1.8.0 (for HTTP response compression)
- **cookie-parser**: ^1.4.7 (for cookie parsing)
- **dotenv**: ^16.4.7 (for managing environment variables)
- **ejs**: ^3.1.10 (as template engine)
- **express**: ^4.21.2 (main framework for backend)
- **express-mysql-session**: ^3.0.3 (for storing sessions in MySQL)
- **express-session**: ^1.18.1 (for management session)
- **jsonwebtoken**: ^9.0.2 (for token-based authentication)
- **multer**: ^1.4.5-lts.1 (for file uploads)
- **mysql2**: ^3.12.0 (MySQL driver for Node.js)
- **nodemon**: ^3.1.9 (for server auto-restart during development)

### Steps

1. **Clone Repository** (if using Git):

```bash
git clone https://github.com/username/repository-name.git
cd repository-name
```

2. **Create a database in MySQL**
   with the database name as in bash below

```
nodemysql
```

3. **Import the database from the database folder with the database name (nodemysql)**

4. **Install Dependencies in the cmd editor with the command below**

bash
Copy

```
npm install
```

5. **Adjust the database configuration in the .env file (create a .env file from .env.example)**
   bash
   Copy
   nodemon index.js
   Application Access:

Open a browser or use tools like Postman to access the API.

The API endpoint can be accessed at http://localhost:3000.

**Sample photo project**

- **Login page**  
  ![example Apps](/login.png)
- **Register Page**  
  ![example Apps](/signup.png)
- **Before login can't show add product,edit product,delete product**  
  ![example Apps](/beforelogin.png)
- **After Login here can edit and delete product**  
  ![example Apps](/afterlogin.png)
- **Add Product**  
  ![example Apps](/addproduct.png)
- **Edit Product Login**  
  ![example Apps](/editproduct.png)

```
This project is licensed under the MIT License.
```

-----------------------------------------**Developed by [jerypatut]** -------------------------------------------------------
