# To Do

### Link to Design Document: 
https://github.com/toomanybugs1/tasztm/blob/master/assignments/4/Assignment%204.pdf

## Some Methods

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
- should know what kind of user is logging in via their id
- takes username and password, verifies through comparing keys hashed before sending to database
- returns user to appropriate dashboard

## Some Classes
- Student Class: needs to store a list of courses, personal information (name, id, address, etc.), files, grades for each class, and assignments. There also needs to be methods for students to submit/resubmit assignments, view classes, view class materials, etc.).
- TA Class: stores list of courses, personal information, and assignments. The methods will include things like viewing assignments, grading assignments, and commenting on assignments.
- Course Class: stores a list of instructors, TAs, and students involved with the course. Each course will have assignments, files and content associated with it. Methods include uploading/removing files to the course, adding/removing students, adding/removing TAs/Instructors, and posting assignments.
- Assignment Class: stores the content of the assignment (description, files, etc.), the date posted, the due date, the students it's assigned to, and general information like name and id.
