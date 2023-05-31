import React, { useCallback, useEffect, useState } from "react";
import ErrorAlert from "../Common/Utils/error-alert";
import { Form, Dropdown, Button } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';


import * as challengeUtil from './../../utils/challenge/challengeUtils'
import * as groupUtil from './../../utils/group/groupUtils'

import Dictaphone from "../Common/Speech/dictaphone";

interface StudyTopicData {
      topic: string;
      videoLink: string;
      materialLink: string;
    };

interface Props {
    selectedTab: string;
    onTabClick: (tab: string) => void; 
    challenge: string; 
    clearChallengeId: () => void;
    }

export default function AddChallengeForm(props: Props){

    const [challengeData, setChallengeData] = useState({
        challengeName:"",
        challengeType:"",
        challengeFrequency:"",
        startDate:"",
        endDate:"",
        privacy:"",
        group:"",
        challengeDescription:"",
        tags:"",
        error:{
            message:""
        }
    }); 

    const [showError, setShowError] = useState(false);
    const [editForm, setEditForm] = useState(false);
    const [groups, setGroups] = useState<any[] | []>([]);
    const [groupDrops, setGroupDrops] = useState<JSX.Element[] | undefined>();

    const handleTabClick = (tab: string) => {
        props.clearChallengeId();
        props.onTabClick(tab);
      }

    const [studyChallengeDetails, setStudyChallengeDetail] = useState({
        studyDuration: "",
        studyTopicData: [{topic:"", videoLink:"", materialLink:""}],
        error:{
            message:""
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            if(props.challenge){
                setEditForm(true);
                challengeUtil.getChallenge(props.challenge).then((data) => {
                    if (data.status >= 200 && data.status < 300) {
                      data.json().then((body: any) => {
                        setChallengeData({...body,
                            error:{
                                message:""
                            }});
                        let studyData = body.studyChallengeData
                        setStudyChallengeDetail({
                            ...studyData,
                            error:{
                                message:""
                            }
                        })
                      });
                    }
                  });
            } 
        };
        fetchData();
        
    },[props.challenge]);

    useEffect(() => {
        fetchGroup();
        // makeGroupDropDowns();
    }, []);

    function showErrorAlert(){
        if (challengeData.error.message!=='' || studyChallengeDetails.error.message!=='')
        setShowError(true)
    }

    function fetchGroup(){
        groupUtil.getGroups().then((data) => {
            if (data.status >= 200 && data.status < 300) {
              data.json().then((body: any) => {
                setGroups(body)
              });
            }
          });
    }

    function makeGroupDropDowns(){
        let groupDropdowns = groups.map((group: any) => (
            <option key={group.id} value={group.id}>{group.groupName}</option>
          ));   
        return groupDropdowns;
    }

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        let { name, value } = event.target;
        let error = { ...challengeData.error };
        switch (name) {
            case "challengeName":
                error.message = value.length===0?'Challenge Name required':'';
                break;
            case "startDate":
                error.message = value.length===0?'Start Date required':'';
                break;
            case "endDate":
                error.message = value.length===0?'End Date required':'';
                break;
        }
        setChallengeData({
            ...challengeData,
            [name]: value,
            error: {
              ...challengeData.error,
              message: error.message,
            },
          });
          showErrorAlert();
    }

    function handleStudyFormChange(event: React.ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        let { name, value } = event.target;
        let error = { ...studyChallengeDetails.error };
        switch (name) {
            case "studyDuration":
                error.message = value.length===0?'Study Duration required':'';
                break;
        }
        setStudyChallengeDetail(
            {
                ...studyChallengeDetails,
                [name]: value,
                error: {
                    ...studyChallengeDetails.error,
                    message: error.message,
                }
            }
        )
        showErrorAlert();
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        event.preventDefault();
        let { name, value } = event.target;
        let error = { ...challengeData.error };
        const notValid = (""===event.target.value);
        switch (name) {
            case "challengeType":
                error.message = notValid?'Challenge Type required':'';
                break;
            case "challengeFrequency":
                error.message = notValid?'Challenge Frequency required':'';
                break;
            case "privacy":
                error.message = notValid?'Challenge Privacy required':'';
                break;
            
        }
        setChallengeData({
            ...challengeData,
            [name]: value,
            error: {
              ...challengeData.error,
              message: error.message,
            },
          });
          showErrorAlert();
    }

    function handleTextareaChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        event.preventDefault();
        setChallengeData({
            ...challengeData,
            challengeDescription: event.target.value,
          });
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(challengeData.error.message!=='' && studyChallengeDetails.error.message!==''){
            return;
        }

        const challengePostData = {
            ...studyChallengeDetails,
            ...challengeData
        }
        let data = null;
        if (editForm === true)
            data = await challengeUtil.editChallenge(challengePostData, props.challenge);
        else
            data = await challengeUtil.addChallenge(challengePostData);
        if(data.status>=200 && data.status<300){
            const body = await data.json();
            if(body){
                props.clearChallengeId();
                toast('Successfully saved the challenge!');
                handleTabClick('dashboard');
              }
        } else {
            if(data.status>=400 && data.status<500){
                setChallengeData({ ...challengeData, error: {...challengeData.error,
                                message: "Failed to save the challenge"}
                            });
            }
        }
        showErrorAlert();

    }    

    const handleAddTopicFields = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const studyTopics = studyChallengeDetails.studyTopicData;
        studyTopics.push({topic:"", videoLink:"", materialLink:""})
        setStudyChallengeDetail({
            ...studyChallengeDetails,
            studyTopicData: studyTopics
        });
    };

    const updateTextDescriptionOverVoice = useCallback((text:string) => {
        setChallengeData((prevData) => ({ ...prevData, challengeDescription: text }));
      }, []);

    return(
        <div className="container">
            <Toaster position="top-right"/>
            {
                challengeData.error.message!=='' && (
                <ErrorAlert message={challengeData.error.message}/>
                )}

            <Form className="formChallenge" onSubmit={handleSubmit}>
            <h2 className="labelBackground">Challenge Info</h2>
                <Form.Group >
                    <Form.Label className="labelBackground">Name:</Form.Label>
                    <Form.Control className="inputMargin" type="text" name="challengeName" value={challengeData.challengeName} onChange={handleFormChange} />
                </Form.Group>
                <Form.Group className="labelBackground">
                    <Form.Label className="labelBackground">Challenge Type:</Form.Label>
                    <Form.Select className="inputMargin" name="challengeType" value={challengeData.challengeType} onChange={handleSelectChange}>
                        <option value="">--Select--</option>    
                        <option value="study">Study</option>
                        <option value="fitness">Fitness</option>
                        <option value="lifestyle">Life Style</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="labelBackground">
                    <Form.Label className="labelBackground">Frequency:</Form.Label>
                    
                    <Form.Select className="inputMargin" name="challengeFrequency" value={challengeData.challengeFrequency} onChange={handleSelectChange}>
                        <option value="">--Select--</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="labelBackground">
                        <Form.Label className="labelBackground">Start Date:</Form.Label>
                        <Form.Control className="inputMargin" type="date" name="startDate" value={challengeData.startDate} onChange={handleFormChange} />

                        <Form.Label className="labelBackground">End Date:</Form.Label>
                        <Form.Control className="inputMargin" type="date" name="endDate" value={challengeData.endDate} onChange={handleFormChange} />
                    </Form.Group>


                    <Form.Group className="labelBackground">
                        <Form.Label className="labelBackground">Privacy:</Form.Label>
                        <Form.Select className="inputMargin" name="privacy" value={challengeData.privacy} onChange={handleSelectChange}>
                            <option value="">--Select--</option>
                            <option value="private">Private</option>
                            <option value="group">Group</option>
                            <option value="public">Public</option>
                        </Form.Select>
                    </Form.Group>

                     {/* study challenge details form starts */}
                     {challengeData.privacy === "group" && (
                    <Form.Group className="labelBackground">
                          <Form.Label>
                                Group Name:
                          </Form.Label>
                          <Form.Select className='inputMargin' name="group" value={challengeData.group} onChange={handleSelectChange}>
                                        <option value="">--Select--</option>    
                                        {makeGroupDropDowns()}
                          </Form.Select>
                    </Form.Group>
                  
                    )}

                    <Form.Group className="labelBackground">
                        <Form.Label className="labelBackground">Challenge Description:</Form.Label>
                        <Form.Control className="inputMargin" as="textarea" rows={3} id="challengeDescription" value={challengeData.challengeDescription} onChange={handleTextareaChange} />
                        <Dictaphone voiceTextupdate={updateTextDescriptionOverVoice} />
                    </Form.Group>

                    <Form.Group className="labelBackground">
                        <Form.Label className="labelBackground">Tags:</Form.Label>
                        <Form.Control className="inputMargin" type="text" name="tags" value={challengeData.tags} onChange={handleFormChange} />
                    </Form.Group>
            
                    <h2 className="labelBackground" style={{textTransform: 'capitalize'}}>{challengeData.challengeType} Challenge Details</h2>

                    {
                    studyChallengeDetails.error.message!=='' && (
                        <ErrorAlert message={studyChallengeDetails.error.message}/>
                    )}

                    {/* study challenge details form starts */}
                    {challengeData.challengeType === "study" && (
                    <Form.Group className="labelBackground">
                          <Form.Label>
                                Study Duration(in minutes):
                          </Form.Label>
                          <Form.Control type="text" className="inputMargin" name="studyDuration" value={studyChallengeDetails.studyDuration} onChange={handleStudyFormChange} />
                    </Form.Group>
                  
                    )}

                    {challengeData.challengeType === "study" &&
                    studyChallengeDetails.studyTopicData.map((field:StudyTopicData, index) => (
                        <div key={index}>
                             <Form.Control
                                type="text" className="inputMargin"
                                value={field.topic}
                                placeholder={"Topic"}
                                onChange={(e) => {
                                    const newStudyFields:any = [...studyChallengeDetails.studyTopicData];
                                    newStudyFields[index].topic = e.target.value;
                                    setStudyChallengeDetail(
                                        {
                                            ...studyChallengeDetails,
                                            studyTopicData: newStudyFields
                                        }
                                    )
                                }}/>
                             <Form.Control
                                type="text" className="inputMargin"
                                value={field.videoLink}
                                placeholder={"Video URL"}
                                onChange={(e) => {
                                    const newStudyFields:any = [...studyChallengeDetails.studyTopicData];
                                    newStudyFields[index].videoLink = e.target.value;
                                    setStudyChallengeDetail(
                                        {
                                            ...studyChallengeDetails,
                                            studyTopicData: newStudyFields
                                        }
                                    )
                                }}/>
                             <Form.Control
                                type="text" className="inputMargin"
                                value={field.materialLink}
                                placeholder={"Material URL"}
                                onChange={(e) => {
                                    const newStudyFields:any = [...studyChallengeDetails.studyTopicData];
                                    newStudyFields[index].materialLink = e.target.value;
                                    setStudyChallengeDetail(
                                        {
                                            ...studyChallengeDetails,
                                            studyTopicData: newStudyFields
                                        }
                                    )
                                }}/>


                        </div>
                    )
                    )}

                    {challengeData.challengeType === "study" && (
                        <button className="submit" onClick={handleAddTopicFields}>Add fields</button>
                    )}

                    {/* study challenge details form  ends */}
                    <button type='submit' className="submit-button submit">Save Challenge</button>

                </Form>
                
            </div>
    );
}

