import React from "react";
import './Modal.css'

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <p>{message}</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>Aceptar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
