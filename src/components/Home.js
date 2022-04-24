import React from "react";
import {initialStateSong, reducerSong, SongContext} from "../context/songContext";
import {API_URL} from "../utils/api";
import AddSong from "./AddSong";
import EditSong from "./EditSong";
import {AuthContext} from "../context/authContext.";
import Card from "./Card";

const Home = () => {
    const { state: authState } = React.useContext(AuthContext);
    const [state, dispatch] = React.useReducer(reducerSong, initialStateSong);
    const [isAddSongModalVisible, setAddSongModalVisibility] = React.useState(false);

    const toggleAddSong = () => {
        setAddSongModalVisibility(!isAddSongModalVisible);
    }



    

    React.useEffect(() => {
        dispatch({
            type: "FETCH_SONGS_REQUEST"
        });
        fetch(`${API_URL}/songs`, {
            headers: {
                Authorization: `Bearer ${authState.token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw res;
                }
            })
            .then(resJson => {
                console.log(resJson);
                dispatch({
                    type: "FETCH_SONGS_SUCCESS",
                    payload: resJson
                });
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: "FETCH_SONGS_FAILURE"
                });
            });
    }, [authState.token]);

    return (
        <React.Fragment>
            <SongContext.Provider value={{
                state,
                dispatch
            }}>
                <button className="toggle-button" onClick={toggleAddSong}>ADD SONG</button>
                <AddSong onClose={toggleAddSong} show={isAddSongModalVisible} />
            </SongContext.Provider>
            <div className="home">
                {state.isFetching ? (
                    <span className="loader">LOADING...</span>
                ) : state.hasError ? (
                    <span className="error">AN ERROR HAS OCCURED</span>
                ) : (
                    <>
                        {state.songs.length > 0 &&
                            state.songs.map(song => (
                                <Card key={song.id.toString()} song={song}/>
                                
                            ))}
                    </>
                )}
            </div>
        </React.Fragment>
    );
};

export default Home;