import React from 'react';
import {useGetAllEvents} from "../../../api/matchClient_v1";
import {Heading} from "../../../basicComponents";
import {eventTypesEnum} from "../../../enums/enums";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";

function getSuspensions(events, period) {
    if (!events.isLoading) {
        if (period === 1) {
            return events.events.first.suspensions;
        }

        if (period === 2) {
            return events.events.second.suspensions;
        }

        return events.events.third.suspensions;
    }
}

export function MatchDetailSuspensionsEvents({id_match, period}) {
    const [events] = useGetAllEvents(id_match);
    const suspensions = getSuspensions(events, period);

    if(events.isLoading) {
        return <LoadingGif />;
    }

    if(!events.isLoading && events.error) {
        return <DataLoadingError />;
    }

    if(!events.isLoading && !events.error && suspensions.length === 0) {
        return (
            <Heading size="xs" className="alert-info pt-2 pb-2 mt-2 mb-5 text-center">
                Tuto třetinu nedošlo k žádnému
                vyloučení
            </Heading>
        );
    }

    return (
        <div>
            {(!events.isLoading && !events.error && suspensions.length !== 0) ?
                <div className="table-responsive mt-3">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>čas</th>
                            <th>tým</th>
                            <th>vyloučení</th>
                            <th>typ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {suspensions.map((anObjectMapped) => (
                            <tr key={anObjectMapped.id_event}>
                                <td>{anObjectMapped.minute}</td>
                                <td>{anObjectMapped.team_name}</td>
                                <td>{anObjectMapped.user_name}</td>
                                <td>{eventTypesEnum[anObjectMapped.type]}</td>
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