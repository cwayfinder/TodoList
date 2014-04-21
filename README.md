To-Do List web app with authorization
==================================

## Used ##
- ExtJS
- Spring core
- Spring Data JPA

## Functional requirements ##

- I want to be able to create/update/delete projects
- I want to be able to add tasks to my project
- I want to be able to update/delete tasks
- I want to be able to prioritise tasks into a project
- I want to be able to choose deadline for my task
- I want to be able to mark a task as 'done'


## Instalation ##

1. Install mysql (or another DBMS and change connection setting in jpaContext.xml)
2. Install maven and set environment variables (M2_HOME and Path)
3. Create database with name "todolist" (or another name and change it in jpaContext.xml)
3. Extract TodoList.zip (see attachment)
4. Run command mvn clean package tomcat:run in directory with file pom.xml
5. Open url http://localhost:8080/TodoList/ your browser
6. Enjoy
