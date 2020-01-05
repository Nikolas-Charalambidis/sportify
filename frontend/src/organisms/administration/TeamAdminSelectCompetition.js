import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {Heading} from "../../atoms"
import {CustomSelect} from "../../atoms/Select";
import {useGetCompetitions} from "../../api/competitionClient_v1";

export function TeamAdminSelectCompetition() {

    const [competitions] = useGetCompetitions();
    const [competitionState, setCompetitionState] = useState({id_competition: null});
    console.log(competitions);

    return (
        <div>
            {competitions.isLoading && <div>Načítám data...</div>}
            {!competitions.isLoading && competitions.error &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {!competitions.isLoading && !competitions.error && (
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
            )}
        </div>
    );
}

