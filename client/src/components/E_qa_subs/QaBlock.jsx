import React from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';

const QaBlock = ({q, setModalStyle, setFormType, setQid}) => {
  const [Alist, setAlist] = React.useState(Object.values(q.answers));
  const [limitedAList, setLimitedAList] = React.useState(Object.values(q.answers));
  const [loadView, setloadView] = React.useState({'display': 'block'});
  const [collapseView, setCollapseView] = React.useState({'display': 'none'});
  const [ansCount, setAnsCount] = React.useState(2);
  // console.log('OG ALIST->', Object.values(q.answers));

  React.useEffect(() => { //set initial list
    if(q) {
      setLimitedAList(Object.values(q.answers).slice(0, ansCount));
    }
  },[]);


  React.useEffect(() => { //update list limit
    if(Alist.length > ansCount) {
      setloadView({'display': 'block'});
    } else {
      setloadView({'display': 'none'});
      if(Alist.length > 0) {
        setCollapseView({'display': 'block'});
      }
    }
    setLimitedAList(Alist.slice(0, ansCount));
  }, [ansCount]);

  const loadMoreAns = () => {
    setAnsCount(ansCount + 2);
  };
  const collapseAns = () => {
    setAnsCount(2);
    setloadView({'display': 'block'});
    setCollapseView({'display': 'none'});
  };

  const handleAddAns = () => {
    setModalStyle({display: 'block'});
    setFormType('addA');
    setQid(q.question_id);
  };
  const handleHelpful = () => {
    console.log('clicked Helpful');
    console.log('local', window.localStorage.getItem(`QHelpful${q.question_id}`));
    console.log('q id', q.question_id);
    if(window.localStorage.getItem(`QHelpful${q.question_id}`) === null) {
      window.localStorage.setItem(`QHelpful${q.question_id}`, true);
      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/\
      qa/questions/${q.question_id}/helpful`;
      const auth = {'Authorization': process.env.GITHUB_TOKEN}
      axios({method: 'put', url, headers: auth})
      .then(res => {
        console.log('res for PUT Q Helpful->', res);
        //update page

      })
      .catch(err => {
        console.log('err for PUT Q Helpful->', err);
      })
    }

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
        {limitedAList.map((a) => {
          return (
            <Answer a={a} key={a.id}/>
          )
        })}

      </div>

    <a style={loadView} onClick={e => {e.preventDefault(); loadMoreAns()}} className='load-ans'>load more answers</a>
    <a style={collapseView} onClick={e => {e.preventDefault(); collapseAns()}} className='load-ans'>collapse answers</a>
    <div className='q-meta q-meta2'>
      question from {q.asker_name}
    </div>
    </div>

  )

};

export default QaBlock;