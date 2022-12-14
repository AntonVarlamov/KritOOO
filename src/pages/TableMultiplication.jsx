import React, {useContext, useEffect, useState} from 'react';
import TableCell from "../components/TableCell/TableCell";
import {Context} from "../context/context";
import bigRat from "big-rational";

const TableMultiplication = () => {
  const startValue = [
    {ratio: -9, resultant: "Gft3ng", source: "ft3ng"},
    {ratio: -9, resultant: "Gtce", source: "tce"},
    {ratio: -9, resultant: "Gtoe", source: "toe"},
    {ratio: -6, resultant: "MMbtu", source: "btu"},
    {ratio: -6, resultant: "Mj", source: "j"},
    {ratio: -3, resultant: "Kboe", source: "boe"},
    {ratio: -6, resultant: "Mtoe", source: "toe"},
    {ratio: -12, resultant: "Twh", source: "wh"},
    {ratio: -3, resultant: "Ktoe", source: "toe"},
    {ratio: -9, resultant: "Gj", source: "j"},
    {ratio: -6, resultant: "Mboe", source: "boe"},
    {ratio: -6, resultant: "Mtce", source: "tce"},
    {ratio: -9, resultant: "Gm3ng", source: "m3ng"},
    {ratio: -9, resultant: "Bboe", source: "boe"},
    {ratio: -15, resultant: "Qbtu", source: "btu"},
    {ratio: -6, resultant: "Mm3ng", source: "m3ng"},
    {ratio: -6, resultant: "Mft3ng", source: "ft3ng"},
    {ratio: -9, resultant: "Gwh", source: "wh"},

  ]
  const [conversions, setConversions] = useState([...startValue])
  const [apply, setApply] = useState(false)
  const {conversion, multipliers} = useContext(Context)

  useEffect(() => {
    conversions.forEach(item=>{
      conversion.addVertex(item.source)
      conversion.addVertex(item.resultant)
      multipliers[item.source + item.resultant] =  new bigRat(10 ** item.ratio)
      multipliers[item.resultant + item.source] = new bigRat(1).divide(new bigRat(10 ** item.ratio))

      conversion.addEdge(item.resultant, item.source)
    })

  }, [conversions])
  return (
    <div className="container">
      <div className="header">Таблица мультипликации единиц измерения</div>
      <div className="table-conversion">
        <div className="header-name">Наименование</div>
        <div className="header-name">Расчетная ЕИ</div>
        <div className="header-name">Степень</div>
        <div className="header-name">Базовая ЕИ</div>
        {conversions.map((item, id) =>
          <React.Fragment key={id}>
            <div className="header-name">{item.source}-->{item.resultant}</div>
            <TableCell
              cellType="source"
              setApply={setApply}
              apply={apply}
              state={conversions}
              setState={setConversions}
              id={id}
              type="text"
            />
            <TableCell
              cellType="ratio"
              setApply={setApply}
              apply={apply}
              state={conversions}
              setState={setConversions}
              id={id}
              type="number"
            />
            <TableCell
              cellType="resultant"
              setApply={setApply}
              apply={apply}
              state={conversions}
              setState={setConversions}
              id={id}
              type="text"
            />
          </React.Fragment>
        )}
      </div>
      <button
        style={{padding: 4, borderRadius: "100%", height: 30, width: 30}}
        onClick={() => {
          let copy = [...conversions];
          copy.push({
            source: "",
            ratio: "",
            resultant: "",
          })
          setConversions(copy)
        }}
      >+
      </button>
      <button
        onClick={() => {
          setApply(true)
        }}
      >
        Применить
      </button>
    </div>
  );
};

export default TableMultiplication;