import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductSlice from "../../config/product/ProductSlice";
import { deleteProduct } from "../../config/product/ProductThunk";
// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { useQuery, useSubscription } from "@apollo/client";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";

const GET_PRODUCT = gql`
  subscription MySubscription {
    product(order_by: { productName: asc }) {
      additional_information
      id
      imageProduct
      productCategory
      productName
      productPrice
      radioProduct
    }
  }
`;

function Table({ productData, handleSetEdit }) {
  const dispatch = useDispatch();
  const [editName, setEditName] = useState("");
  const { data, loading, error } = useSubscription(GET_PRODUCT);

  const DELETE_PRODUCT = gql`
    mutation MyMutation($id: Int!) {
      delete_product_by_pk(id: $id) {
        id
      }
    }
  `;

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct({ variables: { id } });
    }
  };

  return (
    <div>
      <table className="table table-striped mt-3" id="table">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Product Name</th>
            <th scope="col">Product Category</th>
            <th scope="col">Image</th>
            <th scope="col">Product Freshness</th>
            {/* <th scope="col">Description</th> */}
            <th scope="col">Product Price</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody id="table-body">
          {data?.product.map((item) => (
            <tr key={item.id}>
              <td>
                <Link to={`/account/${item.id}`} state={item}>
                  {item.id}
                </Link>
              </td>
              <td>{item.productName}</td>
              <td>{item.productCategory}</td>
              <td>{item.imageProduct}</td>
              <td>{item.radioProduct}</td>
              {/* <td>{item.additional_information}</td> */}
              <td>{item.productPrice}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger me-3"
                  onClick={() => handleDeleteProduct(item.id)}
                >
                  Delete
                </button>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => handleSetEdit(item)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
