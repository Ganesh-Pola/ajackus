let employees = JSON.parse(localStorage.getItem("employees")) || [{
        id: 1,
        firstName: "Alice",
        lastName: "Smith",
        email: "alice@example.com",
        department: "HR",
        role: "Manager"
    },
    {
        id: 2,
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob@example.com",
        department: "IT",
        role: "Developer"
    },
    {
        id: 3,
        firstName: "Charlie",
        lastName: "Lee",
        email: "charlie@example.com",
        department: "Finance",
        role: "Analyst"
    }
];

let currentPage = 1;
let itemsPerPage = 10;

function saveToLocalStorage() {
    localStorage.setItem("employees", JSON.stringify(employees));
}

function renderEmployees() {
    const list = document.getElementById("employeeList");
    list.innerHTML = "";

    let filtered = [...employees];

    const nameSearch = document.getElementById("searchInput").value.toLowerCase();
    if (nameSearch) {
        filtered = filtered.filter(emp =>
            emp.firstName.toLowerCase().includes(nameSearch) ||
            emp.lastName.toLowerCase().includes(nameSearch) ||
            emp.email.toLowerCase().includes(nameSearch)
        );
    }

    const sortKey = document.getElementById("sortBy")?.value;
    if (sortKey) {
        filtered.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    }

    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);

    paginated.forEach(emp => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-3";
        card.innerHTML = `
        <div class="employee-card">
            <h5>${emp.firstName} ${emp.lastName}</h5>
            <p>Email: ${emp.email}</p>
            <p>Department: ${emp.department}</p>
            <p>Role: ${emp.role}</p>
            <button class="btn btn-primary btn-sm" onclick="editEmployee(${emp.id})">Edit</button>
            <button class="btn btn-danger btn-sm ms-2" onclick="deleteEmployee(${emp.id})">Delete</button>
        </div>`;
        list.appendChild(card);
    });

    renderPagination(filtered.length);
}

function renderPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement("li");
        li.className = `page-item ${i === currentPage ? "active" : ""}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        pagination.appendChild(li);
    }
}

function changePage(page) {
    currentPage = page;
    renderEmployees();
}

function openForm() {
    document.getElementById("employeeForm").reset();
    document.getElementById("employeeId").value = "";
    document.getElementById("formTitle").innerText = "Add Employee";
    new bootstrap.Modal(document.getElementById("employeeModal")).show();
}

function saveEmployee() {
    const id = document.getElementById("employeeId").value;
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value.trim();
    const role = document.getElementById("role").value.trim();

    if (!firstName || !lastName || !email || !department || !role) {
        alert("All fields are required.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email format.");
        return;
    }

    if (id) {
        const emp = employees.find(e => e.id == id);
        Object.assign(emp, {
            firstName,
            lastName,
            email,
            department,
            role
        });
    } else {
        const newId = Date.now();
        employees.push({
            id: newId,
            firstName,
            lastName,
            email,
            department,
            role
        });
    }

    saveToLocalStorage();
    bootstrap.Modal.getInstance(document.getElementById("employeeModal")).hide();
    renderEmployees();
}

function editEmployee(id) {
    const emp = employees.find(e => e.id === id);
    if (!emp) return;

    document.getElementById("employeeId").value = emp.id;
    document.getElementById("firstName").value = emp.firstName;
    document.getElementById("lastName").value = emp.lastName;
    document.getElementById("email").value = emp.email;
    document.getElementById("department").value = emp.department;
    document.getElementById("role").value = emp.role;

    document.getElementById("formTitle").innerText = "Edit Employee";
    new bootstrap.Modal(document.getElementById("employeeModal")).show();
}

function deleteEmployee(id) {
    if (confirm("Are you sure you want to delete this employee?")) {
        employees = employees.filter(e => e.id !== id);
        saveToLocalStorage();
        renderEmployees();
    }
}

function searchEmployees() {
    currentPage = 1;
    renderEmployees();
}

function toggleFilter() {
    document.getElementById("filterPanel").classList.toggle("show");
}

function applyFilter() {
    const fname = document.getElementById("filterFirstName").value.toLowerCase();
    const dept = document.getElementById("filterDepartment").value.toLowerCase();
    const role = document.getElementById("filterRole").value.toLowerCase();

    let filtered = employees.filter(emp =>
        (!fname || emp.firstName.toLowerCase().includes(fname)) &&
        (!dept || emp.department.toLowerCase().includes(dept)) &&
        (!role || emp.role.toLowerCase().includes(role))
    );

    const list = document.getElementById("employeeList");
    list.innerHTML = "";

    filtered.slice(0, itemsPerPage).forEach(emp => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-3";
        card.innerHTML = `
        <div class="employee-card">
            <h5>${emp.firstName} ${emp.lastName}</h5>
            <p>Email: ${emp.email}</p>
            <p>Department: ${emp.department}</p>
            <p>Role: ${emp.role}</p>
            <button class="btn btn-primary btn-sm" onclick="editEmployee(${emp.id})">Edit</button>
            <button class="btn btn-danger btn-sm ms-2" onclick="deleteEmployee(${emp.id})">Delete</button>
        </div>`;
        list.appendChild(card);
    });

    renderPagination(filtered.length);
}

function resetFilter() {
    document.getElementById("filterFirstName").value = "";
    document.getElementById("filterDepartment").value = "";
    document.getElementById("filterRole").value = "";
    renderEmployees();
}

function applySort() {
    currentPage = 1;
    renderEmployees();
}

function clearAllEmployees() {
    if (confirm("This will remove all employees permanently. Continue?")) {
        employees = [];
        saveToLocalStorage();
        renderEmployees();
    }
}

function exportToCSV() {
    if (employees.length === 0) {
        alert("No data to export.");
        return;
    }

    const csvContent = "data:text/csv;charset=utf-8," + [
        ["First Name", "Last Name", "Email", "Department", "Role"],
        ...employees.map(e => [e.firstName, e.lastName, e.email, e.department, e.role])
    ].map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "employee_directory.csv");
    link.click();
}

function importFromJSON(input) {
    const file = input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                const isValid = data.every(emp =>
                    emp.firstName && emp.lastName && emp.email && emp.department && emp.role
                );
                if (isValid) {
                    employees = data.map(emp => ({
                        ...emp,
                        id: emp.id || Date.now() + Math.random()
                    }));
                    saveToLocalStorage();
                    renderEmployees();
                    alert("Employees imported successfully.");
                } else {
                    alert("Invalid JSON structure.");
                }
            } else {
                alert("Invalid JSON format.");
            }
        } catch (err) {
            alert("Failed to read JSON: " + err.message);
        }
    };
    reader.readAsText(file);
}

renderEmployees();