import React from 'react';
import {useGetMatchup} from "../../../api/matchClient_v1";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../assets/images/loading.gif";
import {Heading} from "../../../basicComponents";

export function MatchDetailMatchSquad({id_match, host}) {
    const [matchupState] = useGetMatchup(id_match, host);

    return (
        <div>
            {matchupState.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!matchupState.isLoading && matchupState.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!matchupState.isLoading && !matchupState.error) &&
            <div className="table-responsive mt-3">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Jméno a příjmení</th>
                        <th>Brankář</th>
                    </tr>
                    </thead>
                    <tbody>
                    {matchupState.matchup.map((anObjectMapped) => (
                        <tr key={anObjectMapped.id_matchup}>
                            <td>{anObjectMapped.name}</td>
                            <td>{anObjectMapped.goalkeeper ? 'Ano' : 'Ne'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
}
