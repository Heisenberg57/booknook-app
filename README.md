📚 BookNook – A Mini Online Library App
---------------------------------------
A full-stack sample application with a complete automated test suite, designed to mirror real-world QA/SDET challenges.

🚀 Application Overview
-----------------------
BookNook simulates a mini online library system where users can register, search, borrow, and manage books.
It provides a playground for both development and end-to-end automated testing.

✨ Features
------------
User registration & login (JWT-based authentication)

Search for books
Add books to My Shelf
Borrow & return books (with real-time DB status updates)
REST APIs for all operations
Admin panel: add/remove books

🛠 Tech Stack
-------------
Backend: Node.js (Express) 
Frontend: React / simple HTML forms
Database: PostgreSQL / MySQL
Authentication: JWT

📂 Test Bifurcation
-------------------
Organized by layers of the Test Pyramid:

/ui-tests            → UI automation (Playwright / Selenium)
/api-tests           → API automation (RestAssured / SuperTest)
/db-tests            → Database validation scripts
/performance-tests   → JMeter / k6 scripts
/.github/workflows   → CI/CD pipeline (GitHub Actions YAML)

📡 API Endpoints
-----------------
👤 Users

POST /users → Create a user

GET /users → List all users

📖 Borrowed Books

POST /borrow → Borrow a book

GET /borrowed → List borrowed books

Review Books

POST/reviews -> post a review
GET/reviews -> get reviews
PUT/reviews/id -> update a review
DELETE/reviews/id -> delete a review

🔹 Test Layers (Test Pyramid)
🧩 Unit Tests (Base Layer)

Frameworks: JUnit/TestNG (Java) or Jest/Mocha (Node)

Coverage (~70%):

Utility functions (e.g., password hashing, due-date calculator)

Service classes (e.g., BorrowService, UserAuthService)

🌐 API Tests (Middle Layer)

Frameworks: RestAssured (Java) / SuperTest (Node)

Scenarios Covered:

POST /login → valid & invalid users

GET /books → search, pagination checks

POST /borrow → DB entry verification

JSON schema validation

Data-driven testing (users, books)

💻 UI Tests (Top Layer)

Frameworks: Playwright / Selenium

Design Pattern: Page Object Model (POM)

Core Flows:

User: login → search book → borrow → return

Admin: login → add/remove book

Cross-browser execution supported

⚡ CI/CD Integration
--------------------

Automated test execution via GitHub Actions

Separate jobs for unit, API, UI, DB, and performance tests

Configurable test reports & artifacts

Added Playwright script for entire crud Ui operation
-----------------------------------------------------

Added playwright with typescript
