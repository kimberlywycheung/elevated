import React from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';

const QaBlock = ({q}) => {
  const [Alist, setAlist] = React.useState(q.answers);
  console.log('Q:', q);
  return (
    <div>
      <div className='q-body'>
      <span>Q: {q.body}</span>
      <span>Helpful: <a>Yes {q.helpfullness}</a> <a>Report</a></span>
      </div>
      <div className='a-body'>
        {/* {Alist.map((a) => {
          return (
            <Answer a={a}/>
          )
        })} */}
      </div>

    <a>load more answers</a>
    </div>

  )

};

export default QaBlock;