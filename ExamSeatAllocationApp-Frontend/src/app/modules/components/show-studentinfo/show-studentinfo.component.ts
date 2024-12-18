import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-show-studentinfo',
  templateUrl: './show-studentinfo.component.html',
  styleUrls: ['./show-studentinfo.component.css'],
})
export class ShowStudentinfoComponent implements OnInit {
  students: any[] = [];
  filteredStudents: any[] = [];
  courses: any[] = [];
  years: string[] = ['I', 'II', 'III', 'IV'];
  selectedCourse: string = '';
  selectedYear: string = '';

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.getStudents(); // Fetch all students initially
    this.service.getCourses().subscribe(
      (data) => {
        this.courses = data;
      },
      (error) => console.error('Error fetching courses:', error)
    );
  }

  // Fetch all students
  getStudents(): void {
    this.service.getAllStudents().subscribe(
      (data: any[]) => {
        this.students = data;
        this.filteredStudents = data; // Initially display all students
      },
      (error) => console.error('Error fetching students:', error)
    );
  }

  // Handle course selection
  onCourseChange(): void {
    this.selectedYear = ''; // Reset year selection when course changes
    this.filteredStudents = []; // Clear students list until year is selected
  }

  // Fetch students based on selected course and year
  filterStudents(): void {
    if (this.selectedCourse && this.selectedYear) {
      // Find courseId for the selected courseName
      const selectedCourseObj = this.courses.find(
        (course) => course.courseName === this.selectedCourse
      );

      if (selectedCourseObj) {
        const courseId = selectedCourseObj.courseId; // Assuming backend returns courseId
        const year = this.selectedYear; // Selected year in Roman

        this.service.getStudentsByCourse(courseId, year).subscribe(
          (data) => {
            this.filteredStudents = data; // Replace with filtered data from API
          },
          (error) =>
            console.error('Error fetching students by course and year:', error)
        );
      }
    } else {
      this.filteredStudents = []; // Clear students if criteria is not met
    }
  }
}
