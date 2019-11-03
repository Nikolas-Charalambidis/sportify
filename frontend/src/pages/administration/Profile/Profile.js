import React, {useState} from 'react';
import {Heading} from '../../../atoms';
import {CardTemplate} from '../../../templates/CardTemplate';
import {Row,  Breadcrumb} from 'react-bootstrap';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import {useHistory} from "react-router";
import {useAuth} from "../../../utils/auth";
import {useApi} from "../../../utils/api";
import {mapSportToIcon} from "../../../utils/mapper";
import { useGetUser} from "../../../api/user/userAPI";
import {ChangePasswordModal} from "./components/ChangePasswordModal";
import {UserDataForm} from "./components/UserDataForm";

export function Profile() {
    const history = useHistory();
    const {user} = useAuth();
    const api = useApi();
    if (!user) {
        history.replace('/');
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state] = useGetUser(user.id_user);
    const userTeams = [{name: "ahoj", sport: "fotbal" , idSport: 1},{name: "5", sport: "florbal"},{},{}];

    return (
        <div>
            <Breadcrumb>
                <Breadcrumb.Item href="/">Domů</Breadcrumb.Item>
                <Breadcrumb.Item active>Administrace</Breadcrumb.Item>
                <Breadcrumb.Item active>Profil</Breadcrumb.Item>
            </Breadcrumb>
            <Heading className="pageHeading mt-4 mb-5">Uživatelský profil</Heading>
            {state.isLoading && <div>Načítám data...</div>}
            {(!state.isLoading && state.error) && <div>Data se nepodařilo načíst</div>}
            {!state.isLoading && !state.error ?
            <div>
                <UserDataForm api={api} id_user={user.id_user} handleShow={handleShow} state={state}/>

                <h2 className="mt-4">Týmy ve kterých hraju</h2>
                <Row>
                    {userTeams.map((anObjectMapped, index) => (
                        <CardTemplate
                            key={index}
                            title={`${anObjectMapped.name}`}
                            sport={`${anObjectMapped.sport}`}
                            icon={`${mapSportToIcon(anObjectMapped.idSport)}`}
                        />
                    ))}

                    <CardTemplate title="Tým 1" icon={Icons.faFutbol} sport="fotbal" logo="http://bit.ly/32Z7Hfl"/>
                    <CardTemplate nazev="Tým 2" icon={Icons.faFutbol} sport="fotbal" logo="http://bit.ly/2PrDmSC"/>
                    <CardTemplate nazev="Tým 3" icon={Icons.faFutbol} sport="fotbal" logo="http://bit.ly/32Z7Hfl"/>
                    <CardTemplate nazev="Tým 4" icon={Icons.faHockeyPuck} sport="hokej"
                                  logo="http://bit.ly/32Z7Hfl"/>
                    <CardTemplate nazev="Tým 3" icon={Icons.faFutbol} sport="fotbal" logo="http://bit.ly/32Z7Hfl"/>
                </Row>

                <h2 className="mt-4">Soutěže ve kterých hraju</h2>
                <Row>
                    <CardTemplate nazev="Jarov Liga" pozice="Pozice: 1." icon={Icons.faFutbol} sport="fotbal"
                                  logo="http://bit.ly/32Z7Hfl" stav="Probíhá"/>
                    <CardTemplate nazev="Extraliga" pozice="Pozice: 2." icon={Icons.faFutbol} sport="fotbal"
                                  logo="http://bit.ly/2PrDmSC" stav="Ukončena"/>
                </Row>

                <ChangePasswordModal show={show} id_user={user.id_user} api={api} handleClose={handleClose}/>

            </div> : null
            }
        </div>
    );
}
