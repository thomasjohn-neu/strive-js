import React, {useState} from 'react';
import './App.css';
import { FcExpand } from 'react-icons/fc';
import PomodoroTimer from './Pomodoro/pomodoro-timer';

function App() {

  const [isVisible, setIsVisible] = useState(false);
  const [btnClass, setBtnClass] = useState('collapse');

  const showPromodomo = () => {
    if(isVisible === false) {
      setIsVisible(true);
      setBtnClass('expand');
    }
    else  {
      setIsVisible(false);    
      setBtnClass('collapse');
    }
  }

  return (
    <div className="slide-container">
      <div>
        <button className={btnClass} onClick={showPromodomo}>
          <FcExpand size={25}/>
        </button>
        {isVisible === true ?
          <div className="slide"><PomodoroTimer/></div>
          :''
        }
      </div>
    </div>
  );
}

export default App;