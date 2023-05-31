import React from 'react'
import FullCalendar from '@fullcalendar/react'
import { EventInput } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
//import  EventClickArg from '@fullcalendar/react';
import './FullCalender.scss'

interface Log {
  topicName: string; 
  logDateTime: string; 
  activityStartTime: Date; 
  activityEndTime: Date;
}

interface Props {
  logList: Log[];
}

interface HeaderToolbarConfig {
  left: string;
  center: string;
  right: string;
}

//Calender View for challenge Logs
export default class CalendarApp extends React.Component<Props> {

  private headerToolbarConfig: HeaderToolbarConfig = {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  }

  render() {
    const { logList } = this.props;
    const events: EventInput[] = logList.map((log: Log) => ({
      title: log.topicName,
      start: log.activityStartTime,
      end: log.activityEndTime
    }));

    return (
      <div className='calendar-parent'>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView='dayGridMonth'
          events={events}
          headerToolbar={this.headerToolbarConfig}
        />
      </div>
    );
  }
}
