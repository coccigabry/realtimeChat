import { useContext, useRef } from "react"
import { AuthContext } from "../context/context"
import { login } from "../apiCalls"
import { Link } from "react-router-dom"


export default function Login() {
    const email = useRef()
    const password = useRef()

    const { user, isFetching, error, dispatch } = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        login(
            {
                email: email.current.value,
                password: password.current.value
            },
            dispatch
        )
    }


    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Coccibook</h3>
                    <span className="loginDesc">Connect with people all around the world on Coccibook</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input
                            placeholder="Your Email"
                            type="email"
                            required
                            className="loginInput"
                            ref={email}
                        />
                        <input
                            placeholder="Your Password"
                            type="password"
                            required
                            minLength='6'
                            className="loginInput"
                            ref={password}
                        />
                        {
                            isFetching
                                ? <img
                                    src="/src/assets/spinner.gif"
                                    alt="loading spinner"
                                    style={{ width: '50px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                                />
                                : <button className="loginButton" disabled={isFetching}>Log In</button>

                        }
                        <span className="loginForgot">Forgot Password?</span>
                        <div className="loginRegisterButton">
                            <Link to='/register' style={{ color: '#fff' }}>
                                Create an account
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
