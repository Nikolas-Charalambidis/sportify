import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {Field, Heading} from "../../../basicComponents";
import {CustomSelect} from "../../../basicComponents/Select";
import * as Icons from "@fortawesome/free-solid-svg-icons";

const tooltipTeamType = {
    icon: Icons.faInfo,
    size: "1x",
    text:
        `Ligové týmy hrají jakoukoliv vyšší či nižší soutěž.\n\n
        Volnočasové týmy jsou hráči, kteří se sházejí na tréninkové zápasy u kterých chtějí měřit statistiky, ale do žádné soutěže se hlásit nechtějí.`
};

export function TeamCreateModalForm(
    {
        handleSubmit, setFieldValue, errors, handleClose,
        sportsState, typesState, positionsState
    }) {

    return (
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
    )
}
