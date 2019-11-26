import React from 'react';
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../../assets/images/loading.gif";
import {Field, Heading} from "../../../../atoms";
import {Formik} from "formik";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import {changeShots} from "../../../../api/eventClient_v1";
import {useApi} from "../../../../hooks/useApi";

const schema = yup.object().shape({
    id_event: yup.number().integer().required(),
    value: yup.number().integer().min(0).required(),
});

export function Shots({shotsState}) {
    const api = useApi();

    const handleChangeShots = async (values) => {
        const result = await changeShots(api, values);
        if(result === false) {
            window.location.reload();
        }
    };

    return (
        <div>
            <Heading size="lg" className="mt-5 h3MatchDetail text-left">Střely</Heading>
            {shotsState.isLoading &&  <div className="text-center"><Image src={loadingGif}/></div>}
            {(!shotsState.isLoading && shotsState.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!shotsState.isLoading && !shotsState.error) &&
            <div>
                <Formik
                    validationSchema={schema}
                    initialValues={{
                        id_event: shotsState.shots.id_event,
                        value: shotsState.shots.value
                    }}
                    onSubmit={values => {
                        handleChangeShots(values).then();
                    }}
                >{({handleSubmit, errors}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Field label="Počet střel" name="value" type="number"
                                   message="Vyplňte prosím počet střel"
                                   isInvalid={!!errors.value}/>
                        <Button variant="primary" type="submit">
                            Změnit počet střel
                        </Button>
                    </Form>
                )}
                </Formik>
            </div>
            }
        </div>
    );
}
