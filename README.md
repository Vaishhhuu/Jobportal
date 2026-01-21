# Job Portal Application

<<<<<<< HEAD
A full-stack **Job Portal Application** that connects job seekers with employers by providing an easy-to-use platform to browse, search, view, and apply for job opportunities.
The application is built using **React** for the frontend, **Spring Boot** for the backend, and **MySQL** for data persistence.

---

##  Features

### Job Seeker

* Browse latest job listings
* Search jobs using keywords (title, company, location)
* View detailed job descriptions
* Apply for jobs using an application form
* Responsive UI for mobile, tablet, and desktop

### Backend Capabilities

* RESTful APIs for job management
* Keyword-based job search
* Server-side validation and error handling
* Sample job data auto-loaded on startup
* Secure and scalable architecture

---

##  Technology Stack

### Frontend

* React 18+
* JavaScript (ES6+)
* HTML5, CSS3
* Axios for API communication

### Backend

* Spring Boot 3+
* Java 17+
* Maven
* REST APIs

### Database

* MySQL 8+

---

##  System Architecture

```
React (Frontend)
     ↓
Spring Boot REST API
     ↓
MySQL Database
```

The application follows an **N-tier architecture**:

* **Presentation Layer** – React components
* **Business Logic Layer** – Spring Boot services & controllers
* **Persistence Layer** – MySQL database

---

##  Project Structure

### Frontend (React)

```
src/
 ├── components/
 │    ├── JobListing.jsx
 │    ├── JobSearch.jsx
 │    ├── JobDetail.jsx
 │    └── ApplyJob.jsx
 ├── services/
 │    └── jobService.js
 ├── App.js
 └── index.js
```

### Backend (Spring Boot)

```
src/main/java/com/jobportal/
 ├── controller/
 ├── service/
 ├── repository/
 ├── model/
 └── JobPortalApplication.java
```

---

##  Getting Started

### Prerequisites

* Node.js (v18+)
* Java JDK 17+
* MySQL 8+
* Maven
* Git

---

##  Backend Setup (Spring Boot)

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/job-portal.git
   ```

2. Configure MySQL database:

   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/job_portal
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```

3. Run the backend:

   ```bash
   mvn spring-boot:run
   ```

4. Backend will run on:

   ```
   http://localhost:8080
   ```

---

##  Frontend Setup (React)

1. Navigate to frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm start
   ```

4. Frontend will run on:

   ```
   http://localhost:3000
   ```

---

##  API Endpoints

| Method | Endpoint                    | Description         |
| ------ | --------------------------- | ------------------- |
| GET    | `/api/jobs`                 | Fetch all jobs      |
| GET    | `/api/jobs/{id}`            | Fetch job by ID     |
| GET    | `/api/jobs/search?keyword=` | Search jobs         |
| POST   | `/api/jobs`                 | Create job (future) |
| POST   | `/api/apply`                | Apply for a job     |

---

##  Sample Data

* On first startup, the backend automatically inserts **sample job listings**
* Useful for testing and demonstrations
* Covers multiple job roles, locations, and job types

---

##  Security & Validation

* CORS enabled for frontend-backend communication
* Input validation on frontend and backend
* Prepared for JWT authentication (future scope)
* Proper HTTP status codes and error messages

---

##  Responsive & Accessible

* Fully responsive design
* Keyboard navigation supported
* ARIA labels for accessibility
* WCAG 2.1 AA compliant UI guidelines

---

##  Future Enhancements

* Employer login & job posting
* Admin dashboard
* Resume upload & parsing
* Email notifications
* Authentication using JWT
* Pagination and advanced filters

=======
A full-stack job portal application built with React frontend and Spring Boot backend, using MySQL database.

## Features

- **Job Listings**: Browse all available jobs with search functionality
- **Job Search**: Search jobs by title, company, or location
- **Job Details**: View detailed job information including description, skills, and salary
- **Job Applications**: Apply for jobs with resume upload and cover letter
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Professional UI**: Clean and modern interface with smooth animations

## Technology Stack

### Backend
- Spring Boot 3.2.0
- Java 17
- MySQL 8+
- Maven
- JPA/Hibernate

### Frontend
- React 18
- React Router DOM
- Axios
- CSS3 with Flexbox/Grid
- Font Awesome Icons

## Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8 or higher
- Maven 3.6 or higher

## Setup Instructions

### Database Setup

1. Install MySQL and create a database:
```sql
CREATE DATABASE job_portal_db;
```

2. Update database credentials in `backend/src/main/resources/application.properties` if needed:
```properties
spring.datasource.username=root
spring.datasource.password=root
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies and run the application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/{id}` - Get job by ID
- `GET /api/jobs/search?keyword={keyword}` - Search jobs
- `POST /api/jobs` - Create new job

### Applications
- `POST /api/applications/job/{jobId}` - Submit job application
- `GET /api/applications/job/{jobId}` - Get applications for a job

## Project Structure

```
jp_system/
├── backend/
│   ├── src/main/java/com/jobportal/
│   │   ├── entity/          # JPA entities
│   │   ├── repository/      # Data repositories
│   │   ├── service/         # Business logic
│   │   ├── controller/      # REST controllers
│   │   ├── config/          # Configuration classes
│   │   └── dto/             # Data transfer objects
│   └── src/main/resources/
│       └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   └── styles/          # CSS styles
│   └── public/
└── README.md
```

## Features Implemented

✅ Job listing display with pagination
✅ Keyword-based job search
✅ Job detail view with full information
✅ Job application form with validation
✅ Responsive design for all devices
✅ Loading indicators and error handling
✅ Professional UI with smooth animations
✅ CORS configuration for frontend-backend communication
✅ Data initialization with sample jobs
✅ Input validation and error messages

## Usage

1. **Browse Jobs**: Visit the homepage to see all available jobs
2. **Search Jobs**: Use the search bar to find jobs by keywords
3. **View Details**: Click on any job card to see full details
4. **Apply for Jobs**: Click "Apply Now" and fill out the application form
5. **Upload Resume**: Select your resume file during application

## Sample Data

The application comes with 5 sample job listings that are automatically loaded on first startup:
- Software Engineer at TechCorp Inc
- Frontend Developer at WebSolutions LLC
- Data Analyst at DataInsights Corp
- DevOps Engineer at CloudTech Solutions
- UX Designer at DesignStudio Pro

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
>>>>>>> 4a1bba5 (Initial commit - Job Portal Application)


