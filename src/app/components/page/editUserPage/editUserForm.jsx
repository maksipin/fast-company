import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import TextField from "../../common/form/textField";
import api from "../../../api";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

const UserEditForm = () => {
    const history = useHistory();
    const params = useParams();
    const { userId } = params;
    const [data, setData] = useState("");
    const [qualities, setQualities] = useState([]);
    const [professions, setProfession] = useState([]);
    console.log("data", data);
    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    useEffect(() => {
        api.users.getById(userId).then((data) =>
            setData({
                _id: data._id,
                name: data.name,
                email: data.email,
                sex: data.sex,
                profession: data.profession._id,
                qualities: data.qualities.map((q) => ({
                    value: q._id,
                    label: q.name,
                    color: q.color
                })),
                completedMeetings: data.completedMeetings,
                rate: data.rate,
                bookmark: data.bookmark
            })
        );
    }, []);

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfession(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        console.log("ChangeData", data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { profession, qualities } = data;
        api.users.update(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
        history.push(`/users/${userId}`);
    };
    return data ? (
        <div className="container mt-5">
            <Link to={`/users/${userId}`}>
                <button className="btn btn-primary w-20">Назад</button>
            </Link>
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            options={professions}
                            name="profession"
                            onChange={handleChange}
                            value={data.profession}
                        />
                        <RadioField
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={data.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваш пол"
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            defaultValue={data.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                        >
                            Обновить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    ) : (
        <h2>loading...</h2>
    );
};

export default UserEditForm;
