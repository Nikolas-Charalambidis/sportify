import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Field, Heading} from "../../../basicComponents";
import {Avatar} from "../../../basicComponents/Avatar";
import {CustomSelect} from "../../../basicComponents/Select";
import {ChangeSetActive} from "../../../api/teamClient_v1";

export function TeamDataInnerForm(
    {
        api, team_data, heading,
        imageState, setImageState, membersState,
        handleSubmit, setFieldValue, errors, sportsState, typesState,
        status, setStatus, activationButtonState, setActivationButtonState
    }
  ) {
    return (
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
    );
}
