import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/login', userData)
        .then(res => {
            console.log(res.data);
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            history.push('/');
            //window.location.reload(false);
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS, 
                payload: err.response.data 
            });
        })
} 

export const signupUser = (newUser, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post("/signup", newUser)
      .then(res => {
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push("/");
      })
      .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
      });
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post('/user/image', formData)
      .then(() => {
        dispatch(getUserData());
      })
      .catch((err) => console.log(err));
  };

export const updateUserDetails = (userData) => (dispatch) => {
    
    axios.post('/user', userData)
        .then(() => {
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}  

export const getUserData = () => (dispatch) => {
    axios.get('/user') 
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err => console.error(err));
}

export const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.commom['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
}