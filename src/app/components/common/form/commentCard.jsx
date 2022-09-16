import React from "react";
import PropTypes from "prop-types";

const CommentCard = ({ name, time, comment, id, onClick }) => {
    const handleDelete = (id) => {
        onClick(id);
    };
    if (name) {
        return (
            <>
                <div className="bg-light card-body mb-3">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex flex-start">
                                <img
                                    src={`https://avatars.dicebear.com/api/avataaars/${(
                                        Math.random() + 1
                                    )
                                        .toString(36)
                                        .substring(7)}.svg`}
                                    className="rounded-circle shadow-1-strong me-3"
                                    alt="avatar"
                                    width="65"
                                    height="65"
                                />
                                <div
                                    className="
                            flex-grow-1 flex-shrink-1
                        "
                                >
                                    <div className="mb-4">
                                        <div
                                            className="
                                    d-flex
                                    justify-content-between
                                    align-items-center
                                "
                                        >
                                            <p className="mb-1">
                                                {name}
                                                <span className="small ms-2">
                                                    {time}
                                                </span>
                                            </p>
                                            <button
                                                className="
                                        btn btn-sm
                                        text-primary
                                        d-flex
                                        align-items-center
                                    "
                                                key={id + name}
                                                onClick={() => handleDelete(id)}
                                            >
                                                <i
                                                    className="
                                            bi bi-x-lg
                                        "
                                                ></i>
                                            </button>
                                        </div>
                                        <p className="small mb-0">{comment}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <div className="bg-light card-body mb-3">
                <div className="row">
                    <div className="col">
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }
};

CommentCard.propTypes = {
    name: PropTypes.string,
    time: PropTypes.string,
    comment: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func
};

export default CommentCard;
