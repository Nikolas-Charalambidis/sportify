import React from 'react';
import {useGetAllEvents} from "../../../../api/matches/matchClient_v1";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../../assets/images/loading.gif";
import {Heading} from "../../../../atoms";

function getGoals(events, period) {
    if (!events.isLoading) {
        if (period === 1) {
            return events.events.first.goals;
        }

        if (period === 2) {
            return events.events.second.goals;
        }

        return events.events.third.goals;
    }
}

export function GoalEvents({id_match, period}) {
    const [events] = useGetAllEvents(id_match);
    const goals = getGoals(events, period);

    return (
        <div>
            {events.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {(!events.isLoading && events.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!events.isLoading && !events.error && goals.length === 0) &&
            <Heading size="xs" className="alert-info pt-2 pb-2 mt-2 mb-5 text-center">Tuto třetinu nebyl střelen žádný gól</Heading>}
            {(!events.isLoading && !events.error && goals.length !== 0) &&
            <div className="table-responsive mt-3">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>čas</th>
                        <th>tým</th>
                        <th>branky</th>
                        <th>asistence</th>
                    </tr>
                    </thead>
                    <tbody>
                    {goals.map((anObjectMapped) => (
                        <tr key={anObjectMapped.id_event}>
                            <td>{anObjectMapped.minute}</td>
                            <td>{anObjectMapped.team_name}</td>
                            <td>{anObjectMapped.user_name}</td>
                            <td>{anObjectMapped.name_assistance1} {anObjectMapped.name_assistance2 !== null ? ', ' + anObjectMapped.name_assistance2 : ''}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            }
        </div>
    );
}