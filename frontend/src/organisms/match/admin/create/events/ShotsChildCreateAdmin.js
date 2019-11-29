import React from 'react';
import {Formik} from "formik";
import * as yup from "yup";
import {ShotsForm} from "../../base/ShotsForm";

const schema = yup.object().shape({
    value: yup.number().integer().min(0).required(),
});

export function ShotsChildCreateAdmin({state, setState}) {
    return (
        <Formik
            validationSchema={schema}
            initialValues={{
                value: state.shots
            }}
            onSubmit={values => {
                const {id_team, matchups, events} = state;
                setState({
                    id_team: id_team,
                    matchups: matchups,
                    events: events,
                    shots: values.value
                });
            }}
        >{({handleSubmit, errors}) => (
            <ShotsForm handleSubmit={handleSubmit} errors={errors}/>
        )}
        </Formik>

    );
}
