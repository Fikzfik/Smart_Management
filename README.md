# Smart Management System API

Backend REST API untuk pengelolaan data operasional umum (User, Department, Asset, Activity).

## Tech Stack
- Node.js
- Express
- MongoDB
- Mongoose
- JWT Authentication

## Installation

1. Clone repository
2. Install dependencies: `npm install`
3. Set up `.env` file
4. Run dev server: `npm run dev`

## Modules
- **Auth**: Register, Login, Me
- **Users**: Admin manage users + Photo Upload
- **Departments**: CRUD Departments
- **Assets**: CRUD Assets (Advanced Filtering)
- **Activities**: Log activities

## Advanced Features 🚀
- **API Documentation**: Swagger UI at `/api-docs`
- **Security**: Rate Limiting, XSS Protection, NoSQL Injection Protection, HPP.
- **Advanced Query**: Filter, Sort, Select, and Pagination (e.g., `?status=available&sort=-createdAt&page=2`)
- **File Upload**: Profile photo upload support.

## API Structure
- `GET /api-docs` (Documentation)
- `POST /api/users/photo` (Upload Photo)
- `GET /api/assets?status=available`
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/users`
- `GET /api/departments`
- `GET /api/assets`
- `GET /api/activities`
