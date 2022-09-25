import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import QualitieService from "../services/qualities.service";
import { toast } from "react-toastify";

const QualitieContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitieContext);
};

export const QualitieProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    useEffect(() => {
        getQualitiesList();
    }, []);
    function errorCatcher(error) {
        const { message } = error.response;
        setError(message);
    }
    function getQualitie(quality) {
        return qualities.filter((p) => quality.find((id) => p._id === id));
    }

    async function getQualitiesList() {
        try {
            const { content } = await QualitieService.get();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    return (
        <QualitieContext.Provider value={{ isLoading, qualities, getQualitie }}>
            {children}
        </QualitieContext.Provider>
    );
};

QualitieProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
