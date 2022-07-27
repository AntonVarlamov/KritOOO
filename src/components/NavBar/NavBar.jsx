import React from 'react';
import {Link} from "react-router-dom";
import cl from "./NavBar.module.css"

const NavBar = () => {
  return (
    <div className={"container " + cl.navBar}>
      <Link to="/" className={cl.button}>Данные TFC</Link>
      <Link to="/conversion" className={cl.button}>Таблица конвертации ЕИ</Link>
      <Link to="/multiplication" className={cl.button}>Таблица мультипликации ЕИ</Link>
    </div>
  );
};

export default NavBar;