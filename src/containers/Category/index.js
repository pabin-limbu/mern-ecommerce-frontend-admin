import React, { useState } from "react";
import Layout from "../../components/layout/index";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  updateCategories,
} from "../../actions/index";
import CheckboxTree from "react-checkbox-tree";
import {
  IoMdSquareOutline,
  IoIosCheckboxOutline,
  IoIosCheckbox,
  IoIosArrowForward,
  IoIosArrowDown,
  IoIosAdd,
  IoIosTrash,
  IoIosCreate,
} from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import AddCateegoryModal from "./components/AddCateegoryModal";
import UpdateCategoryModal from "./components/UpdateCategoryModal";
import "./style.css";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import createCtegorylist from "../../helpers/linearCategories";
function Category() {
  /**State Variables */
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  /**State Variables CLOSING */

  const dispatch = useDispatch();

  const category = useSelector((state) => state.category);

  /**RENDER CATEGORY */
  const renderCategories = (categories) => {
    let categoryList = [];
    for (let category of categories) {
      categoryList.push(
        //using checkbox tree model.
        {
          label: category.name,
          value: category._id,
          children:
            category.children.length > 0 && renderCategories(category.children),
        }
      );
    }
    return categoryList;
  };
  const handleClose = () => {
    setShow(false);
  };

  //ADD CATEGORY MODAL --------------
  const handleShow = () => setShow(true);
  const handleAddCategoryFormSubmit = () => {
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

  //UPDATE CATEGORY MODAL----------------

  const closeupdateCategoryForm = () => {
    setUpdateCategoryModal(false);
  };

  //category input handler while updating -- used for UPDATE
  const handlecategoryinput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedcheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedcheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  //UPDATE CATEGORY FORM SUBMIT
  const updateCategoriesForm = () => {
    const form = new FormData();
    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("type", item.type);
      form.append("parentId", item.parentId ? item.parentId : "");
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("type", item.type);
      form.append("parentId", item.parentId ? item.parentId : "");
    });
    dispatch(updateCategories(form));
    setUpdateCategoryModal(false);
  };

  //SHOW UPDATE CATEGORY MODAL.
  const showUpdateCategory = () => {
    setUpdateCategoryModal(true);
    const categorylist = createCtegorylist(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categorylist.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categorylist.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  //DELETE CATEGORY MODAL -----------------------------
  //keep state of chceked and expanded categories.-- used for DELETE
  const updateCheckedAndExpandedCategories = () => {
    //since checked and expanded have only ID but we need whole category data and save it in new array.
    const linearCategories = createCtegorylist(category.categories);
    console.log("hi i am called");
    const checkedArray = [];
    const expandedArray = [];

    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        //since checked only have categoryId.fetch category data with category id.
        const category = linearCategories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });

    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = linearCategories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  /**category Image */
  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const showDeleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setShowDeleteModal(true);
  };

  const deleteCategories = () => {
    setShowDeleteModal(false);
    if (!checkedArray.length > 0) {
      console.log({ category: "no category selected to delete" });
      return;
    }
    const checkedIdsArray = checkedArray.map((item, index) => {
      return { _id: item.value };
    });
    if (checkedArray.length > 0) {
      dispatch(deleteCategory(checkedIdsArray));
    }
  };

  const categoryList = createCtegorylist(category.categories);
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div className="d-flex flex-column flex-md-row justify-content-md-between">
              <h3>category</h3>
              <div className="actionBtnContainer">
                <span className=" d-md-block">Actions: </span>
                <button onClick={handleShow}>
                  <IoIosAdd />
                  <span>Add</span>{" "}
                </button>
                <button onClick={showDeleteCategory}>
                  <IoIosTrash />
                  <span>Delete</span>{" "}
                </button>
                <button onClick={showUpdateCategory}>
                  <IoIosCreate />
                  <span>UPDATE</span>{" "}
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoMdSquareOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
      </Container>

      <AddCateegoryModal
        show={show}
        handleClose={handleClose}
        modalTitle="Add new category"
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        parentCategoryId={parentCategoryId}
        setParentCategoryId={setParentCategoryId}
        categoryList={categoryList}
        handleCategoryImage={handleCategoryImage}
        handleSave={handleAddCategoryFormSubmit}
        btnName="Add Category"
      />

      <UpdateCategoryModal
        show={updateCategoryModal}
        handleClose={closeupdateCategoryForm}
        modalTitle="UPDATE categories"
        size="lg"
        handleSave={updateCategoriesForm}
        btnName="Update"
        expandedArray={expandedArray}
        checkedArray={checkedArray}
        handlecategoryinput={handlecategoryinput}
        categoryList={categoryList}
      />

      <DeleteCategoryModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        modalTitle="Delete Confirmation"
        btnName="Delete category"
        //handleSave={sumbitDeleteCategoryForm}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              setShowDeleteModal(false);
            },
          },
          {
            label: "Yes",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
        expandedArray={expandedArray}
        checkedArray={checkedArray}
      />
    </Layout>
  );
}

export default Category;
