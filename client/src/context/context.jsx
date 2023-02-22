import { createContext, useReducer } from 'react'
import authReducer from './reducer'


const INITIAL_STATE = {
    user: null,
    //{
    //    "other": {
    //      "_id": "63ef42aff6af9c3a97a12096",
    //      "username": "Cocci Gabry",
    //      "email": "CocciGabry@email.com",
    //      "profilePicture": "https://th.bing.com/th/id/R.32cf5a349123840a0264964189edd50f?rik=ZnXVq3d6B3LaJw&pid=ImgRaw&r=0",
    //      "coverPicture": "https://images.unsplash.com/photo-1556316782-1ec9b261c156?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1252&q=80",
    //      "followers": [],
    //      "following": [],
    //      "online": true,
    //      "IsAdmin": false,
    //      "createdAt": "2023-02-17T09:02:39.066Z",
    //      "updatedAt": "2023-02-20T15:04:42.210Z",
    //      "__v": 0,
    //      "city": "Genoa",
    //      "desc": "Sweep the sheed!",
    //      "job": "Web Developer",
    //      "relationship": 2
    //    },
    //    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZWY0MmFmZjZhZjljM2E5N2ExMjA5NiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2NzY5NzkzNTcsImV4cCI6MTY3NzA2NTc1N30.bXr6c13bMabSgz0FOoLjAG1FRZ-ti9scfC7lVg2Qr-U"
    //  },
    isFetching: false,
    error: false
}


const AuthContext = createContext(INITIAL_STATE)

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)


    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext, AuthProvider }