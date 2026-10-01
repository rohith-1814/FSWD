import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar.jsx";
import { getStatus } from "../context/CourseContext.jsx";

export default function CourseCard({ course, onDelete, onProgress }) {
  const status = getStatus(course.progress);
  return (
    <article className="card">
      <div className="card-top">
        <h3>{course.title}</h3>
        <span className={`badge ${status.replace(" ", "").toLowerCase()}`}>{status}</span>
      </div>
      <p className="muted">{course.instructor} · {course.category}</p>
      <ProgressBar value={course.progress} />
      <div className="row">
        <strong>{course.progress}%</strong>
        <input
          type="range" min="0" max="100" step="5" value={course.progress}
          aria-label={`Progress for ${course.title}`}
          onChange={(e) => onProgress(course.id, Number(e.target.value))}
        />
      </div>
      <div className="row actions">
        <Link className="btn ghost" to={`/courses/${course.id}/edit`}>Edit</Link>
        <button className="btn danger" onClick={() => onDelete(course.id)}>Delete</button>
      </div>
    </article>
  );
}
