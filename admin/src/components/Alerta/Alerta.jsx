import React from "react";

const Alerta = ({ alerta }) => {
  return <div className={`${alerta.categoria}`}>{alerta.msg}</div>;
};

export default Alerta;
