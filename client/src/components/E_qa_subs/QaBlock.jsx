import React from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';

const QaBlock = ({q}) => {
  const [Alist, setAlist] = React.useState([]);

  React.useEffect(() => { //set answer list
    if(q) {
      setAlist(Object.values(q.answers));
    }
  }, [q]);


  const handleReport = () => {
    console.log('clicked report');
  };
  const handleHelpful = () => {
    console.log('clicked Helpful');
  };



  return (
    <div className='qa-block'>
      <div className='q-box'>
        <span><span className='bold'>Q: </span>{q.question_body}</span>
        <span className='q-meta'>Helpful: <a onClick={e => {e.preventDefault(); handleHelpful()}}>Yes</a> <a onClick={e => {e.preventDefault(); handleReport()}}>Report</a></span>
      </div>
      <div className='a-box'>
        {Alist.map((a) => {
          return (
            <Answer a={a} key={a.id}/>
          )
        })}
      </div>

    <a className='load-ans'>load more answers</a>
    </div>

  )

};

export default QaBlock;