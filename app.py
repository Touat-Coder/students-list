from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from database import get_db_connection, init_db

app = Flask(__name__)
CORS(app)

# Initialize the database on app startup
init_db()

@app.route('/')
def home():
    return send_from_directory('frontend', 'index.html')

@app.route('/students', methods=['GET'])
def get_students():
    conn = get_db_connection()
    students = conn.execute("SELECT * FROM students").fetchall()
    conn.close()
    return jsonify([dict(row) for row in students])

@app.route('/students/<int:id>', methods=['GET'])
def get_student(id):
    conn = get_db_connection()
    student = conn.execute("SELECT * FROM students WHERE id=?", (id,)).fetchone()
    conn.close()
    if student is None:
        return jsonify({"error": "Student not found"}), 404
    return jsonify(dict(student))

@app.route('/students', methods=['POST'])
def add_student():
    data = request.get_json()

    required_fields = ['first_name', 'last_name']
    for field in required_fields:
        if not data.get(field):
            return jsonify({"error": f"'{field}' is required"}), 400

    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("""
            INSERT INTO students (first_name, last_name, birth_date, gender, address, email, phone, registration_year, major)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            data.get('first_name'),
            data.get('last_name'),
            data.get('birth_date'),
            data.get('gender'),
            data.get('address'),
            data.get('email'),
            data.get('phone'),
            data.get('registration_year'),
            data.get('major')
        ))
        conn.commit()
        new_id = cur.lastrowid
        conn.close()
        return jsonify({"id": new_id, "message": "Student added successfully"}), 201
    except Exception as e:
        conn.rollback()
        conn.close()
        if "UNIQUE constraint failed: students.email" in str(e):
            return jsonify({"error": "Email already exists. Please use a different email."}), 400
        return jsonify({"error": "An error occurred while adding the student."}), 500

@app.route('/students/<int:id>', methods=['PUT'])
def update_student(id):
    data = request.get_json()

    conn = get_db_connection()
    cur = conn.cursor()
    try:
        cur.execute("""
            UPDATE students
            SET first_name=?, last_name=?, birth_date=?, gender=?, address=?, email=?, phone=?, registration_year=?, major=?
            WHERE id=?
        """, (
            data.get('first_name'),
            data.get('last_name'),
            data.get('birth_date'),
            data.get('gender'),
            data.get('address'),
            data.get('email'),
            data.get('phone'),
            data.get('registration_year'),
            data.get('major'),
            id
        ))
        conn.commit()
        updated = cur.rowcount
        conn.close()
        if updated == 0:
            return jsonify({"error": "Student not found"}), 404
        return jsonify({"message": "Student updated successfully"})
    except Exception as e:
        conn.rollback()
        conn.close()
        if "UNIQUE constraint failed: students.email" in str(e):
            return jsonify({"error": "Email already exists. Please use a different email."}), 400
        return jsonify({"error": "An error occurred while updating the student."}), 500

@app.route('/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM students WHERE id=?", (id,))
    conn.commit()
    deleted = cur.rowcount
    conn.close()

    if deleted == 0:
        return jsonify({"error": "Student not found"}), 404
    return jsonify({"message": "Student deleted successfully"})

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory('frontend', path)

if __name__ == '__main__':
    app.run(debug=True)
