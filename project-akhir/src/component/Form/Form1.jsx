// Sudah di Rubah

import React, { useEffect, useState } from "react";
import Button from "../Button/Button";

import Tabel from "../Tabel/Tabel1";

import { useFormik } from "formik"; // buat input
import * as Yup from "yup"; // buat validasi

import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../firebase";

function Form1() {

    const navigate = useNavigate() 

    // state yang digunakan untuk meng-handle proses upload gambar.
    // useState untuk membuat state pada sebuah komponen.
    // file: state yang digunakan untuk menyimpan file gambar yang akan diupload.
    // percent: state yang digunakan untuk menentukan progress dari proses upload file gambar
    // State to store uploaded file
    const [file, setFile] = useState(""); // progress
    const [percent, setPercent] = useState(0); // Handle file upload event and update state

    // handleChange fungsi digunakan untuk meng-handle perubahan pada input file gambar. 
    // Ketika terdapat perubahan pada input file gambar, fungsi ini akan dipanggil dan 
    // memperbarui state file dan juga memanggil formik.setFieldValue untuk memperbarui nilai pada formik.
    // sehingga nilai event.target.files[0] (yaitu file gambar yang dipilih) akan ditetapkan sebagai 
    // nilai dari image pada formik.
    function handleChange(event) {
        setFile(event.target.files[0]);
        formik.setFieldValue("image", event.target.files[0]);
    }

    // regex
    const formik = useFormik({
    initialValues: {
        id: "",
        image: "",
        product: "",
        category: "",
        description: "",
        stock: "",
        size: "",
        price: "",
    },

    // aturan validasi
    validationSchema: Yup.object({
        image: Yup.string().required("Product Image wajib diisi"),
        product: Yup.string()
            .max(25, "Maksimal 25 karakter")
            .required("Product Name wajib diisi")
            .matches(
            /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/,
            "Name must not contain symbols"
            ),
        category: Yup.string().required("Product Category wajib diisi"),
        description: Yup.string().required("Product Description wajib diisi"),
        stock: Yup.string().required("Product Stock wajib diisi"),
        size: Yup.string().required("Product Size wajib diisi"),
        price: Yup.number()
            .positive("Jangan mengisi dengan min -")
            .required("Product Price wajib diisi"),
    }),


    // terdapat proses upload file ke Firebase Storage yang progressnya diupdate pada state React. 
    // Setelah file berhasil di-upload, URL download-nya digunakan untuk menambahkan data 
    // produk baru ke dalam database menggunakan GraphQL
    onSubmit: (values, { setValues, resetForm }) => {
        formik.resetForm();
        console.log("form values", values);

        if (!file) {
            alert("Please upload an image first!");
        }

        const storageRef = ref(storage, `/files/${file.name}`); 

        // variable uploadTask yang menyimpan proses 
        // upload file ke Firebase Storage dengan menggunakan uploadBytesResumable.
        const uploadTask = uploadBytesResumable(storageRef, file);

        // akan mengeksekusi fungsi yang di-passing 
        // setiap kali ada perubahan state pada proses upload file, seperti progress atau error
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // Menghitung presentase progress upload file dan menyimpannya dalam variable percent.
                const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              ); // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
              // Mendapatkan URL download file yang baru saja di-upload ke Firebase Storage
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url);
                // Menambahkan data produk baru ke dalam database menggunakan GraphQL.
                addProduct({
                    variables: {
                    id: values.id,
                    image: url,
                    product: values.product,
                    category: values.category,
                    description: values.description,
                    stock: values.stock,
                    size: values.size,
                    price: values.price,
                    },
                });
                });
            }
        );

        resetForm();

        alert("Succes")
        navigate("/admin");
        },
    });


    // adalah definisi GraphQL mutation yang digunakan untuk memperbarui 
    // sebuah produk (sepatu) pada server dengan memasukkan beberapa parameter seperti 
    // id produk dll.
    // Setelah mendefinisikan mutation tersebut, hook useMutation dari library @apollo/client 
    // digunakan untuk memanggil mutation tersebut dan memperbarui produk pada server.  
