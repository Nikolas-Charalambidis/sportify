import React from "react";
import {useGetAllEvents, useGetCountShots} from "../../../api/matchClient_v1";
import {Image} from "react-bootstrap";
import loadingGif from "../../../assets/images/loading.gif";
import {Heading} from "../../../basicComponents";
import {NavLink as Link} from "react-router-dom";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";

function getGoals(events) {
    let goals = {
        first: {host: 0, guest: 0},
        second: {host: 0, guest: 0},
        third: {host: 0, guest: 0}
    };

    if (!events.isLoading) {
        if (events.events.first.goals.length !== 0) {
            events.events.first.goals.forEach(function (item) {
                item.host === 1 ? goals.first.host++ : goals.first.guest++;
            });
        }

        if (events.events.second.goals.length !== 0) {
            events.events.second.goals.forEach(function (item) {
                item.host === 1 ? goals.second.host++ : goals.second.guest++;
            });
        }

        if (events.events.third.goals.length !== 0) {
            events.events.third.goals.forEach(function (item) {
                item.host === 1 ? goals.third.host++ : goals.third.guest++;
            });
        }
    }

    return goals;
}

function getSuspensions(events) {
    let suspensions = {
        host:0,
        guest:0
    };

    if (!events.isLoading) {
        if (events.events.first.suspensions.length !== 0) {
            events.events.first.suspensions.forEach(function (item) {
                item.host === 1 ? suspensions.host++ : suspensions.guest++;
            });
        }

        if (events.events.second.suspensions.length !== 0) {
            events.events.second.suspensions.forEach(function (item) {
                item.host === 1 ? suspensions.host++ : suspensions.guest++;
            });
        }

        if (events.events.third.suspensions.length !== 0) {
            events.events.third.suspensions.forEach(function (item) {
                item.host === 1 ? suspensions.host++ : suspensions.guest++;
            });
        }
    }

    return suspensions;
}

export function MatchResult({id_match}) {
    const [shotsState] = useGetCountShots(id_match);
    const [events] = useGetAllEvents(id_match);
    const goals = getGoals(events);
    const suspensions = getSuspensions(events);

    if(events.isLoading) {
        return <LoadingGif />;
    }

    if(!events.isLoading && events.error) {
        return <DataLoadingError />;
    }

    return (
        <div>
            {shotsState.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!shotsState.isLoading && shotsState.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!shotsState.isLoading && !shotsState.error) &&
            <div className="table-responsive">
                <table className="table match-details">
                    <tbody>
                        <tr>
                            <td className="w28p">Třetiny:
                                [{goals.first.host}:{goals.first.guest}],
                                [{goals.first.host + goals.second.host}:{goals.first.guest + goals.second.guest}],
                                [{goals.first.host + goals.second.host + goals.third.host}:{goals.first.guest + goals.second.guest + goals.third.guest}]
                            </td>
                            <td className="w28p">Střely: {shotsState.shots.count_host}:{shotsState.shots.count_guest}</td>
                            <td className="w28p">Vyloučení: {suspensions.host}:{suspensions.guest}</td>
                        </tr>
                        <tr>
                            <td className="w100p text-center" colSpan="5">» <Link to={'/matches/' + id_match } >Detail zápasu</Link> «
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
}