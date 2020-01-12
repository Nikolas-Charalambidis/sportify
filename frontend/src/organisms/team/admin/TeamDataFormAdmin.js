import {Formik} from "formik";
import React from "react";
import * as yup from "yup";
import defaultTeamAvatar from "../../../assets/images/default_team_avatar.svg";
import {useState} from "react";
import {ChangeTeamData} from "../../../api/teamClient_v1";
import {useGetSports, useGetTeamTypes} from "../../../api/othersClient_v1";
import {useApi} from "../../../hooks/useApi";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";
import {TeamDataInnerForm} from "./TeamDataInnerForm";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";

const schemaChangeData = yup.object().shape({
    name: yup.string().required(),
});

export function TeamDataFormAdmin({team_data, membersState}) {
    const api = useApi();

    let new_url = team_data.avatar_url === null ? defaultTeamAvatar : team_data.avatar_url;
    let new_activation_button_state = team_data.active === 0 ? "Aktivovat" : "Deaktivovat";

    const [imageState, setImageState] = useState(new_url);
    const [sportsState] = useGetSports();
    const [typesState] = useGetTeamTypes();

    const [activationButtonState, setActivationButtonState] = useState(new_activation_button_state);
    const [status, setStatus] = useState(team_data.active !== 0);
    const [heading, setHeading] = useState(team_data.name);

    if(sportsState.isLoading || typesState.isLoading) {
        return <LoadingGif />;
    }

    if((!sportsState.isLoading && sportsState.error) || (!typesState.isLoading && typesState.error)) {
        return <DataLoadingError />;
    }

    return (
        <div>
            {((!sportsState.isLoading && !sportsState.error) && (!typesState.isLoading && !typesState.error)) ?
                <Formik
                    initialValues={{
                        name: team_data.name,
                        id_type: team_data.id_type,
                        id_sport: team_data.id_sport,
                        id_leader: team_data.id_leader,
                        id_contact_person: team_data.id_contact_person,
                        active: status
                    }}
                    validationSchema={schemaChangeData}
                    onSubmit={values => {
                        ChangeTeamData(api, team_data.id_team, values, setHeading);
                    }}
                >{({handleSubmit, setFieldValue, errors}) => (
                    <TeamDataInnerForm api={api} team_data={team_data} heading={heading}
                                       imageState={imageState} setImageState={setImageState} membersState={membersState}
                                       handleSubmit={handleSubmit} setFieldValue={setFieldValue} errors={errors}
                                       sportsState={sportsState} typesState={typesState}
                                       setStatus={setStatus} status={status}
                                       activationButtonState={activationButtonState} setActivationButtonState={setActivationButtonState}
                    />
                )}
                </Formik>
                : <UnexpectedError/>
            }
        </div>
    );
}