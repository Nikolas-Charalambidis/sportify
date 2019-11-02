import * as Icons from "@fortawesome/free-solid-svg-icons";

export function mapSportToIcon(id_sport) {
    let ico;
    switch(id_sport) {
        case 1:
            ico = Icons.faHockeyPuck;
            break;
        case 2:
            ico = Icons.faBowlingBall;
            break;
        case 3:
            ico = Icons.faCheck;
            break;
        default:
            ico = Icons.faFutbol;
            break;
    }
    return (ico);
}
