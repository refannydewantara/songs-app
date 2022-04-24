import React from "react";

export const SongContext = React.createContext();

export const initialStateSong = {
    songs: [],
    isFetching: false,
    hasError: false,
    isSongSubmitting: false,
    songHasError: false,
};

export const reducerSong = (state, action) => {
    switch (action.type) {
        case "FETCH_SONGS_REQUEST":
            return {
                ...state,
                isFetching: true,
                hasError: false
            };
        case "FETCH_SONGS_SUCCESS":
            return {
                ...state,
                isFetching: false,
                songs: action.payload
            };
        case "FETCH_SONGS_FAILURE":
            return {
                ...state,
                hasError: true,
                isFetching: false
            };
        case "ADD_SONG_REQUEST":
            return {
                ...state,
                isSongSubmitting: true,
                songHasError: false,
            }
        case "ADD_SONG_SUCCESS":
            return {
                ...state,
                isSongSubmitting: false,
                songs: [...state.songs, action.payload]
            }
        case "ADD_SONG_FAILURE":
            return {
                ...state,
                isSongSubmitting: false,
                songHasError: true,
            }

        default:
            return state;
    }
};