import React, { useState, useEffect } from 'react';
import './ChallengeLogList.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import * as challengeLogUtils from './../../utils/challengeLog/challengeLogUtils';
import CalenderApp from './FullCalender';

interface studyTopic {
    topicName:string;
    videourl:string;
    materialurl:string;
}

interface Prop {
  challengeId: string;
  challengeName: string;
  challengeType: string;
  totalTopics: string;
  onCancel: () => void;
  topicList : studyTopic[];
}

//Challenge Log List Read
function ChallengeLogList(props: Prop) {
  const [allLogs, setAllLogs] = useState<any[]>([]);
  const userId = sessionStorage.getItem('userId') ?? '';
  const [totalTopics, setTotalTopics] = useState('');
  const [topicsCompleted, setTopicsCompleted] = useState('');
  const [totalLogs, setTotalLogs] = useState('');
  const [selectedView, setSelectedView] = useState('calender');

  useEffect(() => {
    let params = { userId: userId };
    let x: any = props.challengeId;
    challengeLogUtils
      .getChallengeLog(props.challengeId, params)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let logList = [];
        let topicsCompleted = 0;
        for(let v of data) {
            const completionStatus = v.activityCompletionStatus === false ? 'No' : 'Yes';
            const reminderNeeded = v.isReminderNeeded === false ? 'No' : 'Yes';
            if(v.activityCompletionStatus === true)
                topicsCompleted++;
            let selTopic:any=props.topicList.filter(tp => (tp.topicName === v.topic))[0];
            if(!selTopic) {
              selTopic = {};
              selTopic.topicName = '';
              selTopic.videourl = '';
              selTopic.materialurl = '';              
            }
            logList.push({
                activityCompletionStatus:completionStatus,
                isReminderNeeded:reminderNeeded,
                logDateTime:v.logDateTime,
                activityStartTime:v.activityStartTime,
                activityEndTime:v.activityEndTime,
                activityNotes:v.activityNotes,
                topicName:selTopic.topicName,
                videourl:selTopic.videourl,
                materialurl:selTopic.materialurl
            });
        }
        setTotalTopics(props.totalTopics);
        let loglength = logList ? logList.length : 0;
        setTotalLogs(String(loglength));
        topicsCompleted = topicsCompleted > parseInt(props.totalTopics) ? parseInt(props.totalTopics) : topicsCompleted;
        setTopicsCompleted(String(topicsCompleted));
        setAllLogs(logList);
      });
  }, []);

  const changeView = (event: React.MouseEvent<HTMLButtonElement>) => {
    let name = event.currentTarget.name;
    if(name === 'calender') {
        setSelectedView('calender');
    }
    else if(name === 'list') {
        setSelectedView('list');
    }
  }

  return (
    <div className="log-box">
      <div className='views'>
        <button name='calender' onClick={changeView}>Calender View</button>
        <button name='list' onClick={changeView}>List View</button>
      </div>
        <Row className="row fieldLabel">
            <Col>Challenge Name</Col>
            <Col>Total Topics</Col>
            <Col>Topics Completed</Col>
            <Col>Logging Days</Col>
            <span>
              <button onClick={props.onCancel} className="close-button">
                X
              </button>
            </span>
        </Row>
        <Row className="row fieldValue">
            <Col>{props.challengeName}</Col>
            <Col>{totalTopics}</Col>
            <Col>{topicsCompleted}</Col>
            <Col>{totalLogs}</Col>
          </Row>
      {selectedView === 'calender' ? (
        <CalenderApp logList={allLogs}></CalenderApp>
      ) : (
        <div>
          {allLogs.map((log: any, i: number) => (
            <Container className="log">
              <Row className="row fieldLabel inputMargintop">
                <Col>Log Date</Col>
                <Col>Status</Col>
              </Row>
              <Row className="row fieldValue inputMargin">
                <Col>{new Date(log.logDateTime).toLocaleString()}</Col>
                <Col>{log.activityCompletionStatus}</Col>
              </Row>
              <Row className="row fieldLabel">
                <Col>Start Time</Col>
                <Col>End Time</Col>
              </Row>
              <Row className="row fieldValue inputMargin">
                <Col>{new Date(log.activityStartTime).toLocaleString()}</Col>
                <Col>{new Date(log.activityEndTime).toLocaleString()}</Col>
              </Row>
              <Row className="row fieldLabel">
                <Col>Reminder</Col>
                <Col>Notes</Col>
              </Row>
              <Row className="row fieldValue inputMargin">
                <Col>{log.isReminderNeeded}</Col>
                <Col>{log.activityNotes}</Col>
              </Row>
              <Row className="row fieldLabel">
                <Col>Topic</Col>
                <Col>Video URL</Col>
              </Row>
              <Row className="row fieldValue inputMargin">
                <Col>{log.topicName}</Col>
                <Col>
                  <a href={`${log.videourl}#link`} 
                    title={log.videourl}> {
                      log.videourl ? 
                      `${log.videourl.slice(0, 20)}...`
                      :''}
                  </a>
                </Col>
              </Row>
            </Container>
          ))}
        </div>
      )}
    </div>
  );  
}

export default ChallengeLogList;
