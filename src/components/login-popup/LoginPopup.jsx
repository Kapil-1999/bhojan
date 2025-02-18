import React, { useContext, useState } from 'react';
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { StoreContext } from '../../context/StoreContext';


const LoginPopup = ({ setShowLogin }) => {
    const {url , setToken} = useContext(StoreContext)
    const [currentState, setCurrentState] = useState("Login");
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        }
        )
    }

    const onLogin = async(e) => {
        e.preventDefault();
        let newUrl = url;
        if(currentState === 'Login') {
            newUrl +="user/login"
        } else {
            newUrl += "user/register"
        }
        const response = await axios.post(newUrl, user) 
        console.log(response);
               
        if(response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("bhojantoken", response.data.token);
            setShowLogin(false)
        } else if(!response.data.success) {
            toast.error(response.data.message)
        }
        
    }

    return (
        <div className='login-popup'>
            <form className='login-form-container' onSubmit={onLogin}>
                <div className="login-popup-title">
                    <h2>{currentState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-opup-input">
                    {
                        currentState === "Login" ? <></> : <input type="text" name='name' value={user.name} onChange={handleChange} placeholder='Your Name' required />
                    }

                    <input type="email" name='email' value={user.email} onChange={handleChange} placeholder='Your Email' required />
                    <input type='password' name='password' value={user.password} onChange={handleChange} placeholder='Password' required />

                </div>
                <button type='submit'>{currentState === "Sign Up" ? "Create account" : "Login"}</button>
                {currentState === "Login" ?
                    <p>Create a new account ?<span onClick={() => setCurrentState("Sign Up")}> Click here</span></p> :
                    <p>Already have an account? <span onClick={() => setCurrentState("Login")}> Login here</span></p>}
            </form>

        </div>
    )
}

export default LoginPopup
