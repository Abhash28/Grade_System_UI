import React, { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({
    roll: "",
    student: "",
    physics: "",
    chemistry: "",
    math: "",
    computer: "",
    english: "",
  });

  const [students, setStudents] = useState([]);
  const [notification, setNotification] = useState("");
  const [failReason, setFailReason] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const { roll, student, physics, chemistry, math, english, computer } = form;

    // Check if all fields are filled
    if (
      !roll ||
      !student ||
      !physics ||
      !chemistry ||
      !math ||
      !english ||
      !computer
    ) {
      alert("Please fill all fields");
      return;
    }

    // Check for valid marks
    const allMarks = [physics, chemistry, math, english, computer];
    if (allMarks.some((mark) => Number(mark) > 100)) {
      alert("Marks cannot be more than 100");
      return;
    }

    const obtained = allMarks.reduce((sum, mark) => sum + Number(mark), 0);
    const percentage = ((obtained / 500) * 100).toFixed(2);
    const grade = getGrade(percentage);
    const remark = getRemark(allMarks);

    const newStudent = {
      roll,
      student,
      total: 500,
      obtained,
      percentage,
      grade,
      remark,
    };

    setStudents((prev) => [...prev, newStudent]);
    setNotification("Data submitted successfully!");
    setTimeout(() => setNotification(""), 2000);

    setForm({
      roll: "",
      student: "",
      physics: "",
      chemistry: "",
      math: "",
      computer: "",
      english: "",
    });

    localStorage.setItem(student, JSON.stringify(newStudent));
  };

  const getGrade = (percentage) => {
    const p = Number(percentage);
    if (p > 81) return "A";
    if (p > 61) return "B";
    if (p > 41) return "C";
    if (p === 40) return "D";
    return "F";
  };

  const getRemark = (marks) => {
    const isFail = marks.some((mark) => Number(mark) < 40);
    if (isFail) {
      setFailReason("Fail: Less than 40 in one or more subjects");
      return "Fail";
    }
    setFailReason("");
    return "Pass";
  };

  return (
    <div className="container">
      <h2>Grade System Project</h2>

      <div className="input-section">
        <label>Roll No:</label>
        <input
          id="roll"
          value={form.roll}
          onChange={handleChange}
          placeholder="Roll No"
        />

        <label>Student Name:</label>
        <input
          id="student"
          value={form.student}
          onChange={handleChange}
          placeholder="Name"
        />

        <label>Physics:</label>
        <input
          id="physics"
          type="number"
          value={form.physics}
          onChange={handleChange}
          placeholder="Physics"
        />

        <label>Chemistry:</label>
        <input
          id="chemistry"
          type="number"
          value={form.chemistry}
          onChange={handleChange}
          placeholder="Chemistry"
        />

        <label>Math:</label>
        <input
          id="math"
          type="number"
          value={form.math}
          onChange={handleChange}
          placeholder="Math"
        />

        <label>Computer:</label>
        <input
          id="computer"
          type="number"
          value={form.computer}
          onChange={handleChange}
          placeholder="Computer"
        />

        <label>English:</label>
        <input
          id="english"
          type="number"
          value={form.english}
          onChange={handleChange}
          placeholder="English"
        />

        <button id="button" onClick={handleSubmit}>
          Submit
        </button>

        {notification && <div className="notification">{notification}</div>}
        {failReason && <h3>{failReason}</h3>}
      </div>

      <table>
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Student Name</th>
            <th>Total</th>
            <th>Obtained</th>
            <th>Percentage %</th>
            <th>Grade</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu, i) => (
            <tr key={i}>
              <td>{stu.roll}</td>
              <td>{stu.student}</td>
              <td>{stu.total}</td>
              <td>{stu.obtained}</td>
              <td>{stu.percentage}</td>
              <td>{stu.grade}</td>
              <td>{stu.remark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
