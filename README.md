🌟  BookNook – A Mini Online Library App

A full-stack sample application + complete automated test suite that mirrors real-world QA/SDET challenges.

The Application (The System under Test).

Features:

User registration & login

Search for books

Add books to "My Shelf"

Borrow/return books( with DB status update)

REST APIs for all operations

Admin Can add/remove books

Tech stack : 

Backend: Node.js (Express) or Java (Spring Boot)

Frontend: React / simple HTML forms

Database: PostgreSQL / MySQL

Auth: JWT-based login

Test bifurcation - 

/ui-tests (UI automation code)

/api-tests (API automation code)

/db-tests (DB validations)

/performance-tests (JMeter/k6 scripts)

CI/CD pipeline YAML (GitHub Actions)

API Endpoints Added :

Users

POST /users → add a user

GET /users → list all users

Borrowed Books

POST /borrow → borrow a book

GET /borrowed → see all borrowed books


