import React, { useState } from 'react';
import { Heading } from '../../../atoms';
import { CardTemplate } from '../../../templates/CardTemplate';
import { Row, Breadcrumb } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { useAuth } from '../../../utils/auth';
import { useApi } from '../../../hooks/useApi';
import { mapSportToIcon } from '../../../utils/mapper';
import { useGetUser, useGetUserTeams, useGetUserCompetition } from '../../../api/user/userClient_v1';
import { NavLink as Link } from 'react-router-dom';
import { ChangePasswordModal } from './components/ChangePasswordModal';
import { UserDataForm } from './components/UserDataForm';

export function Profile() {
  const history = useHistory();
  const { user } = useAuth();
  const api = useApi();
  if (!user) {
    history.replace('/');
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [state] = useGetUser(user.id_user);
  const [teamState] = useGetUserTeams(user.id_user);
  const [competitionState] = useGetUserCompetition(user.id_user);

  return (
    <div>
      <Breadcrumb>
        <li className="breadcrumb-item">
          <Link to="/">Domů</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to="/administration">Administrace</Link>
        </li>
        <li className="breadcrumb-item">
          <span className="active">Profil</span>
        </li>
      </Breadcrumb>
      <Heading className="pageHeading mt-4 mb-5">Uživatelský profil</Heading>
      {state.isLoading && <div>Načítám data...</div>}
      {!state.isLoading && state.error && <div>Data se nepodařilo načíst</div>}
      {!state.isLoading && !state.error && (
        <div>
          <UserDataForm api={api} handleShow={handleShow} state={state} />

          <h2 className="mt-4">Týmy ve kterých hraju</h2>
          {!teamState.isLoading && !teamState.error && teamState.user_data.length === 0 && (<div>Zatím nejste členem žádného týmu</div>)}
          {!teamState.isLoading && teamState.error && (<div>Data se nepodařilo načíst</div>)}
          {!teamState.isLoading && !teamState.error ? (
            <div>
              <Row>
                {teamState.user_data.map((anObjectMapped, index) => (
                  <CardTemplate
                    key={index}
                    title={<Link to={`../teams/${anObjectMapped.id_sport}`}>{`${anObjectMapped.name}`}</Link>}
                    subtitle={`${anObjectMapped.position}`}
                    sport={`${anObjectMapped.sport}`}
                    icon={mapSportToIcon(anObjectMapped.id_sport)}
                  />
                ))}
              </Row>
            </div>
          ) : null}

          <h2 className="mt-4">Soutěže ve kterých hraju</h2>
            {!competitionState.isLoading && !competitionState.error && competitionState.user_data.length === 0  && (<div>Zatím nejste členem žádné soutěže</div>)}
            {!competitionState.isLoading && competitionState.error && (<div>Data se nepodařilo načíst</div>)}
            {!competitionState.isLoading && !competitionState.error ? (
        <div>
          <Row>
              {competitionState.user_data.map((anObjectMapped, index) => (
                  <CardTemplate
                      key={index}
                      title={`${anObjectMapped.name}`}
                      subtitle={`${anObjectMapped.position}`}
                      sport={`${anObjectMapped.sport}`}
                      icon={mapSportToIcon(anObjectMapped.id_sport)}
                      state={`${anObjectMapped.is_active}`}
                  />
              ))}
          </Row>
          </div>
            ) : null}

          <ChangePasswordModal show={show} id_user={user.id_user} api={api} handleClose={handleClose}
          />
        </div>
      )}
    </div>
  );
}
