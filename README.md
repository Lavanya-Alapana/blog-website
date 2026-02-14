# BlogHub

A full-stack blog platform built with React, Node.js, Express, and MongoDB. Create, edit, and share your stories with a modern, responsive interface.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Blog Management**: Create, edit, delete, and publish blog posts
- **Rich Content**: Support for featured images via Cloudinary integration
- **Categorization**: Organize posts with tags and categories
- **Social Features**: Like posts and view author profiles
- **Draft System**: Save posts as drafts before publishing
- **Responsive Design**: Built with Tailwind CSS for mobile-first experience
- **Protected Routes**: Secure user-specific actions and pages

## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **React Router v7** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS v4** - Utility-first CSS framework
- **React Toastify** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express 5** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Cloudinary** - Image hosting and management
- **express-validator** - Request validation

## Project Structure

```
.
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context (Auth)
│   │   ├── services/      # API service layer
│   │   └── config/        # Configuration files
│   └── public/            # Static assets
│
└── server/                # Express backend
    └── src/
        ├── config/        # Database and service configs
        ├── controllers/   # Route controllers
        ├── middlewares/   # Custom middleware
        ├── models/        # Mongoose models
        ├── routes/        # API routes
        ├── services/      # Business logic
        └── utils/         # Helper functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd <project-directory>
```

2. **Install server dependencies**
```bash
cd server
npm install
```

3. **Install client dependencies**
```bash
cd ../client
npm install
```

### Environment Variables

#### Server (.env)
Create a `.env` file in the `server` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bloghub
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Client (.env)
Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. **Start the backend server**
```bash
cd server
npm run dev
```
The server will run on `http://localhost:5000`

2. **Start the frontend development server**
```bash
cd client
npm run dev
```
The client will run on `http://localhost:5173`

3. **Access the application**
Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Blogs
- `GET /api/blogs` - Get all published blogs
- `GET /api/blogs/:id` - Get single blog
- `POST /api/blogs` - Create new blog (protected)
- `PUT /api/blogs/:id` - Update blog (protected)
- `DELETE /api/blogs/:id` - Delete blog (protected)
- `GET /api/blogs/user/:userId` - Get user's blogs
- `POST /api/blogs/:id/like` - Like/unlike blog (protected)

### Upload
- `POST /api/upload/image` - Upload image to Cloudinary (protected)

## Features in Detail

### Authentication System
- JWT-based authentication
- Password hashing with bcryptjs
- Protected routes on both frontend and backend
- Persistent login with localStorage

### Blog Management
- Rich text content support
- Featured image uploads
- Draft and published status
- Tags and categories
- Like functionality
- Author attribution

### Validation
- Server-side validation with express-validator
- Client-side form validation
- Custom error handling middleware

## Development

### Build for Production

**Client:**
```bash
cd client
npm run build
```

**Server:**
```bash
cd server
npm start
```

### Linting
```bash
cd client
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- React team for the amazing framework
- Express.js community
- MongoDB and Mongoose documentation
- Tailwind CSS for the utility-first approach
