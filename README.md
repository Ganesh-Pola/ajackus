# 📘 Employee Directory Web Interface

A responsive, interactive web application built using **HTML**, **CSS (Bootstrap 5)**, and **Vanilla JavaScript** to manage employee information with features like search, sort, filter, pagination, CSV export, and JSON import/export. Data persistence is achieved using **localStorage**.

---

## 🚀 Live Demo

Live Project URL: [https://ajackus-ganesh-project.netlify.app/](https://ajackus-ganesh-project.netlify.app/)

---

## 📂 Project Structure

```
employee-directory/
│
├── index.html       # Main HTML file
├── style.css        # Custom styles
├── app.js           # Application logic
└── assets/          # (Optional) Add any icons/images
```

---

## 🧰 Technologies Used

* **HTML5**
* **CSS3** with **Bootstrap 5.3**
* **Vanilla JavaScript**
* **localStorage** for persistent data storage

---

## 🎯 Features

### 👤 Employee Management

* **Add Employee** via a Bootstrap modal
* **Edit Employee** details
* **Delete Employee** entry
* **Clear All Employees** with a confirmation prompt

### 🔍 Search & Filter

* **Live Search** by first name, last name, or email
* **Advanced Filters**:

  * Filter by First Name
  * Filter by Department
  * Filter by Role
* **Reset Filters** to clear all filters at once

### 🧽 Sorting

* Sort employee list by:

  * **First Name (A-Z)**
  * **Last Name (A-Z)**

### 📄 Pagination

* Paginate employee list with:

  * 10 employees per page
  * Highlighted active page
  * Page navigation controls

### 💾 Data Persistence

* All employee data is stored using **localStorage**
* Data remains intact across browser refreshes

### 📄 CSV Export

* Export the entire employee list to a downloadable `.csv` file
* Fields exported: First Name, Last Name, Email, Department, Role

### 📅 JSON Import

* Import employee data from a `.json` file
* Automatically validates structure before saving
* Assigns unique IDs for imported data if missing

---

## ⚒️ How to Use

### 🧪 Run Locally

1. **Clone the repository**

```bash
git clone https://github.com/Ganesh-Pola/ajackus
cd ajackus
```

2. **Open ****`index.html`**** in your browser**

```bash
# Double-click the index.html file or
open index.html
```

### 🔍 Import JSON Format Example

```json
[
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "department": "Marketing",
    "role": "Team Lead"
  },
  {
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "department": "Sales",
    "role": "Executive"
  }
]
```

> Note: IDs are auto-generated during import if not provided.

---

## 🧼 Reset / Clear Data

Click on the **"Clear All Employees"** button at the bottom of the page. This removes all employee records from `localStorage`.

---

## 🧩 Customization Tips

* 💡 Change items per page by modifying `itemsPerPage` in `app.js`
* 🎨 Customize modal or cards in `style.css`
* ➕ Add additional fields such as phone, address, etc., by updating the form, data structure, and render logic
