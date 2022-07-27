import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../context/context";

const TableCell = ({state, setState, id, cellType, apply, setApply, type, disabled}) => {
  const [value, setValue] = useState(state[id][cellType])

  useEffect(()=>{
    if (apply){
      let copy = [...state]
      copy[id][cellType] = value;
      setState(copy)
      setApply(false)
    }
  }, [apply])
  return (
    <input
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      type={type}
      style={{minWidth: 50}}
      disabled={disabled}
    />

  );
};

export default TableCell;