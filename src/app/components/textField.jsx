import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    placeholder
}) => {
    const [showPasword, setShowPassword] = useState(false);

    const getInputClasses = () => {
        return (
            "form-control" +
            (label ? (error ? " is-invalid" : " is-valid") : "")
        );
    };
    const toggleShowPassord = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div className="m-3">
            <label htmlFor={name} className="form-label">
                {label}
            </label>
            <div className="input-group has-validation">
                <input
                    type={showPasword ? "text" : type}
                    className={getInputClasses()}
                    id={name}
                    aria-describedby="emailHelp"
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />

                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassord}
                    >
                        <i
                            className={
                                "bi bi-eye" +
                                (showPasword ? "-slash-fill" : "-fill")
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string
};

export default TextField;
