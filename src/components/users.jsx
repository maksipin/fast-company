import React from "react";
import { useState } from "react";
import api from "../API";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleDelete = (userId) => {
    setUsers((users) => {
      return users.filter((user) => user._id !== userId);
    });
  };

  const renderPhrase = (number) => {
    const people = number === 1 || number > 4 ? "человек" : "человека";
    return (
      <h2>
        <span class="badge bg-primary m-2">
          {number} {people} тусанет с тобой сегодня
        </span>
      </h2>
    );
  };

  const test = () => false;

  const userInfo = users.map((user, index) => {
    const qualities = user.qualities.map((q) => {
      let color = "badge m-1 bg-";
      color += q.color;
      return <span className={color}>{q.name}</span>;
    });
    return (
      <tr>
        <td id={index}>{user.name}</td>
        <td>{qualities}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate} /5</td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => handleDelete(user._id)}
          >
            delete
          </button>
        </td>
      </tr>
    );
  });

  return users.length < 1 ? (
    <h2>
      <span class="badge bg-danger m-2">никто не тусанет с тобой сегодня</span>
    </h2>
  ) : (
    <div>
      {renderPhrase(users.length)}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{userInfo}</tbody>
      </table>
    </div>
  );
};

export default Users;
