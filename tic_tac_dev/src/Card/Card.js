import React from "react";
import "./Card.css";

export default function Card({ onClick, isTurnedOver, children }) {
  return (
    <div
      className={isTurnedOver ? "card-up" : "card-down"}
      onClick={onClick}
    >
      {isTurnedOver ? (
        <p className="text">{children}</p>
      ) : (
        <p className="text">?</p>
      )}
    </div>
  );
}
