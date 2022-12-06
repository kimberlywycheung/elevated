import React from 'react';
import axios from 'axios';
import QaBlock from './QaBlock.jsx';

const QaList = ({list, setModalStyle, setFormType, setQid, searchTerm, getQlist, qCount}) => {
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
  return (
    <div id='qa-list'>
      {newList.map(q => {
        return (
          <QaBlock list={list} getQlist={getQlist} setQid={setQid} setFormType={setFormType} setModalStyle={setModalStyle} q={q} key={q.question_id}/>
        )
      })}
    </div>
  )

};

export default QaList;