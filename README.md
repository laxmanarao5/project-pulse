# projectPulse

### Description:-  
projectPulse is a projects tracking tool for organizations to track status of their projects. This project is in initial stage only backend is completed using nodejs 


### How to Install the project
Download the git repository manually or clone it by following command

```
git clone https://github.com/laxmanarao5/project-pulse
```
If you download manually extract the zip file.

then run the following command to install all the modules that are used in this project

```
  npm install
```
then start the server using below command

```
  npm start
```
### Configurations
  create ```.env``` file and add the following details to the ```.env``` file
PORT=80
HOST=localhost
DB_NAME=YOUR_DB_NAME
DB_USER=YOUR_DB_USER
DB_PASS=YOUR_DB_PASSWORD
SECRET_KEY=SECRET_KEY
EMAIL_SERVICE_PROVIDER=EMAIL_SERVICE_PROVIDER
EMAIL=EMAIL_ID
EMAIL_PASSWORD=APP_PASSWORD

```

## Overview
### Roles in this project:-
```
1.SuperAdmin
2.Admin
3.GDO (Global Delivery Organization)
4.Project Manager
5.HR Manager
```
### Tasks of the roles

#### superAdmin
```
 1.Get all the users.
 2.Assign the roles to the Employees.
 ```
 #### Admin
 
 ```
  1.Get all the projects in an organization
  2.Get specific project details (Detailed overview,project concerns, project updates team Composition)
  3.Create a project
  4.Get the resourcing requests
  5.Update the existing project
  6.Delete existing project(soft delete)
 ```
 
 #### GDO (Global Delivery Organization)
 ```
  1.Get all projects under his maintanance
  2.Get specific project details (Detailed overview,project concerns, project updates team Composition)
  3.Assigning projects to employees(Creating a team)
  4.Update employees in the project
  5.Delete Employees from the project
  6.Raising Resource requests
 ```
 #### Project Manager
 
 ```
  1.Adding project updates 
  2.Raise project concerns
  3.Get all the projects under his maintanance
  4.Get specific project details (Detailed overview,project concerns, project updates team Composition)
 ```
 