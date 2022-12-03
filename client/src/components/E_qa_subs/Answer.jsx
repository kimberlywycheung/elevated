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
      <div className='qa-meta'>
        by username, Date | Helpful? <a>Yes</a> | <a>Report</a>
      </div>
    </div>

  )

};

export default Answer;