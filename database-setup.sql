-- Database setup script for Class Manager Application

-- Create database
CREATE DATABASE IF NOT EXISTS class_manager;

USE class_manager;

-- Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    subject VARCHAR(255),
    department VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    student_id VARCHAR(255),
    grade VARCHAR(255),
    enrollment_status VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create indexes for better query performance
CREATE INDEX idx_teacher_email ON teachers(email);
CREATE INDEX idx_student_email ON students(email);
CREATE INDEX idx_student_id ON students(student_id);

-- Sample data (optional)
INSERT INTO teachers (first_name, last_name, email, subject, department) VALUES
('John', 'Doe', 'john.doe@school.com', 'Mathematics', 'Science'),
('Jane', 'Smith', 'jane.smith@school.com', 'English', 'Language Arts'),
('Robert', 'Johnson', 'robert.johnson@school.com', 'History', 'Social Studies');

INSERT INTO students (first_name, last_name, email, student_id, grade, enrollment_status) VALUES
('Alice', 'Williams', 'alice.williams@school.com', 'STU001', '10', 'Active'),
('Bob', 'Brown', 'bob.brown@school.com', 'STU002', '11', 'Active'),
('Charlie', 'Davis', 'charlie.davis@school.com', 'STU003', '9', 'Active');

