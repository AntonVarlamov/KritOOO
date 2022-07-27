import {Graph} from "../models/Graph";
import bigRat from "big-rational";

export function hardcode(){
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

  const startValue1 = [
    {ratio: 751.4768963, resultant: "Mm3ng", source: "Mtce"},
    {ratio: 0.301277062, resultant: "Twh", source: "Gft3ng"},
    {ratio: 1055.060005, resultant: "Mj", source: "MMbtu"},
    {ratio: 0.58000001, resultant: "Qbtu", source: "Bboe"},
    {ratio: 1.4285714, resultant: "Gtce", source: "Gtoe"},
    {ratio: 0.000277778, resultant: "Gwh", source: "Gj"},
    {ratio: 6.8419054, resultant: "Kboe", source: "Ktoe"},
    {ratio: 35.958043, resultant: "Gft3ng", source: "Gm3ng"}
  ]
  const conversion = new Graph();
  const multipliers = {};

  startValue.forEach(item=>{
    conversion.addVertex(item.source)
    conversion.addVertex(item.resultant)
    multipliers[item.source + item.resultant] =  new bigRat(10 ** item.ratio)
    multipliers[item.resultant + item.source] = new bigRat(1).divide(new bigRat(10 ** item.ratio))

    conversion.addEdge(item.resultant, item.source)
  })

  startValue1.forEach(item => {
    conversion.addVertex(item.source)
    conversion.addVertex(item.resultant)
    multipliers[item.source + item.resultant] = new bigRat(item.ratio)
    multipliers[item.resultant + item.source] = new bigRat(1).divide(new bigRat(item.ratio))
    conversion.addEdge(item.resultant, item.source)
  })
  return [conversion, multipliers]
}