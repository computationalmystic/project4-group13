# To Do

### Link to Design Document: 
https://github.com/toomanybugs1/tasztm/blob/master/assignments/4/Assignment%204.pdf

## Systems To Implement
### Relational Database
- Entities for users, courses, sections
- Relationships between them (teaches, enrolled, manages, etc)
- Takes queries from front end to populate user information

### Web Server
- serves the front end
- should be able to load different information based on user type

### Front End
- display information in a clear, aesthetically pleasing way
- include login
- give user access to backend methods

## Some Methods To Implement

### Student File Upload
- Requires student class with the method uploadFile(file)
- There should be methods to verify file size, type, and name
- Student will have some sort of file system to add/edit/delete files

### TA View Submission
- TA will only be able to see submissions for students in their class. 
- There will be a getSubmissions() method that will likely use a course ID stored in the TA class
- There will be a method to view each individual submission, if possible
- There will be a method to download each submission if it is not some kind of text file
- There will be methods to assign/change grades to submissions
- There will be a method to comment on a submission
- These methods require there to be a class for Students, TA, Submissions, and Courses

### Login (All Users) 
- Method to get user type based on ID
- Method to load appropriate UI for the user type
- Method to hash username and password before sending to server for verification
- Method to verify username and password

## Some Classes To Implement
- Student Class: needs to store a list of courses, personal information (name, id, address, etc.), files, grades for each class, and assignments. There also needs to be methods for students to submit/resubmit assignments, view classes, view class materials, etc.).
- TA Class: stores list of courses, personal information, and assignments. The methods will include things like viewing assignments, grading assignments, and commenting on assignments.
- Course Class: stores a list of instructors, TAs, and students involved with the course. Each course will have assignments, files and content associated with it. Methods include uploading/removing files to the course, adding/removing students, adding/removing TAs/Instructors, and posting assignments.
- Assignment Class: stores the content of the assignment (description, files, etc.), the date posted, the due date, the students it's assigned to, and general information like name and id.
