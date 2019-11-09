import {Formik} from "formik";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Field, Heading} from "../../../../atoms";
import React from "react";
import * as yup from "yup";
import {Avatar} from "../../../../organisms/Avatar";
import defaultTeamAvatar from "../../../../assets/images/default_team_avatar.svg";
import {useState} from "react";
import {ChangeTeamData} from "../../../../api/team/teamClient_v1";
import {Select} from "../../../../atoms/Select";
import {useGetSports, useGetTeamTypes} from "../../../../api/others/othersClient_v1";

const schemaChangeData = yup.object().shape({
    name: yup.string().required(),
});

export function TeamDataForm({api, team_data, membersState}) {
    let new_url = team_data.avatar_url === null ? defaultTeamAvatar : team_data.avatar_url;
    const [imageState, setImageState] = useState(new_url);
    const [sportsState] = useGetSports();
    const [typesState] = useGetTeamTypes();


    return (
        <div>
            {(sportsState.isLoading || typesState.isLoading) && <div>Načítám data...</div>}
            {((!sportsState.isLoading && sportsState.error) || (!typesState.isLoading && typesState.error)) && <div>Data se nepodařilo načíst</div>}
            {((!sportsState.isLoading && !sportsState.error) && (!typesState.isLoading && !typesState.error)) &&
            <Formik
                initialValues={{
                    name: team_data.name,
                    id_type: team_data.id_type,
                    id_sport: team_data.id_sport,
                    id_leader: team_data.id_leader,
                    id_contact_person: team_data.id_contact_person
                }}
                validationSchema={schemaChangeData}
                onSubmit={values => {
                    ChangeTeamData(api, team_data.id_team, values);
                }}
            >{({handleSubmit, errors}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Heading className="pageHeading mt-4 mb-5">{team_data.name}</Heading>
                    <Row>
                        <Col className="d-lg-none text-center mb-5">
                            <Avatar api={api} setImageState={setImageState} imageState={imageState} type={"teams"}
                                    id={team_data.id_team}/>
                        </Col>
                        <Col xl={10} lg={10}>
                            <Row>
                                <Col sm={{span: 6, offset: 0}}>
                                    <Field label="Nazev" name="name" type="text" message="Vyplňte týmove jméno."
                                           isInvalid={!!errors.name}/>
                                </Col>
                                <Col sm={{span: 6, offset: 0}}>
                                    <Select label="Sport" name="id_sport" mapping={{key: "id_sport", value: "sport"}}
                                            defaultID={team_data.id_sport} options={sportsState.sports}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={{span: 4, offset: 0}}>
                                    <Select label="Typ týmu" name="id_type" mapping={{key: "id_type", value: "type"}}
                                            defaultID={team_data.id_type} options={typesState.types}/>
                                </Col>
                                <Col sm={{span: 4, offset: 0}}>
                                    <Select label="Vedoucí týmu" name="id_leader" mapping={{key: "id_user", value: "name"}}
                                            defaultID={team_data.id_leader} options={membersState.players}/>
                                </Col>
                                <Col sm={{span: 4, offset: 0}}>
                                    <Select label="Kontaktní osoba" name="id_contact_person" mapping={{key: "id_user", value: "name"}}
                                            defaultID={team_data.id_contact_person} options={membersState.players}/>
                                </Col>
                            </Row>
                        </Col>

                        <Col xl={2} lg={2} className="d-none d-lg-block">
                            <Avatar api={api} setImageState={setImageState} imageState={imageState} type={"teams"}
                                    id={team_data.id_team}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col className="mb-3 mt-lg-0" lg={{span: 3, offset: 0}}>
                            <Button type="submit" block>
                                Uložit
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}
            </Formik>
            }
        </div>
    );
}