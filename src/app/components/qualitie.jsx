import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, name, _id }) => {
    let qColor = "badge m-1 bg-";
    qColor += color;
    return (
        <span id={_id} className={qColor}>
            {name}
        </span>
    );
};

Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default Qualitie;
