import cron from 'node-cron';
import mongoose from 'mongoose';
import moment from 'moment';
import {ChallengeLog, User} from '../models/index.js'
import {sendWebSocketReminderToClient, sendWebSocketReminderToAll} from '../websocket/reminder-socket.js'

mongoose.connect('mongodb://localhost:27017/challengeDb');

export function startCronJob(){
    cron.schedule('* * * * * *', () => {
        ReminderJob();
    
    });
}



async function ReminderJob() {
    console.log("cron job starts");
  
    try {
      // Set the start and end times for the 1-minute window 1 day ago
      let dayAgoUtc = moment.utc().subtract(1, 'days');
        let startWindow = dayAgoUtc.clone().subtract(10, 'minutes');
        let endWindow = dayAgoUtc.clone().add(1, 'minutes');
        console.log(startWindow, endWindow, "   time")
        const challengeLogsData = await ChallengeLog.find({
            isReminderNeeded: true,
            logDateTime: {
                $gte: startWindow,
                $lte: endWindow
            }
        }).exec();
  
      for (const row of challengeLogsData) {
        console.log("row    ", row)
        const user = await User.findOne({ userId: row.userId }).exec();
        const message = JSON.stringify({
          header: "Reminder",
          reminder: row.activityNotes,
        });
        sendWebSocketReminderToClient(user.username, message);
      }
    } catch (error) {
      console.log("Error sending WebSocket message: ", error);
    }
  }