import { Link } from "react-router-dom";
import { useCourses, getStatus } from "../context/CourseContext.jsx";
import ProgressBar from "../components/ProgressBar.jsx";

export default function Dashboard() {
  const { courses } = useCourses();
  const total = courses.length;
  const completed = courses.filter((c) => c.progress >= 100).length;
  const inProgress = courses.filter((c) => getStatus(c.progress) === "In Progress").length;
  const avg = total ? Math.round(courses.reduce((s, c) => s + c.progress, 0) / total) : 0;

  return (
    <>
      <h1>Your learning</h1>
      <section className="stats">
        <div className="stat"><b>{total}</b><span>Enrolled</span></div>
        <div className="stat"><b>{inProgress}</b><span>In progress</span></div>
        <div className="stat"><b>{completed}</b><span>Completed</span></div>
        <div className="stat"><b>{avg}%</b><span>Average progress</span></div>
      </section>
      <h2>Overall progress</h2>
      <ProgressBar value={avg} />
      <h2>Continue learning</h2>
      {total === 0 ? (
        <p className="muted">No courses yet. <Link to="/courses/new">Add your first course</Link>.</p>
      ) : (
        <ul className="list">
          {courses.filter((c) => c.progress < 100).map((c) => (
            <li key={c.id}>
              <span>{c.title}</span>
              <span className="grow"><ProgressBar value={c.progress} /></span>
              <strong>{c.progress}%</strong>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
