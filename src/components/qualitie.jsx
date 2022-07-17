import React from "react";

const Qualitie = ({ color, name, _id }) => {
  let qColor = "badge m-1 bg-";
  qColor += color;
  return (
    <span id={_id} className={qColor}>
      {name}
    </span>
  );
};

export default Qualitie;
