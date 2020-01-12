import React from "react";
import {useParams} from "react-router-dom";
import {Image} from "react-bootstrap";
import loadingGif from "../../assets/images/loading.gif";
import {Heading} from "../../basicComponents";
import {useGetCompetitionMatches} from "../../api/matchClient_v1";
import {formatDate} from "../../utils/date";
import {MatchResult} from "./competition/MatchResult";

export function CompetitionResults() {
    let {id_competition} = useParams();
    const [state] = useGetCompetitionMatches(id_competition);

    return (
        <div>
            {state.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!state.isLoading && state.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!state.isLoading && !state.error) &&

            state.matches.map((item, index) => (
                <div key={index} className="round">
                    <div className="round-date">{formatDate(item.date)}</div>
                    <div className="round-item">
                        <div className="table-responsive">
                            <table className="match-result table">
                                <tbody>
                                <tr>
                                    <td className="team-home">{item.guest_name}</td>
                                    <td className="match-score">{item.goals_host} - {item.goals_guest}</td>
                                    <td className="team-away">{item.host_name}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <MatchResult id_match={item.id_match} />
                    </div>
                </div>
                ))
            }
        </div>
    );
}