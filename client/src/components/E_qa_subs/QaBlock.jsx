import React from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';
import $ from "jquery";

const QaBlock = ({q, setModalStyle, setFormType, setQid, getQlist, list}) => {
  const [Alist, setAlist] = React.useState([]);
  const [limitedAList, setLimitedAList] = React.useState([]);
  const [loadView, setloadView] = React.useState({'display': 'block'});
  const [collapseView, setCollapseView] = React.useState({'display': 'none'});
  const [ansCount, setAnsCount] = React.useState(2);
  // console.log('OG ALIST->', Object.values(q.answers));

  const getAndSetAnswers = () => {
    //get answer
    const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${q.question_id}/answers`;
    const auth = {'Authorization': process.env.GITHUB_TOKEN};
    axios({method: 'get', url, headers: auth})
    .then(res => {
      var sortedList = res.data.results.sort((a,b) => {
        if(a < b) {return -1};
        return 1;
      })
      setAlist(sortedList);
    })
    .catch(err => {
      alert(`Error getting Answers\n\n` + err.response.data);
      console.error(err);
    })
  }; //getSetAns DONE

  React.useEffect(() => { //set initial list
    if(q) {
      getAndSetAnswers();
    }
  },[list]);


  React.useEffect(() => { //view toggle buttons
    if(Alist.length <= 2) {
      setloadView({'display': 'none'});
      setCollapseView({'display': 'none'});
    } else if (Alist.length > ansCount) {
      setloadView({'display': 'block'});
    } else {
      setloadView({'display': 'none'});
      if(Alist.length > 0) {
        setCollapseView({'display': 'block'});
      }
    }
    setLimitedAList(Alist.slice(0, ansCount));
  }, [ansCount, Alist]);

  const loadMoreAns = () => {
    setAnsCount(ansCount + 2);
    $(".a-box").animate({ scrollTop: $('.a-box')[0].scrollHeight}, 1000);
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
  const handleHelpfulQ = () => {
    console.log('local', window.localStorage.getItem(`QHelpful${q.question_id}`));
    if(window.localStorage.getItem(`QHelpful${q.question_id}`) === null) {
      window.localStorage.setItem(`QHelpful${q.question_id}`, true);
      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions/${q.question_id}/helpful`;
      const auth = {'Authorization': process.env.GITHUB_TOKEN}
      axios({method: 'put', url, headers: auth})
      .then(res => {
        console.log('res for PUT Q Helpful->', res);
        getQlist();
      })
      .catch(err => {
        alert(`Error Put request for Q Helpful\n\n` + err.response.data);
        console.error(err);
      })
    }

  };


  return (
    <div className='qa-block'>
      <div className='q-box'>
        <span><span className='bold'>Q:</span><span className='qa-body'>{q.question_body}</span></span>

        <div className='q-meta'>
          <span>Helpful? <a className='underline' style={{'paddingRight': '5px'}} onClick={e => {e.preventDefault(); handleHelpfulQ()}}>Yes</a>{q.question_helpfulness}</span>
          <span>|</span>
          <span><a onClick={e => {e.preventDefault(); handleAddAns()}}>Add Answer</a></span>
        </div>
      </div>
      <div className='ans-section'>
        <div>A:</div>
        <div>
          <div className='a-box'>
            {limitedAList.map((a) => {
              return (
                <Answer getAndSetAnswers={getAndSetAnswers} a={a} key={a.answer_id}/>
              )
            })}
          </div>
          <a style={loadView} onClick={e => {e.preventDefault(); loadMoreAns()}} className='load-ans'>load more answers</a>
          <a style={collapseView} onClick={e => {e.preventDefault(); collapseAns()}} className='load-ans'>collapse answers</a>
        </div>
      </div>
    <div className='q-meta q-meta2'>
      question from "{q.asker_name}"
    </div>
    </div>

  )

};

export default QaBlock;