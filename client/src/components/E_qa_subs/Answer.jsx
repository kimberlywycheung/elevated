import React from 'react';
import axios from 'axios';

const Answer = ({a}) => {

  React.useEffect(() => { //log answer
    if(a) {
      console.log('A', a);
    }
  }, [a]);

  return (
    <div className='ans'>
      <div>
        <span><span className='bold'>A:</span><span className='qa-body'>{a.body}</span></span>
      </div>
      <div className='a-meta'>
        <span>by {a.answerer_name}</span>
        <span>{a.date.slice(0,10)}</span>
        <span>|</span>
        <span>Helpful? <a style={{'paddingRight': '5px'}} className='underline'>Yes</a>{a.helpfulness}</span>
        <span>|</span>
        <a>Report</a>
      </div>
    </div>

  )

};

export default Answer;