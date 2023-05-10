
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSubscription } from "@apollo/client";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

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

function Table({ productData, handleSetEdit }) {

    // GraphQL mutation untuk menghapus data produk dari database. Mutation ini dinamakan 
    // delete_sepatu dan memiliki satu parameter yaitu id.
    const DELETE_PRODUCT = gql`
    mutation MyMutation($id: Int!) {
        delete_sepatu_by_pk(id: $id) {
            id
        }
    }
    `;

    // deleteProduct fungsi yang dibuat menggunakan useMutation yang sudah diberikan mutation 
    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    // Pada fungsi handleDeleteProduct, ketika menghapus produk, 
    // fungsi ini akan memanggil fungsi deleteProduct yang sudah didefinisikan
    // menggunakan parameter id
    const handleDeleteProduct = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
        deleteProduct({ variables: { id } });
        }
    };

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
        // baru
        <div className="row isi">
            <div class="d-flex">
                <div class="p-2 flex-fill ps-4"><caption className='text-dark fs-4'>Product</caption></div>
                    
                <div class="p-2 flex-fill pe-4">

                    {/* nilai dari input akan disimpan di state 
                        search menggunakan fungsi handleSearch. Nilai tersebut kemudian digunakan 
                        sebagai variabel input dalam query GraphQL di useSubscription untuk melakukan 
                        pencarian pada produk berdasarkan nama */}
                    <form className="d-flex">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            name="search"
                            value={search}
                            onChange={handleSearch}
                            // onChange={formik.handleChange}
                        />
                    </form>
                </div>
            </div>

            <div className="table-responsive">

            <table className="table table-striped " id="table">
                <thead className="text-white" style={{ backgroundColor: "#2f4f4f" }}>
                <tr style={{ fontSize: "16px" }}>
                    <th scope="col">No</th>
                    <th scope="col">Image</th>
                    <th scope="col">Product</th>
                    <th scope="col">Category</th>
                    <th scope="col">Description</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Size</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                </tr>
                </thead>

            <tbody id="table-body">
            {/* Kode menggunakan data yang diperoleh dari kueri GraphQL untuk menampilkan produk dalam 
                format tabel, dengan setiap baris menampilkan informasi tentang suatu produk */}
                {data?.sepatu.map((item, index) => (
                    <tr key={item.id}>
                    <td>
                        {index + 1}
                    </td>
                    <td><img src={item.image} alt="" width={120} height={120} /> </td>
                    <td>{item.product}</td>
                    <td>{item.category}</td>
                    <td>{item.description}</td>
                    <td>{item.stock}</td>
                    <td>{item.size}</td>
                    <td>{item.price}</td>
                    <td>

                    {/* Kode Tombol pertama adalah 
                        tombol "Edit" yang mengarahkan pengguna ke formulir untuk mengedit detail produk. */}
                    <Link 
                        to={`/createproduct/${item.id}`}
                        className="bg-warning me-2 btn-sm"
                        state={item}
                        
                        
                    >
                    <i class="bi bi-pencil-square"></i>
                    </Link>
                    
                    {/* Tombol "Hapus" yang memanggil fungsi handleDeleteProduct 
                        saat diklik. akan meminta pengguna untuk konfirmasi sebelum menghapus produk. 
                        Jika mengonfirmasi, deleteProduct dipanggil dengan id akan terhapus */}
                    <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteProduct(item.id)}
                        >
                        <i class="bi bi-trash"></i>
                    </button>

                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default Table;
