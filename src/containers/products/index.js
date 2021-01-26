import React, { useState } from "react";
import Layout from "../../components/layout";
import { Modal, Container, Row, Col, Table } from "react-bootstrap";
import Input from "../../components/UI/input/index";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";
import NewModal from "../../components/UI/modal/index";
import "./style.css";
const Products = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productDetailModalShow, setProductDetailModalShow] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const categoryList = useSelector((state) => state.category);
  const productList = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleClose = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const createCtegorylist = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCtegorylist(category.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };
  const productDetailModalHandleClick = (product) => {
    console.log(product);
    setProductDetails(product);
    setProductDetailModalShow(true);
  };
  const renderProducts = () => {
    return (
      <Table responsive="sm" style={{ fontSize: "12px" }}>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {productList.products.length > 0
            ? productList.products.map((product, index) => (
                <tr
                  onClick={() => {
                    productDetailModalHandleClick(product);
                  }}
                  key={product._id}
                >
                  <td>{index}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>

                  <td>{product.category}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    return (
      <NewModal
        show={show}
        handleClose={handleClose}
        modalTitle="Add new product"
      >
        <Modal.Body>
          <Input
            label={"prduct Name"}
            placeholder={"Product Name"}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Input>
          <Input
            label={"quantity"}
            placeholder={"quantity"}
            value={quantity}
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
          ></Input>
          <Input
            label={"price"}
            placeholder={"price"}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          ></Input>
          <Input
            label={"description"}
            placeholder={"description"}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></Input>

          <select
            className="form-control"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option>Select Category</option>
            {createCtegorylist(categoryList.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          {productPictures.length > 0
            ? productPictures.map((pic, index) => (
                <div key={index}>{pic.name}</div>
              ))
            : null}

          <input
            type="file"
            name="productPicture"
            onChange={handleProductPictures}
          ></input>
        </Modal.Body>
      </NewModal>
    );
  };

  const productDetailModalHandleClose = () => {
    setProductDetailModalShow(false);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) return null;
    return (
      <NewModal
        show={productDetailModalShow}
        handleClose={productDetailModalHandleClose}
        modalTitle={"product details"}
        size={"lg"}
      >
        {/* <p>{productDetails && productDetails.name}</p> */}
        <Row>
          <Col md="6">
            <label className={"lblProductSpecName"}>Name</label>
            <p className={"txtProductSpecDetail"}>{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className={"lblProductSpecName"}>Price</label>
            <p className={"txtProductSpecDetail"}>{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className={"lblProductSpecName"}>Quantity</label>
            <p className={"txtProductSpecDetail"}>{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className={"lblProductSpecName"}>Category</label>
            <p className={"txtProductSpecDetail"}>{productDetails.category}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className={"lblProductSpecName"}>Description</label>
            <p className={"txtProductSpecDetail"}>
              {productDetails.description}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md="12" style={{ display: "flex" }}>
            {productDetails.productPictures.map((picture, index) => (
              <div>
                <img
                  src={`http://localhost:2000/public/${picture.img}`}
                  alt="img"
                />
              </div>
            ))}
          </Col>
        </Row>
      </NewModal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Add Product</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
