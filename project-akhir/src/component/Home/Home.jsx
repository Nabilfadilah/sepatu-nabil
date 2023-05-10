import React, { useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom'
import Table from '../Tabel/Tabel1';
// import Login from '../Login/Login';
// import Search from '../Search/Search';
// import { useFormik } from 'formik';
// import { gql } from '@apollo/client';
// import { useQuery } from '@apollo/client';
// import { useParams } from 'react-router-dom';

function Home({Toggle}) {

    const navigate = useNavigate();

    // state menyimpan value search
    // const [search, setSearch] = useState('')

    // const handleSearch = (e) => {
    //     setSearch(e.target.value)
    // }
    // const params = useParams();

    // const formik = useFormik({
    //     initialValues: {
    //         search: "",
    //     },
    //     onSubmit: (values) => {
    //         navigate(`/search/${values.search}`);
    //     },
    // });

    // function handleFilter(event) {
    //     const newData = data.filter(row => {
    //         return row.name.tolowerCase().includes(event.target.value.tolowerCase())
    //     })
    //     setRecord(newData)
    // }

    return (
        <div className='px-2'>
            <Navbar Toggle={Toggle} />
            <div className='container-fluid'>
                <div className='row g-3 my-2'>
                    <div className='col-md-3'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>230</h3>
                                <p className='fs-5'>Product</p>
                            </div>
                            <i className='bi bi-cart-plus p-3 fs-1'></i>
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>20</h3>
                                <p className='fs-5'>Customer</p>
                            </div>
                            <i className='bi bi-person p-3 fs-1'></i>
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>19</h3>
                                <p className='fs-5'>Order</p>
                            </div>
                            <i className='bi bi-plus p-3 fs-1'></i>
                        </div>
                    </div>

                    <div className='col-md-3'>
                        <div className='p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded'>
                            <div>
                                <h3 className='fs-2'>230</h3>
                                <p className='fs-5'>Product</p>
                            </div>
                            <i className='bi bi-cart-plus p-3 fs-1'></i>
                        </div>
                    </div>
                </div>

                {/* Seacrh dan Add */}
                <div className='row g-3 my-2'>
                    <div className='col-md-12'>
                        <div className='p-3 bg-white rounded'>

                        <nav className="navbar bg-body-tertiary">
                            <div className="container-fluid">
                                {/* baru */}

                                <div class="d-grid gap-2 d-md-flex justify-content-md-end pt-1">
                                    <button className='btn btn-submit bg-primary text-white btn-sm' 
                                    type='submit' onClick={() => navigate('/createproduct')}>
                                    <i class="bi bi-plus-lg"></i> Add Product</button>
                                </div>
                            </div>
                        </nav>

                        </div>
                    </div>
                </div>

                
                <div className='table-responsive'>
                <table className="table caption-top bg-white rounded mt-3">
                    {/* baru */}
                    {/* <caption className='text-dark fs-4'>Product</caption> */}
                    <Table />
                </table>
            </div>
        </div>

            <footer class="sticky-footer bg-white p-3 rounded">
                <div class="container my-auto">
                    <div class="copyright text-center my-auto">
                        <span>Copyright &copy; Bill Shoes</span>
                    </div>
                </div>
            </footer>

            {/* <Login /> */}

        </div>
    )
}

export default Home