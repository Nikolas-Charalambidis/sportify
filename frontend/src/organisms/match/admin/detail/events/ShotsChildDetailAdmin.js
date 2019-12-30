import React from 'react';
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../../../assets/images/loading.gif";
import {Heading} from "../../../../../basicComponents";
import {Formik} from "formik";
import * as yup from "yup";
import {changeShots} from "../../../../../api/eventClient_v1";
import {useApi} from "../../../../../hooks/useApi";
import {ShotsForm} from "../../base/ShotsForm";

const schema = yup.object().shape({
    id_event: yup.number().integer().required(),
    value: yup.number().integer().min(0).required(),
});

export function ShotsChildDetailAdmin({shotsState}) {
    const api = useApi();

    const handleChangeShots = async (values) => {
        const result = await changeShots(api, values);
        if(result === false) {
            window.location.reload();
        }
    };

    return (
        <div>
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
                    <ShotsForm handleSubmit={handleSubmit} errors={errors}/>
                )}
                </Formik>
            </div>
            }
        </div>
    );
}
