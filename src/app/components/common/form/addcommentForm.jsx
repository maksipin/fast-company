import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SelectField from "./selectField";
import { validator } from "../../../utils/validator";
import TextAreaField from "./textAreaField";
import api from "../../../api";

const AddCommentForm = ({ users, pageId, addCommentFunc }) => {
    const [addComment, setAddComment] = useState({ user: "", comment: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (addComment.comment !== "" || addComment.user !== "") {
            validate();
        }
    }, [addComment]);

    const validatorConfig = {
        user: {
            isRequired: {
                message: "Необходимо выбрать пользователя"
            }
        },
        comment: {
            isRequired: {
                message: "Добавьте комментарий"
            }
        }
    };

    const validate = () => {
        const errors = validator(addComment, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleChange = (user) => {
        setAddComment((prevState) => ({
            ...prevState,
            [user.name]: user.value
        }));
    };
    const handleSendComment = (e) => {
        e.preventDefault();
        if (validate()) {
            api.comments
                .add({
                    userId: addComment.user,
                    pageId: pageId,
                    content: addComment.comment
                })
                .then((data) => addCommentFunc(data));
            setAddComment({ user: "", comment: "" });
        }
    };
    const defaultText = Array.isArray(users)
        ? "Выберите пользователя"
        : "Loading...";
    return (
        <form onSubmit={handleSendComment}>
            <div className="mb-4">
                <SelectField
                    key="chose"
                    defaultOption={defaultText} // Надпись по умолчанию
                    options={users} // список для выбора(массив или объект)
                    name="user" // название поля
                    onChange={handleChange} // Функция для обработки события выбора(возвращает {name:ИМЯ, value:id})
                    value={addComment.user} // Выбранный из списка
                    error={errors.user} // Описание ошибки
                />
            </div>
            <div className="mb-4">
                <TextAreaField
                    value={addComment.comment}
                    label={"Сообщение"}
                    name="comment"
                    onChange={handleChange}
                    error={errors.comment}
                />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button
                    className="btn btn-primary me-md-2"
                    type="submit"
                    disabled={!isValid}
                >
                    Опубликовать
                </button>
            </div>
        </form>
    );
};

AddCommentForm.propTypes = {
    users: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    pageId: PropTypes.string,
    addCommentFunc: PropTypes.func
};

export default AddCommentForm;
