import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import * as constant from './../../../constants/apiConstants'
import { Dialog } from 'primereact/dialog';
import toast, { Toaster } from 'react-hot-toast';


export default function ReminderNotifications () {
  //Public API that will echo messages sent to it back to the client
  const token = sessionStorage.getItem('token') ?? '';
  const [socketUrl, setSocketUrl] = useState(constant.WS_URL+`/reminders?token=${token}`);
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
  const [visible, setVisible] = useState(false);
  const [socketData, setSocketData] = useState<any>({reminder: "", header: ""});

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage as MessageEvent<any>));
    }
    if(lastMessage?.data !== undefined){
        let reminder = JSON.parse(lastMessage.data);
        setSocketData({...reminder});
        setVisible(true);
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl('ws://localhost:9000/notifications/'),
    []
  );

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <Dialog header={socketData.header} visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
        <p className="m-0">
            {socketData.reminder}
        </p>
    </Dialog>
  );
};