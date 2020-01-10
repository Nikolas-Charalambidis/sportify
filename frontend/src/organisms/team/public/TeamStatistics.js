import React, {useState} from 'react';
import {Heading} from "../../../basicComponents";
import {TeamStatisticsGoalkeepers} from "./statistics/TeamStatisticsGoalkeepers";
import {TeamStatisticsPlayers} from "./statistics/TeamStatisticsPlayers";
import {useGetTeamCompetition} from "../../../api/teamClient_v1";
import {useParams} from "react-router-dom";
import {LoadingGif} from "../../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../../basicComponents/DataLoadingError";
import {UnexpectedError} from "../../../basicComponents/UnexpectedError";

export function TeamStatistics() {
    let {id_team} = useParams();
    const [state] = useGetTeamCompetition(id_team);

    const [statisticsFilter, setStatisticsFilter] = useState('league');
    const handleChange = (event) => {
        setStatisticsFilter(event);
    };

    if(state.isLoading) {
        return <LoadingGif />;
    }

    if(!state.isLoading && state.error) {
        return <DataLoadingError />;
    }

    return (
        <div>
            {(!state.isLoading && !state.error) ?
                <select onChange={event => handleChange(event.target.value)} className="form-control"
                        id="exampleFormControlSelect1">
                    <option value="league">Ligové statistiky</option>
                    <option value="training">Tréninkové statistiky</option>
                    {state.team_data.map((data, index) =>
                        <option key={index} value={data.id_competition}>
                            {data.competition_name}
                        </option>)
                    }
                </select>
                : <UnexpectedError/>
            }

            <Heading className="mt-4" size="lg">Hráči</Heading>
            <TeamStatisticsPlayers filterBy={statisticsFilter}/>

            <Heading className="mt-4" size="lg">Brankáři</Heading>
            <TeamStatisticsGoalkeepers filterBy={statisticsFilter}/>
        </div>
    );
}
