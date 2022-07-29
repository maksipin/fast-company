import React, { useState, useEffect } from "react";
import Users from "./app/components/users";

import api from "./app/api";

function App() {
    const [users, setUsers] = useState();
    const handleDelete = (userId) => {
        setUsers((users) => {
            return users.filter((user) => user._id !== userId);
        });
    };
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleBookMark = (id) => {
        const bookmark = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark;
            }
            return user;
        });
        setUsers(bookmark);
    };

    return (
        <div>
            {users && (
                <Users
                    users={users}
                    onHandleDelete={handleDelete}
                    onHandleBookMark={handleBookMark}
                />
            )}
        </div>
    );
}

export default App;
