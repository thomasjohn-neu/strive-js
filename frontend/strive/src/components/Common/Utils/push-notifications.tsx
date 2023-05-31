import Alert from 'react-bootstrap/Alert';

interface Props {
    message:string
}

export default function PushNotifications(props: Props){
    return(
        <div style={{ position: 'absolute', zIndex: '999', top: '60px', right: '10px' }}>
            <Alert style={{ width: '400px', height: '60px'}} key={"info"} variant={"info"}>{props.message}</Alert>
        </div>
    );
}