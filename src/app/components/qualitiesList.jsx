import React from "react";
import PropTypes from "prop-types";
import Qualitie from "./qualitie";

const QualietiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((q, id) => (
                <Qualitie {...q} key={id} />
            ))}
        </>
    );
};

QualietiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualietiesList;
