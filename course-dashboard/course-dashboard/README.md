# Online Course Dashboard (React + Vite)

Shows enrolled courses, progress percentages and completion status.

## Run
    npm install
    npm run dev

## Features
- Dashboard: totals, average progress, "continue learning" list
- My courses: search, status filter, progress slider, edit, delete
- Add / Edit course: form with client-side validation
- Data persists in localStorage (useEffect)

## Structure
    src/components  Navbar, CourseCard, ProgressBar
    src/pages       Dashboard, Courses, CourseForm
    src/context     CourseContext (state + CRUD)
    src/data        seed data
