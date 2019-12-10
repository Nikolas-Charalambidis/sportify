import React from 'react';
import {Heading} from '../../atoms';
import {CardTemplate} from '../../atoms/CardTemplate';
import {Row, Image} from 'react-bootstrap';
import {useParams} from "react-router-dom";
import {mapSportToIcon} from '../../utils/mapper';
import {useGetUserCompetition} from '../../api/userClient_v1';
import defaultCompetitionAvatar from "../../assets/images/default_competition_avatar.jpg";
import loadingGif from "../../assets/images/loading.gif";

export function UserCompetitionsListCards() {
    let {id_user} = useParams();
    const [competitionState] = useGetUserCompetition(id_user);

    return (
        <div>
            <h2 className="mt-4">Soutěže ve kterých hraje</h2>

            {competitionState.isLoading && <div className="text-center"><Image src={loadingGif}/></div>}
            {!competitionState.isLoading && !competitionState.error && competitionState.user_data.length === 0 && (
                <Heading size="xs" className="alert-info pt-2 pb-2 mt-2 text-center">Zatím není členem žádné
                    soutěže</Heading>)}
            {!competitionState.isLoading && competitionState.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo
                načíst</Heading>}
            {!competitionState.isLoading && !competitionState.error ? (
                <div>
                    <Row>
                        {competitionState.user_data.map((anObjectMapped, index) => (
                            <CardTemplate
                                key={index}
                                redirect={`../leagues/${anObjectMapped.id_competition}`}
                                title={`${anObjectMapped.competition_name}`}
                                subtitle={`Umístění: ${anObjectMapped.team_position}`}
                                tooltipPictureHeader={`${anObjectMapped.sport}`}
                                pictureHeader={mapSportToIcon(anObjectMapped.id_sport)}
                                textHeader={anObjectMapped.is_active === 1 ? ("Probíhá") : ("Ukončená")}
                                mainPicture={anObjectMapped.avatar_url ? (`${anObjectMapped.avatar_url}`) : (defaultCompetitionAvatar)}
                            />
                        ))}
                    </Row>
                </div>
            ) : null}
        </div>
    );
}
