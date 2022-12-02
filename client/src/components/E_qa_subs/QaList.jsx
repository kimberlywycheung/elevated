import React from 'react';
import axios from 'axios';
import QaBlock from './QaBlock.jsx';

const QaList = ({list}) => {

  return (
    <div>
      {list.map(q => {
        return (
          <QaBlock q={q} key={q.question_id}/>
        )
      })}
    </div>
  )

};

export default QaList;