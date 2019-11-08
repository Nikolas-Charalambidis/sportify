import * as Icons from "@fortawesome/free-solid-svg-icons";

export function mapSportToIcon(id_sport) {
    let ico;
    switch(id_sport) {
        case 1:
            ico = Icons.faHockeyPuck;
            break;
        case 2:
            ico = Icons.faRunning;
            break;
        case 3:
            ico = Icons.faBasketballBall;
            break;
        default:
            ico = Icons.faHockeyPuck;
            break;
    }
    return (ico);
}
