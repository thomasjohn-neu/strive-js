import QuotesWidget from "./quotes-widget";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import PersonalChallengeWidget from "./personal-challenge-widget";
import GroupChallengeWidget from "./group-challenge-widget";
import { useEffect, useState } from "react";

import * as challengeUtils from './../../utils/challenge/challengeUtils';


export default function Dashboard() {
  const [challenges, setChallenges] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    getChallenges();
  }, []);

  const getChallenges = () => {
    challengeUtils.getChallenges({ challengeType: "myChallenges" }).then((data) => {
      if (data.status >= 200 && data.status < 300) {
        data.json().then((body: never[]) => {
          setChallenges(body);
        });
      }
    });
  }

  function loadPersonalWidgets(){
    let widgets = challenges.map((challenge: any) => (
      <PersonalChallengeWidget challenge={challenge}/>
    ));   
  return widgets;
  }

  function loadGroupWidgets(){
    let widgets = challenges.filter((challenge: any) => challenge.privacy !== "private").map((challenge: any) => <GroupChallengeWidget challenge={challenge}/>);
  return widgets;
  }


  return (
    <div>
    <Carousel
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={10}>
      <QuotesWidget />
      {loadPersonalWidgets()}
    </Carousel>
    <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={10}>
        {loadGroupWidgets()}
      </Carousel>
    </div>
  );

}