import React from "react";


export function FilteringOptions(matchesState, filter) {
    const arrayOptions = [...new Map(matchesState.team_data.map((o) => [o[filter], o])).values()];
    return(
            arrayOptions.map((anObjectMapped, index) => (
            <option key={index} value={anObjectMapped[filter]}>{(anObjectMapped[filter]===null) ? "Amatérský zápas" : anObjectMapped[filter]}</option>
            ))
    )

}
