import React from 'react';
import {Heading} from '../../basicComponents';
import {CardTemplate} from '../../basicComponents/CardTemplate';
import {Row} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import {mapSportToIcon} from '../../utils/mapper';
import {useGetUserTeams} from '../../api/userClient_v1';
import defaultTeamAvatar from "../../assets/images/default_team_avatar.svg";
import {LoadingGif} from "../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../basicComponents/DataLoadingError";
import {UnexpectedError} from "../../basicComponents/UnexpectedError";

export function UserTeamsListCards() {
    let {id_user} = useParams();
    const [teamState] = useGetUserTeams(id_user);

    const header = <h2 className="mt-4">Týmy ve kterých hraje</h2>;

    if(teamState.isLoading) {
        return (
            <div>
                {header}
                <LoadingGif />
            </div>
        );
    }

    if(!teamState.isLoading && teamState.error) {
        return (
            <div>
                {header}
                <DataLoadingError />
            </div>
        );
    }

    if(!teamState.isLoading && !teamState.error && teamState.user_data.length === 0) {
        return (
            <div>
                {header}
                <Heading size="xs" className="alert-info pt-2 pb-2 mt-2 text-center">
                    Zatím není členem žádného týmu
                </Heading>
            </div>
        );
    }

    return (
        <div>
            {header}
            {(!teamState.isLoading && !teamState.error) ?
                <div>
                    <Row>
                        {teamState.user_data.map((anObjectMapped, index) => (
                            <CardTemplate
                                key={index}
                                redirect={`../teams/${anObjectMapped.id_team}`}
                                title={`${anObjectMapped.name}`}
                                subtitle={`Pozice: ${anObjectMapped.position}`}
                                tooltipPictureHeader={`${anObjectMapped.sport}`}
                                pictureHeader={mapSportToIcon(anObjectMapped.id_sport)}
                                mainPicture={anObjectMapped.avatar_url ? (`${anObjectMapped.avatar_url}`) : (defaultTeamAvatar)}
                            />
                        ))}
                    </Row>
                </div>
                : <UnexpectedError/>
            }
        </div>
    );
}
