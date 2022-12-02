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

  React.useEffect(() => { //see Ans list
    console.log('Alist values', Alist);
  }, [Alist]);


  const handleReport = () => {
    console.log('clicked report');
  };
  const handleHelpful = () => {
    console.log('clicked Helpful');
  };



  return (
    <div>
      <div className='q-body'>
        <span className='bold'>Q: {q.question_body}</span>
        <span>Helpful: <a onClick={e => {e.preventDefault(); handleHelpful()}}>Yes</a> <a onClick={e => {e.preventDefault(); handleReport()}}>Report</a></span>
      </div>
      <div className='a-body'>
        {Alist.map((a) => {
          return (
            <span>
              <Answer a={a} key={a.id}/>
            </span>
          )
        })}
      </div>

    <a>load more answers</a>
    </div>

  )

};

export default QaBlock;