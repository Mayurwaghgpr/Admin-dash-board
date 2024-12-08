import React, { memo } from "react";

function Spiner({ className }:{className:string}) {
  return (
    <div className={`loader  ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default memo(Spiner);
