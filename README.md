
# Tailwebs Backend

## Dear Developer,

Thank you for the opportunity to work on this assignment. It has been a rewarding experience, and I hope you find the project both functional and well-executed. I look forward to your feedback and hope the project aligns with your expectations.

Let me know if this works for you or if you need any adjustments!

## Overview

Tailwebs Backend is a Node.js application designed to manage student records. It provides a set of RESTful APIs for creating, reading, updating, and deleting student data. The backend uses Express for the server framework, MongoDB for the database, and Passport for authentication.

## Features

- **Login Functionality**:

  - Implemented API-based login functionality for teachers, including a login screen for credential input. The system authenticates users via backend API calls and handles authentication errors with appropriate feedback.

- **Teacher Portal Home & Student Listing Screen**:

  - After a successful login, users are redirected to the teacher portal home screen. This screen also serves as a student listing page, displaying students’ names, subject names, and marks. It includes options to edit and delete student details, with inline editing functionality.

- **New Student Entry**:

  - Provides a feature for adding new student details via a popup/modal. The system checks for existing students with the same name and subject combination. If a match is found, it updates the existing record with new marks; if no match is found, it creates a new student record.

- **CRUD Operations for Student Records**:

  - Supports full CRUD operations (Create, Read, Update, Delete) for managing student records.

- **Error Handling and Validation**:

  - Incorporates comprehensive error handling and validation to ensure data integrity and provide clear feedback.

- **JWT-based Authentication**:
  - Utilizes JWT (JSON Web Token) for secure user authentication, managed via Passport middleware.

## Additional Features

- **Roll Number Field**:

  - Added a roll number field to support scalable student management. This allows for the effective differentiation of students who might have the same name and subject.

- **Search Functionality**:

  - Implemented search functionality to filter student records by name, roll number, or subject name. This feature enhances data retrieval and user experience.

- **Pagination**:

  - Included pagination support to manage and navigate through extensive datasets, improving the performance and usability of the student listing.

- **Sorting by Roll Number**:

  - Enabled sorting of student records by roll number. This ensures that data is organized systematically and can be easily accessed.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (for local development)


## Setup

### Clone the Repository

Start by cloning the repository:

```bash
git clone https://github.com/your-username/tailwebs-backend.git
cd tailwebs-backend
```

### Install Dependencies

Install the required npm packages:

```bash
npm install
```

### Setup MongoDB

You need MongoDB installed and running on your local system. Follow the instructions to [install MongoDB locally](https://www.mongodb.com/docs/manual/installation/).

### Configure Environment Variables

Create a `.env` file in the root directory of the project (if it doesn’t already exist) and add the following environment variables:

```env
MONGO_URI=mongodb://localhost:27017/tailwebs
JWT_SECRET=your_jwt_secret
PORT=3002
```

- `MONGO_URI` should point to your local MongoDB instance.
- `JWT_SECRET` is used for signing JWT tokens. Choose a strong, secure key.
- `PORT` specifies the port on which the server will run (default is 3002).

### Start the Server

Run the server with:

```bash
npm start
```

The server will start and be accessible at `http://localhost:3002`.

## API Endpoints

### User

- **POST** `/signup`: Create a new user account. This endpoint allows new users to register by providing necessary details such as username, email, and password.
- **POST** `/signup`: Authenticate a user and generate a JWT token. Users need to provide their email and password to receive a JWT token, which can be used for secure access to other API endpoints.
- **PATCH** `/`: Update the details of the currently authenticated user. Users can update their own account details such as username, email, and password by sending a request with a valid JWT token.

### Students

- **GET** `/student`: Retrieve a list of students with optional pagination, sorting, and search.
- **POST** `/student`: Create a new student or update an existing student’s marks.
- **GET** `/student/:id`: Retrieve a student by ID.
- **PATCH** `/student/:id`: Update student details.
- **DELETE** `/student/:id`: Delete a student by ID.

## Error Handling

- **400 Bad Request**: Client-side errors, such as missing required fields or invalid data.
- **401 Unauthorized**: Authentication errors, such as missing or invalid JWT tokens.
- **404 Not Found**: Resource not found, such as a student with a non-existent ID.
- **500 Internal Server Error**: Server-side errors, such as database connection issues.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Contact

For any questions or further information, please reach out to [adityarastogi1801@gmail.com](mailto:adityarastogi1801@gmail.com).

---

Thank you for using Tailwebs Backend! I hope it meets your expectations.
