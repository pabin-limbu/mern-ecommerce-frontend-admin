import React from "react";
import { Modal, Button } from "react-bootstrap";

function NewModal(props) {
  return (
    <Modal size={props.size} show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {/* <Button variant="primary" onClick={props.handleSave}>
          {props.btnName}
        </Button> */}
        {props.buttons ? (
          props.buttons.map((btn, index) => (
            <Button
              className="btn btn-sm w-25"
              key={index}
              variant={btn.color}
              onClick={btn.onClick}
            >
              {btn.label}
            </Button>
          ))
        ) : (
          <Button variant="dark" className="btn-sm" onClick={props.handleSave}>
            {props.btnName}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default NewModal;
