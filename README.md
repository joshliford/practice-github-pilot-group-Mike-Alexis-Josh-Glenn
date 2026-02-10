# Class Manager Application

A complete application for managing teachers and students with a Spring Boot REST API backend and a retro Nintendo Game Boy styled React frontend built with Vite.

## Project Structure

```
src/
├── main/
│   ├── java/com/example/copilot/
│   │   ├── model/
│   │   │   ├── Teacher.java      # Teacher entity
│   │   │   └── Student.java      # Student entity
│   │   ├── repository/
│   │   │   ├── TeacherRepository.java
│   │   │   └── StudentRepository.java
│   │   ├── controller/
│   │   │   ├── TeacherController.java
│   │   │   └── StudentController.java
│   │   └── CopilotApplication.java
│   └── resources/
│       └── application.properties  # Database configuration
└── test/
    └── java/...
```

## Prerequisites

- Java 21 or higher
- Maven 3.6+
- MySQL 8.0+
- Node.js 16+ (for frontend)
- npm (for frontend dependencies)

## Setup Instructions

### Backend

#### 1. Create MySQL Database

```sql
CREATE DATABASE class_manager;
```

#### 2. Update Database Connection (Optional)

Edit `src/main/resources/application.properties` if your MySQL credentials differ:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/class_manager?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=root
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

#### 3. Build the Project

```bash
mvn clean install
```

#### 4. Run the Application

```bash
mvn spring-boot:run
```

The backend API will start on `http://localhost:8080`

### Frontend

#### 1. Install Dependencies

```bash
cd frontend
npm install
```

#### 2. Start Development Server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

See `frontend/STARTUP.md` for more details.
```

The application will start on `http://localhost:8080`

## API Endpoints

### Teacher Endpoints

- **GET /teachers** - Get all teachers
- **GET /teachers/{id}** - Get a specific teacher by ID
- **POST /teachers** - Create a new teacher
- **PUT /teachers/{id}** - Update an existing teacher
- **DELETE /teachers/{id}** - Delete a teacher by ID

### Student Endpoints

- **GET /students** - Get all students
- **GET /students/{id}** - Get a specific student by ID
- **POST /students** - Create a new student
- **PUT /students/{id}** - Update an existing student
- **DELETE /students/{id}** - Delete a student by ID

## Example Requests

### Create a Teacher

```bash
curl -X POST http://localhost:8080/teachers \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@school.com",
    "subject": "Mathematics",
    "department": "Science"
  }'
```

### Create a Student

```bash
curl -X POST http://localhost:8080/students \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@school.com",
    "studentId": "STU001",
    "grade": "10",
    "enrollmentStatus": "Active"
  }'
```

### Get All Teachers

```bash
curl http://localhost:8080/teachers
```

### Get a Specific Teacher

```bash
curl http://localhost:8080/teachers/1
```

### Update a Teacher

```bash
curl -X PUT http://localhost:8080/teachers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Jonathan",
    "subject": "Physics"
  }'
```

### Delete a Teacher

```bash
curl -X DELETE http://localhost:8080/teachers/1
```

## Database Schema

### Teachers Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| first_name | VARCHAR(255) | NOT NULL |
| last_name | VARCHAR(255) | NOT NULL |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| subject | VARCHAR(255) | |
| department | VARCHAR(255) | |

### Students Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT |
| first_name | VARCHAR(255) | NOT NULL |
| last_name | VARCHAR(255) | NOT NULL |
| email | VARCHAR(255) | NOT NULL, UNIQUE |
| student_id | VARCHAR(255) | |
| grade | VARCHAR(255) | |
| enrollment_status | VARCHAR(255) | |

## Frontend Features

The React frontend includes:

- **Nintendo Game Boy Theme**: Authentic retro 1990s green monochrome styling
- **Teachers Management**: Create, read, update, and delete teachers with a user-friendly interface
- **Students Management**: Full CRUD operations for students
- **Dual View Modes**: 
  - Card View: Display records as interactive cards
  - Table View: Display records in a traditional table format
- **Form Handling**: Easy-to-use forms for creating and editing records
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Feedback**: Success and error messages for all operations
- **Tab Navigation**: Easy switching between Teachers and Students sections

## Technology Stack

### Backend

- **Spring Boot 4.0.2** - Web framework
- **Spring Data JPA** - Data persistence
- **MySQL 8.0+** - Database
- **Java 21** - Programming language
- **Maven** - Build tool

### Frontend

- **React 18.2** - UI library
- **Vite 5.0** - Build tool and dev server
- **JavaScript** - Programming language
- **Axios** - HTTP client
- **CSS3** - Styling with Game Boy theme

## Notes

- The application uses Hibernate with JPA for database operations
- `spring.jpa.hibernate.ddl-auto=update` will automatically create/update tables based on entity definitions
- All email fields are unique to prevent duplicates
- The API returns appropriate HTTP status codes (201 for created, 404 for not found, 204 for deleted, etc.)

## License

This project is provided as-is for educational purposes.

