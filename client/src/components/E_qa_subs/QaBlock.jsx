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


  const handleAddAns = () => {
    console.log('clicked Add answer');
  };
  const handleHelpful = () => {
    console.log('clicked Helpful');
  };



  return (
    <div className='qa-block'>
      <div className='q-box'>
        <span><span className='bold'>Q:</span><span className='qa-body'>{q.question_body}</span></span>
        <span className='qa-meta'>Helpful: <a className='underline' onClick={e => {e.preventDefault(); handleHelpful()}}>Yes</a> | <a onClick={e => {e.preventDefault(); handleAddAns()}}>Add Answer</a></span>
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