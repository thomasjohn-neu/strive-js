import { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import * as groupUtils from "../../utils/group/groupUtils";
import './list-group.scss';

interface Props {
    selectedTab: string;
    onTabClick: (tab: string) => void;  
}


export default function ListGroup(props: Props){

    const [groups, setGroups] = useState([]);
    const layoutDefault:"grid" | "list" | (string & Record<string, unknown>) = "grid";
    const [layout, setLayout] = useState(layoutDefault);

    const handleTabClick = (tab: string) => {
        // if (editChallenge !== '')
        //     props.onTabClick(tab, editChallenge);
        // else
        //     props.onTabClick(tab);
        props.onTabClick('add-group');
      }

    useEffect(() => {
        groupUtils.getGroups().then((data) => {
            if (data.status >= 200 && data.status < 300) {
              data.json().then((body: never[]) => {
                setGroups(body);
              });
            }
          });
    }, []);

    // const groupEmailsArray = data.groupEmail.split(',');

    const listItem = (group:any) => {
        return (
            <div className="col-12 contentLayout">
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    {/* <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} /> */}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4 contentLayout">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3 contentLayout">
                            <div className="text-2xl font-bold text-900 contentLayout contentCap">{group.groupName}</div>
                            <div className="text-900 backgroundBlack">{getGroupMembers(group)}</div>
                        </div>
                            <div className="text-900 backgroundBlack">{group.groupEmail.length} - participants</div>
                    </div>
                </div>
            </div>
        );
    };

    function getGroupMembers(group:any) {
        let element = '';
        group.groupEmail.map((member:string) => {
          element +=   member + ' ';
        });
        return element;
      }

    const gridItem = (group:any) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2 contentLayout">

                <div className="p-4 border-1 height-div surface-border surface-card border-round contentLayout">
                    <div className="flex flex-column align-items-center gap-3 py-5 contentLayout">
                        <div className="text-2xl font-bold contentLayout contentCap">{group.groupName}</div>
                        <div className="text-900 backgroundBlack">{group.groupEmail.length} - participants</div>
                        <div className="text-900 backgroundBlack">{getGroupMembers(group)}</div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (group:any, layout:"grid" | "list" | (string & Record<string, unknown>) | undefined) => {
        if (!group) {
            return;
        }

        if (layout === 'list') return listItem(group);
        else if (layout === 'grid') return gridItem(group);
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e:any) => setLayout(e.value)} />
            </div>
        );
    };
    

    return (
        <div>
            <div className="newChallenge">
                <h3 className="groupName">Group Listing</h3>
                <Button className="btn-bottom submit" onClick={() => handleTabClick('add-challenge')}>Add Group</Button>
            </div>
            
            <div className="card">
                <DataView value={groups} itemTemplate={itemTemplate} layout={layout} header={header()} />
            </div>

        </div>
    );
}