import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashTasks.css';

const DashTasks = () => {
  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [newTarget, setNewTarget] = useState({
    title: '',
    category: 'Technical',
    dueDate: '',
  });

  const fetchGoals = async () => {
    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );
      console.log("User:", user);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/goals/${user._id}`
      );

      console.log("Response:", res.data);

      setTasks(res.data.goals);


    } catch (error) {

      console.log("Fetch Goals Error:", error);

    }
  };
  useEffect(() => {
    fetchGoals();
  }, []);

  const completed = tasks.filter(task => task.done).length;

  const pct =
    tasks.length > 0
      ? Math.round((completed / tasks.length) * 100)
      : 0;
  const toggle = async (id) => {

    try {

      const task = tasks.find(
        t => t._id === id
      );

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/goals/${id}`,
        {
          done: !task.done
        }
      );

      setTasks(
        tasks.map(t =>
          t._id === id
            ? res.data.goal
            : t
        )
      );

    } catch (error) {

      console.log(error);

    }
  };

  const createTarget = async () => {
    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/goals`,
        {
          userId: user._id,
          title: newTarget.title,
          category: newTarget.category,
          dueDate: newTarget.dueDate,
          done: false,
          icon: "🎯"
        }
      );

      setTasks(prev => [
        ...prev,
        res.data.goal
      ]);

      setNewTarget({
        title: '',
        category: 'Technical',
        dueDate: '',
      });

      setShowModal(false);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="dtk">
      {/* Onboarding header */}
      <div className="dtk__head">
        <div>
          <div className="dtk__title">TODAY’S GOALS</div>
          <div className="dtk__score">{completed}/{tasks.length}</div>
        </div>
        <div className="dtk__pct-wrap">
          <div className="dtk__pct-num">{pct}%</div>
          <div className="dtk__pct-label">Goal Progress</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="dtk__bar-track">
        <div className="dtk__bar-fill" style={{ width: `${pct}%` }}>
          <div className="dtk__bar-shine" />
        </div>
      </div>

      {/* Tasks */}
      <div className="dtk__list">
        {tasks.map((t, i) => (
          <div
            key={t._id}
            className={`dtk__task ${t.done ? 'dtk__task--done' : ''}`}
            style={{ '--ti': i }}
            onClick={() => toggle(t._id)}
          >
            <div className="dtk__task-icon-wrap">{t.icon}</div>
            <div className="dtk__task-info">
              <span className="dtk__task-title">{t.title}</span>
              <span className="dtk__task-date">{t.date}</span>
            </div>
            <div className={`dtk__check ${t.done ? 'dtk__check--done' : ''}`}>
              {t.done && <span className="dtk__check-tick">✓</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button
        className="dtk__add"
        onClick={() => setShowModal(true)}
      >
        + Create New Target
      </button>

      {showModal && (
        <div className="target-modal-overlay">
          <div className="target-modal">

            <h2>Create New Target</h2>

            <input
              type="text"
              placeholder="Target Name"
              value={newTarget.title}
              onChange={(e) =>
                setNewTarget({
                  ...newTarget,
                  title: e.target.value
                })
              }
            />

            <select
              value={newTarget.category}
              onChange={(e) =>
                setNewTarget({
                  ...newTarget,
                  category: e.target.value
                })
              }
            >
              <option>Technical</option>
              <option>Aptitude</option>
              <option>HR</option>
              <option>Communication</option>
              <option>React</option>
            </select>

            <input
              type="date"
              value={newTarget.dueDate}
              onChange={(e) =>
                setNewTarget({
                  ...newTarget,
                  dueDate: e.target.value
                })
              }
            />

            <div className="target-modal-buttons">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="create-btn"
                onClick={createTarget}
              >
                Create
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default DashTasks;