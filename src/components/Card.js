import React from "react";
import {SongContext} from "../context/songContext";
import {AuthContext} from "../context/authContext.";
import {API_URL} from "../utils/api";
import EditSong from "./EditSong";




const Card = ({song}) => {

    const { state: authState } = React.useContext(AuthContext);

    const [title, setTitle] = React.useState("");
    const [artist, setArtist] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");

    const isButtonDisabled = title === "" || artist === "" || imageUrl === "";


    const songtes = {
        albumArt: "https://res.cloudinary.com/schms/image/upload/v1560029436/albumart2.png",
        artist: "HOOKED",
        createdAt: "2014-02-11T00:00:00",
        id: 100,
        name: "LOST IN TIME",
        rating: 5,
        updatedAt: "2014-04-11T00:00:00",
    }
    

    const klikEdit = () => {
        console.log (EditSong)
    }

    const deleteSong = () => {

        console.log(song.id);
    
        fetch(`${API_URL}/songs/` + song.id, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${authState.token}`,
                "Content-Type": `application/json`
            },
            body: JSON.stringify(song),
        })
            .then(res => {
                if (res.ok) {
                    window.location.reload()
                    
                } else {
                    throw res;
                }
            })
            .catch(error => {
            console.log(error)})
    }

    const tesEdit = () => {
        console.log("edit diklik")
        console.log(song)

        fetch(`${API_URL}/songs/12`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${authState.token}`,
                "Content-Type": `application/json`
            },
            body: JSON.stringify(
                 {
                    artist : "Artist Edit",
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

    

    return (
        <div className="card">
            <img
                src={song.albumArt}
                alt=""
            />
            <div className="content">
                <h2>{song.name} id:{song.id}</h2>
                <span>BY: {song.artist}</span>
            <div className="action">
                <button
                    type="button"
                    className="action-button edit"
                    onClick={tesEdit}>
                Edit
                </button>
                <button
                    type="button"
                    className="action-button delete"
                    onClick={deleteSong}>
                Delete
                </button>
            </div>
            </div>

            <EditSong show={false}></EditSong>
        </div>

        

        
        
    );
};

export default Card;