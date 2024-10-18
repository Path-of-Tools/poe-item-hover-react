import React from "react";

import separator from "../assets/mod-sep.png";

export default function ItemSeparator() {
  return (
    <div className="w-full h-2 relative">
      <img
        src={separator}
        alt="separator"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
