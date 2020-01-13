import React, { useEffect, useState, useRef } from "react";
import withAuth from "../../../components/hoc/withAuth";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import Cleave from "cleave.js/react";
import * as yup from "yup";
import {
  getAllCategoryProduct,
  createProduct
} from "../../../services/actions";
import { toast } from "react-toastify";
import Router from "next/router";
import { MyUploadAdapter } from "../../../components/admin/uploadImage";
import Dropzone from "react-dropzone";
import Spiner from "../../../components/spiner";

const ProductSchema = yup.object().shape({
  productCode: yup.string().required("Mã sản phẩm không được để trống."),
  name: yup.string().required("Tên không được để trống"),
  description: yup.string(),
  category: yup.string().required("Danh mục không được để trống"),
  price: yup.number().min(1, "Giá sản phẩm không được nhỏ hơn hoặc bằng 0"),
  discount: yup
    .number()
    .min(0, "Phần trăm giảm giá không được nhỏ hơn  0")
    .max(100, "Phần trăm giảm giá không được lớn hơn 100"),
  image: yup.string().required("Ảnh không được để trống")
});

const AddProduct = props => {
  const editorRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [listCategory, setListCategory] = useState(null);
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [controls, setControls] = useState({
    name: "",
    productCode: "",
    shortDescription: "",
    price: 0,
    description: "",
    image: [],
    oldPrice: 0,
    hotProduct: false,
    newProduct: true,
    saleProduct: false,
    count: [],
    discount: 0,
    color: "#000000",
    size: [],
    category: "",
    fileUpload: null
  });

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react"),
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic")
    };
    setEditorLoaded(true);
  });

  useEffect(() => {
    getAllCategoryProduct().then(res => {
      setListCategory(res);
    });
  }, []);

  const handleChange = event => {
    const field = event.target.name;
    setControls({
      ...controls,
      [field]: event.target.rawValue
        ? event.target.rawValue
        : event.target.value
    });
  };

  const addQuantity = () => {
    const newCount = controls.count;
    newCount.push({
      name: "",
      price: 0
    });
    setControls({
      ...controls,
      count: newCount
    });
  };

  const addSize = () => {
    const newSize = controls.size;
    newSize.push({
      name: "",
      price: 0
    });
    setControls({
      ...controls,
      size: newSize
    });
  };

  const removeQuantity = index => {
    const newCount = controls.count;
    newCount.splice(index, 1);
    setControls({
      ...controls,
      count: newCount
    });
  };

  const removeSize = index => {
    const newSize = controls.size;
    newSize.splice(index, 1);
    setControls({
      ...controls,
      size: newSize
    });
  };

  const changedChecked = event => {
    const field = event.target.name;
    setControls({
      ...controls,
      [field]: event.target.checked
    });
  };

  const changeNameQuantity = (event, index) => {
    const newCount = controls.count;
    newCount[index].name = event.target.value;
    setControls({
      ...controls,
      count: newCount
    });
  };

  const changeNameSize = (event, index) => {
    const newSize = controls.size;
    newSize[index].name = event.target.value;
    setControls({
      ...controls,
      size: newSize
    });
  };

  const changePriceQuantity = (event, index) => {
    const newCount = controls.count;
    newCount[index].price = event.target.value;
    setControls({
      ...controls,
      count: newCount
    });
  };

  const changePriceSize = (event, index) => {
    const newSize = controls.size;
    newSize[index].price = event.target.value;
    setControls({
      ...controls,
      size: newSize
    });
  };

  const removeImg = (event, index) => {
    event.stopPropagation();
    let newImage = controls.image;
    newImage.splice(index, 1);
    setControls({
      ...controls,
      image: newImage,
      fileUpload: null
    });
  };

  const createdProduct = value => {
    const body = new FormData();
    body.append("name", value.name);
    body.append("productCode", value.productCode);
    body.append("shortDescription", value.shortDescription);
    body.append(
      "price",
      value.discount > 0
        ? value.price - (value.price * value.discount) / 100
        : value.price
    );
    body.append("oldPrice", value.price);
    body.append("hotProduct", value.hotProduct);
    body.append("newProduct", value.newProduct);
    body.append("saleProduct", value.saleProduct);
    body.append("discount", value.discount);
    body.append("color", value.color);
    body.append("count", JSON.stringify(controls.count));
    body.append("size", JSON.stringify(controls.size));
    body.append("category", value.category);
    body.append("description", value.description);
    controls.image.forEach(item => {
      body.append("files", item);
    });
    setLoaded(true);
    createProduct(body)
      .then(data => {
        toast.success("Thêm mới sản phẩm thành công");
        Router.push("/admin/product");
        setLoaded(false);
      })
      .catch(err => {
        toast.error("Không thể thêm mới sản phẩm");
        setLoaded(false);
      });
  };

  return (
    <Row>
      <Col xs={12}>
        <Card>
          <Card.Header>
            <h5 className="card-title">Thêm mới sản phẩm</h5>
            <h6 className="card-subtitle text-muted">Thêm mới sản phẩm</h6>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                ...controls
              }}
              enableReinitialize={true}
              validationSchema={ProductSchema}
              onSubmit={values => {
                createdProduct(values);
              }}
            >
              {({ errors, touched, values }) => (
                <Form>
                  <Row>
                    <Col md={6}>
                      <div className="form-group">
                        <label className="form-label">
                          Mã sản phẩm <span className="text-danger">*</span>
                        </label>
                        <input
                          name="productCode"
                          onChange={handleChange}
                          value={controls.productCode}
                          className="form-control"
                          placeholder="Mã sản phẩm..."
                        />
                        {errors.productCode && touched.productCode && (
                          <small className="form-text text-danger">
                            {errors.productCode}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Tên <span className="text-danger">*</span>
                        </label>
                        <input
                          name="name"
                          onChange={handleChange}
                          value={controls.name}
                          className="form-control"
                          placeholder="Tên sản phẩm..."
                        />
                        {errors.name && touched.name && (
                          <small className="form-text text-danger">
                            {errors.name}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">Mô tả ngắn</label>
                        <textarea
                          rows="2"
                          name="shortDescription"
                          onChange={handleChange}
                          value={controls.shortDescription}
                          className="form-control"
                          placeholder="Mô tả ngắn..."
                        />
                        {errors.shortDescription &&
                          touched.shortDescription && (
                            <small className="form-text text-danger">
                              {errors.shortDescription}
                            </small>
                          )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Danh mục <span className="text-danger">*</span>
                        </label>
                        <select
                          name="category"
                          onChange={handleChange}
                          className="custom-select"
                          defaultValue={values.category}
                        >
                          <option value="">Chọn danh mục</option>
                          {listCategory &&
                            listCategory.length > 0 &&
                            listCategory.map(item => {
                              if (item.children.length > 0) {
                                return (
                                  <React.Fragment key={item._id}>
                                    {item.children.map(i => (
                                      <option key={i._id} value={i._id}>
                                        {i.title}
                                      </option>
                                    ))}
                                  </React.Fragment>
                                );
                              } else {
                                return (
                                  <option key={item._id} value={item._id}>
                                    {item.title}
                                  </option>
                                );
                              }
                            })}
                        </select>
                        {errors.category && touched.category && (
                          <small className="form-text text-danger">
                            {errors.category}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Giá sản phẩm (vnđ){" "}
                          <span className="text-danger">*</span>
                        </label>

                        <Cleave
                          className="form-control"
                          name="price"
                          value={controls.price}
                          placeholder="Giá sản phẩm"
                          options={{ numeral: true, delimiter: "," }}
                          onChange={handleChange}
                        />
                        {errors.price && touched.price && (
                          <small className="form-text text-danger">
                            {errors.price}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label d-block">
                          Giá sản phẩm theo số lượng (vnđ){" "}
                        </label>
                        {controls.count.map((item, index) => (
                          <div className="d-flex mb-2" key={index}>
                            <input
                              name="name"
                              onChange={event =>
                                changeNameQuantity(event, index)
                              }
                              value={item.name}
                              className="form-control mr-3"
                              placeholder="Nhâp số lượng..."
                            />
                            <Cleave
                              className="form-control"
                              name="price"
                              value={item.price}
                              placeholder="Giá sản phẩm"
                              options={{ numeral: true, delimiter: "," }}
                              onChange={event =>
                                changePriceQuantity(event, index)
                              }
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm  ml-3"
                              onClick={() => removeQuantity(index)}
                            >
                              Xóa
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addQuantity}
                          type="button"
                          className="btn btn-primary btn-sm "
                        >
                          Thêm số lượng
                        </button>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-group">
                        <label className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="newProduct"
                            className="custom-control-input"
                            checked={controls.newProduct}
                            onChange={changedChecked}
                          />
                          <span className="custom-control-label">
                            Sản phẩm mới
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="hotProduct"
                            className="custom-control-input"
                            checked={controls.hotProduct}
                            onChange={changedChecked}
                          />
                          <span className="custom-control-label">
                            Sản phẩm hot
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="custom-control custom-checkbox">
                          <input
                            type="checkbox"
                            name="saleProduct"
                            className="custom-control-input"
                            checked={controls.saleProduct}
                            onChange={changedChecked}
                          />
                          <span className="custom-control-label">
                            Sản phẩm khuyến mãi
                          </span>
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Màu sắc</label>
                        <input
                          name="color"
                          type="color"
                          onChange={handleChange}
                          value={controls.color}
                          className="form-control"
                          placeholder="Tên sản phẩm..."
                        />
                        {errors.color && touched.color && (
                          <small className="form-text text-danger">
                            {errors.color}
                          </small>
                        )}
                      </div>
                      <div className="form-group">
                        <label className="form-label d-block">Kích cỡ</label>
                        {controls.size.map((item, index) => (
                          <div className="d-flex mb-2" key={index}>
                            <input
                              name="name"
                              onChange={event => changeNameSize(event, index)}
                              value={item.name}
                              className="form-control mr-3"
                              placeholder="Tên kích cỡ ..."
                            />
                            <Cleave
                              className="form-control"
                              name="price"
                              value={item.price}
                              placeholder="Giá sản phẩm"
                              options={{ numeral: true, delimiter: "," }}
                              onChange={event => changePriceSize(event, index)}
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm  ml-3"
                              onClick={() => removeSize(index)}
                            >
                              Xóa
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={addSize}
                          type="button"
                          className="btn btn-primary btn-sm "
                        >
                          Thêm kích cỡ
                        </button>
                      </div>
                      {controls.saleProduct === true && (
                        <div className="form-group">
                          <label className="form-label">
                            Giảm giá (%) <span className="text-danger">*</span>
                          </label>
                          <Cleave
                            className="form-control"
                            name="discount"
                            value={controls.discount}
                            placeholder="Giảm giá"
                            options={{ numericOnly: true }}
                            onChange={handleChange}
                          />
                          {errors.discount && touched.discount && (
                            <small className="form-text text-danger">
                              {errors.discount}
                            </small>
                          )}
                        </div>
                      )}
                    </Col>
                    <Col md={12}>
                      <div className="form-group">
                        <label className="form-label">
                          Ảnh sản phẩm <span className="text-danger">*</span>
                        </label>
                        <Dropzone
                          onDrop={acceptedFiles =>
                            setControls({
                              ...controls,
                              image: controls.image.concat(
                                acceptedFiles.map(file =>
                                  Object.assign(file, {
                                    preview: URL.createObjectURL(file)
                                  })
                                )
                              )
                            })
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section className="dropzone">
                              <div
                                {...getRootProps()}
                                style={{ height: "100%" }}
                              >
                                <input {...getInputProps()} />
                                {controls.image.length === 0 && (
                                  <div className="text-select">
                                    Kéo thả ảnh hoặc click để chọn ảnh
                                  </div>
                                )}
                                {controls.image.length > 0 && (
                                  <div className="preview-image">
                                    {controls.image.map((item, index) => (
                                      <div
                                        key={index}
                                        className="image-content"
                                      >
                                        <img src={item.preview} />
                                        <i
                                          className="far fa-times-circle"
                                          onClick={event =>
                                            removeImg(event, index)
                                          }
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </section>
                          )}
                        </Dropzone>
                        {errors.image && touched.image && (
                          <small className="form-text text-danger">
                            {errors.image}
                          </small>
                        )}
                      </div>
                    </Col>
                    <Col md={12}>
                      <div className="form-group">
                        <label className="form-label">Mô tả sản phẩm</label>
                        {editorLoaded && (
                          <CKEditor
                            ref={editorRef}
                            editor={ClassicEditor}
                            onInit={editor => {
                              editor.setData(controls.description);
                              editor.plugins.get(
                                "FileRepository"
                              ).createUploadAdapter = function(loader) {
                                return new MyUploadAdapter(loader);
                              };
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              setControls({
                                ...controls,
                                description: data
                              });
                            }}
                          />
                        )}
                        {errors.description && touched.description && (
                          <small className="form-text text-danger">
                            {errors.description}
                          </small>
                        )}
                      </div>
                    </Col>
                    <Col md={12} className="text-center mt-3">
                      <Button disabled={loaded} type="submit">
                        Thêm mới
                        {loaded && <Spiner />}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default withAuth(AddProduct);
