import React from 'react';
import {Heading} from '../../../../atoms';
import {CardTemplate} from '../../../../templates/CardTemplate';
import {Row, Image} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import {mapSportToIcon} from '../../../../utils/mapper';
import {useGetUserTeams} from '../../../../api/user/userClient_v1';
import defaultTeamAvatar from "../../../../assets/images/default_team_avatar.svg";
import loadingGif from "../../../../assets/images/loading.gif";

export function UserTeams() {
    let {id_user} = useParams();
    const [teamState] = useGetUserTeams(id_user);


    return (
        <div>
            <h2 className="mt-4">Týmy ve kterých hraje</h2>

            {teamState.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {!teamState.isLoading && !teamState.error && teamState.user_data.length === 0 && (
                <Heading size="xs" className="alert-info pt-2 pb-2 mt-2 text-center">Zatím není členem žádného
                    týmu</Heading>)}
            {!teamState.isLoading && teamState.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo
                načíst</Heading>}
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
