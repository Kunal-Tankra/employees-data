import React from 'react'

const ProgressBar = (props) => {
    // props
    const {progressStatus} = props
  return (
    <div className="progress" style={{background: "transparent", position: "fixed", top: "0", width: "100%"}}>
        <div className="progress-bar" role="progressbar" style={{width: `${progressStatus}%`}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
  )
}

export default ProgressBar
