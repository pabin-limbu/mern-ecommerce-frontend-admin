import React, { useState } from "react";
import Layout from "../../components/layout/index";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions/index";
import Input from "../../components/UI/input/index";
import NewModal from "../../components/UI/modal/index";

function Category() {
  /**State Variables */
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [] = useState("");
  /**State Variables CLOSING */

  const dispatch = useDispatch();

  const category = useSelector((state) => state.category);

  /**Function to render Categry */
  const renderCategories = (categories) => {
    //linkedlist queue data structure
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(
        <li key={category._id}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return categoryList;
  };

  /**modal */

  const handleClose = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);

    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    setCategoryImage("");

    setShow(false);
  };
  const handleShow = () => setShow(true);

  /**modal CLOSE */

  /**category droopdownlist */
  //linear list of category
  const createCtegorylist = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCtegorylist(category.children, options);
      }
    }
    return options;
  };
  /**category droopdownlist end */

  /**category Image */
  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };
  /**category Image END */

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>
              {renderCategories(category.categories)}
              {/* {JSON.stringify(createCtegorylist(category.categories))} */}
            </ul>
          </Col>
        </Row>
      </Container>
      <NewModal
        show={show}
        handleClose={handleClose}
        modalTitle="Add new category"
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
            {createCtegorylist(category.categories).map((option) => (
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
    </Layout>
  );
}

export default Category;
