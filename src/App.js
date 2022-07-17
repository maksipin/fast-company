import React, {useState} from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus"
import api from "./api"

function App () {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers((users) => {
        return users.filter((user) => user._id !== userId);
        });
    };
    const handleBookMark = (id) => {
        const bookmark = users.map((user) => {
            if(user._id == id) {
                user.bookmark=!user.bookmark;
            }
            return user;
        });
        setUsers(bookmark);
    };   

    return (
        <div>
            <SearchStatus length={users.length} />                              
            <Users users={users} onHandleDelete={handleDelete} onHandleBookMark={handleBookMark} />
        </div>
    );
}

export default App;
