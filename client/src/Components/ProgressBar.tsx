import React, { FunctionComponent } from "react";
import './ProgressBar.scss'

type ProgressBarProps = {
  completed: number | null,
}

const ProgressBar: FunctionComponent<ProgressBarProps> = (props) => {
  let { completed } = props;
  
  return (
    <div className="containerStyles">
      <div className="fillerStyles" style={{height: `${completed}%`}}>
        <span className="labelStyles">{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;