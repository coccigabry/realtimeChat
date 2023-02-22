import axios from "axios"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"


export default function Register() {
    const navigate = useNavigate()

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const repeatPassword = useRef()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(repeatPassword.current.value !== password.current.value) {
            repeatPassword.setCustomValidity('The two passwords must match!')
        } else {
            const newUser = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            try {
                await axios.post('/api/auth/register', newUser)
                navigate('/login')
            } catch (err) {
                console.error(err)
            }
        }
    }


    return (
        <div className='register'>
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Coccibook</h3>
                    <span className="registerDesc">Connect with people all around the world on Coccibook</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleSubmit}>
                        <input placeholder="Your Name" type="text" required className="registerInput" ref={username} />
                        <input placeholder="Your Email" type="email" required className="registerInput" ref={email} />
                        <input placeholder="Your Password" type="password" required className="registerInput" ref={password} />
                        <input placeholder="Repeat your Password" type="password" minLength="6" required className="registerInput" ref={repeatPassword} />
                        <button className="registerButton">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
