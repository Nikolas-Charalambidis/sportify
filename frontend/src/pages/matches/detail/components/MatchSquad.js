import React from 'react';
import {useGetMatchup} from "../../../../api/matches/matchClient_v1";

export function MatchSquad({id_match, host}) {
    const [matchupState, fetchMatchup] = useGetMatchup(id_match, host);

    console.log(matchupState)

    return (
        <div className="table-responsive mt-3">
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>čas</th>
                    <th>tým</th>
                    <th>branky</th>
                    <th>asistence</th>
                    <th>typ gólu</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>13:36</td>
                    <td>TRI</td>
                    <td>Tomáš MARCINKO</td>
                    <td>Erik HRŇA</td>
                    <td>5/4</td>
                </tr>
                <tr>
                    <td>13:36</td>
                    <td>TRI</td>
                    <td>Tomáš MARCINKO</td>
                    <td>Erik HRŇA</td>
                    <td>5/4</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

