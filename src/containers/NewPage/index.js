import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { Row, Col } from "react-bootstrap";
import LinearCategoriies from "../../helpers/linearCategories";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../actions";
import NewModal from "../../components/UI/modal";
import Input from "../../components/UI/input";
function NewPage() {
  const [createmodal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState();
  const [type, setType] = useState("");
  const [banners, setbanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const page = useSelector((state) => state.page);

  useEffect(() => {
    setCategories(LinearCategoriies(category.categories));
  }, [category]);

  useEffect(() => {
    console.log(page);
    if (!page.loading) {
      setCreateModal(false);
      setTitle("");
      setType("");
      setDescription("");
      setCategoryId("");
      setProducts([]);
      setbanners([]);
    }
  }, [page]);

  const handleBannerImages = (e) => {
    console.log(e);
    setbanners([...banners, e.target.files[0]]);
  };
  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  };

  const onCategoryChange = (e) => {
    // console.log({ categories });
    // console.log(e.target.value);
    const category = categories.find(
      (category) => category.value == e.target.value
    );
    setCategoryId(e.target.value);
    setType(category.type);
  };

  const submitPageForm = (e) => {
    if (title === "") {
      setCreateModal(false);
      alert("Title is required");
      return;
    }
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("category", categoryId);
    form.append("type", type);
    banners.forEach((banner, index) => {
      return form.append("banners", banner);
    });

    products.forEach((product, index) => {
      return form.append("products", product);
    });
    //   for (var value of form.values()) {
    //     console.log(value);
    //  }
    //console.log(banners);
    //console.log(products);

    dispatch(createPage(form));
  };

  const renderCreatePageModal = () => {
    return (
      <NewModal
        show={createmodal}
        modalTitle={"create new page"}
        handleClose={() => {
          setCreateModal(false);
        }}
        btnName="save"
        handleSave={submitPageForm}
      >
        <Row>
          <Col>
            <Input
              type="select"
              value={categoryId}
              onChange={onCategoryChange}
              options={categories}
              placeholder="Select Category"
            ></Input>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Page Title"
              className="form-control form-control-sm"
            ></Input>
            <Input
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Description"
              className="form-control form-control-sm mt-3"
            ></Input>
          </Col>
        </Row>
        {banners && banners.length > 0
          ? banners.map((banner, index) => {
              return (
                <Row key={index}>
                  <Col>{banner.name}</Col>
                </Row>
              );
            })
          : null}
        <Row>
          <Col>
            <Input
              type="file"
              name="banner"
              onChange={handleBannerImages}
            ></Input>
          </Col>
        </Row>
        {products && products.length > 0
          ? products.map((product, index) => {
              return (
                <Row key={index}>
                  <Col>{product.name}</Col>
                </Row>
              );
            })
          : null}
        <Row>
          <Col>
            <Input
              type="file"
              name="product"
              onChange={handleProductImages}
            ></Input>
          </Col>
        </Row>
      </NewModal>
    );
  };

  return (
    <>
      <Layout sidebar>
        {renderCreatePageModal()}
        <button
          onClick={() => {
            setCreateModal(true);
          }}
        >
          show modal
        </button>
      </Layout>
    </>
  );
}

export default NewPage;
