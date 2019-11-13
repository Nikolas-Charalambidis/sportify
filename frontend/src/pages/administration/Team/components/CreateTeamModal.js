import {Button, Form, Modal} from "react-bootstrap";
import {Formik} from "formik";
import {Field} from "../../../../atoms";
import React from "react";
import {Heading} from '../../../../atoms';
import * as yup from "yup";
import {CreateTeam} from "../../../../api/team/teamClient_v1";

import {useGetSports, useGetTeamPositions, useGetTeamTypes} from "../../../../api/others/othersClient_v1";
import {useHistory} from "react-router";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import {CustomSelect} from "../../../../atoms/Select";

const tooltipTeamType = {
    icon: Icons.faInfo,
    size: "1x",
    text:
        `Ligové týmy hrají jakoukoliv vyšší či nižší soutěž.\n\n
        Volnočasové týmy jsou hráči, kteří se sházejí na tréninkové zápasy u kterých chtějí měřit statistiky, ale do žádné soutěže se hlásit nechtějí.`
};

export function CreateTeamModal({api, id_user, show, handleClose}) {
    let history = useHistory();
    const schemaCreateTeam = yup.object().shape({
        name: yup.string().required(),
    });

    const [sportsState] = useGetSports();
    const [typesState] = useGetTeamTypes();
    const [positionsState] = useGetTeamPositions();

    return (
        <Modal show={show} onHide={handleClose}>
            <div>
                {(sportsState.isLoading || typesState.isLoading || positionsState.isLoading) && <div>Načítám data...</div>}
                {(
                    (!sportsState.isLoading && sportsState.error) ||
                    (!typesState.isLoading && typesState.error) ||
                    (!positionsState.isLoading && positionsState.error)) && <div>Data se nepodařilo načíst</div>}
                {(
                    (!sportsState.isLoading && !sportsState.error) &&
                    (!typesState.isLoading && !typesState.error) &&
                    (!positionsState.isLoading && !positionsState.error)) &&
                <Formik
                    validationSchema={schemaCreateTeam}
                    initialValues={{
                        name: '',
                        id_sport: sportsState.sports[0].id_sport,
                        id_type: typesState.types[0].id_type,
                        id_position: positionsState.positions[0].id_position}}
                    onSubmit={values => {
                        CreateTeam(history, api, id_user, values);
                    }}
                >{({handleSubmit, setFieldValue, errors}) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Modal.Header>
                            <Modal.Title className="modal-title">
                                <Heading size="md">Vytvoření týmu</Heading>
                            </Modal.Title>
                        </Modal.Header>

                        <Modal.Body>

                            <Field label="Název týmu" name="name" type="text"
                                   message="Vyplňte prosím název týmu"
                                   isInvalid={!!errors.name}/>

                            <CustomSelect label="Typ týmu" name="id_type" customTooltip={tooltipTeamType}
                                options={typesState.types}
                                getOptionLabel={option => `${option.type}` }
                                getOptionValue={option => `${option.id_type}`}
                                placeholder={typesState.types[0].type}
                                onChange={option => setFieldValue("id_type", `${option.id_type}`)}
                                isSearchable={true}
                            />

                            <CustomSelect label="Sport" name="id_sport"
                                options={sportsState.sports}
                                getOptionLabel={option => `${option.sport}` }
                                getOptionValue={option => `${option.id_sport}`}
                                placeholder={sportsState.sports[0].sport}
                                onChange={option => setFieldValue("id_sport", `${option.id_sport}`)}
                                isSearchable={true}
                            />

                            <CustomSelect label="Role v týmu" name="id_position"
                                options={positionsState.positions}
                                getOptionLabel={option => `${option.position}` }
                                getOptionValue={option => `${option.id_position}`}
                                placeholder={positionsState.positions[0].position}
                                onChange={option => setFieldValue("id_position", `${option.id_position}`)}
                                isSearchable={true}
                            />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" type="submit">
                                Vytvořit tým
                            </Button>
                            <Button variant="secondary" type="button" onClick={handleClose}>
                                Zavřít
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
                </Formik>
                }
           </div>
        </Modal>
    )
}
