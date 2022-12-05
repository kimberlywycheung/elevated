import React from 'react';
import axios from 'axios';
import QaBlock from './QaBlock.jsx';

const QaList = ({list, setModalStyle, setFormType, setQid, searchTerm}) => {
 const [sortedList, setSortedList] = React.useState(list);
 const [limitedList, setLimitedList] = React.useState(list);
 const [listCount, setListCount] = React.useState(4);
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
        var qContent = q.question_body + q.asker_name;
        return qContent.toLowerCase().includes(searchTerm.toLowerCase());
      });//end sort
      setSortedList(sortedL);
    }
  }; //end SORT
  const limit = (thisList, count) => {
    setNewList(thisList.slice(0, count));
  };//end Limit
  React.useEffect(() => {
      sort();
  },[list, searchTerm]);
  React.useEffect(() => {
      limit(sortedList, listCount);
  },[sortedList]);

  return (
    <div>
      {newList.map(q => {
        return (
          <QaBlock setQid={setQid} setFormType={setFormType} setModalStyle={setModalStyle} q={q} key={q.question_id}/>
        )
      })}
    </div>
  )

};

export default QaList;