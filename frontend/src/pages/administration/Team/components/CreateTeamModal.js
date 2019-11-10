import {Button, Form, Modal} from "react-bootstrap";
import {Formik} from "formik";
import {Field} from "../../../../atoms";
import React from "react";
import {Heading} from '../../../../atoms';
import * as yup from "yup";
import {CreateTeam} from "../../../../api/team/teamClient_v1";
import {Select} from "../../../../atoms/Select";
import {useGetSports, useGetTeamTypes} from "../../../../api/others/othersClient_v1";
import {useHistory} from "react-router";
import * as Icons from "@fortawesome/free-solid-svg-icons";

const positionEnum = [
    {
        id_position: "attacker",
        position: "attacker"
    },
    {
        id_position: "defender",
        position: "defender"
    },
    {
        id_position: "goalkeeper",
        position: "goalkeeper"
    }
];

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

    return (
        <Modal show={show} onHide={handleClose}>
            <div>
                {(sportsState.isLoading || typesState.isLoading) && <div>Načítám data...</div>}
                {((!sportsState.isLoading && sportsState.error) || (!typesState.isLoading && typesState.error)) && <div>Data se nepodařilo načíst</div>}
                {((!sportsState.isLoading && !sportsState.error) && (!typesState.isLoading && !typesState.error)) &&
                <Formik
                    validationSchema={schemaCreateTeam}
                    initialValues={{
                        name: '',
                        id_sport: sportsState.sports[0].id_sport,
                        id_type: sportsState.sports[0].id_sport,
                        position: "attacker"}}
                    onSubmit={values => {
                        CreateTeam(history, api, id_user, values);
                    }}
                >{({handleSubmit, errors}) => (
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

                            <Select label="Typ týmu" customTooltip={tooltipTeamType} name="id_type" mapping={{key: "id_type", value: "type"}}
                                    defaultID={sportsState.sports[0].id_sport} options={typesState.types}/>

                            <Select label="Sport" name="id_sport" mapping={{key: "id_sport", value: "sport"}}
                                    defaultID={sportsState.sports[0].id_sport} options={sportsState.sports}/>

                            <Select label="Role v týmu" name="position" mapping={{key: "id_position", value: "position"}}
                                    defaultID={"attacker"} options={positionEnum}/>
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
