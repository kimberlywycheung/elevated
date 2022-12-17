import React from 'react';
import axios from 'axios';
import Answer from './Answer.jsx';
import $ from "jquery";
import styled from "styled-components";


const QaBlock = ({q, setModalStyle, setFormType, setQid, getQlist, list}) => {
  const [Alist, setAlist] = React.useState([]);
  const [limitedAList, setLimitedAList] = React.useState([]);
  const [loadView, setloadView] = React.useState({'display': 'block'});
  const [collapseView, setCollapseView] = React.useState({'display': 'none'});
  const [ansCount, setAnsCount] = React.useState(2);
  const [ansStyle, setAnsStyle] = React.useState({'display': 'block'});
  const [helpfulClicked, setHelpfulClicked] = React.useState(['pointer','underline']);
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
    setAnsStyle({display: 'block'});
    if(!Alist.length) {
      setAnsStyle({display: 'none'});
    }
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
    setHelpfulClicked(['default', 'none']);
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
    <StyledQaBlock>
      <StyledQBox>
        <span><span className='bold'>Q:</span><QaBody>{q.question_body}</QaBody></span>

        <Qmeta1>
          <span>Helpful? <a style={{'paddingRight': '5px', cursor: helpfulClicked[0], textDecoration: helpfulClicked[1]}} onClick={e => {e.preventDefault(); handleHelpfulQ()}}>Yes</a>{q.question_helpfulness}</span>
          <span>|</span>
          <span><a onClick={e => {e.preventDefault(); handleAddAns()}}>Add Answer</a></span>
        </Qmeta1>
      </StyledQBox>
      <Qmeta2>
      question from "{q.asker_name}"
    </Qmeta2>
      <AnsSection>
        <div style={ansStyle}>A:</div>
        <div>
          <Abox>
            {limitedAList.map((a) => {
              return (
                <Answer getAndSetAnswers={getAndSetAnswers} a={a} key={a.answer_id}/>
              )
            })}
          </Abox>
          <LoadAns style={loadView} onClick={e => {e.preventDefault(); loadMoreAns()}}>load more answers</LoadAns>
          <LoadAns style={collapseView} onClick={e => {e.preventDefault(); collapseAns()}}>collapse answers</LoadAns>
        </div>
      </AnsSection>
    {/* <Qmeta2>
      question from "{q.asker_name}"
    </Qmeta2> */}
    </StyledQaBlock>

  )

};

  //STYLED COMPONENTS

  const StyledQaBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  font-size: 1.4em;
  border-bottom: solid rgb(236, 233, 233) 1px;
  `;
  const StyledQBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;
  padding: 20px;
  padding-bottom: 10px;
  padding-left: 40px;
  `;
  const QaBody = styled.span`
  padding-left: 20px;
  `;
  const AnsSection = styled.div`
  padding-left: 60px;
  display: flex;
  flex-direction: row;
  `;
  const Abox = styled.div`
  padding-left: 10px;
  max-height: 320px;
  overflow: auto;
  `;
  const LoadAns = styled.a`
  padding: 10px 30px;
  font-size: .8em;
  width: 160px;
  `;
  const Qmeta1 = styled.div`
  display: flex;
  width: 200px;
  justify-content: space-between;
  font-size: .6em;
  color: grey;
  padding: 10px 0;
  `;
 export const Qmeta2 = styled(Qmeta1)`
  width: 500px;
  padding: 0 40px 20px 40px;
  font-size: .8em;
  `;
  export const A = styled.a`
    cursor: default;
  `;



export default QaBlock;