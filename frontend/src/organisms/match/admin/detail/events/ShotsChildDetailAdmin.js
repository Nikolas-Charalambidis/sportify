import React from 'react';
import {Formik} from "formik";
import * as yup from "yup";
import {changeShots} from "../../../../../api/eventClient_v1";
import {useApi} from "../../../../../hooks/useApi";
import {ShotsForm} from "../../base/ShotsForm";
import {LoadingGif} from "../../../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../../../basicComponents/DataLoadingError";
import {UnexpectedError} from "../../../../../basicComponents/UnexpectedError";

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

    if(shotsState.isLoading) {
        return <LoadingGif />;
    }

    if(!shotsState.isLoading && shotsState.error) {
        return <DataLoadingError />;
    }

    return (
        <div>
            {(!shotsState.isLoading && !shotsState.error) ?
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
                : <UnexpectedError/>
            }
        </div>
    );
}
