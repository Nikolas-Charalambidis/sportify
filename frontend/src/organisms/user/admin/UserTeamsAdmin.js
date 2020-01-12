import {Row} from "react-bootstrap";
import {Heading} from "../../../basicComponents";
import React from "react";
import {CardTemplate} from "../../../basicComponents/CardTemplate";
import {mapSportToIcon} from "../../../utils/mapper";
import defaultTeamAvatar from "../../../assets/images/default_team_avatar.svg";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";

export function UserTeamsAdmin({teamState}) {

    if(teamState.isLoading) {
        return <LoadingGif />;
    }

    if(!teamState.isLoading && teamState.error) {
        return <DataLoadingError />;
    }

    if(!teamState.isLoading && !teamState.error && teamState.user_data.length === 0) {
        return (
            <Heading size="xs" className="alert-info pt-2 pb-2 mt-2 text-center">
                Zatím nejste členem žádného týmu
            </Heading>
        );
    }

    return (
        <div>
            {!teamState.isLoading && !teamState.error ? (
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
            ) : null}
        </div>
    );
}