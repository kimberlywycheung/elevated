import React from 'react';
import axios from 'axios';
import Search from './E_qa_subs/Search.jsx';
import QaList from './E_qa_subs/QaList.jsx';
import QaModal from './E_qa_subs/QaModal.jsx';


const QuestionsAnswers = ({productID}) => {
  const [modalStyle, setModalStyle] = React.useState({display:"none"});
  const [formType, setFormType] = React.useState('addQ');
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
      <QaList setFormType={setFormType} setModalStyle={setModalStyle} list={Qlist}/>
      <div className='qa-btns'>
        <button>more questions</button>
        <button onClick={e => {e.preventDefault(); setFormType('addQ'); setModalStyle({display: 'block'})}}>Add question</button>
      </div>
      <div>
        <QaModal setModalStyle={setModalStyle} formType={formType} productID={productID} style={modalStyle}/>
      </div>
    </div>
  )
}

export default QuestionsAnswers;