import React, {useState} from 'react';

import {Heading} from '../../../atoms/';
import {Breadcrumb, Button} from "react-bootstrap";
import {NavLink as Link, useHistory, useParams} from "react-router-dom";
import {useAuth} from "../../../utils/auth";
import {useGetMatch} from "../../../api/matches/matchClient_v1";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {useApi} from "../../../hooks/useApi";
import {MatchDetailSingle} from "./components/MatchDetailSingle";
import {MatchDetailMultiple} from "./components/MatchDetailMultiple";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {DeleteMatchModal} from "./components/matchup/DeleteMatchModal";
import moment from "moment";
import {useGetTeam} from "../../../api/team/teamClient_v1";

export function MatchDetailAdminPage() {
    const history = useHistory();
    const {user} = useAuth();
    if (!user) {
        history.replace('/');
    }
    let {id_team, id_match} = useParams();
    const [state] = useGetTeam(id_team);

    if(!state.isLoading && !state.error) {
        if(user.id_user !== state.team_data.id_leader){
            window.flash("Na tuto stránku má přístup pouze vedoucí týmu jež odehrál zápas!", "danger");
            history.replace('/');
        }
    }
    const [stateMatch] = useGetMatch(id_match);

    const api = useApi();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Breadcrumb>
                <li className="breadcrumb-item">
                    <Link to="/">Domů</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to="/administration">Administrace</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to="/administration/teams">Týmy</Link>
                </li>
                <li className="breadcrumb-item">
                    <Link to={'/administration/teams/' + id_team } >Detail týmu</Link>
                </li>
                <li className="breadcrumb-item"><span className="active">Detail Zápasu</span></li>
            </Breadcrumb>
            <Heading>Detail zápasu</Heading>

            {stateMatch.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!stateMatch.isLoading && stateMatch.error) &&
                <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!stateMatch.isLoading && !stateMatch.error) &&
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <p><b>Název soutěže:</b> {stateMatch.match.competition_name ? stateMatch.match.competition_name : "Amatérský zápas"}</p>
                                <p><b>Datum konání zápasu:</b> {moment(stateMatch.match.date).local().format("DD. MM. YYYY HH:mm")}</p>
                            </Col>
                            <Col>
                                <Button variant="primary" type="button" onClick={handleShow}>
                                    Odstranit zápas
                                </Button>
                            </Col>
                        </Row>
                    </Container>

                    <DeleteMatchModal show={show} api={api} history={history} id_team={id_team} id_match={stateMatch.match.id_match} handleClose={handleClose} />

                    {stateMatch.match.host_name === stateMatch.match.guest_name ?
                        <MatchDetailSingle id_match={id_match} data={stateMatch.match}/> :
                        <MatchDetailMultiple id_match={id_match} data={stateMatch.match}/>
                    }
                </div>
            }
        </div>
    );
}
