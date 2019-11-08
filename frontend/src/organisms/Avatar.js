import {Image} from "react-bootstrap";
import React from "react";
import {config} from "../config";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";

export function Avatar({api, imageState, setImageState, type, id}) {

    const uploadAvatar = event => {
        let formData = new FormData();
        formData.append('file', event.currentTarget.files[0]);
        formData.append('id', id);
        window.flash("Nahrávám avatara na server", 'info', 10000, null);
        api
            .post(`${config.API_BASE_PATH}/${type}/avatar`, formData)
            .then(({data}) => {
                setImageState(data.url);
                window.flash(data.msg, 'success');
            })
            .catch(({response}) => {
                const {data} = response;
                window.flash(data.msg, 'danger');
            });
    };

    return (
        <div>
            <div className="avatar-upload">
                <div className="avatar-edit">
                    <input onChange={uploadAvatar} id="imageUpload" name="file" type="file" accept=".png, .jpg, .jpeg"/>
                    <label htmlFor="imageUpload"><FontAwesomeIcon icon={Icons.faCamera}/></label>
                </div>
                <div className="avatar-preview">
                    <div id="imagePreview">
                        <Image roundedCircle src={imageState}/>
                    </div>
                </div>
            </div>
        </div>
    )
}