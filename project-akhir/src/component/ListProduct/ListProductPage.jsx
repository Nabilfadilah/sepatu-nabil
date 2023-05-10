import React, { useEffect, useState } from 'react'


import { useQuery, useSubscription } from "@apollo/client";
import { gql } from "@apollo/client";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";

// GraphQL subscription query dengan nama MySubscription. 
// subscribtion ini menggunakan variable $product dengan tipe data String! untuk melakukan 
// filtering data sepatu dengan field product yang mengandung kata kunci yang diinputkan 
// pada variable $product menggunakan operator _ilike (case-insensitive ilike).
//  ini akan mengembalikan data berupa id, image, product, category, description, stock, size,
//  dan price dari sepatu yang telah difilter.
const GET_PRODUCT = gql`
    subscription MySubscription ($product : String!) {
        sepatu(where: { product: { _ilike: $product}}) {
        id
        image
        product
        category
        description
        stock
        size
        price
        }
    }
`;

function ListProductPage() {
    
    
    // mendefinisikan state search menggunakan useState, 
    // yang digunakan untuk menyimpan kata kunci pencarian. 
    const [search, setSearch] = useState('')
    
    // Kemudian, terdapat penggunaan hook useSubscription 
    // untuk mengambil data produk dengan mengirim permintaan ke GraphQL. 
    // Permintaan yg dilakukan oleh GET_PRODUCT.
    // pada useSubscription mengirimkan variabel product dengan kata kunci pencarian 
    //  yang dimasukkan.
    const { data } = useSubscription(GET_PRODUCT, {
        variables : {
            product : `%${search}%`
        }
    });

    // terdapat fungsi handleSearch 
    // yang mengubah nilai state search ketika pengguna memasukkan kata kunci pencarian baru.
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }


    return (
        <div className='container' id="list-product">
            <div className="col text-center pt-5" id='listproduct'>
                <h2>List Product</h2>
                <hr />
            </div>

            {/* baru */}
            {/* nilai dari input akan disimpan di state 
            search menggunakan fungsi handleSearch. Nilai tersebut kemudian digunakan 
            sebagai variabel input dalam query GraphQL di useSubscription untuk melakukan 
            pencarian pada produk berdasarkan nama */}
            <form className="d-flex py-4 ps-5 pe-5">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    name="search"
                    value={search}
                    onChange={handleSearch}
                    
                />
                
            </form>

            <div className="row text-center justify-content-center pb-5 pt-1">

            {/* data ini untuk menampilkan daftar produk yg diambil dari hasil query GraphQL 
            yang dilakukan menggunakan Subscription hook. 
            
            menggunakan parameter product dan juga untuk mencari produk berdasarkan nama product. */}
                {data?.sepatu.map((product) => (
                <div className="col-md-3" key={product.id}>
                    <div className="card shadow-sm my-3">
                        
                        <img className='image' src={product.image} style={{ height: "300px" }} alt="" />
                        
                        <div className="card-body">
                            <h5 className="card-text">{product.product}</h5>
                            <p className='text-price'>Rp. {product.price},-</p>
                            <div className="d-flex justify-content-between align-items-center">
                            <div className="btn-group">
                                <button
                                    type="submit"
                                    className="btn btn-info me-2"
                                    ><i class="bi bi-cart-plus"></i> 
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-success text-white me-2 rounded btn-sm" 
                                    >Beli 
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-warning"
                                    ><i class="bi bi-eye"></i>
                                </button>
                            </div>
                            <small className="text-muted">{product.size}</small>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
        )
    }

export default ListProductPage