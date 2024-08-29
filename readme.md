# Back Simulation

A backend system for managing program registration and subjects for users, including facial recognition for authentication.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Tests](#tests)
- [Deployment](#deployment)
- [Contribution](#contribution)
- [License](#license)
- [Authors](#authors)

## Description

Back Simulation is a backend service designed to manage the registration of programs and subjects for students. It includes user authentication, role management, and facial recognition capabilities to enhance security.

## Installation

### Prerequisites

- Node.js v14 or higher
- Prisma CLI
- A database supported by Prisma (e.g., PostgreSQL, MySQL)

### Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/back-simulation.git
    cd back-simulation
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure environment variables:

    Create a `.env` file in the root directory and add the following:

    ```env
    DATABASE_URL=your_database_url
    PORT=3000
    JWT_SECRET=your_secret_key
    CORS_ORIGIN=http://localhost:3000
    ```

4. Run migrations:

    ```bash
    npx prisma migrate deploy
    ```

## Usage

### Start the server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

## API Endpoints

### Authentication

- POST /api/auth/login - User login (with facial recognition)
- POST /api/auth/register - User registration

### Users

- GET /api/users - Get all users
- POST /api/users - Create a new user
- GET /api/users/:id - Get a user by ID
- PUT /api/users/:id - Update user information
- DELETE /api/users/:id - Delete a user

### Programs

- GET /api/programs - Get all programs
- POST /api/programs - Create a new program
- GET /api/programs/:id - Get a program by ID
- PUT /api/programs/:id - Update a program
- DELETE /api/programs/:id - Delete a program

### Subjects

- GET /api/subjects - Get all subjects
- POST /api/subjects - Create a new subject
- GET /api/subjects/:id - Get a subject by ID
- PUT /api/subjects/:id - Update a subject
- DELETE /api/subjects/:id - Delete a subject

### Students

- GET /api/students - Get all students
- POST /api/students - Create a new student
- GET /api/students/:id - Get a student by ID
- PUT /api/students/:id - Update student information
- DELETE /api/students/:id - Delete a student

### Enrollments

- GET /api/enrollments - Get all enrollments
- POST /api/enrollments - Create a new enrollment
- GET /api/enrollments/:id - Get an enrollment by ID
- PUT /api/enrollments/:id - Update an enrollment
- DELETE /api/enrollments/:id - Delete an enrollment

### Faculties

- GET /api/faculties - Get all faculties
- POST /api/faculties - Create a new faculty
- GET /api/faculties/:id - Get a faculty by ID
- PUT /api/faculties/:id - Update a faculty
- DELETE /api/faculties/:id - Delete a faculty

### Roles

- GET /api/roles - Get all roles
- POST /api/roles - Create a new role
- GET /api/roles/:id - Get a role by ID
- PUT /api/roles/:id - Update a role
- DELETE /api/roles/:id - Delete a role

## Project Structure

```bash
src/
  controllers/
  models/
  routes/
  middlewares/
  index.js
prisma/
  schema.prisma
.env
```

## Tests

To run tests, use:

```bash
npm test
```

## Deployment

To deploy the project, ensure the environment variables are set correctly and use the following command:

```bash
npm start
```

## Contribution

Feel free to contribute to the project by forking the repository, making changes, and submitting a pull request.

## License

This project is licensed under the ISC License.

## Authors

Santiago Andrade Mesa
