import React from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import Input from "../../../components/UI/input/index";
import NewModal from "../../../components/UI/modal/index";

function AddCateegoryModal(props) {
  const {
    show,
    handleClose,
    modalTitle,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
    handleSave,
    btnName,
  } = props;
  return (
    <>
      <NewModal
        show={show}
        handleClose={handleClose}
        modalTitle={modalTitle}
        handleSave={handleSave}
        btnName={btnName}
      >
        <Modal.Body>
          <Input
            label={"Category Name"}
            placeholder={"category"}
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          ></Input>
          <select
            className="form-control"
            value={parentCategoryId}
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="categorymage"
            onChange={handleCategoryImage}
          ></input>
        </Modal.Body>
      </NewModal>
    </>
  );
}

export default AddCateegoryModal;
