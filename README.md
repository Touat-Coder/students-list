# Student Info Management 

this is a simple web app for student management it's not a full system but just a home work for ADRAR univ I've developed it with the help of ai tools

## Features

- View all students
- Add new students
- Update student information
- Delete students
- Basic data validation
- Responsive web interface

## Technology Stack

- **Backend**: Flask (Python)
- **Database**: SQLite (the file called students.db)
- **Frontend**: HTML, CSS, JavaScript
- **CORS**: Flask-CORS for cross-origin resource sharing

## Project Structure

```
studentsApp/
├── app.py              # Main Flask application
├── database.py         # Database configuration and connection
├── requirements.txt    # Python dependencies
├── students.db         # SQLite database
└── frontend/
    ├── index.html     # Main web interface
    ├── script.js      # Frontend JavaScript
    └── styles.css     # CSS styles
```

## Setup and Installation


1. Install the required packages:
   pip install -r requirements.txt
   copy this line and paste it in the terminal and make sure ur this project is opend in the terminal
   
2. Run the application:
   python app.py
   same thing copy this line below and paste it in the terminal
   
3. Open your browser and navigate to `http://localhost:5000`

## API Endpoints

- `GET /students` - Get all students
- `GET /students/<id>` - Get a specific student
- `POST /students` - Add a new student
- `PUT /students/<id>` - Update a student
- `DELETE /students/<id>` - Delete a student

## Required Fields for Students

- `first_name` (required)
- `last_name` (required)
- `email` (unique)
- `birth_date`
- `gender`
- `address`
- `phone`
- `registration_year`
- `major`

## Development

To modify the application:
1. Backend changes can be made in `app.py` and `database.py`
2. Frontend changes can be made in the `frontend` directory
3. Database schema changes should be made in `database.py`

## Warning## 
don't touch the data base file (students.db) some issues may accur
