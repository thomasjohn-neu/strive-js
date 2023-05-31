import { useState } from "react";

import Dashboard from "../Dashboard/dashboard";
import Header from "./header";
import Footer from "./footer";
import AddChallengeForm from "../Challenges/add-challenge";
import AddGroupForm from "../Groups/add-groups";
import ChallengeLogForm from "../ChallengeLog/ChallangeList";
import SocketNotifications from "./WebSocket/socket-notifications";
import ChallengeList from "../Challenges/list-challenge";
import PomodoroTimer from "../Pomodoro/pomodoro-timer";
import ListGroup from "../Groups/list-groups";
import ReminderNotifications from "./WebSocket/reminder-notifications";

  

export default function Home() {

    const [selectedTab, setSelectedTab] = useState('dashboard');
    const [challengeId, setchallengeId] = useState('');

    const handleTabClick = (tab: string, challengeId?:string) => {
        if (selectedTab=='add-challenge')
            clearChallengeId();
        if(challengeId)
            setchallengeId(challengeId);
        setSelectedTab(tab);
      }
    
    const clearChallengeId = () =>{
        setchallengeId('');
    }

    return (
    <div>
        <Header selectedTab={selectedTab} onTabClick={handleTabClick}/>
        <div className="body">
        <SocketNotifications />
        <ReminderNotifications />
        {selectedTab === 'dashboard' && <Dashboard />}
        {selectedTab === 'add-group' && <AddGroupForm onTabClick={handleTabClick} selectedTab={selectedTab}/>} 
        {selectedTab === 'list-group' && <ListGroup onTabClick={handleTabClick} selectedTab={selectedTab}/>} 
        {selectedTab === 'add-challenge' && <AddChallengeForm onTabClick={handleTabClick} selectedTab={selectedTab} challenge={challengeId} clearChallengeId={clearChallengeId}/>}  
        {selectedTab === 'list-challenge' && <ChallengeList onTabClick={handleTabClick} selectedTab={selectedTab}/>}
        {selectedTab === 'log-challenge' && <ChallengeLogForm onTabClick={handleTabClick} selectedTab={selectedTab}/>}  
        {selectedTab === 'pomodoro' && <PomodoroTimer onTabClick={handleTabClick} selectedTab={selectedTab}/>}  
        </div>

        <Footer/>
        {/* <ChallengeLog/> */}

    </div>
    );
}