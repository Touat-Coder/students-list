import sqlite3

DB_NAME = "students.db"

def get_db_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row  # return dict-like rows
    return conn

def init_db():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            birth_date TEXT,
            gender TEXT,
            address TEXT,
            email TEXT UNIQUE,
            phone TEXT,
            registration_year INTEGER,
            major TEXT
        )
    """)
    conn.commit()
    conn.close()
