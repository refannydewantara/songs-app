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
                                ADD NEW SONG
                            </h1>
                        </div>
                        <form className="modal-form">
                            <div className="modal-form-inputs">

                                <label htmlFor="title">Title</label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    className="text-input"
                                />

                                <label htmlFor="artist">Artist</label>
                                <input
                                    id="artist"
                                    name="artist"
                                    type="text"
                                    value={artist}
                                    onChange={e => setArtist(e.target.value)}
                                    className="text-input"
                                />

                                <label htmlFor="imageUrl">Image URL</label>
                                <input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="text"
                                    value={imageUrl}
                                    onChange={e => setImageUrl(e.target.value)}
                                    className="text-input"
                                />
                            </div>



                            <div className="form-error">
                                <p>
                                    Error
                                </p>
                            </div>
                            <div className="form-action clearfix">
                                <button
                                    type="button"
                                    id="overlay-confirm-button"
                                    className="button button-primary"
                                    
                                    disabled={isButtonDisabled}
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    id="overlay-cancel-button"
                                    className="button button-default small close-overlay pull-right"
                                    
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