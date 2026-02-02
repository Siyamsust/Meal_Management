# Meal Management System

A comprehensive meal management application built with React Native (Expo) for the frontend and Node.js/Express for the backend. This system helps manage mess operations, user authentication, and daily expense tracking.

## 🏗️ Project Structure

```
Meal_Management/
├── Backend/                 # Node.js/Express API server
│   ├── controllers/         # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── Context/            # Backend context files
│   └── index.js            # Main server file
├── my-app/                 # React Native (Expo) mobile app
│   ├── Components/         # React Native components
│   ├── Context/            # React context providers
│   ├── assets/             # Images and static assets
│   ├── utils/              # Utility functions
│   └── App.js              # Main app component
└── README.md               # This file
```

## 🚀 Features

### Backend Features
- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Mess Management**: Complete mess operations management
- **Daily Expense Tracking**: Track and manage daily expenses
- **File Upload**: Multer integration for file handling
- **Real-time Communication**: Socket.io integration
- **Database**: MongoDB with Mongoose ODM
- **Security**: CORS enabled, environment variable configuration

### Mobile App Features
- **Cross-platform**: Built with React Native and Expo
- **Navigation**: React Navigation with stack and tab navigators
- **Authentication**: Secure login/signup with context management
- **Modern UI**: React Native Paper components
- **Async Storage**: Local data persistence
- **Real-time Updates**: Socket.io client integration
- **Form Handling**: Phone number input, date/time pickers

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **File Upload**: Multer
- **Real-time**: Socket.io
- **Environment**: dotenv
- **Development**: Nodemon

### Frontend (Mobile App)
- **Framework**: React Native with Expo
- **Navigation**: React Navigation v7
- **UI Library**: React Native Paper
- **State Management**: React Context API
- **Storage**: AsyncStorage
- **Real-time**: Socket.io Client
- **Icons**: React Native Vector Icons

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Expo CLI** (`npm install -g @expo/cli`)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd Meal_Management
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Or create .env manually with the following variables:
```

Create a `.env` file in the `Backend` directory:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/mess
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-here
```

```bash
# Start the backend server
npm start
```

The backend server will run on `http://localhost:3000`

### 3. Mobile App Setup

```bash
# Navigate to mobile app directory
cd my-app

# Install dependencies
npm install

# Create environment file for the app
```

Create a `.env` file in the `my-app` directory:
```env
API=192.168.0.110:3000
JWT_SECRET=your-super-secret-jwt-key-here
```

**Note**: Replace `192.168.0.110` with your actual local IP address for testing on physical devices.

```bash
# Start the Expo development server
npm start
```

## 📱 Running the App

### Development Mode
1. Start the backend server: `cd Backend && npm start`
2. Start the mobile app: `cd my-app && npm start`
3. Use Expo Go app on your phone to scan the QR code, or run on simulator

### Available Scripts

#### Backend
- `npm start` - Start the server with nodemon (auto-restart on changes)

#### Mobile App
- `npm start` - Start Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run on web browser

## 🔧 Configuration

### Backend Configuration
- **Port**: Set in `.env` file (default: 3000)
- **MongoDB**: Configure connection string in `.env`
- **JWT Secret**: Set a strong secret key in `.env`
- **File Uploads**: Configured to save in `uploads/` directory

### Mobile App Configuration
- **API Endpoint**: Set your backend URL in `my-app/.env`
- **Navigation**: Configured in `App.js` with React Navigation
- **Authentication**: Managed through AuthContext

## 🗄️ Database Models

The application uses the following main models:
- **User**: User authentication and profile data
- **Mess**: Mess management information
- **DailyExpense**: Daily expense tracking

## 🔐 API Endpoints

### Authentication Routes (`/api`)
- `POST /register` - User registration
- `POST /login` - User login
- `GET /profile` - Get user profile (protected)

### Mess Management Routes (`/api`)
- Mess-related CRUD operations
- Daily expense management
- User mess associations

### Health Check
- `GET /api/health` - Server health check

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Notes

- The backend uses CommonJS modules (`require/module.exports`)
- The mobile app uses ES6 modules (`import/export`)
- Environment variables are used for configuration
- JWT tokens are used for authentication
- Socket.io enables real-time features
- The app supports both Android and iOS platforms

## 🐛 Troubleshooting

### Common Issues

1. **Backend won't start**
   - Check if MongoDB is running
   - Verify `.env` file configuration
   - Ensure port 3000 is available

2. **Mobile app can't connect to backend**
   - Verify the API URL in `my-app/.env`
   - Ensure both devices are on the same network
   - Check if backend server is running

3. **Expo app crashes**
   - Clear Expo cache: `expo start -c`
   - Restart the development server
   - Check for dependency conflicts

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React Native community
- Expo team
- MongoDB team
- All contributors and testers
