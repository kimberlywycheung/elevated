import React from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';

const QaBlock = ({q, setModalStyle, setFormType}) => {
  const [Alist, setAlist] = React.useState([]);
  const [loadView, setloadView] = React.useState({'display': 'none'});

  React.useEffect(() => { //set answer list
    if(q) {
      setAlist(Object.values(q.answers));
    }
    if(Object.values(q.answers).length > 0) { //set Load More
      setloadView({'display': 'block'});
    }
  }, [q]);


  const handleAddAns = () => {
    console.log('clicked Add answer for Q', q.question_id);
    setModalStyle({display: 'block'});
    setFormType('addA');
  };
  const handleHelpful = () => {
    console.log('clicked Helpful');
  };



  return (
    <div className='qa-block'>
      <div className='q-box'>
        <span><span className='bold'>Q:</span><span className='qa-body'>{q.question_body}</span></span>

        <div className='q-meta'>
          <span>Helpful? <a className='underline' style={{'paddingRight': '5px'}} onClick={e => {e.preventDefault(); handleHelpful()}}>Yes</a>{q.question_helpfulness}</span>
          <span>|</span>
          <span><a onClick={e => {e.preventDefault(); handleAddAns()}}>Add Answer</a></span>
        </div>
      </div>

      <div className='a-box'>
        {Alist.map((a) => {
          return (
            <Answer a={a} key={a.id}/>
          )
        })}
      </div>

    <a style={loadView} className='load-ans'>load more answers</a>
    </div>

  )

};

export default QaBlock;