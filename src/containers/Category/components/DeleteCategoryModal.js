import React from "react";
import { Modal } from "react-bootstrap";
import NewModal from "../../../components/UI/modal";

const DeleteCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTitle,
    btnName,
    handleSave,
    buttons,
    expandedArray,
    checkedArray,
  } = props;
  return (
    <NewModal
      show={show}
      handleClose={handleClose}
      modalTitle={modalTitle}
      btnName={btnName}
      handleSave={handleSave}
      buttons={buttons}
    >
      <Modal.Body>
        <h5 className="mt-0">Expanded</h5>
        {expandedArray.map((item, index) => {
          return (
            <span className="expanded-items" key={index}>
              {item.name}
            </span>
          );
        })}
        <h5 className="mt-2 checked-label ">Checked</h5>
        {checkedArray.map((item, index) => {
          return (
            <span className="checked-items" key={index}>
              {item.name}
            </span>
          );
        })}
      </Modal.Body>
    </NewModal>
  );
};
export default DeleteCategoryModal;
