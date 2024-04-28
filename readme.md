# Student Reporting System API

Welcome to the Student Reporting System API documentation! This API allows students and administrators to manage reports related to various issues within the campus dormitories.

## Table of Contents

- [Introduction](#introduction)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Student Reporting System API enables users to create, retrieve, update, and delete reports concerning issues within campus dormitories. It provides endpoints for both student actions (such as creating and managing reports) and admin actions (such as retrieving all reports and managing student accounts).

## Authentication

Authentication is required for certain endpoints using JSON Web Tokens (JWT). To access protected endpoints, clients must include a valid JWT token in the request headers.

## Endpoints

The API includes the following endpoints:

- **User Authentication**:

  - `POST /login`: Authenticate a user and generate a JWT token.
  - `POST /register`: Create a new user

- **Student Actions**:

  - `POST /create`: Create a new report.
  - `GET /report`: Retrieve reports created by the authenticated student.
  - `DELETE /deleteReport/:id`: Delete a report.
  - `PATCH /reportDescription/:id`: Update the description of a report.

- **Admin Actions**:
  - `GET /all`: Get all reports.
  - `GET /category/:category`: Get reports by category.
  - `GET /dorm/:dorm`: Get reports by dorm.
  - `PATCH /editReport/:id`: Update report status.
  - `GET /getAllStudent`: Get all student users.
  - `GET /getLogs`: Get all logged reports.
  - `GET /getLogCat/:category`: Get logged reports by category.

Certainly! Here's the updated "Usage" section without the clone repository step:

## Usage

### 1. Install Dependencies

Navigate to the project directory and install the required dependencies using npm:

```bash
cd backend
npm install
```

### 2. Set Environment Variables

Create a `.env` file in the root directory of the project and add the necessary environment variables:

```
PORT=4000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

### 3. Start the Server

Start the server using one of the following commands:

- **Production Mode**:  
  Run the server using:

  ```bash
  npm start
  ```

- **Development Mode**:  
  Use nodemon for automatic server restarts during development:
  ```bash
  npm run dev
  ```

### 4. Access API Endpoints

Once the server is running, you can access the API endpoints using the provided base URL (`http://localhost:4000/`). Refer to the API documentation for details on available endpoints and their usage.

### 5. Documentation

Generate and access API documentation using Swagger:

```bash
npm run swagger
```

Navigate to `http://localhost:4000/api-docs` in your web browser to view the Swagger UI and interact with the API documentation.

That's it! You are now ready to use the Student Reporting System API. If you encounter any issues or have questions, feel free to refer to the API documentation at https://drive.google.com/file/d/1fEFCGopZRW2nHT-Lkz7CQKU6St00At85/view?usp=drive_link or reach out to the project contributors.
