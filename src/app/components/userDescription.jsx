import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import QualietiesList from "./qualitiesList";

const UserDescription = ({ match }) => {
    const userId = match.params.userId;
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((userID) => setUser(userID));
    }, []);

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия:{user.profession.name}</h2>
                <QualietiesList qualities={user.qualities} />
                <p>completedMeetings:{user.completedMeetings}</p>
                <h2>Rate:{user.rate}</h2>
                <a className="btn btn-warning" href="/users" role="button">
                    Все пользователи
                </a>
            </>
        );
    }
    return <p>loading...</p>;
};

UserDescription.propTypes = {
    match: PropTypes.object
};

export default UserDescription;
