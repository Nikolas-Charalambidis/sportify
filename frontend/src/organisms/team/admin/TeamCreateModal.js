import {Modal} from "react-bootstrap";
import {Formik} from "formik";
import React from "react";
import * as yup from "yup";
import {createTeam} from "../../../api/teamClient_v1";
import {useGetSports, useGetTeamPositions, useGetTeamTypes} from "../../../api/othersClient_v1";
import {useHistory} from "react-router";
import {TeamCreateModalForm} from "./TeamCreateModalForm";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";

export function TeamCreateModal({api, id_user, show, handleClose}) {
    let history = useHistory();
    const schemaCreateTeam = yup.object().shape({
        name: yup.string().required(),
    });

    const [sportsState] = useGetSports();
    const [typesState] = useGetTeamTypes();
    const [positionsState] = useGetTeamPositions();

    if(sportsState.isLoading || typesState.isLoading || positionsState.isLoading) {
        return <LoadingGif />;
    }

    if(
        (!sportsState.isLoading && sportsState.error) ||
        (!typesState.isLoading && typesState.error) ||
        (!positionsState.isLoading && positionsState.error)
    ) {
        return <DataLoadingError />;
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <div>
                {(
                    (!sportsState.isLoading && !sportsState.error) &&
                    (!typesState.isLoading && !typesState.error) &&
                    (!positionsState.isLoading && !positionsState.error)
                ) ?
                    <Formik
                        validationSchema={schemaCreateTeam}
                        initialValues={{
                            name: '',
                            id_sport: sportsState.sports[0].id_sport,
                            id_type: typesState.types[0].id_type,
                            id_position: positionsState.positions[0].id_position}}
                        onSubmit={values => {
                            createTeam(history, api, id_user, values);
                        }}
                    >{({handleSubmit, setFieldValue, errors}) => (
                        <TeamCreateModalForm handleSubmit={handleSubmit} setFieldValue={setFieldValue} errors={errors}
                                             sportsState={sportsState} typesState={typesState} positionsState={positionsState}
                                             handleClose={handleClose}
                        />
                    )}
                    </Formik>
                    : <UnexpectedError/>
                }
           </div>
        </Modal>
    )
}
