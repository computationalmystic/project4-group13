## The Design Document For This To-Do

https://github.com/Jacob-Hollis/jbhkt7/blob/master/assignment-four/Assignment4-Project2-DesignFocus-Group5.md

## Classes

  - Student
  
  - Instructor
  
  - TA
  
  - Assignment
  
  - Course
  

## Students Submitting an Assignment for a Course

  - Classes involved: Student, Assignment, Course
  
  - Upload file from user's specified location
  
  - Check file for correct file type for assignment as specified by Instructor/TA

## Instructor Login/Logout

  - Classes involved: Instructor

  - Create method to take input from login and send/receive confirmation for successful login
  
  - Load Instructor data from Instructor class after successful login 
  
  - Create method to log user off
  
  - Create method for notification that user logged off 
  
  - Method to refresh page after login/logout

## Students Uploading a New File

  - Classes involved: Student, Assignment

  - Upload file from location specified by user
  
  - Prompt user for comment and store input if they enter one

## Student is Able to Read Assignment Instructions

  - Classes involved: Student, Instructor, Assignment

   - Return the grade assigned to the assignment
    
   - Allow the instructor to create instructions for the assignemtn
     
   - Allow the Instructor to set due date
      
   - Allow Student to see the information for the assignment
      
   - Create method to allow Instructor to create 

## TAs Can View Submitted Files

  - Classes involved: TA, Assignment

  - Download file(s) specified by TA
  
  - Verify TA is looking at assignment he has TA privileges for
  
  - Return list of files submitted for the assignment
