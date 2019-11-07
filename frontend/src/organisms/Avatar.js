import {Image} from "react-bootstrap";
import React, {useEffect} from "react";
import {config} from "../config";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as Icons from "@fortawesome/free-solid-svg-icons";
import defaultLogoAvatar from "../assets/images/default_avatar.svg";
import {useApi} from "../hooks/useApi";

export function useGetAvatar(type, id) {
    const api = useApi();
    const [imageState, setImageState] = useState({
        isLoading: true,
        url: undefined,
        error: false,
    });

    const uploadAvatar = event => {
        let formData = new FormData();
        console.log('event', event);
        formData.append('file', event.currentTarget.files[0]);
        formData.append('id_user', id);
        window.flash("Nahrávám avatara na server", 'warning', 10000, null);
        api
            .post(`${config.API_BASE_PATH}/${type}/avatar`, formData)
            .then(({data}) => {
                window.flash(data.msg, 'success');
                setTimeout(() => {window.location.reload();}, 1000);
            })
            .catch(({response}) => {
                const {data} = response;
                window.flash(data.msg, 'danger');
            });
    };


    useEffect(() => {
        const fetchData = () => {
            setImageState({
                isLoading: true,
                url: null,
                error: false,
            });
            api
                .get(`${config.API_BASE_PATH}/${type}/avatar/${id}`)
                .then(({data}) => {
                    let url = data.url === null ? defaultLogoAvatar : data.url;
                    setImageState({
                        isLoading: false,
                        url: url,
                        error: false,
                    });
                })
                .catch(() => {
                    setImageState({
                        isLoading: false,
                        url: undefined,
                        error: true
                    });
                });
        };
        fetchData();
    }, [api, type, id]);
    return [imageState, uploadAvatar];
}

export function Avatar({type, id}) {
    const [imageState, uploadAvatar] = useGetAvatar(type, id);

    return (
        <div>
            {imageState.isLoading  && <div>Loading avatar...</div>}
            {imageState.error && <div>Error...</div>}
            {imageState.url &&
            <div className="avatar-upload">
                <div className="avatar-edit">
                    <input onChange={uploadAvatar} id="imageUpload" name="file" type="file" accept=".png, .jpg, .jpeg"/>
                    <label htmlFor="imageUpload"><FontAwesomeIcon icon={Icons.faCamera}/></label>
                </div>
                <div className="avatar-preview">
                    <div id="imagePreview">
                        <Image roundedCircle src={imageState.url}/>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}