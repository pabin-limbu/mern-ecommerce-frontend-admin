import React from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import Input from "../../../components/UI/input/index";
import NewModal from "../../../components/UI/modal/index";

function UpdateCategoryModal(props) {
  const {
    show,
    handleClose,
    modalTitle,
    size,
    handleSave,
    btnName,
    expandedArray,
    checkedArray,
    handlecategoryinput,
    categoryList,
  } = props;

  return (
    <>
      <NewModal
        show={show}
        handleClose={handleClose}
        modalTitle={modalTitle}
        size={size}
        handleSave={handleSave}
        btnName={btnName}
      >
        <Modal.Body>
          <Row>
            <Col>
              <h6>Expanded{expandedArray.length}</h6>
            </Col>
          </Row>
          {expandedArray.length > 0 &&
            expandedArray.map((item, index) => {
              return (
                <Row key={index}>
                  <Col>
                    <Input
                      placeholder={"category Name"}
                      value={item.name}
                      onChange={(e) => {
                        handlecategoryinput(
                          "name",
                          e.target.value,
                          index,
                          "expanded"
                        );
                      }}
                    ></Input>
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) => {
                        handlecategoryinput(
                          "parentId",
                          e.target.value,
                          index,
                          "expanded"
                        );
                      }}
                    >
                      <option>Select Category</option>
                      {categoryList.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <select
                      value={item.type}
                      className="form-control"
                      onChange={(e) => {
                        handlecategoryinput(
                          "type",
                          e.target.value,
                          index,
                          "expanded"
                        );
                      }}
                    >
                      <option value="">SELECT TYPE</option>
                      <option value="store">Store</option>
                      <option value="product">Product</option>
                      <option value="page">Page</option>
                    </select>
                  </Col>
                </Row>
              );
            })}
          {/**checked */}
          <h6>CHECKED</h6>
          {checkedArray.length > 0 &&
            checkedArray.map((item, index) => {
              return (
                <Row key={index}>
                  <Col>
                    <Input
                      placeholder={"category Name"}
                      value={item.name}
                      onChange={(e) => {
                        handlecategoryinput(
                          "name",
                          e.target.value,
                          index,
                          "checked"
                        );
                      }}
                    ></Input>
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      value={item.parentId}
                      onChange={(e) => {
                        handlecategoryinput(
                          "parentId",
                          e.target.value,
                          index,
                          "checked"
                        );
                      }}
                    >
                      <option
                        onChange={(e) => {
                          handlecategoryinput(
                            "type",
                            e.target.value,
                            index,
                            "checked"
                          );
                        }}
                      >
                        Select Category
                      </option>
                      {categoryList.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col>
                    <select
                      className="form-control"
                      value={item.type}
                      onChange={(e) => {
                        handlecategoryinput(
                          "type",
                          e.target.value,
                          index,
                          "checked"
                        );
                      }}
                    >
                      <option value="">SELECT TYPE</option>
                      <option value="store">Store</option>
                      <option value="product">Product</option>
                      <option value="page">Page</option>
                    </select>
                  </Col>
                </Row>
              );
            })}
        </Modal.Body>
      </NewModal>
    </>
  );
}

export default UpdateCategoryModal;
