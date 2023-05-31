import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import * as quotes from './../../constants/quotes/quotes';
import './quotes-widget.scss';

export default function QuotesWidget() {
    // const cardClassName = "card";

    const [quoteData, setQuoteData] = useState(fetchQuotes()); 

    function fetchQuotes(){
        const random:number = Math.floor(Math.random() * quotes.quotes.length);
        if (quotes.quotes[random].quoteAuthor==="")
            quotes.quotes[random].quoteAuthor="Some Genius"
        const quoteData = quotes.quotes[random];  
        return quoteData;
    }


    useEffect(() => {
        const intervalId = setInterval(() => {
            setQuoteData(fetchQuotes);
        }, 3000); // update state every 10 second
    
        return () => clearInterval(intervalId);
      }, []);

    return (
        <div className="widget">
            <Card style={{ width: '24rem', height: '16rem' }}>
                <Card.Body>
                    <Card.Title>Words of Wisdom</Card.Title>
                    <Card.Text>{quoteData.quoteText}</Card.Text>
                    <Card.Subtitle className="mb-2 text-muted">{quoteData.quoteAuthor}</Card.Subtitle>
                    {/* <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link> */}
                </Card.Body>
            </Card>
        </div>
    );
}