import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import * as userUtil from './../../utils/user/userUtils'; 
import './sign-up.scss';

export default function SignUp(){
    const [userData, setUserData] = useState({
        first_name:"",
        last_name:"",
        username:"",
        password:"",
        error:{
            message:""
        }
    }); 

    const navigate = useNavigate();

    function handleFirstNameChange(event: React.ChangeEvent<HTMLInputElement>){
        setUserData({ ...userData, first_name: event.target.value });
    }

    function handleLastNameChange(event: React.ChangeEvent<HTMLInputElement>){
        setUserData({ ...userData, last_name: event.target.value });
    }

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
        const data = await userUtil.signUpUser(userData);
        if(data.status>=200 && data.status<300){
            const body = await data.json();
            if(body){
                sessionStorage.setItem('token',body.token);
                sessionStorage.setItem('user',JSON.stringify(body.user));
                let cookie =  `token=${body.token};expires=Sun, 1 Jan 2024 00:00:00 UTC; path=/`;
                document.cookie=cookie;
                navigate('/home');
              }
        } else {
            if(data.status>=400 && data.status<500){
                //alert(data.status +' -- '+JSON.stringify(data));
                const body = await data.json();
                if(body.reason === 'Email already registered, please sign in') {
                    alert(body.reason);
                }
                /*setUserData({ ...userData, error: {...userData.error,
                                message: ""}
                            });*/
            }
        }

      }

    return (
        <div className="signupBox">
            
            <form className="signupForm" onSubmit={handleSubmit}>
                <h3 className="LogoHead">STRIVE</h3>
                <label className="signlabel" htmlFor='firstname'>First Name</label>
                <input type='text' className="signInput" required autoComplete="off" placeholder="First Name" name="firstname" id="firstname" onChange={handleFirstNameChange}></input>
                <label className="signlabel" htmlFor='lastname'>Last Name</label>
                <input type='text' className="signInput" required autoComplete="off" placeholder="Last Name" name="lastname" id="lastname" onChange={handleLastNameChange}></input>
                <label className="signlabel" htmlFor='username'>Username</label>
                <input type="email" className="signInput" required autoComplete="off" placeholder="Email" name="email" id="email" onChange={handleUserNameChange} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address for username"/>
                {/* <input type='text' className="signInput" required autoComplete="off" placeholder="Username" name="username" id="username" 
                onChange={handleUserNameChange}></input> */}
                <label className="signlabel" htmlFor="password">Password</label>
                <input type='password' className="signInput" name="password" autoComplete="new-password" placeholder="Password" id="password" required onChange={handlePasswordChange}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':\\|,.<>/?])(?=.*[0-9]).{8,}$"
                  title="Password must follow the required pattern"></input>
                <div className='passwordReq'>
                    Your Password should be combination of the following - 
                    <ul>Atleast one smallcase and one Uppercase</ul>
                    <ul>Atleast One special character such as (!@#$%^)</ul>
                    <ul>Atleast one number</ul>
                </div>
                <span className={userData.error.message.length !== 0 ? 'error-message' : 'error-message hide'}>{userData.error.message}</span>
                <button type='submit' className="signUpButton">Create Account</button>
            </form>
        </div>
    );
}