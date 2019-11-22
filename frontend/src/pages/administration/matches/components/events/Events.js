import React, {useState} from 'react';
import {Table} from "../../../../../organisms/Table";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../../../assets/images/loading.gif";
import {Heading} from "../../../../../atoms";
import {useApi} from "../../../../../hooks/useApi";
import Button from "react-bootstrap/Button";
import deleteIcon from "../../../../../assets/images/delete.png";
import {deleteEvent} from "../../../../../api/events/eventClient_v1";
import {eventTypesList, eventTypesEnum} from "../../../../../enums/enums";
import {DeleteModal} from "../../../../../atoms/DeleteModal";

export function Events({eventsState, fetchEvents}) {
    const api = useApi();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [ID, setID] = useState(null);

    const handleDeleteEvent = async (id_event) => {
        const result = await deleteEvent(api, id_event);
        if(result) {
            fetchEvents();
        }
    };

    const columnsEvents = [
        {
            Header: "Hráč",
            accessor: "name"
        },
        {
            Header: "Typ",
            accessor: "type",
            Cell: row => (
                eventTypesEnum[row.original.type]
            ),
            filterMethod: (filter, row) => {
                if (filter.value === 'all') {
                    return true;
                } else {
                    return row[filter.id] === filter.value;
                }
            },

            Filter: ({filter, onChange}) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">Vše</option>
                    {eventTypesList.map((object, index) => (
                        <option key={index} value={object.id}>{object.value}</option>
                    ))}

                </select>
        },
        {
            Header: "Asistence 1",
            accessor: "name_assistance1"
        },
        {
            Header: "Asistence 2",
            accessor: "name_assistance2"
        },
        {
            Header: "Minuta",
            accessor: "minute",
            filterMethod: (filter, row) => {
                if (filter.value === 'all') {
                    return true;
                } else {
                    if(filter.value === "1"){
                        return ((row[filter.id]-0)*(row[filter.id]-20) <= 0);
                    }
                    if(filter.value === "2"){
                        return ((row[filter.id]-21)*(row[filter.id]-40) <= 0);
                    }
                    if(filter.value === "3"){
                        return ((row[filter.id]-41)*(row[filter.id]-60) <= 0);
                    }
                }
            },

            Filter: ({filter, onChange}) =>
                <select
                    onChange={event => onChange(event.target.value)}
                    style={{width: "100%"}}
                    value={filter ? filter.value : "all"}
                >
                    <option value="all">Vše</option>
                    <option value="1">1. třetina</option>
                    <option value="2">2. třetina</option>
                    <option value="3">3. třetina</option>
                </select>
        },
        {
            Header: '',
            accessor: "id_event",
            filterable:false,
            Cell: row => (
                <Button variant="link" onClick={() => {
                    setID(row.original.id_event);
                    handleShow();
                }}>
                    <Image style={{ width: '2rem' }} src={deleteIcon} />
                </Button>
            )
        }
    ];

    return (
        <div>
            <h2>Události</h2>
            {eventsState.isLoading &&  <div className="text-center"><Image src={loadingGif}/></div>}
            {(!eventsState.isLoading && eventsState.error) &&
            <Heading size="xs" className="alert-danger pt-2 pb-2 mt-2 text-center">Data se nepodařilo načíst</Heading>}
            {(!eventsState.isLoading && !eventsState.error) &&
                <div>
                    <Table className="defaultCursor" columns={columnsEvents} data={eventsState.events}/>
                    <DeleteModal key="events" show={show} heading="Delete eventu" text="Opravdu si přejete odstranit event?"
                                 handleClose={handleClose} deleteFunction={handleDeleteEvent} idItem={ID}/>
                </div>
            }
        </div>
    );
}
