import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Knob } from 'primereact/knob';
import { Button, Form } from 'react-bootstrap';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import toast, { Toaster } from 'react-hot-toast';
import './pomodoro.css';


interface ChallengeLog {
    challengeId: string,
    challengeType: string,
    activityStartTime: Date,
    activityEndTime: Date,
    activityDuration: Number,
    topicIndex: Number
}

interface Challenge {
    challengeName: string,
    challengeType: string,
    challengeFrequency: string,
    tags: string,
    startDate: Date,
    endDate: Date,
    studyChallengeData?: {
      studyTopicData:[],
      studyDuration: Number
    },
    createdTime: Date,
    updatedTime: Date,
    privacy: string,
    id: string
}

export default function PomodoroTimer(){

    const [challenges, setChallenges] = useState<Challenge[] | []>([]);
    const [selectedChallenge, setSelectedChallenge] = useState('');
    const [selectedChallengeDetails, setSelectedChallengeDetails] = useState<Challenge>({challengeName: "",
        challengeType: "",
        challengeFrequency: "",
        tags: "",
        startDate: new Date(),
        endDate: new Date(),
        studyChallengeData: {
          studyDuration:0,
          studyTopicData:[],
        },
        createdTime: new Date(),
        updatedTime: new Date(),
        privacy: "",
        id: ""});
    const [timeTarget, setTimeTarget] = useState(25)
    const [startTime, setStartTime] = useState<Date>(new Date());
    const [endTime, setEndTime] = useState<Date>(new Date());
    const [timer, setTimer] = useState<number | undefined>(0);
    const [percentage, setPercentage] = useState(0);
    const [remainingTime, setRemainingTime] = useState("25:00");
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>(undefined);
    const [topics, setTopics] = useState<JSX.Element[] | undefined>();
    const [selectedTopicIndex, setSelectedTopicIndex] = useState(-1);


     useEffect(() => {
          fetch("http://localhost:9000/challenge/extension/", {method : 'GET'})
          .then(response => response.json())
          .then(data => {
            setChallenges(data);
          });
           setTimer(0);
     }, []);

    const handleSelectChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedChallenge(event.target.value);
        const challengeDetails = await new Promise<Challenge | undefined>((resolve) => {
          const result = challenges.find(obj => obj.id === event.target.value);
          resolve(result);
        });
        if (challengeDetails) {
          setSelectedChallengeDetails({...challengeDetails});
        }

        let topicDropdowns:JSX.Element[] | undefined;
        if (challengeDetails?.challengeType === 'study'){
          topicDropdowns = challengeDetails.studyChallengeData?.studyTopicData.map((topic:any, index:number) => (
            <option key={index} value={index}>{topic.topic}</option>
        ));
        }
        setTopics(topicDropdowns);

      };

    const handleSelectTopicChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedTopicIndex(parseInt(event.target.value));
    }

    function getChallengeDropDowns() {
//      alert(JSON.stringify(challenges));
      if(challenges) {
        let dropdowns = challenges.map((challenge: any) => (
          <option key={challenge.id} value={challenge.id}>{challenge.challengeName}</option>
        ));   
        return dropdowns
      }
    }

    function startTimer() {
        if (!selectedChallenge) {
            toast.error('Please select a challenge before starting the timer.');
            return;
          }
          if (selectedTopicIndex < 0 && selectedChallengeDetails.challengeType==='study') {
            toast.error('Please select a challenge before starting the timer.');
            return;
          }
        const startDateTime = new Date();
        setStartTime(startDateTime);
        const startTime = startDateTime.getTime();
        const endTime = startTime + timeTarget * 60 * 1000;
    
        const id = setInterval(() => {
          const currentTime = new Date().getTime();
          const elapsed = currentTime - startTime;
          const remaining = endTime - currentTime;
    
        if (remaining <= 0) {
            clearInterval(id);
            setIntervalId(undefined);
            setTimer(undefined);
            setPercentage(0);
            setRemainingTime(`${timeTarget.toString().padStart(2, '0')}:00`);
            alert('Timer has ended!');
          } else {
            setTimer(elapsed);
            const percentage = (elapsed / (timeTarget * 60 * 1000)) * 100;
            setPercentage(percentage);
            const remainingMinutes = Math.floor(remaining / 1000 / 60);
            const remainingSeconds = Math.floor((remaining / 1000) % 60);
            setRemainingTime(`${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`);
          }
        }, 1000);
    
        setIntervalId(id);
      }
    
  function stopTimer() {
    setEndTime(new Date());
    clearInterval(intervalId);
    setIntervalId(undefined);
    setTimer(undefined);
    setPercentage(0);
    setRemainingTime(`${timeTarget.toString().padStart(2, '0')}:00`);
    logChallenge();
  }

  async function logChallenge() {
      const challengeLog: ChallengeLog = {
          challengeId: selectedChallenge,
          challengeType: selectedChallengeDetails.challengeType,
          activityStartTime: startTime,
          activityEndTime: endTime,
          activityDuration: (startTime.getTime()-endTime.getTime()),
          topicIndex: selectedTopicIndex,
      }
    fetch('http://localhost:9000/ChallengeLog/extension/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(challengeLog)
    }).then(response => response.json())
      .then(data => {
        if(data.error) {
          toast.error('Error Logging your activity!--'+JSON.stringify(data.error));
        }
        else {
          toast.success('Successfully Logged your activity!')
        }
      });
    }

    return(
      
        <div className="pomodoroDiv">
          <Toaster position="top-right" />
          <div style={{display: 'flex', flexDirection: 'column' }}>
            <Panel header="Get Set Go" id='p1' >
                <Card title={selectedChallengeDetails.challengeName}>
                    <div style={{ width: 150, height: 150,}}>
                        <CircularProgressbar value={percentage} text={remainingTime} />
                    </div>
                </Card>
            </Panel>
            </div>
            <div style={{display: 'flex', flexDirection: 'column' }}>
            <Panel header="Pomodoro Challenge" id='p2'>
              <div className='form-section'>
                <Form className='text-align'>
                  <Form.Group >
                      <Form.Select className='inputMargin selectForm' name="challengeType" value={selectedChallenge} onChange={handleSelectChange}>
                          <option value="">--Select Challenge--</option>
                          {getChallengeDropDowns()}
                      </Form.Select>
                  </Form.Group>
                  <Form.Group >
                      {(selectedChallengeDetails.challengeType === 'study' && 
                      <Form.Select className='inputMargin selectForm' name="topicIndex" value={selectedTopicIndex} onChange={handleSelectTopicChange}>
                            <option value="">--Select Topic--</option>
                              {topics}
                            </Form.Select>
                      )}
                    </Form.Group>
                    <Form.Group>
                      <label className='text-align'>
                          Time Target:
                          <Knob value={timeTarget} onChange={(e) => setTimeTarget(e.value)} />
                      </label>
                      <div className='submit'>
                        <Button disabled={!!intervalId} onClick={startTimer}>Start</Button>
                        <Button disabled={!intervalId}  onClick={stopTimer}>Stop</Button>
                      </div>
                      </Form.Group >
                  </Form>
                </div>
            </Panel>
            </div>

        </div >
    )
}