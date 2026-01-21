# Job Portal Application

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

