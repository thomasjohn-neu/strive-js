import React, { useState } from "react";
import * as groupUtil from './../../utils/group/groupUtils';
import { ReactMultiEmail, isEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';
import { Form, Dropdown, Button } from 'react-bootstrap';

interface Props {
    selectedTab: string;
    onTabClick: (tab: string) => void;  
}

export default function AddGroupForm(props: Props){
    const [groupEmail, setEmails] = React.useState<string[]>([]);
    const [focused, setFocused] = React.useState(false);

    const handleTabClick = (tab: string) => {
        props.onTabClick(tab);
    }

    const [GroupData, setGroupData] = useState({
        groupName:"",
        groupEmail:"",
        error:{
            message:""
        }
    }); 

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement>){
        event.preventDefault();
        let { name, value } = event.target;
        let error = { ...GroupData.error };
        switch (name) {
            case "groupName":
                error.message = value.length===0?'Group Name required':'';
                break;
            case "groupEmail":
                error.message = value.length===0?'Group Member Email required':'';
                break;
            
        }
        console.log(error.message)
        setGroupData({
            ...GroupData,
            [name]: value,
            error: {
              ...GroupData.error,
              message: error.message,
            },
          });
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if(GroupData.error.message!==''){
            return;
        }
        
        const groupPostData = {
            ...GroupData, 
            groupEmail
        }

        const data = await groupUtil.addGroup(groupPostData);
        if(data.status>=200 && data.status<300){
            const body = await data.json();
            if(body){
                handleTabClick('dashboard');
              }
        } else {
            if(data.status>=400 && data.status<500){
                setGroupData({ ...GroupData, error: {...GroupData.error,
                                message: "Failed to save the challenge"}
                            });
            }
        }

    }   

    return(
        <div className="container">
            <div className="row">
                <Form className="formChallenge" onSubmit={handleSubmit}>
                    <Form.Group className="col-12 labelBackground">
                        <Form.Label><h2 className="labelBackground">Group</h2> </Form.Label>
                    </Form.Group>
                    
                    <Form.Group className="form-group labelBackground">
                        <Form.Label className="labelBackground form-label">Group Name</ Form.Label>
                        <Form.Control type="text" name="groupName" className="form-control inputMargin" id="groupName" placeholder="Enter Group Name" onChange={handleFormChange}/>
                    </Form.Group>

                    <Form.Group className="form-group labelBackground">
                        <Form.Label className="labelBackground form-label">Email address</Form.Label>
                        <ReactMultiEmail
                                placeholder='Enter Email address'
                                emails={groupEmail}
                                onChange={(_emails: string[]) => {
                                setEmails(_emails);
                                }}
                                onBlur={() => setFocused(false)}
                                getLabel={(email, index, removeEmail) => {
                                return (
                                    <div data-tag key={index}>
                                    <div data-tag-item>{email}</div>
                                    <span data-tag-handle onClick={() => removeEmail(index)}>
                                        ×
                                    </span>
                                    </div>
                                );
                                }}
                        />
                        <small id="emailHelp" className="form-text text-muted"></small>
                    </Form.Group>
                    <button type='submit' className="submit-button submit">Save</button>
                </Form>
            </div>
            
        </div>
    );
}