import React from "react";
import PropTypes from "prop-types";
import CommentCard from "../common/form/commentCard";

const CommentList = ({ comments, onDelete }) => {
    if (comments.length !== 0) {
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <h2>Comments</h2>
                    <hr />
                    {comments.map((c) => (
                        <CommentCard
                            id={c._id}
                            key={c._id}
                            name={c.userId}
                            time={c.created_at}
                            comment={c.content}
                            onClick={onDelete}
                        />
                    ))}
                </div>
            </div>
        );
    }
};
CommentList.propTypes = {
    comments: PropTypes.array,
    onDelete: PropTypes.func
};

export default CommentList;
