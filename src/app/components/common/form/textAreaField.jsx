import React from "react";
import PropTypes from "prop-types";

const TextAreaField = ({ label, onChange, name, error, value }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <>
            <label forhtml={name} className="form-label">
                {label}
            </label>
            <textarea
                value={value}
                name={name}
                className={getInputClasses()}
                id={name}
                rows="3"
                onChange={handleChange}
            ></textarea>
            {error && <div className="invalid-feedback">{error}</div>}
        </>
    );
};

TextAreaField.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    error: PropTypes.string,
    value: PropTypes.string
};

export default TextAreaField;
