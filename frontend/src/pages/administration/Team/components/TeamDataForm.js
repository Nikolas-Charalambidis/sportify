import {Formik} from "formik";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Field, Heading} from "../../../../atoms";
import React from "react";
import * as yup from "yup";
import {Avatar} from "../../../../organisms/Avatar";
import defaultTeamAvatar from "../../../../assets/images/default_team_avatar.svg";
import {useState} from "react";
import {ChangeTeamData, ChangeSetActive} from "../../../../api/team/teamClient_v1";
import {CustomSelect} from "../../../../atoms/Select";
import {useGetSports, useGetTeamTypes} from "../../../../api/others/othersClient_v1";

const schemaChangeData = yup.object().shape({
    name: yup.string().required(),
});

export function TeamDataForm({api, team_data, membersState}) {
    let new_url = team_data.avatar_url === null ? defaultTeamAvatar : team_data.avatar_url;
    const [imageState, setImageState] = useState(new_url);
    const [sportsState] = useGetSports();
    const [typesState] = useGetTeamTypes();


    let new_activation_button_state = team_data.active === 0 ? "Aktivovat" : "Deaktivovat";
    const [activationButtonState, setActivationButtonState] = useState(new_activation_button_state);
    const [status, setStatus] = useState(team_data.active !== 0);
    const [heading, setHeading] = useState(team_data.name);

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
                    id_contact_person: team_data.id_contact_person,
                    active: status
                }}
                validationSchema={schemaChangeData}
                onSubmit={values => {
                    ChangeTeamData(api, team_data.id_team, values, setHeading);
                }}
            >{({handleSubmit, setFieldValue, errors}) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Heading className="pageHeading mt-4 mb-5">{heading}</Heading>
                    <Row>
                        <Col className="d-lg-none text-center mb-5">
                            <Avatar api={api} setImageState={setImageState} imageState={imageState} type={"teams"}
                                    id={team_data.id_team}/>
                        </Col>
                        <Col xl={10} lg={10}>
                            <Row>
                                <Col sm={{span: 6, offset: 0}}>
                                    <Field label="Název týmu" name="name" type="text" message="Vyplňte týmove jméno."
                                           isInvalid={!!errors.name}/>
                                </Col>
                                <Col sm={{span: 6, offset: 0}}>
                                    <CustomSelect label="Sport" name="id_sport"
                                                  options={sportsState.sports}
                                                  getOptionLabel={option => `${option.sport}` }
                                                  getOptionValue={option => `${option.id_sport}`}
                                                  placeholder={team_data.sport}
                                                  onChange={option => setFieldValue("id_sport", `${option.id_sport}`)}
                                                  isSearchable={true}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={{span: 4, offset: 0}}>
                                    <CustomSelect label="Typ týmu" name="id_type"
                                                  options={typesState.types}
                                                  getOptionLabel={option => `${option.type}` }
                                                  getOptionValue={option => `${option.id_type}`}
                                                  placeholder={team_data.type}
                                                  onChange={option => setFieldValue("id_type", `${option.id_type}`)}
                                                  isSearchable={true}
                                    />
                                </Col>
                                <Col sm={{span: 4, offset: 0}}>
                                    <CustomSelect label="Vedoucí týmu" name="id_leader"
                                          options={membersState.players}
                                          getOptionLabel={option => `${option.name}` }
                                          getOptionValue={option => `${option.id_user}`}
                                          placeholder={team_data.leader}
                                          onChange={option => setFieldValue("id_leader", `${option.id_user}`)}
                                          isSearchable={true}
                                    />
                                </Col>
                                <Col sm={{span: 4, offset: 0}}>
                                    <CustomSelect label="Kontaktní osoba" name="id_contact_person"
                                          options={membersState.players}
                                          getOptionLabel={option => `${option.name}` }
                                          getOptionValue={option => `${option.id_user}`}
                                          placeholder={team_data.contact_person}
                                          onChange={option => setFieldValue("id_contact_person", `${option.id_user}`)}
                                          isSearchable={true}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col xl={2} lg={2} className="d-none d-lg-block">
                            <Avatar api={api} setImageState={setImageState} imageState={imageState} type={"teams"}
                                    id={team_data.id_team}/>
                        </Col>
                    </Row>

					<Row>
						<Col className="mb-4 mt-lg-0" lg={{span: 5, offset: 0}}>
							<Button type="submit" block>
								Uložit
							</Button>
						</Col>
						<Col className="mb-4 mt-lg-0" lg={{span: 5, offset: 0}}>
							<Button type="button" variant="secondary" block onClick={() => {
                                ChangeSetActive(api, team_data.id_team, status, setStatus, setActivationButtonState);
                            }}>
								{activationButtonState}
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