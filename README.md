# Job Portal - MERN Stack Application | live : https://job-seeks.onrender.com/

A full-stack job portal application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring Redux for state management, Cloudinary for file storage, and a modern UI design.

## Features

### For Job Seekers
- 🔍 Browse and search jobs by title, description, or location
- 🎯 Filter jobs by experience level, job type, and salary range
- 📝 Apply for jobs with resume upload
- 📊 Track application status
- 👤 Profile management with resume and skills

### For Recruiters/Admins
- 🏢 Company management (create, update companies)
- 💼 Job posting and editing
- 👥 View applicants for each job
- ✅ Update application status (Accepted/Rejected)
- 📈 Dashboard to manage all posted jobs

## Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v7** - Routing
- **Redux Toolkit** - State management
- **Redux Persist** - State persistence
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **Shadcn/UI** - UI components
- **Tailwind CSS** - Styling
- **Sonner** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - File storage
- **Multer** - File upload middleware

## Design System

### Color Palette
- **Primary Teal**: `#008C99`
- **Light Teal**: `#00C4CC`
- **Charcoal Text**: `#1A1A1A`
- **Gray Subtitle**: `#64748B`
- **Badge Background**: `#E0F7FA`
- **Navy Footer**: `#0F172A`

### Typography
- **Headings**: Poppins (700)
- **Body**: Inter (400-500)

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

4. Start the server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser

## Environment Variables

### Backend (.env)
```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/jobportal
SECRET_KEY=your_secret_key_here
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### Frontend
The API endpoint is configured in `src/utils/constant.js`:
```javascript
export const USER_API_END_POINT = "http://localhost:8000/api/v1/user";
export const JOB_API_END_POINT = "http://localhost:8000/api/v1/job";
export const APPLICATION_API_END_POINT = "http://localhost:8000/api/v1/application";
export const COMPANY_API_END_POINT = "http://localhost:8000/api/v1/company";
```

## API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register new user
- `POST /api/v1/user/login` - Login user
- `GET /api/v1/user/logout` - Logout user
- `POST /api/v1/user/profile/update` - Update user profile

### Jobs
- `GET /api/v1/job/get` - Get all jobs (with search)
- `GET /api/v1/job/get/:id` - Get job by ID
- `POST /api/v1/job/post` - Create new job (recruiter)
- `PUT /api/v1/job/update/:id` - Update job (recruiter)
- `GET /api/v1/job/getadminjobs` - Get recruiter's jobs

### Companies
- `POST /api/v1/company/register` - Register company
- `GET /api/v1/company/get` - Get all companies
- `GET /api/v1/company/get/:id` - Get company by ID
- `PUT /api/v1/company/update/:id` - Update company

### Applications
- `POST /api/v1/application/apply/:id` - Apply for job
- `GET /api/v1/application/get` - Get user's applications
- `GET /api/v1/application/:id/applicants` - Get job applicants
- `POST /api/v1/application/status/:id/update` - Update application status

## Project Structure

```
job-portal/
├── backend/
│   ├── controllers/       # Request handlers
│   ├── models/           # Database schemas
│   ├── routes/           # API routes
│   ├── middlewares/      # Auth & file upload
│   ├── utils/            # Helper functions
│   └── index.js          # Entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── admin/    # Admin components
│   │   │   ├── auth/     # Auth components
│   │   │   ├── shared/   # Shared components
│   │   │   └── ui/       # UI components
│   │   ├── hooks/        # Custom hooks
│   │   ├── redux/        # Redux slices
│   │   └── utils/        # Constants & helpers
│   └── public/
└── README.md
```

## Key Features Implementation

### Authentication
- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt
- Role-based access (Student/Recruiter)

### File Upload
- Cloudinary integration for resume storage
- Multer for handling multipart form data
- Files stored with `attachment:false` flag for inline viewing

### State Management
- Redux Toolkit for global state
- Redux Persist for localStorage caching
- Separate slices for auth, jobs, companies, applications

### Filtering System
- Experience level filtering (Fresher, 1-3 years, 3-5 years, etc.)
- Job type filtering (Full-time, Part-time, etc.)
- Salary range filtering (0-3 LPA, 3-6 LPA, etc.)
- Location-based search

## Known Issues & Future Enhancements

### Current Limitations
- Job edit functionality is complete but needs testing
- No email notifications for application status updates
- No advanced search with multiple filters combined

### Planned Features
- Email notifications
- Advanced search and filters
- Job recommendations based on profile
- Company reviews and ratings
- Application analytics dashboard
- Chat functionality between recruiters and applicants

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using MERN Stack
