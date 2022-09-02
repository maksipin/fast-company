import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import TextField from "./textField";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";

const Users = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProffesion] = useState(api.professions.fetchAll());
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const [searchBy, setSearchBy] = useState("");

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

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

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProffesion(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchBy("");
    };
    const handleSearch = ({ target }) => {
        setSearchBy(target.value);
        setSelectedProf();
    };

    const handleSort = (item) => {
        setSortBy(item);
    };
    if (users) {
        const filterdUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users.filter((user) =>
                  JSON.stringify(user.name).includes(searchBy)
              );

        const count = filterdUsers.length;
        const sortedUsers = _.orderBy(
            filterdUsers,
            [sortBy.path],
            [sortBy.order]
        );

        const userCrop = paginate(sortedUsers, currentPage, pageSize);

        if (userCrop.length < 1 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <TextField
                        name="search"
                        value={searchBy}
                        onChange={handleSearch}
                        placeholder="Search..."
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onHandleDelete={handleDelete}
                            onHandleBookMark={handleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};

export default Users;
