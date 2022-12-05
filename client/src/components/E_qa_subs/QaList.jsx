import React from 'react';
import axios from 'axios';
import QaBlock from './QaBlock.jsx';

const QaList = ({list, setModalStyle, setFormType, setQid}) => {

  return (
    <div>
      {list.map(q => {
        return (
          <QaBlock setQid={setQid} setFormType={setFormType} setModalStyle={setModalStyle} q={q} key={q.question_id}/>
        )
      })}
    </div>
  )

};

export default QaList;