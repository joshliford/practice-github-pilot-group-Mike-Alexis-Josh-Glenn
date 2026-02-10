package com.example.copilot.controller;

import com.example.copilot.model.Student;
import com.example.copilot.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    // GET /students - Get a list of all students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return ResponseEntity.ok(students);
    }

    // GET /students/{id} - Get a specific student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            return ResponseEntity.ok(student.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /students - Create a new student
    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        Student savedStudent = studentRepository.save(student);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
    }

    // PUT /students/{id} - Update an existing student
    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        Optional<Student> student = studentRepository.findById(id);
        if (student.isPresent()) {
            Student existingStudent = student.get();
            if (studentDetails.getFirstName() != null) {
                existingStudent.setFirstName(studentDetails.getFirstName());
            }
            if (studentDetails.getLastName() != null) {
                existingStudent.setLastName(studentDetails.getLastName());
            }
            if (studentDetails.getEmail() != null) {
                existingStudent.setEmail(studentDetails.getEmail());
            }
            if (studentDetails.getStudentId() != null) {
                existingStudent.setStudentId(studentDetails.getStudentId());
            }
            if (studentDetails.getGrade() != null) {
                existingStudent.setGrade(studentDetails.getGrade());
            }
            if (studentDetails.getEnrollmentStatus() != null) {
                existingStudent.setEnrollmentStatus(studentDetails.getEnrollmentStatus());
            }
            Student updatedStudent = studentRepository.save(existingStudent);
            return ResponseEntity.ok(updatedStudent);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /students/{id} - Delete a student by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        if (studentRepository.existsById(id)) {
            studentRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

