# Task Manager Application

## Description

This application is a full-featured task manager built with an Angular frontend and a Node.js backend using Express. It uses Tailwind CSS for styling and MongoDB for data persistence.

## Project Structure

The project is organized into two main parts:

- `frontend`: Contains the frontend code built with Angular and Tailwind CSS.
- `backend`: Contains the backend code built with Node.js, Express, and MongoDB.

## Table of Contents

- [Task Manager Application](#task-manager-application)
  - [Description](#description)
  - [Project Structure](#project-structure)
  - [Environment Setup](#environment-setup)
    - [Requirements](#requirements)
    - [Installation](#installation)
  - [Running the Application](#running-the-application)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Docker](#docker)
  - [Architecture](#architecture)
    - [Key Components](#key-components)
  - [Folder Structure](#folder-structure)
  - [Development](#development)
    - [Style guide](#style-guide)
    - [Testing](#testing)
      - [Running tests](#running-tests)
  - [After finishing a task](#after-finishing-a-task)
  - [Contributing](#contributing)
  - [License](#license)

## Environment Setup

### Requirements

- Node.js >= 20.0.0
- npm >= 7.0.0
- Angular CLI >= 12.0.0
- Docker and Docker Compose

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hectorplinio/task-manager-app.git
   cd task-manager-app
   ```

2. Install the dependencies for both frontend and backend:

   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

## Running the Application

### Backend

To run the application in development mode, use the following command:

```
cd backend
npm run dev
```

This will start the application on http://localhost:3000.

To build the application for production, use the following command:

```
npm run build
```

And to start the production build:

```
npm start
```

### Frontend

To run the application in development mode, use the following command:

```
cd frontend
ng serve
```

This will start the application on http://localhost:4200.

To build the application for production, use the following command:

```
ng build
```

### Docker

To run the application using Docker, use the following commands:

1. Build and run the containers:

```
make run-server && make run-frontend
```

This will start the application on http://localhost:4200.

2. Stop and remove the containers:

```
make clean
```

## Architecture

The application is built with Angular for the frontend and Node.js with Express for the backend. MongoDB is used for data persistence.

### Key Components

- Angular: Used for building the user interface.
- Tailwind CSS: Used for styling the application.
- Node.js and Express: Provide the backend server and API.
- MongoDB: Used for data persistence.

## Folder Structure

```
task-manager-app/
├── backend/                 # Backend code
│   ├── src/                 # Source code
│   ├── docs/                # API documentation
│   │   ├── api/             # OpenAPI (Swagger) documentation
│   │   ├── components/      # Reusable components (schemas, responses)
│   │   ├── paths/           # Endpoint paths
│   │   └── spec.yml         # Main OpenAPI specification file
│   ├── Dockerfile           # Dockerfile for backend
│   └── package.json         # Backend dependencies and scripts
├── frontend/                # Frontend code
│   ├── src/                 # Source code
│   ├── angular.json         # Angular configuration
│   ├── package.json         # Frontend dependencies and scripts
│   └── README.md            # Frontend documentation
├── docker-compose.yml       # Docker Compose file
└── README.md                # Project documentation


```

## Development

### Style guide

Before submitting a patch, please make sure that the code is formatted executing this command:

```
npm run format
```

### Testing

Testing is crucial for us and we strive for high coverage of our code.

We encourage you to write tests for every functionality you build and also update the existing ones if they need to.

#### Running tests

Before running the test, install the needed dependencies:

```
npm install
```

Execute all tests with:

```
npm run test
```

## After finishing a task

Before pushing your changes, make sure you run the linter and prettier to ensure the code follows the rules, or the CI pipeline will throw an error and fail:

```
npm run lint:fix
npm run format
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License.
