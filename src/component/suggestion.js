import React from 'react'

export default function Suggestion(props) {
 const {qes, data} = props;
  const test=()=>{
    let ff= []
    ff= data && data.filter((item)=>{
      if((item.quetion).indexOf(qes) != -1){
        return item.answer;
      }
    })
    return ff;
  }

  return (
    <div>
      {qes &&
      <div className="quetiona">
        <div className="quetion">{qes}</div>
      </div>
      }
      { test().length >0 ? test().map((item,i)=>{
        const {answer} = item;
        return(
          <div className="suggetiona">
            <div className="answer"><b>{answer}</b></div>
          </div>
        )}) : <div>Loading.....</div>
      }

    </div>
  )
}
