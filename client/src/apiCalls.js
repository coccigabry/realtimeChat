import axios from 'axios'

export const login = async (userCredentials, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    try {
        const res = await axios.post('/api/auth/login', userCredentials)
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.infos })

    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err })
    }
}
