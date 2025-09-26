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

🔹 The Test Layers (Test Pyramid)

Unit Tests (Base layer)

Written in JUnit/TestNG (Java) or Jest/Mocha (Node).

Cover:

Utility functions (e.g., password hashing, due-date calculator).

Service classes (e.g., BorrowService, UserAuthService).

Achieve good coverage (~70%).

API Tests (Middle layer)

Framework: RestAssured (Java) or SuperTest (Node).

Tests for endpoints:

POST /login → valid/invalid users

GET /books → search works, pagination

POST /borrow → DB entry is created

Schema validation for JSON responses

Data-driven testing (users, books).

UI Tests (Top layer)

Framework: Playwright or Selenium.

Page Object Model.

Core flows:

User login → search book → borrow → return.

Admin login → add/remove book.

Cross-browser config.


