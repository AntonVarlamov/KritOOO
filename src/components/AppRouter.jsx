import React from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import TableConversion from "../pages/TableConversion";
import TableMultiplication from "../pages/TableMultiplication";
import TFC from "../pages/TFC";

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/multiplication' element={<TableMultiplication/>}/>
      <Route path='/conversion' element={<TableConversion/>}/>
      <Route path='/' element={<TFC/>}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
  );
};

export default AppRouter;