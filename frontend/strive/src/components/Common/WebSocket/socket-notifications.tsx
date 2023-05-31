import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import * as constant from './../../../constants/apiConstants'
import PushNotifications from '../Utils/push-notifications';
import toast, { Toaster } from 'react-hot-toast';


export default function SocketNotifications () {
  //Public API that will echo messages sent to it back to the client
  const token = sessionStorage.getItem('token') ?? '';
  const [socketUrl, setSocketUrl] = useState(constant.WS_URL+`/notifications?token=${token}`);
  const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage as MessageEvent<any>));
    }
    console.log(lastMessage, "   sdsdsdsds")
    toast.success(lastMessage?.data)
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
    <div>
      {/* <span>The WebSocket is currently {connectionStatus}</span> */}
      <Toaster position="top-right" />
       {/* <ul>
         {messageHistory.map((message, index) => (
             <PushNotifications message={message.data}/>)
         )}
       </ul> */}
     </div>
  );
};