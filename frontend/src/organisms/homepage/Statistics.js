import React from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {useGetStatistics} from "../../api/othersClient_v1";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../assets/images/loading.gif";
import {Heading} from "../../basicComponents";

export function Statistics() {
    const [state] = useGetStatistics();

    return (
        <section id="stats" className="divider-section">
            <Container className="mt-5 mb-5">
                {state.isLoading &&  <div className="text-center"><Image src={loadingGif}/></div>}
                {(!state.isLoading && state.error) &&
                <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
                {(!state.isLoading && !state.error) &&
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-6 mt-md-0 mt-5">
                        <div className="text-center bounce-in no-display animated bounceIn appear">
                            <FontAwesomeIcon icon={Icons.faTrophy} size="4x" className="mb-3" />
                            <div className="counter">{state.statistics.competitions}</div>
                            <div className="counterName">Soutěží</div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6 col-xs-6 mt-md-0 mt-5">
                        <div className="text-center bounce-in no-display animated bounceIn appear">
                            <FontAwesomeIcon icon={Icons.faUsers} size="4x" className="mb-3" />
                            <div className="counter">{state.statistics.teams}</div>
                            <div className="counterName">Týmů</div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6 col-xs-6 mt-md-0 mt-5">
                        <div className="text-center bounce-in no-display animated bounceIn appear">
                            <FontAwesomeIcon icon={Icons.faHockeyPuck} size="4x" className="mb-3" />
                            <div className="counter">{state.statistics.matches}</div>
                            <div className="counterName">Zápasů</div>
                        </div>
                    </div>

                    <div className="col-md-3 col-sm-6 col-xs-6 mt-md-0 mt-5">
                        <div className="text-center bounce-in no-display animated bounceIn appear">
                            <FontAwesomeIcon icon={Icons.faUser} size="4x" className="mb-3" />
                            <div className="counter">{state.statistics.users}</div>
                            <div className="counterName">Uživatelů</div>
                        </div>
                    </div>
                </div>
                }
            </Container>
        </section>
    )
}