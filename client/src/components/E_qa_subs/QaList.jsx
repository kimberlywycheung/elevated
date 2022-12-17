import React from 'react';
import axios from 'axios';
import QaBlock from './QaBlock.jsx';
import styled from "styled-components";
import {Qmeta2} from './QaBlock.jsx';

  //STYLED COMPONENTS
  const StyledList = styled.div`
  background-color: ${props => props.theme.bg};
  max-height: 900px;
  overflow: scroll;
  `;
  const NoQs = styled(Qmeta2)`
  margin: 50px;
  `;


const QaList = ({theme, list, setModalStyle, setFormType, setQid, searchTerm, getQlist, qCount}) => {
 const [sortedList, setSortedList] = React.useState(list);
 const [limitedList, setLimitedList] = React.useState(list);
 const [newList, setNewList] = React.useState(list);

  const sort = () => {
    if(!searchTerm) {
      var sortedL = list.sort((a, b) => {
        if(a.question_helpfulness < b.question_helpfulness) {
          return 1;
        }
        return -1;
      });//end sort
      setSortedList(sortedL);
    } else { //is a Search term
      var sortedL = list.filter(q => {
        var qContent = q.question_body + '' + q.asker_name;
        return qContent.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
      });//end sort
      setSortedList(sortedL);
    }
  }; //end SORT
  const limit = (thisList) => {
    setNewList(thisList.slice(0, qCount));
  };//end Limit
  React.useEffect(() => {
    limit(sortedList);
  },[qCount])
  React.useEffect(() => {
      sort();
  },[list, searchTerm]);
  React.useEffect(() => {
      limit(sortedList, qCount);
  },[sortedList]);
//   React.useEffect(() => {
//     const theElement = document.getElementById('qa-list');
//     console.log('theEl', theElement);
//     theElement.scrollTop = theElement.scrollHeight;
// },[newList]);


  if(newList.length === 0 && searchTerm) {
    return (
      <div style={{fontSize: '2em', width: "100%"}} className='q-meta2'>
        no search results for "{searchTerm}"...
      </div>
    )
  }
  if(!list.length) {
    return (
      <NoQs style={{fontSize: '2em', width: "100%"}}>No Questions have been asked yet...be the first!</NoQs>
    )
  }

  return (
    <StyledList theme={theme} id='qa-list'>
      {newList.map(q => {
        return (
          <QaBlock list={list} getQlist={getQlist} setQid={setQid} setFormType={setFormType} setModalStyle={setModalStyle} q={q} key={q.question_id}/>
        )
      })}
    </StyledList>
  )

};

export default QaList;