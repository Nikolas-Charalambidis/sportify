import React from "react";
import {NavLink as Link, useParams} from "react-router-dom";
import {Image} from "react-bootstrap";
import loadingGif from "../../assets/images/loading.gif";
import {Heading} from "../../basicComponents";
import {useGetCompetitionMatches} from "../../api/matchClient_v1";
import {formatDate} from "../../utils/date";

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
                        <table className="match-result">
                            <tbody>
                            <tr>
                                <td className="team-home">{item.guest_name}</td>
                                <td className="match-score">{item.goals_host} - {item.goals_guest}</td>
                                <td className="team-away">{item.host_name}</td>
                            </tr>
                            </tbody>
                        </table>
                        <table className="match-details">
                            <tbody>
                            <tr>
                                <td className="w28p">Třetiny: (2:2,4:0,1:0)</td>
                                <td className="w18p">Střely: 37:33</td>
                                <td className="w18p">Vyloučení: 3:3</td>
                                <td className="w18p">Využití: 1:1</td>
                                <td className="w18p">Oslabení: 1:1</td>
                            </tr>
                            <tr>
                                <td className="w100p text-center" colSpan="5">» <Link to={'/matches/' + item.id_match } >Detail zápasu</Link> «
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                ))
            }
        </div>
    );
}