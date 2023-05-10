import React, { useEffect, useState } from "react";
import Button from "../Button/Button";

import Tabel from "../Tabel/Tabel";

import { useFormik } from "formik"; // buat input
import * as Yup from "yup"; // buat validasi
import { useDispatch, useSelector } from "react-redux";
import ProductSlice, { setIsEdit } from "../../config/product/ProductSlice";
import {
  createProduct,
  deleteProduct,
  updateProduct,
  retrieveProduct,
} from "../../config/product/ProductThunk";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

function Form() {

  const navigate = useNavigate() 

  const dispatch = useDispatch();

  const productType = useSelector((state) => state.product.type);
  const productIsEdit = useSelector((state) => state.product.isEdit);
  const productData = useSelector((state) => state.product.listProduct);

  // buat ngambil data
  useEffect(() => {
    dispatch(retrieveProduct());
  }, []);

  // buat menghapus, update dan tambah agar tidak di refres
  useEffect(() => {
    if (productType === deleteProduct.fulfilled.type) {
      dispatch(retrieveProduct());
    }
    if (productType === createProduct.fulfilled.type) {
      dispatch(retrieveProduct());
      alert("Added Succes");
    }
    if (productType === updateProduct.fulfilled.type) {
      dispatch(retrieveProduct());
    }
  }, [productType]);

  // regex
  const formik = useFormik({
    initialValues: {
      id: "",
      productName: "",
      productCategory: "",
      imageProduct: "",
      radioProduct: "",
      additional_information: "",
      productPrice: "",
    },

    // aturan validasi
    validationSchema: Yup.object({
      productName: Yup.string()
        .max(25, "Maksimal 25 karakter")
        .required("Product Name wajib diisi") // wajid diisi
        .matches(
          /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/,
          "Name must not contain symbols"
        ),
      productCategory: Yup.string().required("Product Category wajib diisi"),
      imageProduct: Yup.string().required("Product Image wajib diisi"),
      radioProduct: Yup.string().required("Product Freshness wajib diisi"),
      productPrice: Yup.number()
        .positive("Jangan mengisi dengan min -")
        .required("Product Price wajib diisi"),
    }),

    onSubmit: (values, { setValues, resetForm }) => {
      formik.resetForm();
      console.log("form values", values);

      addProduct({
        variables: {
          id: values.id,
          productName: values.productName,
          productCategory: values.productCategory,
          radioProduct: values.radioProduct,
          imageProduct: values.imageProduct,
          additional_information: values.additional_information,
          productPrice: values.productPrice,
        },
      });

      resetForm();
    },
  });

  const UPDATE_PRODUCT = gql`
    mutation MyMutation(
      $id: Int!
      $radioProduct: String!
      $productPrice: numeric!
      $productName: String!
      $productCategory: String!
      $imageProduct: String!
      $additional_information: String!
    ) {
      update_product_by_pk(
        pk_columns: { id: $id }
        _set: {
          additional_information: $additional_information
          imageProduct: $imageProduct
          productCategory: $productCategory
          productName: $productName
          productPrice: $productPrice
          radioProduct: $radioProduct
        }
      ) {
        id
        additional_information
        imageProduct
        productCategory
        productName
        productPrice
        radioProduct
      }
    }
  `;
  const [updateProductt] = useMutation(UPDATE_PRODUCT);

  const handleSetEdit = (product) => {
    dispatch(setIsEdit(true));
    formik.setValues({
      productName: product.productName,
      productCategory: product.productCategory,
      radioProduct: product.radioProduct,
      imageProduct: product.imageProduct,
      additional_information: product.additional_information,
      productPrice: product.productPrice,
      id: product.id,
    });
  };

  const handleEdit = (newValues, event) => {
    event.preventDefault();
    updateProductt({
      variables: {
        id: newValues.id,
        productName: newValues.productName,
        productCategory: newValues.productCategory,
        radioProduct: newValues.radioProduct,
        imageProduct: newValues.imageProduct,
        additional_information: newValues.additional_information,
        productPrice: newValues.productPrice,
      },
    });
  };

  const INSERT_PRODUCT = gql`
    mutation MyMutation(
      $additional_information: String!
      $imageProduct: String!
      $productCategory: String!
      $productName: String!
      $productPrice: numeric
      $radioProduct: String!
    ) {
      insert_product_one(
        object: {
          additional_information: $additional_information
          imageProduct: $imageProduct
          productCategory: $productCategory
          productName: $productName
          productPrice: $productPrice
          radioProduct: $radioProduct
        }
      ) {
        id
        productName
        productCategory
        radioProduct
        imageProduct
        additional_information
        productPrice
      }
    }
  `;

  const [addProduct, { data, loading, error }] = useMutation(INSERT_PRODUCT);

  return (
    <div>
        {/* Form */}
        <section>
          <form
            onSubmit={
              productIsEdit
                ? () => handleEdit(formik.values, event)
                : formik.handleSubmit
            }
            name="form" className="bg-secondary pb-5"
          >
            <div className="container text-center pt-3">
              <h2 className="bg-warning">Product name</h2>
            </div>

            <div className="container bg-warning pt-2 pb-3">
            {/* product Name */}
            <div className="row mt-4">
              <div className="col-4" />
              <div className="col-4">
                <label htmlFor="product">Product Name</label>
                <br />
                <input
                  type="text"
                  className="form-control mt-2 detail-product"
                  id="productName"
                  aria-describedby="textHelp"
                  name="productName"
                  data-testid="productNameTest"
                  onBlur={formik.handleBlur} //
                  value={formik.values.productName} // buat ambil nilainya
                  onChange={formik.handleChange} // buat tau perubahannya
                />
                {/* buat menampilkan errornya  */}
                {formik.touched.productName && formik.errors.productName && (
                  <div className="error text-danger">
                    {formik.errors.productName}
                  </div>
                )}
              </div>
              <div className="col-4" />
            </div>

            {/* product category */}
            <div className="row mt-4">
              <div className="col-4" />
              <div className="col-4">
                <label htmlFor="product">Product Category</label>
                <select
                  name="productCategory"
                  className="form-select category-product"
                  id="productCategory"
                  aria-label="Default select example"
                  data-testid="productCategoryTest"
                  onBlur={formik.handleBlur} //
                  value={formik.values.productCategory} // buat ambil nilainya
                  onChange={formik.handleChange}
                >
                  <option value="">Choose..</option>
                  <option value={"Sepatu"}>Sepatu</option>
                  <option value={"Baju"}>Baju</option>
                  <option value={"Celana"}>Celana</option>
                </select>
                {formik.touched.productCategory &&
                  formik.errors.productCategory && (
                    <div className="error text-danger">
                      {formik.errors.productCategory}
                    </div>
                  )}
              </div>
              <div className="col-4" />
            </div>

            {/* image product */}
            <div className="row mt-4">
              <div className="col-4"></div>
              <div className="col-4">
                <label htmlFor="formFile" className="form-label">
                  Image of Product
                </label>
                <input
                  className="form-control image-product"
                  type="file"
                  id="image-product"
                  height="32px"
                  width="200px"
                  name="imageProduct"
                  data-testid="productImageTest"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.imageProduct && formik.errors.imageProduct && (
                  <div className="error text-danger">
                    {formik.errors.imageProduct}
                  </div>
                )}
              </div>
              <div className="col-4"></div>
            </div>
            <br />

            {/* product freshness */}
            <div className="row ">
            <div className="col-4"></div>
              <div className="col-4">
                <label htmlFor="freshness">Product Freshness</label>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioProduct"
                    defaultValue="Brand New"
                    data-testid="productFreshnessTest"
                    onBlur={formik.handleBlur}
                    checked={formik.values.picked}
                    onChange={formik.handleChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Brand New
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioProduct"
                    defaultValue="Second Hand"
                    checked={formik.values.picked}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Second Hand
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="radioProduct"
                    defaultValue="Refurbished"
                    checked={formik.values.picked}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault3"
                  >
                    Refurbished
                  </label>
                </div>
                {formik.touched.radioProduct && formik.errors.radioProduct && (
                  <div className="error text-danger">
                    {formik.errors.radioProduct}
                  </div>
                )}
                <div className="col-4"></div>
              </div>
            </div>

            {/* product price */}
            <div className="row mt-4">
              <div className="col-4" />
              <div className="col-4">
                <label htmlFor="price">Product Price</label>
                <input
                  type="number"
                  className="form-control mt-2 "
                  id="productPrice"
                  name="productPrice"
                  aria-describedby="textHelp"
                  placeholder="$ 1"
                  data-testid="productPriceTest"
                  onBlur={formik.handleBlur} //
                  value={formik.values.productPrice} // buat ambil nilainya
                  onChange={formik.handleChange}
                />

                {formik.touched.productPrice && formik.errors.productPrice && (
                  <div className="error text-danger">
                    {formik.errors.productPrice}
                  </div>
                )}
              </div>
              <div className="col-4"></div>
            </div>
            <Button />
            </div>
          </form>
        </section>
        <Tabel productData={productData} handleSetEdit={handleSetEdit} />
        {/* button random */}

        <div className="text-center mt-5 pb-5">
          <button
            type="submit"
            className="btn btn-warning submit me-3"
            onClick={() => navigate('/')}
            >Back
            </button>
        </div>
    </div>
  );
}

export default Form;
