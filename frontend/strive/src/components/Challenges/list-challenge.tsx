import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import 'primeflex/primeflex.css';
import "primereact/resources/themes/bootstrap4-light-blue/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import * as challengeUtils from './../../utils/challenge/challengeUtils';
import './list-challenge.scss';
import PushNotifications from '../Common/Utils/push-notifications';
import ReactPlayer from 'react-player';


interface Props {
    selectedTab: string;
    onTabClick: (tab: string, challengeId?:string) => void;  
    }


    
export default function ChallengeList(props: Props){
    const keyDefault:string|null = 'public';
    const layoutDefault:"grid" | "list" | (string & Record<string, unknown>) = "grid";
    const [challenges, setChallenges] = useState([]);
    const [layout, setLayout] = useState(layoutDefault);
    const [key, setKey] = useState(keyDefault);
    const [editChallenge, setEditChallenge] = useState('');

    useEffect(() => {
        getChallenges();
    }, [key]);

    const getChallenges = () => {
        challengeUtils.getChallenges({challengeType:key}).then((data) => {
            if (data.status >= 200 && data.status < 300) {
              data.json().then((body: never[]) => {
                setChallenges(body);
              });
            }
          });
    } 

    const getSeverity = (challenge:any) => {
        // switch (product.inventoryStatus) {
        //     case 'INSTOCK':
        //         return 'success';

        //     case 'LOWSTOCK':
        //         return 'warning';

        //     case 'OUTOFSTOCK':
        //         return 'danger';

        //     default:
        //         return null;
        // }
        return "success"
    };

    const editChallengeForm = (challengeId:string) => {
        setEditChallenge(challengeId);
        props.onTabClick("add-challenge", challengeId);
    }

    const deleteChallenge = (challengeId:string) => {
        challengeUtils.deleteChallenge(challengeId).then((data:any) => {
            if (data.status >= 200 && data.status < 300) {
              data.json().then((body: never[]) => {
                // <PushNotifications message={'Deleted the challenge'} />
                // need to implement alert message
                getChallenges();
              });
            }
          });
    }

    const getPhotoUrl = (challenge:any) => {
        const fileIndex:number = Math.round(Math.random() * (5 - 1) + 1);
        return `/${challenge.challengeType}${fileIndex}.jpg`
    }

    function formatDate(dateString:string) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }


    const listItem = (challenge:any) => {
        return (
            <div className="col-12 contentLayout">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 backgroundBlack">
                { challenge.studyChallengeData.studyTopicData[0].videoLink ? (
                            <ReactPlayer width="230px" height="170px" url={challenge.studyChallengeData.studyTopicData[0].videoLink}/>

                        ):(
                    <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" 
                        src={getPhotoUrl(challenge)} 
                        style={{ width: '400px', height: '170px' }}
                        alt={challenge.challengeName} />
                )}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900 backgroundBlack">{challenge.challengeName}</div>
                            <div className="flex align-items-center gap-3 backgroundBlack">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{challenge.challengeType}</span>
                                </span>
                                <Tag value={challenge.tag} severity="success">{challenge.challengeFrequency}</Tag>
                            </div>
                        </div>
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">{challenge.challengeDescription}</div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <span className="font-semibold">{formatDate(challenge.endDate)}</span>
                            <div className='justify-content-between'>
                                <Button icon="pi pi-pencil" onClick={() => editChallengeForm(challenge.id)} className="p-button-rounded margin-right" disabled={false}></Button>
                                <Button icon="pi pi-trash" className="p-button-rounded" onClick={() => deleteChallenge(challenge.id)}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (challenge:any) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-3 p-2 contentLayout">
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{challenge.tags}</span>
                        </div>
                        <Tag value={challenge.tag} severity="success">{challenge.challengeFrequency}</Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-3">
                        { challenge.studyChallengeData.studyTopicData[0].videoLink ? (
                            <ReactPlayer width="230px" height="170px" url={challenge.studyChallengeData.studyTopicData[0].videoLink}/>

                        ) : (
                            <img className="w-9 shadow-2 border-round" 
                            src={getPhotoUrl(challenge)} 
                            style={{ width: '230px', height: '170px' }}
                            alt={challenge.challengeName} />
                        )}

                        <div className="text-2xl font-bold">{challenge.challengeName}</div>
                    </div>

                    <div className="text description">{challenge.challengeDescription}</div>
                    <div className="flex align-items-center align-between">
                        <span className="font-semibold">{formatDate(challenge.endDate)}</span>
                        <div className='align-right'>
                            <Button icon="pi pi-pencil" className="p-button-rounded edit-button btn-custom" onClick={() => editChallengeForm(challenge.id)}></Button>
                            <Button icon="pi pi-trash" className="p-button-rounded" onClick={() => deleteChallenge(challenge.id)}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (challenge:any, layout:"grid" | "list" | (string & Record<string, unknown>) | undefined) => {
        if (!challenge) {
            return;
        }

        if (layout === 'list') return listItem(challenge);
        else if (layout === 'grid') return gridItem(challenge);
    };

    const header = () => {
        
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e:any) => setLayout(e.value)} />
            </div>
        );
    };

    const handleTabClick = (tab: string) => {
        if (editChallenge !== '')
            props.onTabClick(tab, editChallenge);
        else
            props.onTabClick(tab);
      }

    const onTabChange = (k:string|null) =>{
        if (k === null){
            k='public';
        }
        setKey(k);
    }

    return (
        <div>
            <div className='newChallenge'>
                <Button className='submit btn-right' onClick={() => handleTabClick('add-challenge')}>Add New Challenge</Button>
            </div>
            <Tabs
                defaultActiveKey="public"
                id="uncontrolled-tab-example"
                className="mb-3 newChallenge"
                onSelect={(k) => onTabChange(k)}
                >
                <Tab eventKey="public" title="All Challenges">
                    <div className="card card-bottom">
                        <DataView value={challenges} itemTemplate={itemTemplate} layout={layout} header={header()} />
                    </div>
                </Tab>
                <Tab eventKey="group" title="Group Challenges">
                    <div className="card card-bottom">
                        <DataView value={challenges} itemTemplate={itemTemplate} layout={layout} header={header()} />
                    </div>
                </Tab>
                <Tab eventKey="private" title="My Challenges">
                    <div className="card card-bottom">
                        <DataView value={challenges} itemTemplate={itemTemplate} layout={layout} header={header()} />
                    </div>
                </Tab>
            </Tabs>
        </div>
    );
}