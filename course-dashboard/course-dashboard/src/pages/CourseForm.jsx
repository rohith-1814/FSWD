import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../context/CourseContext.jsx";
import { CATEGORIES } from "../data/initialCourses.js";

const empty = { title: "", instructor: "", category: CATEGORIES[0], progress: 0 };

export default function CourseForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { courses, addCourse, updateCourse } = useCourses();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      const found = courses.find((c) => c.id === Number(id));
      if (found) setForm(found);
    } else setForm(empty);
  }, [id, courses]);

  const validate = () => {
    const e = {};
    if (form.title.trim().length < 3) e.title = "Enter a title with at least 3 characters.";
    if (!/^[A-Za-z .'-]{2,}$/.test(form.instructor.trim())) e.instructor = "Enter a valid instructor name (letters only).";
    const p = Number(form.progress);
    if (Number.isNaN(p) || p < 0 || p > 100) e.progress = "Progress must be between 0 and 100.";
    return e;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    const data = { ...form, title: form.title.trim(), instructor: form.instructor.trim(), progress: Number(form.progress) };
    id ? updateCourse(Number(id), data) : addCourse(data);
    navigate("/courses");
  };

  return (
    <>
      <h1>{id ? "Edit course" : "Add course"}</h1>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <label>Course title
          <input name="title" value={form.title} onChange={handleChange} />
          {errors.title && <small className="error">{errors.title}</small>}
        </label>
        <label>Instructor
          <input name="instructor" value={form.instructor} onChange={handleChange} />
          {errors.instructor && <small className="error">{errors.instructor}</small>}
        </label>
        <label>Category
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>Progress (%)
          <input name="progress" type="number" value={form.progress} onChange={handleChange} />
          {errors.progress && <small className="error">{errors.progress}</small>}
        </label>
        <div className="row">
          <button className="btn" type="submit">{id ? "Save changes" : "Add course"}</button>
          <button className="btn ghost" type="button" onClick={() => navigate("/courses")}>Cancel</button>
        </div>
      </form>
    </>
  );
}
