#### [Link to design document](https://github.com/Jacob-Hollis/jbhkt7/blob/master/assignment-four/Assignment4-Project2-DesignFocus-Group5.md)

# To Do List
---
### Tables/Schemas for database layer:
- Schemas: 
   - User
    - Tables:
      - Instructor
      - TA
      - Student
      - SysAdmin
   - Course
    - Tables:
      - Assignments
      - EnrolledStudents
      - CourseInfo
   - Assignment
    - Tables:
      - AssignmentInfo
      - Submission
      - Grades

### Classes and associated methods for application layer:
##### "Student" Class
- Methods:
  - getStudentInfo()
    - gets student information from the database and is seen in the instructor UI
  - changePassword()
  - enrolledCourses()

##### "Instructor" Class
- Methods:
  - getInstructorInfo()
  - changePassword()
  - relatedCourses()

##### "SysAdmin" Class
- Methods:
  - changePassword()

##### "TA" Class
- Methods:
  - getTAInfo
  - changePassword()
  - relatedCourses()

##### "Assignment" Class
- Methods:
  - setAssignmentInstructions()
  - createAssignment()
  - setDueDate()
  - getDueDate()

##### "Course" Class
- Methods:
  - loginUser()
  - logoutUser()
  - setCourseInformation()
  - listAssignments()
  - enrollStudentbyID()

##### "Submission" Class
- Methods:
  - addComment()
  - getSubmissionGrade()
  - sendSubmission()
  - downloadSubmissionFile()
  - uploadSubmissionFile()
  - setSubmissionNumber()
---
