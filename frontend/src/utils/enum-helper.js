export function getPositionEnumName(position) {
    switch (position) {
        case "goalkeeper":
            return "brankář";
        case "defender":
            return "obránce";
        case "attacker":
            return "útočník";
        default:
            return "neznámá hodnota";
    }
};