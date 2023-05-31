import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import * as userUtil from './../../utils/user/userUtils'; 
import './sign-in.scss';


export default function SignIn() {
    const [userData, setUserData] = useState({
        username:"",
        password:"",
        error:{
            message:""
        }
    }); 

    const navigate = useNavigate();

    function handleUserNameChange(event: React.ChangeEvent<HTMLInputElement>){
        setUserData({ ...userData, username: event.target.value });
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>){
        setUserData({ ...userData, password: event.target.value });
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if(userData.error.message!==''){
            return;
        }
        const data = await userUtil.signInUser(userData);
        if(data.status>=200 && data.status<300){
            const body = await data.json();
            if(body){
                sessionStorage.setItem('token',body.token);
                sessionStorage.setItem('user',JSON.stringify(body.user));
                sessionStorage.setItem('userId',body.user._id);
                let cookie =  `token=${body.token};expires=Sun, 1 Jan 2024 00:00:00 UTC; path=/`;
                document.cookie=cookie;
                navigate('/home');
              }
        } else {
            if(data.status>=400 && data.status<500){
                setUserData({ ...userData, error: {...userData.error,
                                message: "Invalid username/Password"}
                            });
            }
        }

      }

    return (
        <div className="signinBox">
            <form className="signInForm" onSubmit={handleSubmit}>
                <h3 className="LogoHead">STRIVE</h3>
                <label className="signlabel" htmlFor='username'>Username</label>
                <input type='text' className="signInput" required autoComplete="off" placeholder="Username" name="username" id="username" onChange={handleUserNameChange}></input>
                <label className="signlabel" htmlFor="password">Password</label>
                <input type='password' className="signInput" name="password" autoComplete="off" placeholder="Password" id="password" required onChange={handlePasswordChange}></input>
                <span className={userData.error.message.length !== 0 ? 'error-message' : 'error-message hide'}>{userData.error.message}</span>
                <button type='submit' className="signInButton">Sign In</button>
            </form>
        </div>
    );
}