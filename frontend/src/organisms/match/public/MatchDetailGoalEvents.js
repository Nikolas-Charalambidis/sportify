import React from 'react';
import {useGetAllEvents} from "../../../api/matchClient_v1";
import {Heading} from "../../../basicComponents";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";

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

export function MatchDetailGoalEvents({id_match, period}) {
    const [events] = useGetAllEvents(id_match);
    const goals = getGoals(events, period);

    if(events.isLoading) {
        return <LoadingGif />;
    }

    if(!events.isLoading && events.error) {
        return <DataLoadingError />;
    }

    if(!events.isLoading && !events.error && goals.length === 0) {
        return <Heading size="xs" className="alert-info pt-2 pb-2 mt-2 mb-5 text-center">Tuto třetinu nebyl střelen žádný gól</Heading>;
    }

    return (
        <div>
            {(!events.isLoading && !events.error && goals.length !== 0) ?
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
                : <UnexpectedError/>
            }
        </div>
    );
}