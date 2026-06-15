import { defineStore } from "pinia";

export const studentsData = defineStore("library", {
  state: () => ({
    availableGender: ["Male", "Female"],
    availableStatus: ["STOPPED", "GRADUATE"],
    availbeleCivilStatus: ["Single", "Married", "Widowed", "Legally Separated"],
    availableProgramCourse: [
      "Bachelor of Science in Information Technology",
      "Bachelor of Education",
    ],
    availableSemester: ["1st semester", "2nd Semester"],
    avilableSchoolYear: ["2024-2025", "2023-2024"],
    availableCuurentYearLevel: ["1st", "2nd", "3rd", "4th"],

    availableEducationalLevel: [
      "High School",
      "Undergraduate",
      "Graduate",
      "Post Graduate",
    ],
    availableEnrollmentStatus: ["Old", "New", "Transferre", "Returnee"],
    availbaleenrollmentCategory: [
      "On-going",
      "Shiftee",
      "Returnee",
      "Returnee&Shiftee",
    ],
    selectedStudent: null,
    students: [],
    lastGeneratedId: 10,
  }),

  getters: {
    getGender: (state) => state.availableGender,
    getSatus: (state) => state.availableStatus,
    getCivilStatus: (state) => state.availbeleCivilStatus,
    getProgramCourse: (state) => state.availableProgramCourse,
    getSemester: (state) => state.availableSemester,
    getSchoolYear: (state) => state.avilableSchoolYear,
    getCurrentYearLevel: (state) => state.availableCuurentYearLevel,
    getEducationalLevel: (state) => state.availableEducationalLevel,
    getEnrollmentStatus: (state) => state.availableEnrollmentStatus,
    getEnrollmentCategory: (state) => state.availbaleenrollmentCategory,
    getNextStudentId(state) {
      return state.lastGeneratedId + 1; // Always returns incremented ID
    },
  },
  actions: {
    setItem(item) {
      this.selectedStudent = item;
    },
    setStudent(student) {
      this.selectedStudent = student; // You can set selected student here
    },
    setStudents(students) {
      this.students = students; // Store the full list of students
    },
    incrementStudentId() {
      this.lastGeneratedId += 1; // Properly update state
    },
    addStudent(student) {
      student.student_records_generated_id = this.getNextStudentId;
      this.students.push(student);
      this.incrementStudentId(); // Ensure ID is incremented
    },
  },
});
