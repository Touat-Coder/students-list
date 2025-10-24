const API_URL = "http://localhost:5000";

function showMessage(msg, color = 'green') {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = msg;
    messageDiv.style.color = color;
    setTimeout(() => messageDiv.textContent = '', 3000);
}

function fetchStudents() {
    fetch(`${API_URL}/students`)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector('#students-table tbody');
            tbody.innerHTML = '';
            data.forEach(student => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${student.id}</td>
                    <td>${student.first_name}</td>
                    <td>${student.last_name}</td>
                    <td>${student.birth_date || ''}</td>
                    <td>${student.gender || ''}</td>
                    <td>${student.address || ''}</td>
                    <td>${student.email || ''}</td>
                    <td>${student.phone || ''}</td>
                    <td>${student.registration_year || ''}</td>
                    <td>${student.major || ''}</td>
                    <td>
                        <button onclick="editStudent(${student.id})">Edit</button>
                        <button onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        });
}

function addStudent(e) {
    e.preventDefault();
    const student = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        birth_date: document.getElementById('birth_date').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        registration_year: document.getElementById('registration_year').value,
        major: document.getElementById('major').value
    };
    fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    })
    .then(async res => {
        const data = await res.json();
        if (!res.ok) {
            showMessage(data.error || 'An error occurred.', 'red');
        } else {
            showMessage(data.message);
            document.getElementById('student-form').reset();
            fetchStudents();
        }
    });
}

function editStudent(id) {
    fetch(`${API_URL}/students/${id}`)
        .then(res => res.json())
        .then(student => {
            document.getElementById('student-id').value = student.id;
            document.getElementById('first_name').value = student.first_name;
            document.getElementById('last_name').value = student.last_name;
            document.getElementById('birth_date').value = student.birth_date || '';
            document.getElementById('gender').value = student.gender || '';
            document.getElementById('address').value = student.address || '';
            document.getElementById('email').value = student.email || '';
            document.getElementById('phone').value = student.phone || '';
            document.getElementById('registration_year').value = student.registration_year || '';
            document.getElementById('major').value = student.major || '';
            document.getElementById('update-btn').style.display = 'inline-block';
            document.getElementById('cancel-btn').style.display = 'inline-block';
            document.querySelector('#student-form button[type="submit"]').style.display = 'none';
        });
}

function updateStudent() {
    const id = document.getElementById('student-id').value;
    const student = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        birth_date: document.getElementById('birth_date').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        registration_year: document.getElementById('registration_year').value,
        major: document.getElementById('major').value
    };
    fetch(`${API_URL}/students/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
    })
    .then(async res => {
        const data = await res.json();
        if (!res.ok) {
            showMessage(data.error || 'An error occurred.', 'red');
        } else {
            showMessage(data.message);
            document.getElementById('student-form').reset();
            document.getElementById('update-btn').style.display = 'none';
            document.getElementById('cancel-btn').style.display = 'none';
            document.querySelector('#student-form button[type="submit"]').style.display = 'inline-block';
            fetchStudents();
        }
    });
}

function cancelEdit() {
    document.getElementById('student-form').reset();
    document.getElementById('update-btn').style.display = 'none';
    document.getElementById('cancel-btn').style.display = 'none';
    document.querySelector('#student-form button[type="submit"]').style.display = 'inline-block';
}

function deleteStudent(id) {
    if (!confirm('Are you sure you want to delete this student?')) return;
    fetch(`${API_URL}/students/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        showMessage(data.message);
        fetchStudents();
    });
}

document.getElementById('student-form').addEventListener('submit', addStudent);
document.getElementById('update-btn').addEventListener('click', updateStudent);
document.getElementById('cancel-btn').addEventListener('click', cancelEdit);

window.onload = fetchStudents;
