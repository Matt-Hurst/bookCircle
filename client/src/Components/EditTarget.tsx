import React, { FunctionComponent, useState } from "react"
import { AiFillCloseCircle } from "react-icons/ai";

import './EditTarget.scss'

type EditTargetProps = {
  target: number,
  setUpdateTargetClicked: Function,
  handleUpdateTarget: Function
}

const EditTarget: FunctionComponent<EditTargetProps> = ({target, setUpdateTargetClicked, handleUpdateTarget}) => {
  const [userInput, setUserInput] = useState('')

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault()
    handleUpdateTarget(Number(userInput))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
  }

  const handleCloseClick = () => {
    setUpdateTargetClicked(false)
  }

  return (
    <div className="EditTargetDisplayDiv">
      <div className="EditTargetPopOutDiv">
      <AiFillCloseCircle onClick={handleCloseClick} className="EscapeButton"/>
      <h3>Set new target</h3>
      <form className="editTargetForm" onSubmit={handleClick}>
        <input value={userInput} type="number" onChange={handleChange}/>
        <button type="submit">submit</button>
      </form>
      
      </div>
    </div>
  )
}

export default EditTarget;