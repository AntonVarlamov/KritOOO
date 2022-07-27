import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../context/context";
import bigRat from "big-rational";
import {nanoid} from "nanoid";
import TableCell from "../components/TableCell/TableCell";

const TFC = () => {
  const {conversion, multipliers} = useContext(Context)
  const [types, setTypes] = useState({
    Mtoe: new Array(5).fill(""),
    Gwh: new Array(5).fill(""),
    Twh: new Array(5).fill(""),
  })
  const find = (from, to, startValue) => {
    let path = conversion.findShortestPath(from, to)
    let result = new bigRat(startValue)
    for (let i = 0; i < path.length - 1; i++) {
      result = result.multiply(multipliers[path[i] + path[i + 1]])
    }
    return result.toDecimal(2)
  }
  useEffect(() => {
    const copy = {...types}
    copy.Mtoe = [148.67, 149.33, 150.00, 150.67, 151.33];
    setTypes(copy)
  }, [])

  const calculate = () => {
    const keys = Object.keys(types);
    const copy = {...types}
    for (let i = 0; i < 5; i++) {
      for (let j = 1; j < keys.length; j++) {
        copy[keys[j]][i] = find("Mtoe", keys[j], types.Mtoe[i]);
      }
    }
    setTypes(copy)
  }

  return (
    <div className="container">
      <div className="tfc-header">
        <div className="header">Энергетический ресурс</div>
        <div className="header">Единица измерения</div>
        <div className="header">
          Совокупное конечное энергопотребление (Total final consumption)
          <div className="grid-5">
            <div className="years">2017</div>
            <div className="years">2018</div>
            <div className="years">2019</div>
            <div className="years">2020</div>
            <div className="years">2021</div>
          </div>
        </div>
      </div>
      <div className="tfc-header">
        <div className="header-name">Природный газ
          (Natural gas)
        </div>
        <div>
          <div className="header-name">Mtoe</div>
          <div className="header-name">Gwh</div>
          <div className="header-name">Twh</div>
        </div>
        <div className="grid-5">
          {Object.values(types).map((type, typeId) =>
            <React.Fragment key={nanoid()}>
              {type.map((item, id) =>
                <TableCell
                  key={nanoid()}
                  value={item}
                  disabled={typeId > 0}
                  type={"number"}
                  id={Object.keys(types)[typeId]}
                  state={types}
                  setState={setTypes}
                  cellType={id}
                />
              )}
            </React.Fragment>
          )}
        </div>
        <button
          onClick={() => {
            calculate()
          }}
        >
          Применить
        </button>
      </div>
    </div>
  );
};

export default TFC;