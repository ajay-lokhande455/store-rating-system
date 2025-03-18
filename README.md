# Store Rating System

## Live Link
```bash
https://store-rating-system.vercel.app/
```

## Overview

The **Store Rating System** is a web application that allows users to rate and review stores. It provides RESTful APIs for users to submit ratings, retrieve store ratings, and manage users and stores.

## User Roles

1. System Administrator
2. Store Owner
3. Normal User

## Functionalities

### System Administrator

- Can add new stores, normal users, and admin users.
- Has access to a dashboard displaying:
  - Total number of users
  - Total number of stores
  - Total number of submitted ratings
- Can add new users with the following details:
  - Name
  - Email
  - Password
  - Address
- Can view a list of stores with the following details:
  - Name, Email, Address, Rating
- Can view a list of normal and admin users with:
  - Name, Email, Address, Role
- Can apply filters on all listings based on Name, Email, Address, and Role.
- Can view details of all users, including Name, Email, Address, and Role.
  - If the user is a Store Owner, their Rating should also be displayed.
- Can log out from the system.

### Store Owner

- Can log in to the platform.
- Can update their password after logging in.
- Dashboard functionalities:
  - View a list of users who have submitted ratings for their store.
  - See the average rating of their store.
- Can log out from the system.

### Normal User

- Can sign up and log in to the platform.
- Signup form fields:
  - Name
  - Email
  - Address
  - Password
- Can update their password after logging in.
- Can view a list of all registered stores.
- Can search for stores by Name and Address.
- Store listings should display:
  - Store Name
  - Address
  - Overall Rating
  - User's Submitted Rating
  - Option to submit a rating
  - Option to modify their submitted rating
- Can submit ratings (between 1 to 5) for individual stores.
- Can log out from the system.

## Form Validations

- **Name:** Min 20 characters, Max 60 characters.
- **Address:** Max 400 characters.
- **Password:** 8-16 characters, must include at least one uppercase letter and one special character.
- **Email:** Must follow standard email validation rules.

## Additional Notes

- All tables should support sorting (ascending/descending) for key fields like Name, Email, etc.
- Best practices should be followed for both frontend and backend development.
- Database schema design should adhere to best practices.
- User authentication and authorization are implemented.
- Store management (CRUD operations) is available.
- Rating and review system is in place.

## Technologies Used

### Backend

- **Node.js** (Runtime environment)
- **Express.js** (Backend framework)
- **Sequelize** (ORM for database interaction)
- **PostgreSQL / MySQL** (Database)
- **JWT Authentication** (For user authentication)
- **Dotenv** (Environment variable management)

### Frontend

- **React.js** (Frontend framework)
- **Redux Toolkit** (State management)
- **Tailwind CSS** (Styling)
- **Axios** (API calls)
- **React Router** (Client-side navigation)

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v14+)
- **npm** or **yarn**
- **MySQL** database setup

### Steps to Install

#### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/ajay-lokhande455/store-rating-system.git
   cd store-rating-system/backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the project root and add the following variables:

   ```env
   DB_CONNECTION_STRING=your_database_url
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. **Run database migrations**

   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Start the server**

   ```bash
   npm run dev
   ```

#### Frontend Setup

1. **Navigate to the frontend directory**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the frontend application**

   ```bash
   npm run dev
   ```

## API Endpoints

### User Routes

| Method | Endpoint        | Description         |
| ------ | --------------- | ------------------- |
| POST   | /users/register | Register a new user |
| POST   | /users/login    | Login user          |

### Store Routes

| Method | Endpoint     | Description          |
| ------ | ------------ | -------------------- |
| GET    | /stores      | Get all stores       |
| POST   | /stores      | Create a new store   |
| GET    | /stores/:id  | Get a specific store |
| PUT    | /stores/:id  | Update a store       |
| DELETE | /stores/:id  | Delete a store       |

### Rating Routes

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| GET    | /ratings/:storeId  | Get ratings for a store |
| POST   | /ratings           | Submit a new rating     |

## Project Structure

```
store-rating-system/
│── backend/
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── controllers/   # API controllers
│   │   ├── middleware/    # Authentication middleware
│   │   ├── models/        # Sequelize models
│   │   ├── routes/        # Express routes
│   │   ├── server.js      # Entry point
│   ├── .env               # Environment variables
│   ├── package.json       # Dependencies and scripts
│── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── store/         # Redux store
│   │   ├── App.js         # Main App component
│   │   ├── index.js       # React entry point
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│── README.md              # Documentation
```

## Troubleshooting

### Common Issues

1. **Sequelize: User is not associated to Rating!**
   - Ensure model associations are correctly defined in `models/index.js`.

2. **TypeError: Rating.findAll is not a function**
   - Ensure `Rating` is properly imported and exported in `models/index.js`.

3. **Database connection issues**
   - Ensure `.env` file contains the correct database URL.

4. **Frontend not connecting to backend**
   - Ensure API base URL is correctly set in `frontend/src/api.js`.
   - Ensure the backend server is running before starting the frontend.

## License

This project is licensed under the MIT License.

