import React from 'react';

export function FilteringOptions(matchesState, filter, startChar, endChar) {
  const arrayOptions = [...new Map(
      matchesState.team_data.map(o => [filter === 'date' ? o[filter].substring(startChar, endChar) : o[filter], o,]),
    ).values(),
  ];

  return arrayOptions.map((anObjectMapped, index) => (
    <option key={index} value={anObjectMapped[filter]}>
      {anObjectMapped[filter] === null ? 'Amatérský zápas' : anObjectMapped[filter].substring(startChar, endChar)}
    </option>
  ));
}
