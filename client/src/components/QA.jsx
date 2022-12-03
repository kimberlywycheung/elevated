import React from 'react';
import axios from 'axios';
import Search from './E_qa_subs/Search.jsx';
import QaList from './E_qa_subs/QaList.jsx';
import QaModal from './E_qa_subs/QaModal.jsx';


const QuestionsAnswers = ({productID}) => {
  const [formStyle, setFormStyle] = React.useState({display:"none"});
  const [Qlist, setQlist] = React.useState([]);

  React.useEffect(() => {
    if(productID) {
      getQlist();
    }
  },[productID]);

  const getQlist = () => {
    var url = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions?product_id=${productID}`;
    axios.get(url, {
      headers: { 'Authorization': process.env.GITHUB_TOKEN }
    })
    .then((response) => {
      console.log('GetQlist Response->\n', response.data.results);
      setQlist(response.data.results);
    })
  };

  if(!productID) {
    return (
      <div>loading...</div>
    )
  }

  return (
    <div id='questions-answers'>
      <h2>Questions & Answers</h2>
      <Search setQlist={setQlist}/>
      <QaList list={Qlist}/>
      <div className='qa-btns'>
        <button>more answered questions</button>
        <button onClick={e => {e.preventDefault(); setFormStyle({display: "block"})}}>add question</button>
      </div>
      <div style={formStyle}>
        <QaModal />
      </div>
    </div>
  )
}

export default QuestionsAnswers;