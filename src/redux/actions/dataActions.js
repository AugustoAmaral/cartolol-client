import {SET_PLAYERS, SET_PLAYER, LOADING_DATA, CREATE_PLAYER, CLEAR_ERRORS, SET_ERRORS} from '../types';
import axios from 'axios';
import { getUserTeam, getUserData } from './userActions';

export const createPlayer = (playerData) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.post('/player/create', playerData)
        .then(res => {
            dispatch({
                type: CREATE_PLAYER,
                payload: res.data
            });
            window.location.reload(false);
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
}

export const updatePlayerImage = (formData, playerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.post(`/player/image/${playerName}`, formData)
        .then(() => {
            dispatch(getAllPlayers());
        })
        .catch(err => console.error(err));
}

export const getAllPlayers = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/players')
        .then(res => {
            dispatch({
                type: SET_PLAYERS,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => console.error(err));
} 

export const getPlayer = (playerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/players/${playerName}`)
        .then(res => {
            dispatch({
                type: SET_PLAYER,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => console.error(err));
}

export const updatePlayerDetails = (playerData, playerName) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.post(`/player/${playerName}`, playerData)
        .then(() => {
            dispatch(getAllPlayers());
            
        })
        .then(() => {
            dispatch(getUserTeam());
            window.location.reload(false);
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}