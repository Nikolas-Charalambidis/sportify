export const suspensionTypesList = [
    {id: "suspension_2", value: "Vyloučení 2"},
    {id: "suspension_2_2", value: "Vyloučení 2+2"},
    {id: "suspension_5", value: "Vyloučení 5"},
    {id: "suspension_pp", value: "Vyloučení osobní 10"},
    {id: "suspension_pp_end", value: "Vyloučení ze hry"},
    {id: "suspension_penalty", value: "Penalta"},
];

export const eventTypesList = [{id: "goal", value: "Gól"}, ...suspensionTypesList];


export const eventTypesEnum = {
    suspension_2: "Vyloučení 2",
    suspension_2_2: "Vyloučení 2 2",
    suspension_5: "Vyloučení 5",
    suspension_pp: "Vyloučení osobní 10",
    suspension_pp_end: "Vyloučení ze hry",
    suspension_penalty: "Penalta",
    goal: "Gól"
};
