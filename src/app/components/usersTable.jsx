import React from "react";
import PropTypes from "prop-types";
import BookMark from "./bookmark";
import QualietiesList from "./qualitiesList";
import Table from "./table";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onHandleDelete,
    onHandleBookMark
}) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <QualietiesList qualities={user.qualities} />
        },
        profession: {
            path: "profession.name",
            name: "Профессия"
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <button
                    type="button"
                    className="btn bg-light text-dark"
                    onClick={() => onHandleBookMark(user._id)}
                >
                    <BookMark status={user.bookmark} />
                </button>
            )
        },
        delete: {
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onHandleDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return <Table {...{ onSort, selectedSort, columns, data: users }} />;
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onHandleDelete: PropTypes.func.isRequired,
    onHandleBookMark: PropTypes.func.isRequired
};

export default UserTable;
