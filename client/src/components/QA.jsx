import React from 'react';
import axios from 'axios';
import Search from './E_qa_subs/Search.jsx';
import QaList from './E_qa_subs/QaList.jsx';
import QaModal from './E_qa_subs/QaModal.jsx';
import $ from "jquery";
import styled from "styled-components";

//STYLED COMPONENTS
// border-top: solid rgb(189, 184, 184) 2px;
// border-bottom: solid rgb(191, 189, 189) 2px;
const StyledQA = styled.div`

width: 85vw;
margin: 0 auto;
font-size: 15px;
`;
const StyledH2 = styled.h2`
  margin: 20px;
`;
//END of styled components


const QuestionsAnswers = ({theme, productID}) => {
  const [modalStyle, setModalStyle] = React.useState({display:"none"});
  const [formType, setFormType] = React.useState('addQ');
  const [Qlist, setQlist] = React.useState([]);
  const [qCount, setQCount] = React.useState(4);
  const [Qid, setQid] = React.useState(undefined);
  const [searchTerm, setSearchTerm] = React.useState(undefined);


  React.useEffect(() => {
    if(productID) {
      getQlist();
      setQCount(4);
    }
  },[productID]);

  const getQlist = () => {
    var url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${productID}&count=50`;
    axios.get(url, {
      headers: { 'Authorization': process.env.GITHUB_TOKEN }
    })
    .then((response) => {
      console.log('GetQlist Response->\n', response.data.results);
      setQlist(response.data.results);
    })
    .catch(err => {
      alert('Error getting Q/A List\n\n' + err.response.data);
    })
  };

  const moreQs = () => {
    setQCount(qCount + 2);

    $("#qa-list").animate({ scrollTop: $('#qa-list')[0].scrollHeight}, 1000);

  };

  if(!productID) {
    return (
      <div>loading...</div>
    )
  }



  return (
    <StyledQA>
      <StyledH2>Questions & Answers</StyledH2>
      <Search setSearchTerm={setSearchTerm} setQlist={setQlist}/>
      <QaList theme={theme} qCount={qCount} getQlist={getQlist} searchTerm={searchTerm} setQid={setQid} setFormType={setFormType} setModalStyle={setModalStyle} list={Qlist}/>
      <div className='qa-btns'>
        <button onClick={e => {e.preventDefault(); moreQs()}}>more questions</button>
        <button onClick={e => {e.preventDefault(); setFormType('addQ'); setModalStyle({display: 'block'})}}>Add question</button>
      </div>
      <div className='click-modal' onClick={e => {e.preventDefault(); console.log('bgclicked2')}}>
        <QaModal getQlist={getQlist} qID={Qid} setModalStyle={setModalStyle} formType={formType} productID={productID} style={modalStyle}/>
      </div>
    </StyledQA>
  )
}

export default QuestionsAnswers;