import { useState } from "react";
import { Link } from "react-router-dom";
import { useCourses, getStatus } from "../context/CourseContext.jsx";
import CourseCard from "../components/CourseCard.jsx";

export default function Courses() {
  const { courses, updateCourse, deleteCourse } = useCourses();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  const visible = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) &&
      (status === "All" || getStatus(c.progress) === status)
  );

  const handleDelete = (id) => {
    if (window.confirm("Remove this course?")) deleteCourse(id);
  };

  return (
    <>
      <div className="row between">
        <h1>My courses</h1>
        <Link className="btn" to="/courses/new">Add course</Link>
      </div>
      <div className="filters">
        <input placeholder="Search by title" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {["All", "Not Started", "In Progress", "Completed"].map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      {visible.length === 0 ? (
        <p className="muted">No courses match. Try a different search or filter.</p>
      ) : (
        <div className="grid">
          {visible.map((c) => (
            <CourseCard key={c.id} course={c} onDelete={handleDelete}
              onProgress={(id, p) => updateCourse(id, { progress: p })} />
          ))}
        </div>
      )}
    </>
  );
}
