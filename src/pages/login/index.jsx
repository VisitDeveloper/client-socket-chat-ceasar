import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../config/app-routes';

export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [username, setUserName] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <div
            className='background-image-login config-back' style={{ position: 'relative' }}>
            <div className='header-back-ground header-position'>
                Julius Caesar Project
            </div>
            <div className='login-back-ground login-card '>

                <form onSubmit={handleSubmit} className='login-sort'>

                    <div className='font-login' >
                        Login
                    </div>
                    <span className='line-under-login' />

                    <div className='input-div-sort'>
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder='please enter your username'
                        />
                        <em>
                            error
                        </em>
                    </div>

                    <div className='input-div-sort'>
                        <label>Email</label>
                        <input
                            type='email'
                            placeholder='please enter your email'
                        />
                        <em>
                            error
                        </em>
                    </div>

                    <div className='input-div-sort'>
                        <label>Password</label>
                        <input
                            type='password'
                            placeholder='please enter your password'
                        />
                        <em>
                            error
                        </em>
                    </div>

                    <button type='submit' className='btn'>
                        Submit
                    </button>
                    <Link to={APP_ROUTES.REGISTER} style={{textDecoration:'none' , fontSize:'12px' }}>
                        Click here to create an account.
                    </Link>

                </form>
            </div>
        </div>
    )
}
