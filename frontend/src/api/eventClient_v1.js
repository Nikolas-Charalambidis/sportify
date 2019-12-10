import {config} from '../config';

export async function addEvent(api, values) {
    let result = false;
    await api
        .post(`${config.API_BASE_PATH}/events`, {values})
        .then(({data}) => {
            window.flash(data.msg, 'success');
            result = true;
        })
        .catch(({ response }) => {
            const {data} = response;
            window.flash(data.msg, 'danger');
        });
    return result;
}

export async function addEvents(api, id_match, values) {
    let result = false;
    await api
        .post(`${config.API_BASE_PATH}/events/bulk`, {id_match: id_match, events: values})
        .then(({data}) => {
            window.flash(data.msg, 'success');
            result = true;
        })
        .catch(({ response }) => {
            const {data} = response;
            window.flash(data.msg, 'danger');
        });
    return result;
}

export async function deleteEvent(api, id_event) {
    let result = false;
    await api
        .delete(`${config.API_BASE_PATH}/events/${id_event}`)
        .then(({data}) => {
            window.flash(data.msg, 'success');
            result = true;
        })
        .catch(({ response }) => {
            const {data} = response;
            window.flash(data.msg, 'danger');
        });
    return result;
}

export async function changeShots(api, values) {
    let result = false;
    const {id_event, value} = values;
    await api
        .patch(`${config.API_BASE_PATH}/events/${id_event}/shots/`, {value: value})
        .then(({data}) => {
            window.flash(data.msg, 'success');
            result = true;
        })
        .catch(({ response }) => {
            const {data} = response;
            window.flash(data.msg, 'danger');
        });
    return result;
}