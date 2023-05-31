import { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import * as challengeUtils from './../../utils/challenge/challengeUtils';
import * as challengeLogUtils from './../../utils/challenge-log/challengeLogUtils';
import { Knob } from 'primereact/knob';
import { Button } from 'react-bootstrap';
import ErrorAlert from '../Common/Utils/error-alert';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import toast, { Toaster } from 'react-hot-toast';
import './pomodoro.scss';
import { Form, Dropdown } from 'react-bootstrap';



interface Props {
    selectedTab: string;
    onTabClick: (tab: string) => void;  
    }

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

export default function PomodoroTimer(props: Props){

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
        getChallenges();
        setTimer(0);
    }, []);

    const getChallenges = () => {
        challengeUtils.getChallenges({challengeType:"private"}).then((data) => {
            if (data.status >= 200 && data.status < 300) {
              data.json().then((body: never[]) => {
                setChallenges(body);
              });
            }
          });
    } 

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

    function getChallengeDropDowns(){
        let dropdowns = challenges.map((challenge: any) => (
            <option key={challenge.id} value={challenge.id}>{challenge.challengeName}</option>
          ));   
        return dropdowns
    }

    function startTimer() {
        if (!selectedChallenge) {
            <ErrorAlert message='Please select a challenge before starting the timer.'/>
            return;
          }
          if (selectedTopicIndex < 0 && selectedChallengeDetails.challengeType==='study') {
            <ErrorAlert message='Please select a challenge before starting the timer.'/>
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

      async function logChallenge(){
          const challengeLog: ChallengeLog = {
              challengeId: selectedChallenge,
              challengeType: selectedChallengeDetails.challengeType,
              activityStartTime: startTime,
              activityEndTime: endTime,
              activityDuration: (startTime.getTime()-endTime.getTime()),
              topicIndex: selectedTopicIndex,
          }
          const data = await challengeLogUtils.addPomodoroChallengeLog(challengeLog);
          if(data.status>=200 && data.status<300){
              const body = await data.json();
              if(body){
                toast.success('Successfully Logged your activity!')
                }
          } else {
              if(data.status>=400 && data.status<500){
                toast.error('Failed to Log your activity!')
              }
          }
      }

    return(
      
        <div className="pomodoroDiv" style={{ display: 'flex', justifyContent: 'center' }}>
          <Toaster position="top-right" />
            <Panel header="Get Set Go" >
                <Card title="Challenge Name">
                    <div style={{ width: 200, height: 200,}}>
                        <CircularProgressbar value={percentage} text={remainingTime} />
                    </div>
                </Card>
            </Panel>
            <Panel header="Timer Settings">
                <Card title="Pomodoro Challenge">
                    <div className='form-section' style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Form>
                        <Form.Group >
                            <Form.Select className='inputMargin' name="challengeType" value={selectedChallenge} onChange={handleSelectChange}>
                                <option value="">--Select Challenge--</option>
                                {getChallengeDropDowns()}
                            </Form.Select>
                       
                        </Form.Group>
                        <Form.Group >
                            {selectedChallengeDetails.challengeType === 'study' && (
                                  <Form.Select className='inputMargin' name="topicIndex" value={selectedTopicIndex} onChange={handleSelectTopicChange}>
                                     <option value="">--Select Topic--</option>
                                  {topics}
                                  </Form.Select>
                            )}
                            <label>
                                Time Target:
                                <Knob value={timeTarget} onChange={(e) => setTimeTarget(e.value)} />
                            </label>
                            <br></br>
                            <Button disabled={!!intervalId} className="submit" onClick={startTimer}>Start</Button>
                            <Button disabled={!intervalId} className="submit" onClick={stopTimer}>Stop</Button>
                          </Form.Group >
                        </Form>
                    </div>
                </Card>
            </Panel>
        </div >
    )
}