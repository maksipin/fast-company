import React from "react";
import BookMark from "./bookmark";
import Qualitie from "./qualitie";

function User(props) {
  const userInfo = props.users.map((user, index) => {
    return (
      <tr>
        <td id={index}>{user.name}</td>
        <td>
          {" "}
          {user.qualities.map((q) => (
            <Qualitie {...q} />
          ))}
        </td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate} /5</td>
        <td>
          <button
            type="button"
            className="btn bg-light text-dark"
            onClick={() => props.onHandleBookMark(user._id)}
          >
            <BookMark status={user.bookmark} />
          </button>
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => props.onHandleDelete(user._id)}
          >
            delete
          </button>
        </td>
      </tr>
    );
  });
  return userInfo;
}

export default User;
