import { Link } from 'react-router-dom';
import './splash.scss';

export default function  Splash(){  
    
    return (
        <div>
            <video autoPlay loop muted className="myVideo">
                <source src="/splash.mp4" type="video/mp4" />
            </video>           
            <div className="content">
               <div className='LogoMain'><h1 className="Logo">STRIVE</h1></div>
                <pre className="typographyBody">
                The price of success is hard work, <br/>
                dedication to the job at hand, <br/>
                and the determination that whether we win or lose, <br/>
                we have applied the best of ourselves to the task at hand.
                </pre>
                <div className='LogoMain'>
                    <Link className="signIn" to="/sign-in">Sign In</Link>
                    <Link className="signUp" to="/sign-up">Sign Up</Link>
                </div>
            </div>

        </div>
    );
}