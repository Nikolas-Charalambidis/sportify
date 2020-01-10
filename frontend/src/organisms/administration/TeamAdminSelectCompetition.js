import React, {useState} from 'react';
import {CustomSelect} from "../../basicComponents/Select";
import {useGetCompetitions} from "../../api/competitionClient_v1";
import {LoadingGif} from "../../basicComponents/LoadingGif";
import {DataLoadingError} from "../../basicComponents/DataLoadingError";
import {UnexpectedError} from "../../basicComponents/UnexpectedError";

export function TeamAdminSelectCompetition() {
    const [competitions] = useGetCompetitions();
    const [setCompetitionState] = useState({id_competition: null});

    if(competitions.isLoading) {
        return <LoadingGif />;
    }

    if(!competitions.isLoading && competitions.error) {
        return <DataLoadingError />;
    }

    return (
        <div>
            {(!competitions.isLoading && !competitions.error) ?
                <CustomSelect name="id_position" label="Vyberte pozici" options={competitions.competitions}
                              getOptionLabel={option => `${option.name}`}
                              getOptionValue={option => `${option.id_competition}`}
                              placeholder="Vyberte pozici"
                              onChange={option => {
                                  setCompetitionState({
                                      id_competition: option.id_competition,
                                  });
                              }}
                />
                : <UnexpectedError/>
            }
        </div>
    );
}

