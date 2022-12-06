import React from 'react';
import axios from 'axios';

const Answer = ({a, getAndSetAnswers}) => {

  const handleAnsMeta = (type) => { //type == helpful / report
    console.log('local', window.localStorage.getItem(`A${type}${a.answer_id}`));
    if(window.localStorage.getItem(`A${type}${a.answer_id}`) === null) {
      window.localStorage.setItem(`A${type}${a.answer_id}`, true);
      const url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/answers/${a.answer_id}/${type}`;
      const auth = {'Authorization': process.env.GITHUB_TOKEN}
      axios({method: 'put', url, headers: auth})
      .then(res => {
        console.log(`res for PUT A ${type}->`, res);
        getAndSetAnswers();
      })
      .catch(err => {
        console.log(`err for PUT A ${type}->`, err);
      })
    }
  };

  return (
    <div className='ans'>
      <div>
        <span><span className='bold'>A:</span><span className='qa-body'>{a.body}</span></span>
      </div>
      <div className='a-meta'>
        <span>by {a.answerer_name}</span>
        <span>{a.date.slice(0,10)}</span>
        <span>|</span>
        <span>Helpful? <a onClick={e => {e.preventDefault(); handleAnsMeta('helpful');}} style={{'paddingRight': '5px'}} className='underline'>Yes</a>{a.helpfulness}</span>
        <span>|</span>
        <a onClick={e => {e.preventDefault(); handleAnsMeta('report')}} >Report</a>
      </div>
    </div>

  )

};

export default Answer;