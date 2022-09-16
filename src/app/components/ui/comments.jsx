import React, { useState, useEffect } from "react";
import api from "../../api";
import AddCommentForm from "../common/form/addcommentForm";
import CommentList from "./commentList";
import PropTypes from "prop-types";
import { timeSpan } from "../../utils/timeSpan";

const Comments = ({ userId }) => {
    const [users, setUsers] = useState({ value: "", label: "" });
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments.fetchCommentsForUser(userId).then((data) =>
            setComments(() => {
                return data.sort((a, b) => b.created_at - a.created_at);
            })
        );
    }, []);

    useEffect(() => {
        api.users.fetchAll().then((data) =>
            setUsers(() =>
                data.map((user) => {
                    return { value: user._id, label: user.name };
                })
            )
        );
    }, []);

    const handleDelete = (id) => {
        api.comments.remove(id).then();
        setComments((prevState) =>
            prevState.filter((comment) => comment._id !== id)
        );
    };

    const getUserNameById = (data, id) => {
        if (Array.isArray(data)) {
            const userName = data.reduce((sum, user) => {
                if (user.value === id) {
                    sum = user.label;
                }
                return sum;
            }, {});
            return userName;
        }
    };
    const addComment = (comment) => {
        setComments((prevState) => [comment, ...prevState]);
    };

    const getFormat = (data) => {
        return data.map((comment) => {
            const userName = getUserNameById(users, comment.userId);
            const timeComment = timeSpan(+comment.created_at);
            return {
                ...comment,
                userId: userName,
                created_at: timeComment
            };
        });
    };
    return (
        <>
            <div className="card mb-2">
                <div className="card-body">
                    <div>
                        <h2>New comment</h2>
                        <AddCommentForm
                            pageId={userId}
                            users={users}
                            addCommentFunc={addComment}
                        />
                    </div>
                </div>
            </div>

            <CommentList
                comments={getFormat(comments)}
                onDelete={handleDelete}
            />
        </>
    );
};

Comments.propTypes = {
    userId: PropTypes.string
};

export default Comments;
