# Classroom Discussion Forum (Frontend)

_Classroom Discussion Forum_ is a platform for instructors and students to collectively solve doubts of other students.

**Heroku URL:** [https://discuss-frontend.herokuapp.com/](https://discuss-frontend.herokuapp.com/)

## Requirements Met:-

### 1) User interface with data by at least 2 CRUD operations (create, read, update, delete) for at least one database table

We have made the following CURD operations for the below mentioned database table.

#### a) Users :-

1. CREATE(Addition of a new user)
2. READ( Fetching the details of an existing user)

#### b) Question :-

1. CREATE(Addition of a new question)
2. READ( Fetching the details of an existing question)

#### c) Class :-

1. CREATE(Addition of a new class)
2. READ( Fetching the details of an existing class)
3. UPDATE(Updating a class)
4. DELETE(deleting a class)

#### d) Comments :-

1. CREATE(Addition of a new comment)
2. READ( Fetching the details of an existing comment)
3. UPDATE(Updating a comment)
4. DELETE(deleting a comment)

### 2) At least 3 different UI routes (appearing to the user as different pages)

![image](https://media.github.ccs.neu.edu/user/11302/files/e5dd9d08-f4df-4260-974c-3db1d8e1d080)

### 3) At least one Bootstrap UI component not featured in the demo application.

       We have added react-bootstrap spinner as our bootsrap UI component to show a loading icon when
       the screen is getting refreshed.

![MicrosoftTeams-image (16)](https://media.github.ccs.neu.edu/user/11302/files/2cf9b5f8-3718-4b3e-b8d4-2712929417af)

### 4) Different layout and design from the demo application; it should not look like an obvious clone.

       Met the goal as the layout is completely different

### 5) 3rd party library for React (not including React DnD, unless its use is completely different from the use in the demo project)

       Usage of react-notifications library

![MicrosoftTeams-image (20)](https://media.github.ccs.neu.edu/user/11302/files/54285055-3072-43a1-b4c1-7871cbdd4f67)

## Contributors

- Anwesa Basu(basu.anw@northeastern.edu)
- Het Chetan Shah (shah.het2@northeastern.edu)
- Shubham Atul Parulekar (parulekar.s@northeastern.edu)
- Swapnendu Majumdar (majumdar.s@northeastern.edu)

## Iteration 1

For this iteration, we have completed a basic implementation of all of the pages in our frontend. We have also created the required API endpoints that, for now, sends mock data to the frontend.

### Contribution

- **Anwesa Basu**
  - Register a new user into the system.[Jump](#page-register)
  - View an existing post.[Jump](#page-view-post)
- **Het Shah:**
  - Revamped Questions list page [Jump](#page-questions-list-page)
  - Integrated all the branches into main and resolved merge conflicts
- **Shubham Parulekar:**
  - Create a class. [Jump](#page-create-a-class)
  - Join a class. [Jump](#page-join-a-class)
- **Swapnendu Majumdar:**
  - Log an existing user into the system. [Jump](#page-login)
  - Create a new post. [Jump](#page-create-a-post)

### _Page:_ Register

This page helps the user to sign up for the first time in the system.

![image](https://media.github.ccs.neu.edu/user/11302/files/a395c811-e641-4b89-8dd7-fdc13355466a)

#### User data validation:-

![image](https://media.github.ccs.neu.edu/user/11302/files/7742ae4f-ad59-4032-9bc4-90385484dce5)

#### Form submission sucessful:-

![image](https://media.github.ccs.neu.edu/user/11302/files/cf9a8278-f846-460f-9cdc-fba3d601733a)

### _Page:_ View Post

This page shows the details of one user post.

#### Post details for Question ID 1:-

![image](https://media.github.ccs.neu.edu/user/11302/files/ba2d01ee-275b-41f2-b7eb-fee826cdc28c)

#### Post details for Question ID 4:-

![image](https://media.github.ccs.neu.edu/user/11302/files/faf92d18-67af-4715-a61d-d344da8c570a)

### _Page:_ List of questions

This page shows a list of questions that have been asked in a given class. The user can filter the questions based on the title or question description.

![List of all questions](./docs/iter1-desktop-all-questions.png)

The user can filter the question based on title or description.

![List of all questions](./docs/iter1-desktop-questions-filtered-by-search.png)

### _Page:_ Create a class

This page shows creation of a class. All fields are validated and the instructors takes multiple emails as input.

Blank form
![Page creation blank](./docs/iter1-desktop-create-class-blank.png)
Validation
![Page creation validation](./docs/iter1-desktop-create-class-validation.png)
Filled form
![Page creation filled](./docs/iter1-desktop-create-class-filled.png)

### _Page:_ Join a class

This page shows joining a class. All fields are validated.

Blank form
![Page join blank](./docs/iter1-desktop-join-class.png)
Validation
![Page join validation](./docs/iter1-desktop-join-class-validation.png)

### _Page:_ Login

This page allows an existing user to login to the system.

![image](https://media.github.ccs.neu.edu/user/11304/files/a85646aa-cee0-4270-814e-ade314997610)

### _Page:_ Create a post

This page allows a user to post a question in the classroom.

![image](https://media.github.ccs.neu.edu/user/11304/files/3f9cfee0-6e43-45d3-bcc4-3e3ac88dae08)

## Iteration 2

For this iteration, we have fleshed out various features. Most CURD operations are working. The APIs are now using the database.

### Contribution

- **Anwesa Basu**

  - Existing user validation and backend response handling for sign-up and sign-in pages.[Jump](#page-validation)
  - Implementing comment functionality to a posted question (In-progress)[Jump](#page-comment)
  - Integrated all the branches into main and resolved merge conflicts

- **Het Shah:**

  - Integrated Context API
  - New user registration page revamp [Jump](#page-registration)
  - Integrated all the branches into main and resolved merge conflicts

- **Shubham Parulekar:**

  - React notifications package setup. [Jump](#page-notification)
  - Class Actions dropdown and setup. [Jump](#page-class-actions-dropdown-and-setup)
  - Integrated all the branches into main and resolved merge conflicts

- **Swapnendu Majumdar:**
  - Implementing comment functionality to a posted question (In-progress). [Jump](#page-comment)
  - Login page UI Revamp. [Jump](#page-login)
  - Integrated all the branches into main and resolved merge conflicts

### _Page:_ Validation

![image](https://media.github.ccs.neu.edu/user/11304/files/aad0a232-c37c-402b-a2fd-54f7499c608a)

![MicrosoftTeams-image (8)](https://media.github.ccs.neu.edu/user/11304/files/edda3d7f-dec1-407f-985b-72cb5bb39831)

### _Page:_ Comment

![MicrosoftTeams-image (7)](https://media.github.ccs.neu.edu/user/11304/files/8ba88ba5-f098-4655-814a-b891618c5e0e)

### _Page:_ Registration

![MicrosoftTeams-image](https://media.github.ccs.neu.edu/user/11304/files/e0c0cbb3-2855-42fe-98cd-3f5bd65c5de2)

### _Page:_ Notification

![MicrosoftTeams-image (4)](https://media.github.ccs.neu.edu/user/11304/files/bc7f817f-42fb-490e-80fc-92d504937d92)

### _Page:_ Class Actions dropdown and setup

![MicrosoftTeams-image (5)](https://media.github.ccs.neu.edu/user/11304/files/70010a65-81e1-4e97-8a01-ce714db7495c)

![MicrosoftTeams-image (6)](https://media.github.ccs.neu.edu/user/11304/files/b642fc1d-ad3e-4313-bf56-dfeaef8f3c4c)

### _Page:_ Login

![MicrosoftTeams-image (1)](https://media.github.ccs.neu.edu/user/11304/files/6b458446-1357-42f8-b045-f09d27af8926)

## Iteration 3

For this iteration, we have compleated edit and delete parts of post/question, added comment, bettered the error reporting and made the question UI better.

### Contribution

- **Anwesa Basu**

  - Addition of comment Edit feature. [Jump](#page-comment-edit)
  - Addition of comment delete feature. [Jump](#comment-delete)
  - Fetching of comments and showing in the view post screen. [Jump](#comment-fetch)

- **Het Shah:**

  - New user registration page revamp [Jump](#page-registration)
  - Imeplemented a preloader for the app [Jump](#component-preloader)
  - Integrated all the branches into main and resolved merge conflicts

- **Shubham Parulekar:**

  - Added edit and delete of question/post. [Jump](#page-edit-delete-post)
  - Bettered the error reporting.
  - Heroku deployment

- **Swapnendu Majumdar:**
  - Implementing add comment feature.[Jump](#page-comment-add)
  - implementing reply feature of comment on heirarchial basis.[Jump](#page-comment-reply)
  - Creation of comment file structures including addition of 3 components and one dataservice file.

### _Page:_ Comment edit

As part of this feature have added a edit button to edit every comment posted by the user.

![MicrosoftTeams-image (11)](https://media.github.ccs.neu.edu/user/11302/files/4451cc7f-1591-48fc-98e0-d31ab2c48d13)

![MicrosoftTeams-image (12)](https://media.github.ccs.neu.edu/user/11302/files/458aef9f-171c-4b1e-be10-e3730836497c)

### comment-delete

As part of this feature have added a delete button to delete every comment posted by the user.

![MicrosoftTeams-image (9)](https://media.github.ccs.neu.edu/user/11302/files/e1d16468-8890-4675-8f9d-923b51671fd6)
![MicrosoftTeams-image (10)](https://media.github.ccs.neu.edu/user/11302/files/e85d6d29-5700-445f-9521-42c94d2acbba)

### comment-fetch

As part of this feature I have added the functionality to fectch all comments on every render of the screen.

![MicrosoftTeams-image (8)](https://media.github.ccs.neu.edu/user/11302/files/07130253-6a9c-413a-b579-d6a726f38bcd)

### _Page:_ Questions list page

![Questions List](./docs/iter3-question-list.png)

Added card icon to distinguish between a question and a post. Also, added comments count for a question/post.

### _Page:_ Edit Delete Post

![Buttons](./docs/iter3-edit-delete.png)

![Edit Page](./docs/iter3-edit.png)

### _Page:_ Comment add

As part of this feature have added an add comment button to add every comment posted by the user.

![MicrosoftTeams-image (13)](https://media.github.ccs.neu.edu/user/11302/files/09c94b48-1d59-4948-8b71-24d2a0c24092)

![MicrosoftTeams-image (14)](https://media.github.ccs.neu.edu/user/11302/files/b73df48d-1b6a-4b41-a64e-6d3fee91ab43)

![MicrosoftTeams-image (15)](https://media.github.ccs.neu.edu/user/11302/files/cf798770-adae-418d-8f8f-0717f9ee15ff)

### _Page:_ Comment reply

As part of this feature have added an reply comment button to reply to an existing comment of an user.
![MicrosoftTeams-image (17)](https://media.github.ccs.neu.edu/user/11302/files/fa314d27-7201-4fc1-a0db-5a7eff92d7f1)
![MicrosoftTeams-image (18)](https://media.github.ccs.neu.edu/user/11302/files/cdd7e762-7352-49b9-90e0-565302a597ef)
![MicrosoftTeams-image (19)](https://media.github.ccs.neu.edu/user/11302/files/adee3528-a26f-45a2-843e-71b5d28a8ec9)

### _Component_: Preloader

![Preloader](https://media.github.ccs.neu.edu/user/11302/files/2cf9b5f8-3718-4b3e-b8d4-2712929417af)
