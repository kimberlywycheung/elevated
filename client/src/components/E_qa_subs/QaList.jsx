import React from 'react';
import axios from 'axios';
import QaBlock from './QaBlock.jsx';

const QaList = ({list}) => {
  const [Qlist, setQlist] = React.useState([]);

  React.useEffect(() => {
    if(list) {
      console.log('Qlist', list);
    }
  }, [list])
  return (
    <div>
      {Qlist.map((q) => {
        return (
          <QaBlock q={q}/>
        )
      })}
    </div>

  )

};

export default QaList;