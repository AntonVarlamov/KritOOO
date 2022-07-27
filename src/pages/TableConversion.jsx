import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../context/context";
import TableCell from "../components/TableCell/TableCell";
import bigRat from "big-rational";

const TableConversion = () => {
  const startValue = [
    {ratio: 751.4768963, resultant: "Mm3ng", source: "Mtce"},
    {ratio: 0.301277062, resultant: "Twh", source: "Gft3ng"},
    {ratio: 1055.060005, resultant: "Mj", source: "MMbtu"},
    {ratio: 0.58000001, resultant: "Qbtu", source: "Bboe"},
    {ratio: 1.4285714, resultant: "Gtce", source: "Gtoe"},
    {ratio: 0.000277778, resultant: "Gwh", source: "Gj"},
    {ratio: 6.8419054, resultant: "Kboe", source: "Ktoe"},
    {ratio: 35.958043, resultant: "Gft3ng", source: "Gm3ng"}
  ]
  const [conversions, setConversions] = useState([...startValue])
  const [apply, setApply] = useState(false)
  const {conversion, multipliers} = useContext(Context)

  useEffect(() => {
    conversions.forEach(item => {
      conversion.addVertex(item.source)
      conversion.addVertex(item.resultant)
      multipliers[item.source + item.resultant] = new bigRat(item.ratio)
      multipliers[item.resultant + item.source] = new bigRat(1).divide(new bigRat(item.ratio))
      conversion.addEdge(item.resultant, item.source)
    })
  }, [conversions])
  return (
    <div className="container">
      <div className="header">Таблица конвертации единиц измерения</div>
      <div className="table-conversion">
        <div className="header-name">Наименование</div>
        <div className="header-name">Исходная ЕИ</div>
        <div className="header-name">Коэффициент</div>
        <div className="header-name">Результирующая ЕИ</div>
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

export default TableConversion;