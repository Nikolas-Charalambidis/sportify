import React from 'react';
import {Table} from "../../../../../organisms/Table";
import Image from "react-bootstrap/esm/Image";
import loadingGif from "../../../../../assets/images/loading.gif";
import {Heading} from "../../../../../atoms";
import {useApi} from "../../../../../hooks/useApi";
import Button from "react-bootstrap/Button";
import deleteIcon from "../../../../../assets/images/delete.png";
import {deleteEvent} from "../../../../../api/events/eventClient_v1";

export function Events({eventsState, fetchEvents}) {
    const api = useApi();

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
            accessor: "type"
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
            accessor: "minute"
        },
        {
            Header: '',
            accessor: "id_event",
            filterable:false,
            Cell: row => (
                <Button variant="link" onClick={() => handleDeleteEvent(row.original.id_event)}>
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
                </div>
            }
        </div>
    );
}
