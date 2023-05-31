import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Pie, PieChart, ResponsiveContainer, Legend, Cell, Label } from 'recharts';

import * as dashboardUtils from './../../utils/dashboard/dashboardUtils';
import './quotes-widget.scss';

interface Props {
    challenge: any
}

export default function PersonalChallengeWidget(props: Props){

    const [data, setData] = useState({
        _id: "",
        challengeId: "",
        userId: "",
        __v: 0,
        completionProgressPercentage: 0,
        totalTimeSpentPercentage: 0,
        totalCompletedTasks:0,
        totalCompletetedTime:0,
        totalTargetedTasks:0,
        totalTargetedTime:0,

      });

    const [data01, setData01] = useState([
      {
        "name": "Total",
        "value": data.totalTargetedTasks
      },
      {
        "name": "Pending",
        "value":  data.totalCompletedTasks
      },
      ]);

    const [data02, setData02] = useState([{
      "name": "Target Time",
      "value": data.totalTargetedTime
    },
    {
      "name": "Time Spent",
      "value": data.totalCompletetedTime
    },]);



    useEffect(() => {
        dashboardUtils.getPersonalWidgetData({challengeId:props.challenge.id}).then((data) => {
            if (data.status >= 200 && data.status < 300) {
              data.json().then((body: any[]) => {
                if(body.length>0)
                  setData(body[0]);
                  if(data){
                    const data01 = [
                      {
                        "name": "Total",
                        "value": body[0].totalTargetedTasks
                      },
                      {
                        "name": "Pending",
                        "value":  (body[0].totalTargetedTasks - body[0].totalCompletedTasks)
                      },
                    ];  
                    const data02 = [
                      {
                          "name": "Target Time",
                          "value": body[0].totalTargetedTime
                        },
                        {
                          "name": "Time Spent",
                          "value": body[0].totalCompletetedTime
                        },
                    ];
                    setData01(data01);
                    setData02(data02);
                  }
              });
            }
          });
    }, []);

    const getChallenges = () => {
        
    } 

    const COLORS : any = ['#D81B60', '#880E4F'];
    const OCOLORS: any = ['#8E24AA', '#4A148C']

    // const COLORS : any = ['#9A0D1D', '#0051A0'];
    // const OCOLORS: any = ['#145F09', '#A08B0D']


    // const COLORS : any = ['#0450A0', '#145F09'];
    // const OCOLORS: any = ['#F1347E', '#00DAF0']
    return(
        <div className="widget">
            <Card style={{ width: '24rem', height: '16rem' }}>
                <Card.Body>
                    <Card.Title>{props.challenge.challengeName}</Card.Title>
                    <ResponsiveContainer height="80%">
                        <PieChart>
                            <Legend verticalAlign="bottom" height={ 5} wrapperStyle={{fontSize: "10px"}}/>
                            <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={30} outerRadius={50}>
                                {data01.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)}
                            </Pie>
                            <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} >
                                {data02.map((entry, index) => <Cell fill={OCOLORS[index % COLORS.length]}/>)}
                                <Label value={`${data.completionProgressPercentage}%`} position="center" />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    
                </Card.Body>
            </Card>
        </div>
    );
}