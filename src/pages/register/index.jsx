import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '../../config/app-routes';
import { useForm } from '../../hooks/useFormValidations';
import { LoginService } from '../../services/login-register.service';
import { useDispatch } from 'react-redux';
import { tokenDataDecoder } from './../../tools/jwt-decoder'
import { toast } from 'react-toastify';
import { saveUser } from './../../store/slices/user';

const login = new LoginService();


export default function Register() {
    // const tokenDataDecoder
    const dispatch = useDispatch();
    const naviagate = useNavigate()

    const { data, handleChange, handleSubmit, errors } = useForm({
        validations: {
            email: {
                required: { value: true, message: "Email is required" },
                pattern: {
                    value: "^\\S+@\\S+\\.\\S+$",
                    message: "Enter a valid email address",
                },
            },
            username: {
                required: { value: true, message: "Email is required" },
                pattern: {
                    value: "/^\S*$/",
                    message: "Enter a valid email address",
                },
            },
            password: {
                required: { value: true, message: "Password is required" },
                pattern: {
                    value: "^.{6,}$",
                    message: "Enter at least 6 characters",
                },
            },
        },
        onSubmit: async () => {
            console.log("Form submitted with data:", data);
            const registerData = {
                email: data.email,
                username: data.username,
                password: data.password,

                // Username: "admin@project.com",
                // Password: "p@a#s)9a5d1m7i5n",
                // captcha: "string",
            };
            try {
                const data = await login.register(registerData);

                const token = data.data.token;
                const irole = tokenDataDecoder(token);
                console.log('irole', irole);
                // const changePass = data.data.ChangePassword;
                // const newOnjLogin = {
                //     token: token,
                //     // userType: changePass === true ? "guest" : role,
                //     userType: irole.IsAdmin?.toLowerCase() === 'true' ? 'admin' : 'user',
                //     name: irole.Nickname,
                //     userID: irole.sub
                // };

                // dispatch(saveUser(newOnjLogin));
                setTimeout(() => {
                    toast.success("Success Request");
                    naviagate(APP_ROUTES.DASHBOARD);
                }, 100);
            } catch (error) {
                console.log(error);
                toast.error("Faild Request");
            }
        },
        // onSubmit: () => {
        //     const newOnjLogin: any = {
        //       token: data.email,
        //       userType: userStatusLogin,
        //       name: 'amirali',
        //     };
        //     dispatch(saveUser(newOnjLogin));
        //     setTimeout(() => {
        //       toast.success('Success Request')
        //       naviagate(APP_ROUTES.DASHBOARD);
        //     }, 100);
        // },
    });



    return (
        <div
            className='background-image-login config-back' style={{ position: 'relative' }}>
            <div className='header-back-ground header-position'>
                Julius Caesar Project
            </div>
            <div className='login-back-ground login-card '>

                <form onSubmit={handleSubmit} className='login-sort'>

                    <div className='font-login' >
                        Register
                    </div>
                    <span className='line-under-login' />

                    <div className='input-div-sort'>
                        <label htmlFor='byidusername'>Username</label>
                        <input
                            id="byidpassword"
                            value={data.email}
                            onChange={handleChange("email")}
                            type="text"
                            placeholder='please enter your username'
                        />
                        <em>
                            error
                        </em>
                    </div>

                    <div className='input-div-sort'>
                        <label htmlFor="byidemail">Email</label>
                        <input
                            type="email"
                            id="byidemail"
                            value={data.email}
                            onChange={handleChange("email")}
                            placeholder='please enter your email'
                        />
                        <em>
                            {errors.email}
                        </em>
                    </div>

                    <div className='input-div-sort'>
                        <label htmlFor='byidpassword'>Password</label>
                        <input
                            id="byidpassword"
                            value={data.email}
                            onChange={handleChange("email")}
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
                    <Link to={APP_ROUTES.LOGIN} style={{ textDecoration: 'none', fontSize: '12px' }}>
                        do you have already account ?
                    </Link>
                </form>
            </div>
        </div>
    )
}
