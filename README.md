---

## 2. `README.md` for **`military-frontend`**

```markdown
#  Military Asset Management System — Frontend Interface

A responsive dashboard web application built with **React**, **TypeScript**, and **Vite** designed for military logistics officers and base administrators to manage assets, monitor transfers, and track security audit trails.

---

## Tech Stack

* **Framework:** React 18
* **Build Tool:** Vite
* **Language:** TypeScript
* **HTTP Client:** Axios
* **Styling:** CSS Modules / Styled UI Components

---

## Key Features

* **Interactive Executive Dashboard:** Overview of total bases, available assets, transfer statuses, and dynamic stock balance models.
* **Role-Based Interface (RBAC):** UI dynamically adapts based on logged-in user permissions (`ADMIN` can view Audit Logs and Bases; restricted views for `LOGISTICS_OFFICER`).
* **Transfer Management UI:** Form to request asset movements between military installations and monitor status lifecycle (`PENDING`, `APPROVED`).
* **Real-time System Audit Trail:** Color-coded action tags (`PURCHASE`, `TRANSFER`, `EXPENDITURE`) for absolute operational visibility.

---

## Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/GurramHemalatha/military-frontend.git](https://github.com/GurramHemalatha/military-frontend.git)
   cd military-frontend
