import React from 'react'

const InputField = (props) => {
  return <input
    style={props.style}
    type={props.type}
    onChange={props.handleOnChange}
    {...props}/>
  
}

export default InputField;