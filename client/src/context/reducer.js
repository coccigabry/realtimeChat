const authReducer = (state, action) => {

    switch (action.type) {

        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            }

        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }

        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                error: action.payload
            }

        case "FOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    other: {
                        ...state.user.other,
                        following: [
                            ...state.user.other.following,
                            action.payload
                        ]
                    }
                }
            }

        case "UNFOLLOW":
            return {
                ...state,
                user: {
                    ...state.user,
                    other: {
                        ...state.user.other,
                        following: state.user.other.following.filter(user => user !== action.payload)
                    }
                }
            }

        default:
            return state
    }
}


export default authReducer