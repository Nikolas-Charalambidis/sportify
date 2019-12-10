import React from 'react';
import {NavLink as Link, useParams} from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import {Heading} from '../../../atoms';
import {Breadcrumb, Image, Tabs, Tab} from 'react-bootstrap';
import {useGetCompetitionDetail} from "../../../api/competitionClient_v1";
import loadingGif from "../../../assets/images/loading.gif";
import {CompetitionData} from "./CompetitionData";
import {CompetitionsTeams} from "./CompetitionsTeams";
export function CompetitionDetail() {
    let {id_competition} = useParams();
    const [state] = useGetCompetitionDetail(id_competition);

    return (
        <div>
            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!state.isLoading && state.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!state.isLoading && !state.error) &&
            <div>
                <Breadcrumb>
                    <li className="breadcrumb-item"><Link to="/">Domů</Link></li>
                    <li className="breadcrumb-item"><Link to="/competitions">Soutěže</Link></li>
                    <li className="breadcrumb-item"><span className="active">{state.competition_data[0].id_competition}</span></li>
                </Breadcrumb>
                <Heading className="mt-4 mb-5">{state.competition_data[0].name}</Heading>

                <CompetitionData state={state} />

                <Tabs className="mb-3" fill defaultActiveKey="squad" id="competitionTabs">
                    <Tab eventKey="squad" title="tymy">
                        <CompetitionsTeams/>
                    </Tab>
                    <Tab eventKey="competition" title="vysledky">
                    </Tab>
                </Tabs>
            </div>
            }
        </div>
    );
}
