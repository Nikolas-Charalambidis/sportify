import React, { useState } from 'react';
import { Heading } from '../../../atoms';
import { Breadcrumb, Button, Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { isEmpty } from 'ramda';
import { useGetTeams } from '../../../api/teamClient_v1';
import { CustomSelect } from '../../../atoms/Select';
import { PlayerSelectModal } from '../../match/create-form/components/PlayerSelectModal';
import { PlayersTable } from '../../match/create-form/components/PlayersTable';

let selectedPlayers = [];

function getTeam(state) {
  return state.teams_data;
}

const schema = yup.object().shape({
  id_team_home: yup.string().required(),
  id_team_visiting: yup.number().required(),
});

export function MatchCreateForm() {
    const [state] = useGetTeams();
    const teams = getTeam(state);

    const [homePlayersState, setHomePlayers] = useState({ id: '', players: [] });
    const [visitingPlayersState, setVisitingPlayers] = useState({id: '', players: [] });

    const [showHomePlayersModal, setShowHomePlayersModal] = useState(false);
    const [showVisitingPlayersModal, setShowVisitingPlayersModal] = useState(false);
    const handleClose = () => {
    setShowHomePlayersModal(false);
    setShowVisitingPlayersModal(false);
    };

    const [allEvents, setEvents] = useState([]);

    function test() {
        console.log(allEvents);
    };



    return (
    <div>
        <Breadcrumb>
        <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
        <Breadcrumb.Item active>Nový zápas</Breadcrumb.Item>
        </Breadcrumb>

        {state.isLoading && <div>Načítám data...</div>}
        {!state.isLoading && state.error && <div>Data se nepodařilo načíst</div>}
        {!state.isLoading && !state.error && (
        <Formik
            initialValues={{
            id_team_home: teams.id_team,
            id_team_visiting: teams.id_team,
            }}
            validationSchema={schema}
            onSubmit={values => {
            console.log('submit', values);
            console.log('players', selectedPlayers);
            }}
        >
            {({ handleSubmit, setFieldValue, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
                <Heading className="pageHeading mt-4 mb-5">Nový zápas</Heading>
                <Row>
                <Col xl={12} lg={12}>
                    <Row>
                    <Col sm={{ span: 6, offset: 0 }}>
                        <CustomSelect
                        label="Domácí"
                        name="id_team_home"
                        options={teams}
                        getOptionLabel={option => `${option.name}`}
                        getOptionValue={option => `${option.id_team}`}
                        placeholder="Vyberte tým"
                        onChange={option => {
                            setFieldValue('id_team_home', `${option.id_team}`);
                            setHomePlayers({
                            id: option.id_team,
                            players: [],
                            });
                        }}
                        isSearchable={true}
                        />
                    </Col>
                    <Col sm={{ span: 6, offset: 0 }}>
                        <div className="form-group">
                        <div
                            className="form-label"
                            style={{ height: '27px', marginBottom: '8px' }}
                        />
                        <Button
                            type="submit"
                            variant="secondary"
                            block
                            onClick={() => setShowHomePlayersModal(true)}
                            disabled={isEmpty(homePlayersState.id)}
                        >
                            Soupiska domácích
                        </Button>
                        </div>
                    </Col>
                    {!isEmpty(homePlayersState.players) && (
                        <Col>
                                                <PlayersTable id_team={Number(values.id_team_home)} state={homePlayersState} events={allEvents} setEvent={setEvents} host={true}/>
                        </Col>
                    )}
                    </Row>
                    <Row>
                    <Col sm={{ span: 6, offset: 0 }}>
                        <CustomSelect
                        label="Hosté"
                        name="id_team_visiting"
                        options={teams}
                        getOptionLabel={option => `${option.name}`}
                        getOptionValue={option => `${option.id_team}`}
                        placeholder="Vyberte tým"
                        onChange={option => {
                            setFieldValue(
                            'id_team_visiting',
                            `${option.id_team}`,
                            );
                            setVisitingPlayers({
                            id: option.id_team,
                            players: [],
                            });
                        }}
                        isSearchable={true}
                        />
                    </Col>
                    <Col sm={{ span: 6, offset: 0 }}>
                        <div className="form-group">
                        <div
                            className="form-label"
                            style={{ height: '27px', marginBottom: '8px' }}
                        />
                        <Button
                            type="submit"
                            variant="secondary"
                            block
                            onClick={() => setShowVisitingPlayersModal(true)}
                            disabled={isEmpty(visitingPlayersState.id)}
                        >
                            Soupiska hostu
                        </Button>
                        </div>
                    </Col>
                    {!isEmpty(visitingPlayersState.players) && (
                                            <Col>
                                                <PlayersTable id_team={Number(values.id_team_visiting)} state={visitingPlayersState} events={allEvents} setEvent={setEvents} host={false} />
                        </Col>
                    )}
                    </Row>
                </Col>
                </Row>
                <Row>
                <Col className="mb-4 mt-lg-0" lg={{ span: 5, offset: 0 }}>
                    <Button type="submit" block onClick={() => test()}>
                    Uložit
                    </Button>
                </Col>
                </Row>
                <PlayerSelectModal
                show={showHomePlayersModal}
                handleClose={handleClose}
                state={homePlayersState}
                setter={setHomePlayers}
                />
                <PlayerSelectModal
                show={showVisitingPlayersModal}
                handleClose={handleClose}
                state={visitingPlayersState}
                setter={setVisitingPlayers}
                />
            </Form>
            )}
        </Formik>
        )}
    </div>
    );
}
