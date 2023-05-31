import { useCallback, useState } from 'react'
import './add-challenge-log.scss'
import * as challengeLogUtils from './../../utils/challengeLog/challengeLogUtils'
import { Form, Dropdown, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import toast, { Toaster } from 'react-hot-toast';
import ReactPlayer from 'react-player'
import Dictaphone from '../Common/Speech/dictaphone';

interface studyTopic {
    topicName:string;
    videourl:string;
    materialurl:string;
}

interface Props {
    challengeId : string;
    challengeName : string;
    startDate : string;
    endDate : string;
    challengeType: string;
    topicList : studyTopic[];
    onCancel: () => void;
}

//New Challenge Log Form
function NewChallengeLog (props : Props) {

    const [videoLink, setVideoLink] = useState();

    const userId = sessionStorage.getItem('userId') ?? '';
    
    const [log, setLog] = useState({
        userId : userId,
        challengeId: props.challengeId,
        challengeName: props.challengeName,
        challengeType: props.challengeType,
        activityNotes:'',
        logDateTime:new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
        activityStartTime: '',
        activityEndTime: '',
        isReminderNeeded: false,
        activityDuration : 0,
        activityTime : '',
        activityCompletionStatus : false,
        topic : '',
        videourl: '',
        materialurl: '',
        error:{
            message:""
        }
        });
    
    const saveLog = async (event :   React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(props.challengeType !== 'lifestyle') {
            if(log.activityStartTime === '') {
                toast.error('Enter Activity Start Time');
                return;
            }
            if(log.activityEndTime === '') {
                toast.error('Enter Activity End Time');
                return;
            }
            // if(log.activityNotes)
            //     toast.error('Notes is required');
            //     return;
        }

        let data = await challengeLogUtils.addChallengeLog(log);
        if(data.status>=200 && data.status<300){
            const body = await data.json();
            if(body){
                toast.success('Log Successfully Saved!');
                props.onCancel();
              }
        } else {
            if(data.status>=400 && data.status<500){
                console.log(log.error);
                setLog({ ...log, error: {...log.error,
                                message: "Failed to save the challenge log"}
                            });
            }
        }
    }
    
    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        let { name, value } = event.target;
        let error = { ...log.error };
        switch (name) {
            case "activityStartTime": {
                if(value < props.startDate || value > props.endDate) {
                    toast.error('You can log time between challenge Start Date and End Date');
                    return;
                }
                break;
            }
            case "activityEndTime": {
                if(value < props.startDate || value > props.endDate) {
                    toast.error('lYou can log time between challenge Start Date and End Date');
                    return;
                }
                else if(value < log.activityStartTime) {
                    toast.error('End Time cannot be before Start Time');
                    return;
                }
                break;
            }
        }
        setLog(prevLog => {
            const updatedLog = {
              ...prevLog,
              [name]: value,
              error: {
                ...prevLog.error,
                message: error.message,
              },
            };
            if(updatedLog.activityStartTime !== '' && updatedLog.activityEndTime !== '') {
                const startTime:any = new Date(updatedLog.activityStartTime);
                const endTime:any = new Date(updatedLog.activityEndTime);
                const durationMs = endTime - startTime;
                const durationMins = Math.floor(durationMs / 1000 / 60);
                updatedLog.activityDuration = durationMins;
                const durationDays = Math.floor(durationMs / 86400000);
                const durationHours = Math.floor((durationMs % 86400000) / 3600000);
                const durationMins1 = Math.floor(((durationMs % 86400000) % 3600000) / 60000);
                if(durationDays > 0)
                    updatedLog.activityTime =`${durationDays} days, ${durationHours} hours, ${durationMins1} minutes`;
                else if(durationHours > 0)
                    updatedLog.activityTime =`${durationHours} hours, ${durationMins1} minutes`;
                else if(durationMins1 > 0)
                    updatedLog.activityTime =`${durationMins1} minutes`;
            }
            return updatedLog;
        });
    }
    function handleOnChangeTextArea(event: React.ChangeEvent<HTMLTextAreaElement>){
        event.preventDefault();
        let value = event.target.value;
        let error = { ...log.error };
        error.message = value.length===0?'Notes required':'';        
        setLog({
            ...log,
            ['activityNotes']: value,
            error: {
              ...log.error,
              message: error.message,
            },
          });
    }
    function handleOnSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedTopic = event.target.value;
        if(selectedTopic !== 'select') {
            let topic:any = props.topicList.filter(tp => (tp.topicName === selectedTopic))[0];
            setVideoLink(topic.videourl);
//            alert(topic.videourl);
            setLog({
              ...log,
              ['topic']: selectedTopic
            });
        }
        else {
            setLog({
                ...log,
                ['topic']: ''
              });  
        }
    }
    function handleOnSelectBoolean(event: React.ChangeEvent<HTMLSelectElement>) {
        if(event.target.name === 'completionStatus') {
            const selected = event.target.value;
            let status = false;
            if(selected === 'yes')
                status = true;
            else
                status = false;
            setLog({
            ...log,
            activityCompletionStatus: status
            });
        }
        else if(event.target.name === 'reminder') {
            const selected = event.target.value;
            let status = false;
            if(selected === 'yes')
                status = true;
            else
                status = false;
            setLog({
            ...log,
            isReminderNeeded: status
            });            
        }
    }

    const updateNotesOverVoice = useCallback((text:string) => {
        setLog((prevData) => ({ ...prevData, activityNotes: text }));
      }, []);

    return (
        <div className='add-new-log-bg'>
            <div className='add-new-log-1'>
            <Toaster toastOptions={{
                duration: 4000
                }} 
                position="top-right"
                reverseOrder={true}/>
                <div className='add-log'>
                    <div className='header-add-log'>
                        <span>
                            <button onClick={props.onCancel} className="close-button">
                                X
                            </button>
                        </span>
                        <Row className='challenge-labels'>
                            <Col>Name</Col>
                            <Col>Log Date</Col>
                        </Row>
                        <Row className='challenge-values inputMargin'>
                            <Col>{log.challengeName}</Col>                         
                            <Col>{new Date(log.logDateTime).toLocaleString()}</Col>
                        </Row>
                    </div>                    
                <Form className='form-class' onSubmit={saveLog}>
                {
                    props.challengeType === 'study' || props.challengeType === 'fitness' ?
                    <Form.Group>
                        <Form.Group >
                            <Form.Label className="fieldLabel-input-reqd">Start Time</Form.Label>
                            <Form.Control className='inputMargin' required type="datetime-local" name="activityStartTime" value={log.activityStartTime} onChange={handleOnChange}/>
                        </Form.Group >
                        <Form.Group >
                            <Form.Label className="fieldLabel-input-reqd">End Time</Form.Label>
                            <Form.Control className='inputMargin' required type="datetime-local" name="activityEndTime" value={log.activityEndTime} onChange={handleOnChange}/>
                        </Form.Group >
                        {log.activityStartTime !== '' && log.activityEndTime !== '' ? 
                        <Form.Group >
                            <Form.Group className="fieldLabel">Duration</Form.Group>
                            <Form.Group className="fieldLabel">{log.activityTime}</Form.Group>
                        </Form.Group> : ''
                }
                        <Form.Group >
                            <Form.Label className="fieldLabel">Notes</Form.Label>
                            <Form.Control as="textarea"  name="activityNotes" value={log.activityNotes} onChange={handleOnChangeTextArea}/>
                            <Dictaphone voiceTextupdate={updateNotesOverVoice} />
                        </Form.Group>
                        {props.challengeType === 'study' ? 
                            <Form.Group>
                                <Form.Label className="fieldLabel-input-reqd">Topic Name</Form.Label>
                                <Form.Select  className='inputMargin' name="topicList" value={log.topic} onChange={handleOnSelectChange}>
                                    <option value='select'>Select</option>
                                        {
                                        props.topicList.map((topic: any, i: number) => 
                                        <option key={i} value={topic.topicName}>
                                            {topic.topicName}
                                        </option>
                                        )}
                                </Form.Select>
                                {videoLink ? 
                                    <Form.Group>
                                        <Form.Label className="fieldLabel">Video URL</Form.Label>
                                        <Form.Group className="fieldLabel inputMargin">
                                            <ReactPlayer width="360" height="250" url={videoLink} />
                                        </Form.Group>
                                    </Form.Group> : ''
                                }
                                <Form.Group >
                                    <Form.Label className="fieldLabel">Reminder Needed</Form.Label>
                                    <Form.Select className='inputMargin' name="reminder" onChange={handleOnSelectBoolean}>
                                        <option value='select'>Select</option>
                                        <option value='yes'>Yes</option>
                                        <option value='no'>No</option>
                                    </Form.Select>
                                </Form.Group >
                            </Form.Group>
                            : ''
                        }
                    </Form.Group> :  ''
                }
                <Form.Group>
                    <Form.Group >
                        <Form.Label className="fieldLabel-input-reqd">Target Achieved</Form.Label>
                        <Form.Select className='inputMargin' name="completionStatus" onChange={handleOnSelectBoolean}>
                            <option value='select'>Select</option>
                            <option value='yes'>Yes</option>
                            <option value='no'>No</option>
                        </Form.Select>
                    </Form.Group >
                </Form.Group>
                <Form.Group>
                    <button className='submit-button submit challengelog-save' type='submit'>Save</button>
                </Form.Group>
                </Form>
            </div>
            </div>
        </div>
    )
}

export default NewChallengeLog;