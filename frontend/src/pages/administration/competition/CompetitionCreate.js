import React from "react";
import { Heading } from '../../../basicComponents';
import { Field } from "../../../basicComponents";
import { CustomSelect } from "../../../basicComponents/Select";
import { Form, Button } from 'react-bootstrap';
import { Formik } from "formik";
import * as yup from "yup";
import { useGetSports } from "../../../api/othersClient_v1";
import {CompetitionCreateBreadcrumbs} from "../../../organisms/breadcrumbs/CompetitionCreateBreadcrumbs";

export function CompetitionCreate() {
    const [sportsState] = useGetSports();

    const schemaCreateTeam = yup.object().shape({
        name: yup.string().required(),
    });

    return (
        <div>
            <CompetitionCreateBreadcrumbs />
            <Heading>Nová soutěž</Heading>
            {sportsState.isLoading && <div>Načítám data...</div>}
            {(!sportsState.isLoading && sportsState.error) && <div>Data se nepodařilo načíst</div>}
            {(!sportsState.isLoading && !sportsState.error) &&
                <Formik
                    validationSchema={schemaCreateTeam}
                    initialValues={{
                        name: '',
                        id_sport: sportsState.sports[0].id_sport,
                    }}
                    onSubmit={values => {
                        console.log("submit");
                    }}
                >{({ handleSubmit, setFieldValue, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <div>
                            <Field label="Název soutěže" name="name" type="text"
                                message="Vyplňte prosím název soutěže"
                                isInvalid={!!errors.name} />

                            <CustomSelect label="Sport" name="id_sport"
                                options={sportsState.sports}
                                getOptionLabel={option => `${option.sport}`}
                                getOptionValue={option => `${option.id_sport}`}
                                placeholder={sportsState.sports[0].sport}
                                onChange={option => setFieldValue("id_sport", `${option.id_sport}`)}
                                isSearchable={true}
                            />
                        </div>
                        <Button variant="primary" type="submit">Vytvořit soutěž</Button>
                    </Form>
                )}
                </Formik>
            }
        </div>
    )
}
