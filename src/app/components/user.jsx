import React from "react";
import BookMark from "./bookmark";
import Qualitie from "./qualitie";

function User({ users, onHandleDelete, onHandleBookMark }) {
    const userInfo = users.map((user, index) => {
        return (
            <tr key={index}>
                <td>{user.name}</td>
                <td>
                    {" "}
                    {user.qualities.map((q, id) => (
                        <Qualitie {...q} key={id} />
                    ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} /5</td>
                <td>
                    <button
                        type="button"
                        className="btn bg-light text-dark"
                        onClick={() => onHandleBookMark(user._id)}
                    >
                        {/* <BookMark status={user.bookmark} /> */}
                    </button>
                </td>
                <td>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => onHandleDelete(user._id)}
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
