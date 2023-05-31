import Alert from 'react-bootstrap/Alert';

interface Props {
    message:string
}

export default function ErrorAlert(props: Props){
    return(
        <div style={{ position: 'absolute', zIndex: '999', top: '60px', right: '10px' }}>
            <Alert style={{ width: '720px', height: '60px'}} key={"danger"} variant={"danger"}>{props.message}</Alert>
        </div>
    );
}