const UPDATE_PRODUCT = gql`
    mutation MyMutation(
        $id: Int!
        $image: String!
        $product: String!
        $category: String!
        $description: String!
        $stock: String!
        $size: String!
        $price: numeric!
    ) {
        update_sepatu_by_pk(
        pk_columns: { id: $id }
        _set: {
            image: $image
            product: $product
            category: $category
            description: $description
            stock: $stock
            size: $size
            price: $price
        }
    ) {
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
    const [updateProductt] = useMutation(UPDATE_PRODUCT);

    // adalah definisi GraphQL mutation yang digunakan untuk menambah data baru pada tabel 
    // produk (sepatu) pada server dengan memasukkan beberapa parameter seperti 
    // id produk dll.
    // Setelah mendefinisikan mutation tersebut, hook useMutation dari library @apollo/client 
    // digunakan untuk memanggil mutation tersebut dan memperbarui produk pada server. 
    const INSERT_PRODUCT = gql`
    mutation MyMutation(
        $image: String!
        $product: String!
        $category: String!
        $description: String!
        $stock: String!
        $size: String!
        $price: numeric!
    ) {
    insert_sepatu_one(
        object: {
            image: $image
            product: $product
            category: $category
            description: $description
            stock: $stock
            size: $size
            price: $price
        }
    ) {
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

    const [addProduct, { data, loading, error }] = useMutation(INSERT_PRODUCT);

    return (
    <div>
        {/* Form */}
        <section>
            <form
            // ketika pengguna mengklik tombol submit pada form, maka 
            // fungsi formik.handleSubmit akan dipanggil, yang akan memvalidasi input dari form.
            onSubmit={formik.handleSubmit}
            name="form" className="bg-secondary pb-5"
            >
            
            <div className="container pt-2 pb-3 text-white" style={{ backgroundColor: "#2f4f4f" }}>
            <div className="container text-center pt-3">
                <h2 className="">Create Product</h2>
            </div>

            {/* image product */}
            <div className="row mt-4">
                <div className="col-4"></div>
                <div className="col-4">
                <label htmlFor="formFile" className="form-label text-white">
                    Image of Product
                </label>
                <input
                    className="form-control image-product"
                    type="file"
                    id="image-product"
                    height="32px"
                    width="200px"
                    name="image"
                    data-testid="productImageTest"

                    onChange={handleChange}
                    accept="/image/*"
                />
                {formik.touched.image && formik.errors.image && (
                    <div className="error text-danger">
                        {formik.errors.image}
                    </div>
                )}
                </div>
                <div className="col-4"></div>
            </div>
            <br />


            {/* product Name */}
            <div className="row mt-2">
                <div className="col-4" />
                <div className="col-4">
                <label htmlFor="product" className="text-white">Product Name</label>
                <br />
                <input
                    type="text"
                    className="form-control mt-2 detail-product"
                    id="product"
                    aria-describedby="textHelp"
                    name="product"
                    data-testid="productNameTest"
                    onBlur={formik.handleBlur} // menetapkan metode
                    value={formik.values.product} // buat ambil nilainya
                    onChange={formik.handleChange} // buat tau perubahannya
                />
                {/* buat menampilkan errornya  */}
                {formik.touched.product && formik.errors.product && (
                    <div className="error text-danger">
                    {formik.errors.product}
                    </div>
                )}
            </div>
            <div className="col-4" />
            </div>

            {/* product category */}
            <div className="row mt-4">
                <div className="col-4" />
                <div className="col-4">
                    <label htmlFor="product" className="text-white">Product Category</label>
                    <select
                    name="category"
                    className="form-select category-product"
                    id="category"
                    aria-label="Default select example"
                    data-testid="productCategoryTest"
                    onBlur={formik.handleBlur} //
                    value={formik.values.category} // buat ambil nilainya
                    onChange={formik.handleChange}
                    >
                    <option value="">Choose..</option>
                    <option value={"Nike"}>Nike</option>
                    <option value={"Adidas"}>Adidas</option>
                    </select>
                    {formik.touched.category &&
                    formik.errors.category && (
                        <div className="error text-danger">
                        {formik.errors.category}
                        </div>
                    )}
                </div>
                <div className="col-4" />
            </div>

            {/* Product Description */}
            <div className="row mt-4">
                    <div className="col-4" />
                    <div className="col-4">
                    <label htmlFor="description" className="text-white">Additional Description</label>
                    <div className="form-floating">
                        <textarea
                        className="form-control"
                        placeholder="Leave a comment here"
                        id="description"
                        style={{ height: 100 }}
                        required=""
                        defaultValue={""}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        />

                        {formik.touched.description && formik.errors.description && 
                        <div className='error text-danger'>{formik.errors.description}</div>}
                    
                        <label htmlFor="floatingTextarea2" />
                        
                    </div>
                    </div>
                    <div className="col-4" />
                </div>

                {/* stok */}
                <div className="row mt-4">
                    <div className="col-4" />
                    <div className="col-4">
                    <label htmlFor="product" className="text-white">Product Stock</label>
                    <br />
                    <input
                        type="text"
                        name="stock"
                        className="form-control mt-2 detail-product"
                        id="stock"
                        aria-describedby="textHelp"
                        required=""
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />

                    {formik.touched.stock && formik.errors.stock && 
                    <div className='error text-danger'>{formik.errors.stock}</div>}

                    </div>
                    <div className="col-4" />
                </div>

                {/* size */}
                <div className="row mt-4">
                    <div className="col-4" />
                    <div className="col-4">
                    <label htmlFor="product" className="text-white">Product Size</label>
                    <select
                        name="size"
                        className="form-select category-product"
                        id="size"
                        aria-label="Default 
                                select example"
                        required=""
                        value={formik.values.size}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    >
                        <option selected="" disabled="" value="">
                        Choose..
                        </option>
                        <option value={37}>37</option>
                        <option value={38}>38</option>
                        <option value={39}>39</option>
                        <option value={40}>40</option>
                        <option value={41}>41</option>
                        <option value={42}>42</option>
                        <option value={43}>43</option>
                        <option value={44}>44</option>
                        <option value={45}>45</option>
                        <option value={"All Size"}>All Size</option>
                    </select>

                    {formik.touched.size && formik.errors.size && 
                    <div className='error text-danger'>{formik.errors.size}</div>}
                    
                    </div>
                    <div className="col-4" />
                </div>

                {/* product price */}
                <div className="row mt-4">
                    <div className="col-4" />
                    <div className="col-4">
                        <label htmlFor="price" className="text-white">Product Price</label>
                        <input
                        type="number"
                        className="form-control mt-2 "
                        id="price"
                        name="price"
                        aria-describedby="textHelp"
                        placeholder="$ 1"
                        data-testid="productPriceTest"
                        onBlur={formik.handleBlur} //
                        value={formik.values.price} // buat ambil nilainya
                        onChange={formik.handleChange}
                        />

                        {formik.touched.price && formik.errors.price && (
                        <div className="error text-danger">
                            {formik.errors.price}
                        </div>
                        )}
                    </div>
                    <div className="col-4"></div>

            </div>
            <Button />
            
            <div className="text-center mt-2 pb-5">
            <button
                type="submit"
                className="btn btn-primary submit"
                onClick={() => navigate('/admin')}
                ><i class="bi bi-backspace me-1"></i> Back
            </button>
            </div>
        </div>
        </form>

        </section>
        {/* <Tabel productData={productData} handleSetEdit={handleSetEdit} /> */}
        {/* button random */}
    </div>
);
}

export default Form1;
