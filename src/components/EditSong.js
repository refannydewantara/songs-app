import React from "react";
import {SongContext} from "../context/songContext";
import {AuthContext} from "../context/authContext.";
import {API_URL} from "../utils/api";

const EditSong = (props) => {
    
    const { state: authState } = React.useContext(AuthContext);

    const [title, setTitle] = React.useState("");
    const [artist, setArtist] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    

    const onClose = e => {
        props.onClose && props.onClose(e);
    };

    const onSubmitEdit = () => {
        console.log("edit diklik")
        
        

        fetch(`${API_URL}/songs/6`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState.token}`,
                "Content-Type": `application/json`
            },
            body: JSON.stringify(
                 {
                    artist : artist,
                }
            ),
        })
            .then(res => {
                if (res.ok) {
                    console.log(res)
                    window.location.reload()
                    
                } else {
                    throw res;
                }
            })
            .catch(error => {
            console.log(error)})
    }

    const isButtonDisabled = title === "" || artist === "" || imageUrl === "";

    const klikEdit = () => {
        props.show = !props.show
    }



    if (!props.show) {
        return null;
    }
    return (
        <div className="modal" id="modal">
            <div className="modal-table-container">
                <div className="modal-table-cell">
                    <div className="modal-overlay small">
                        <div className="modal-header">
                            <h1 className="modal-title">
                                EDIT SONG
                            </h1>
                        </div>
                        <form className="modal-form">
                            <div className="modal-form-inputs">

                             

                                <label htmlFor="artist">Artist</label>
                                <input
                                    id="artist"
                                    name="artist"
                                    type="text"
                                    value={artist}
                                    onChange={e => setArtist(e.target.value)}
                                    className="text-input"
                                />

                                
                            </div>


                            <div className="form-action clearfix">
                                <button
                                    type="button"
                                    id="overlay-confirm-button"
                                    className="button button-primary"
                                    onClick={() => onSubmitEdit()}
                                    
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    id="overlay-cancel-button"
                                    className="button button-default small close-overlay pull-right"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditSong;