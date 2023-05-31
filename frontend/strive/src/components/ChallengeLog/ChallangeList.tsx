import React, { useEffect, useState } from "react";
import './ChallengeList.scss';
import * as challengeUtil from './../../utils/challenge/challengeUtils'
import NewChallengeLog from "./add-challenge-log";
import ChallengeLogList from "./ChallengeLogList";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface Props {
    selectedTab: string;
    onTabClick: (tab: string) => void;  
}
interface studyTopic {
    topicName:string;
    videourl:string;
    materialurl:string;
}
interface Challenge {
    challengeId: string;
    challengeName: string;
    challengeType: string;
    topicList: studyTopic[];
    startDate: string;
    endDate: string;
    totalTopics: string;
  }
//Activity Page Challenge List
export default function ChallengeList(props : Props) {

    const [challenges, setChallenges] = useState<any[]>([]);
    const [allChallenges, setAllChallenges] = useState<any[]>([]);
    const [challengeType, setChallengeType] = useState<string>('study');
    const [addLog, setAddLog] = useState<Boolean>(false);
    const [allLogs, setAllLogs] = useState<Boolean>(false);
    const [topicsDiv, setTopicsDiv] = useState<Boolean>(false);
    const [topicButtonTxt, setTopicButtonTxt] = useState<String>('Show Topics');
    const [selTopic, setSelTopic] = useState<Number>();
    

    const [selChallenge, setSelChallenge] = useState<Challenge>({
        challengeId : '',
        challengeName : '',
        challengeType : '',
        topicList : [],
        startDate: '',
        endDate: '',
        totalTopics: ''
    });

    const userId = sessionStorage.getItem('userId') ?? '';
    
    useEffect(() => {
        let params = {challengeType : challengeType, userId : userId};
        challengeUtil.getChallenges(params).then(response => response.json())
        .then(data => {
            if(data) {
                setAllChallenges(data);
                let tempChall = [];
                for(let v of data) {
                    if(v.challengeType === challengeType)
                        tempChall.push(v);
                }
                if(challengeType === 'study') {
                    for(let v of tempChall) {
                        let topicList = [];
                        let xx = v['studyChallengeData']['studyTopicData'];
                        for(let vv of xx) {
                            if(vv.topic) {
                                topicList.push({
                                    topicName:vv.topic,
                                    videourl:vv.videoLink,
                                    materialurl:vv.materialLink
                                });
                            }
                        }
                        v.topicList = topicList;
                    }
                }        
                setChallenges(tempChall);
            }
        })
        },[]);

    const onTypeChange = (event : React.MouseEvent<HTMLAnchorElement>) => {
        const challType = event.currentTarget.dataset.name;
        if (challType) {
            setChallengeType(challType);
            let tempChall = [];
            for(let v of allChallenges) {
                if(v.challengeType === challType)
                    tempChall.push(v);
                setChallenges(tempChall);
            }
            setAddLog(false);
            setAllLogs(false);
            setSelChallenge({ challengeId : '',
            challengeName : '',
            challengeType : '',
            topicList : [],
            startDate: '',
            endDate: '',
            totalTopics: ''
        });
        }              
    }
    
    const logEntry = (event : React.MouseEvent<HTMLButtonElement>) => {
        let index = parseInt(event.currentTarget.value);
        let x:any = challenges[index];
        let topicList = [];
        if(x.challengeType === 'study') {
            let xx = challenges[index]['studyChallengeData']['studyTopicData'];
            for(let v of xx) {
                if(v.topic) {
                    topicList.push({
                        topicName:v.topic,
                        videourl:v.videoLink,
                        materialurl:v.materialLink
                    });
                }
            }
        }
        setSelChallenge({
            challengeId : x.id,
            challengeName : x.challengeName,
            challengeType : x.challengeType,
            topicList : topicList,
            startDate : x.startDate,
            endDate : x.endDate,
            totalTopics : ''
        });
        setAllLogs(false);
        setAddLog(true);
    }
    const handleAddNewCancel = () => {
        setSelChallenge({ challengeId : '',
            challengeName : '',
            challengeType : '',
            topicList : [],
            startDate: '',
            endDate: '',
            totalTopics: ''
        });
        setAddLog(false);
      };
    
    const showlogs = (event : React.MouseEvent<HTMLButtonElement>) => {
        let index = parseInt(event.currentTarget.value);
        let x = challenges[index];
        let totalList = '';
        if(challengeType === 'study')
            totalList = challenges[index].topicList.length;
        setSelChallenge({
            challengeId : x.id,
            challengeName : x.challengeName,
            challengeType : x.challengeType,
            topicList : challenges[index].topicList,
            startDate : x.startDate,
            endDate : x.endDate,
            totalTopics: totalList
        });
        setAddLog(false);
        setAllLogs(true);
    }

    const hidelogs = () => {
        setAllLogs(false);
    }

    const showTopics = (event: React.MouseEvent<HTMLButtonElement>) => {
        let index = parseInt(event.currentTarget.value);
        setSelTopic(index);
//        challenges[index]
        if(topicsDiv === false) {
            setTopicsDiv(true);
            setTopicButtonTxt('Hide Topics');
        }
        else {
            setTopicsDiv(false);
            setTopicButtonTxt('Show Topics');
        }

    }

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }
    return (
        <div>
            <div className="sidenav">
                <a href="#"  className="log-buttons submit inputMargin " data-name="study" onClick={onTypeChange}>Study</a>
                <a href="#" data-name="fitness" onClick={onTypeChange}>Fitness</a>
                <a href="#" data-name="lifestyle" onClick={onTypeChange}>Lifestyle</a>
            </div>

            <div className="main"> 
                {challenges.map((ch: any, i: number) =>
                i !== undefined ? (
                    <Container data-key={i} className="challenge-box">
                        <Row>
                            <Col className={ch.privacy}></Col>
                        </Row>
                        <Row className="row fieldLabel inputMargintop">
                            <Col>Challenge Name</Col>
                            <Col>Frequency</Col>
                        </Row>
                        <Row className="row fieldValue inputMargin">
                            <Col>{ch.challengeName}</Col>
                            <Col>{ch.challengeFrequency}</Col>
                        </Row>
                        <Row className="row fieldLabel">
                            <Col>Description</Col>
                        </Row>
                        <Row className="row fieldValue inputMargin">
                            <Col>{ch.challengeDescription}</Col>
                        </Row>
                        <Row className="row fieldLabel">
                            <Col>Start Date</Col>
                            <Col>End Date</Col>
                        </Row>
                        <Row className="row fieldValue inputMargin">
                            <Col>{formatDate(ch.endDate)}</Col>
                            <Col>{formatDate(ch.startDate)}</Col>
                        </Row>
                        <Row className="row fieldLabel">
                            <Col>Duration</Col>
                        </Row>
                        <Row className="row fieldValue inputMargin">
                            <Col>{ch.totalTargetTime}</Col>
                        </Row>
                        { topicsDiv ? (
                                <>
                                {ch.topicList.map((topic:any,j:number) =>
                                    selTopic === i ? (
                                    <div>
                                        <Row className="row fieldLabel">
                                            <Col>Topic Name</Col>
                                            <Col>Video Url</Col>
                                            <Col>Material Url</Col>
                                        </Row>
                                        <Row className="row fieldValue inputMargin ">
                                            <Col>{topic.topicName}</Col>
                                            <Col>
                                                <a href={`${topic.videourl}#link`} 
                                                    title={topic.videourl}>
                                                    {
                                                        topic.videourl ? 
                                                        `${topic.videourl.slice(0, 10)}...`
                                                        :''
                                                    }
                                                </a>
                                            </Col>
                                            <Col>
                                                <a href={`${topic.materialurl}#link`} 
                                                    title={topic.materialurl}>
                                                    {
                                                        topic.materialurl ? 
                                                        `${topic.materialurl.slice(0, 10)}...`
                                                        :''
                                                    }
                                                </a>
                                            </Col>                                        
                                        </Row>
                                    </div>                                    
                                    ) : ''
                                )
                                }
                            </> )
                            : ''
                            }                        
                            <Row>
                            <Col>
                                <button className="log-buttons submit inputMargin " value={i} onClick={logEntry}>Log Entry</button>
                            </Col>
                            <Col>
                                <button className="log-buttons submit inputMargin " value={i} onClick={showlogs}>All Logs</button>
                            </Col>
                            </Row>
                            { challengeType === 'study' ? 
                                    <Row>
                                        <button onClick={showTopics}  value={i} className="topics-button submit">{topicButtonTxt}</button>
                                    </Row> : ''
                            }
                    </Container> )
                    : ''
                )   
            }
            </div>
            { addLog === true ? <NewChallengeLog endDate={selChallenge.endDate} startDate={selChallenge.startDate} challengeType={selChallenge.challengeType} challengeId={selChallenge.challengeId} topicList={selChallenge.topicList} challengeName={selChallenge.challengeName} onCancel={handleAddNewCancel} /> : '' }
             { allLogs === true ? <ChallengeLogList topicList={selChallenge.topicList} totalTopics={selChallenge.totalTopics} challengeId={selChallenge.challengeId} challengeType={selChallenge.challengeType}  challengeName={selChallenge.challengeName} onCancel={hidelogs} /> : '' }
        </div>
    );
}