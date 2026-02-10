package com.example.copilot.controller;

import com.example.copilot.model.Teacher;
import com.example.copilot.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/teachers")
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;

    // GET /teachers - Get a list of all teachers
    @GetMapping
    public ResponseEntity<List<Teacher>> getAllTeachers() {
        List<Teacher> teachers = teacherRepository.findAll();
        return ResponseEntity.ok(teachers);
    }

    // GET /teachers/{id} - Get a specific teacher by ID
    @GetMapping("/{id}")
    public ResponseEntity<Teacher> getTeacherById(@PathVariable Long id) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        if (teacher.isPresent()) {
            return ResponseEntity.ok(teacher.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // POST /teachers - Create a new teacher
    @PostMapping
    public ResponseEntity<Teacher> createTeacher(@RequestBody Teacher teacher) {
        Teacher savedTeacher = teacherRepository.save(teacher);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTeacher);
    }

    // PUT /teachers/{id} - Update an existing teacher
    @PutMapping("/{id}")
    public ResponseEntity<Teacher> updateTeacher(@PathVariable Long id, @RequestBody Teacher teacherDetails) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        if (teacher.isPresent()) {
            Teacher existingTeacher = teacher.get();
            if (teacherDetails.getFirstName() != null) {
                existingTeacher.setFirstName(teacherDetails.getFirstName());
            }
            if (teacherDetails.getLastName() != null) {
                existingTeacher.setLastName(teacherDetails.getLastName());
            }
            if (teacherDetails.getEmail() != null) {
                existingTeacher.setEmail(teacherDetails.getEmail());
            }
            if (teacherDetails.getSubject() != null) {
                existingTeacher.setSubject(teacherDetails.getSubject());
            }
            if (teacherDetails.getDepartment() != null) {
                existingTeacher.setDepartment(teacherDetails.getDepartment());
            }
            Teacher updatedTeacher = teacherRepository.save(existingTeacher);
            return ResponseEntity.ok(updatedTeacher);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /teachers/{id} - Delete a teacher by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id) {
        if (teacherRepository.existsById(id)) {
            teacherRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

