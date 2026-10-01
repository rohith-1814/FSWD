import { createContext, useContext, useEffect, useState } from "react";
import { initialCourses } from "../data/initialCourses.js";

const CourseContext = createContext();
export const useCourses = () => useContext(CourseContext);

export const getStatus = (p) => (p >= 100 ? "Completed" : p > 0 ? "In Progress" : "Not Started");

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const addCourse = (c) => setCourses((prev) => [...prev, { ...c, id: Date.now() }]);
  const updateCourse = (id, c) => setCourses((prev) => prev.map((x) => (x.id === id ? { ...x, ...c } : x)));
  const deleteCourse = (id) => setCourses((prev) => prev.filter((x) => x.id !== id));

  return (
    <CourseContext.Provider value={{ courses, addCourse, updateCourse, deleteCourse }}>
      {children}
    </CourseContext.Provider>
  );
}
