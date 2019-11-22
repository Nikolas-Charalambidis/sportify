import React, {useState} from 'react';

import {Heading} from '../../../atoms/';
import {Breadcrumb, Button} from "react-bootstrap";
import {NavLink as Link, useHistory, useParams} from "react-router-dom";
import {useAuth} from "../../../utils/auth";
import {deleteMatch, useGetMatch} from "../../../api/matches/matchClient_v1";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {useApi} from "../../../hooks/useApi";
import {MatchDetailSingle} from "./components/MatchDetailSingle";
import {MatchDetailMultiple} from "./components/MatchDetailMultiple";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import {useGetTeam} from "../../../api/team/teamClient_v1";
import {DeleteModal} from "../../../atoms/DeleteModal";

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
    const [ID, setID] = useState(null);

    const handleDeleteMatch = async (id) => {
        handleClose();
        const result = await deleteMatch(api, id.id_match);
        if(result){
            history.replace(`/administration/teams/${id.id_team}`);
        }
    };

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
            <Heading className="mt-5">Detail zápasu</Heading>

            {stateMatch.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!stateMatch.isLoading && stateMatch.error) &&
                <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!stateMatch.isLoading && !stateMatch.error) &&
                <div>
                    <Container>
                        <Row>
                            <Col xs={{span: 12}} sm={{span: 6}}>
                                <Heading className="text-left nameOfCompetition" size="lg">{stateMatch.match.competition_name ? stateMatch.match.competition_name : "Amatérský zápas"}</Heading>
                                <p className="dateOfCompetition">{moment(stateMatch.match.date).local().format("DD. MM. YYYY HH:mm")}</p>
                            </Col>
                            <Col xs={{span: 12}} sm={{span: 6}} className="text-right mb-sm-0 mb-3">
                                <Button variant="danger" type="button" onClick={() => {
                                    setID({id_team: id_team, id_match: id_match});
                                    handleShow();
                                }}>
                                    Odstranit zápas
                                </Button>
                            </Col>
                        </Row>
                    </Container>

                    <DeleteModal key="match" show={show} heading="Delete zápasu"
                                 text="Opravdu si přejete odstranit zápas a sním i všechny zázanmy o hráčích a eventech?"
                                 handleClose={handleClose} deleteFunction={handleDeleteMatch} idItem={ID}/>

                    {stateMatch.match.host_name === stateMatch.match.guest_name ?
                        <MatchDetailSingle id_match={id_match} data={stateMatch.match}/> :
                        <MatchDetailMultiple id_match={id_match} data={stateMatch.match}/>
                    }
                </div>
            }
        </div>
    );
}
