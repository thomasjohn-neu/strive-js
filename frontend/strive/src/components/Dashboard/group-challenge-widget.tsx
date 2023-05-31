import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { BarChart, CartesianGrid, XAxis, ResponsiveContainer, Legend, YAxis, Tooltip, Bar, LabelList } from 'recharts';
import * as dashboardUtils from './../../utils/dashboard/dashboardUtils';

import './quotes-widget.scss';

interface Props {
    challenge: any
}

interface DashboardData {
        _id: string,
        challengeId: string,
        userId: string,
        completionProgressPercentage: number,
        totalTimeSpentPercentage: number,
        totalCompletedTasks:number,
        totalCompletetedTime:number,
        totalTargetedTasks:number,
        totalTargetedTime:number,

}

export default function GroupChallengeWidget(props: Props) {

    const [data, setData] = useState<DashboardData[] | []>([{
        _id: "",
        challengeId: "",
        userId: "",
        completionProgressPercentage: 0,
        totalTimeSpentPercentage: 0,
        totalCompletedTasks:0,
        totalCompletetedTime:0,
        totalTargetedTasks:0,
        totalTargetedTime:0,

}]);
    
    useEffect(() => {
        dashboardUtils.getGroupWidgetData({challengeId:props.challenge.id}).then((data) => {
            if (data.status >= 200 && data.status < 300) {
              data.json().then((body) => {
                setData(body);
              });
            }
          });
    }, []);

     
      function CustomizedLabel(props:any) {
        const {x, y, fill, value} = props;
        return (
            <text 
                     x={x} 
                     y={y} 
                     fontSize='10' 
                     fontFamily='sans-serif'
                     fill={fill}
                     textAnchor="start">{value}%</text>
        )  
        }

    return (
        <div className="widget">
            <Card style={{ width: '24rem', height: '16rem' }}>
                <Card.Body>
                    <Card.Title>Group - {props.challenge.challengeName}</Card.Title>
                    <ResponsiveContainer height="80%">
                        <BarChart width={730} height={250} data={data} layout="vertical" barCategoryGap={3}>
                            {/* <CartesianGrid strokeDasharray="3 3" /> */}
                            <YAxis type="category" dataKey="username" interval={0}/>
                            <XAxis type="number"  hide/>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={ 5} wrapperStyle={{fontSize: "8px"}}/>
                            <Bar dataKey="completionProgressPercentage" fill="#f1347e">
                                <LabelList dataKey="completionProgressPercentage" position="insideRight" style={{ fill: "white", fontSize:"5px" }} />
                            </Bar> 
                            <Bar dataKey="totalTimeSpentPercentage" fill="#00daf0"> 
                                <LabelList dataKey="totalTimeSpentPercentage" position="insideRight" style={{ fill: "white", fontSize:"5px" }} />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>

                </Card.Body>
            </Card>
        </div>
    );
}