# Seller-app

This repository contains a seller-app built using modern web development technologies. The project demonstrates core functionalities and serves as a foundation for further enhancements.

## Features

- **Authentication**: Users can register, log in, and manage their accounts.
- **Core Functionalities**: 
  - Add, update, and delete comments.
  - View a list of existing items/tasks.
- **State Management**: Redux is used to handle the application's state efficiently.
- **Responsive Design**: Fully optimized for both desktop and mobile devices by using material.

## Tech Stack

### Frontend
- **React.js**: For building the user interface.
- **Material Ui**: Entire app is built by those components.
- **Redux**: For state management.

### Backend
- **Node.js**: For building the server-side logic.
- **Express.js**: For routing and handling HTTP requests.
- **MongoDB**: For data storage.

### Additional Tools
- **Axios**: For making API requests.
- **react-hot-toast**: For toast notifications.


## Installation and Setup

Follow these steps to set up the project locally:

1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd <repository_directory>
    ```

2. Install dependencies for both frontend and backend:
    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

3. Create a `.env` file in the backend directory with the following variables:
    ```env
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    COOKIE_EXPIRES_TIME=<cookie_expiration_time_in_seconds>
    ```

4. Start the development servers:
    ```bash
    # Start backend server
    cd backend
    npm start

    # Start frontend server
    cd ../frontend
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Folder Structure

```
project_root/
├── Server/                # Backend code
│   ├── controllers/        # Controller logic
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   └── server.js           # Entry point for backend
├── Client/               # Frontend code
│   ├── src/                # React source code
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
└── README.md               # Project documentation
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add your commit message here"
    ```
4. Push your branch and create a pull request:
    ```bash
    git push origin feature/your-feature-name
    ```


## Acknowledgements

Special thanks to:
- The open-source community for the tools and libraries used in this project.
- Contributors who helped improve this project.

## Contact

For questions or feedback, feel free to reach out via fazilmd251@gmail.com.
