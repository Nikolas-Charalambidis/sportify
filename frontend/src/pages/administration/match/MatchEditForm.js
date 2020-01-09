import React, {useState} from 'react';
import {Heading} from '../../../basicComponents/';
import {Button} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import {useAuth} from "../../../utils/auth";
import {deleteMatch, useGetMatch} from "../../../api/matchClient_v1";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {useApi} from "../../../hooks/useApi";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import {useGetTeam} from "../../../api/teamClient_v1";
import {DeleteModal} from "../../../basicComponents/DeleteModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {MatchDetailAdmin} from "../../../organisms/match/admin/detail/MatchDetailAdmin";
import {MatchEditFormBreadcrumbs} from "../../../organisms/breadcrumbs/MatchEditFormBreadcrumbs";

export function MatchEditForm() {
    const history = useHistory();
    const {user} = useAuth();
    const api = useApi();

    let {id_team, id_match} = useParams();
    const [state] = useGetTeam(id_team);

    if(!state.isLoading && !state.error) {
        if(user.id_user !== state.team_data.id_leader){
            window.flash("Na tuto stránku mají přístup pouze vedoucí týmů, jež se zúčastnily zápasu", "danger");
            history.replace('/administration/teams/' + id_team);
        }
    }
    const [stateMatch] = useGetMatch(id_match);

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

    if(stateMatch.isLoading) {
        return (
            <div>
                <MatchEditFormBreadcrumbs id_team={id_team}/>
                <div className="text-center"><Image src={loadingGif}/></div>
            </div>
        );
    }

    if(!stateMatch.isLoading && stateMatch.error) {
        return (
            <div>
                <MatchEditFormBreadcrumbs id_team={id_team}/>
                <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>
            </div>
        );
    }

    return (
        <div>
            <MatchEditFormBreadcrumbs id_team={id_team}/>
            {(!stateMatch.isLoading && !stateMatch.error) &&
                <div className="container page match">
                    <Row>
                        <Col className="col-100 heading">
                            <Heading size="lg">
                                <ul>
                                    <li>{stateMatch.match.competition_name ? stateMatch.match.competition_name : "Amatérský zápas "}</li>
                                    <li>|{moment(stateMatch.match.date).local().format("DD. MM. YYYY HH:mm")}</li>
                                    <li>
                                        <Button variant="link" onClick={() => {
                                            setID({id_team: id_team, id_match: id_match});
                                            handleShow();
                                        }}>
                                            <FontAwesomeIcon className="removeIcon" icon={Icons.faTrashAlt} size="1x"/>
                                        </Button>
                                    </li>
                                </ul>
                            </Heading>
                        </Col>
                    </Row>

                    <DeleteModal key="match" show={show} heading="Delete zápasu"
                                 text="Opravdu si přejete odstranit zápas a sním i všechny zázanmy o hráčích a eventech?"
                                 handleClose={handleClose} deleteFunction={handleDeleteMatch} idItem={ID}/>

                    <MatchDetailAdmin id_match={id_match} data={stateMatch.match}/> :

                </div>
            }
        </div>
    );
}
