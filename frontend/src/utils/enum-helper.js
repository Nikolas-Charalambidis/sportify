export function getPositionEnumName(position) {
    switch (position) {
        case "goalkeeper":
            return "Brankář";
        case "defender":
            return "Obránce";
        case "attacker":
            return "Útočník";
        default:
            return "?";
    }
}
