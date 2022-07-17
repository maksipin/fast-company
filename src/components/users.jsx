import React from "react";
import User from "./user";

const Users = (props) => {
  return props.length < 1 ? (
    <h2>
      <span class="badge bg-danger m-2">никто не тусанет с тобой сегодня</span>
    </h2>
  ) : (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <User {...props} onHandleDelete={props.onHandleDelete} />
        </tbody>
      </table>
    </div>
  );
};

export default Users;
