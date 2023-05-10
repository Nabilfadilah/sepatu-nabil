// login dengan firebase

import React from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'

// baru
import { getAuth, signOut } from "firebase/auth";

function Sidebar() {
    
    const navigate = useNavigate();

    // pada code ini fungsi handleLogout menggunakan Firebase Authentication. 
    // bertujuan untuk melakukan proses logout dengan 
    // menghapus data user yang telah disimpan di localStorage dan mengarahkan 
    // user ke halaman landing page setelah logout berhasil dilakukan.
    const handleLogout = () => {

        // untuk mendapatkan instance authentikasi dari Firebase
        const auth = getAuth();

        // untuk melakukan proses logout
        signOut(auth)
            .then((result) => {

                 // digunakan untuk menghapus data user yang tersimpan di local storage
                localStorage.clear();
                navigate("/");
            })

            // Jika terjadi kesalahan, pesan kesalahan akan ditampilkan di console menggunakan console.info(err).
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className='sidebar vh-100 sidebar p-2'>
            <div className='m-2'>
                <i className='bi bi-bootstrap-fill text-white me-3 fs-4'></i>
                <span className='brand-name fs-4 text-white'>BShoes</span>
            </div>

            <div className='list-group list-group-flush'>
                <a className='list-group-item grop py-2 my-1 nav-link active' style={{ backgroundColor: "rgb(97, 168, 143)" }}>
                    <i className='bi bi-speedometer2 fs-5 me-3'></i>
                    <span>Dashboard</span>
                </a>

                <a className='list-group-item py-2'>
                    <i class="bi bi-plus-square fs-6 me-3"></i>
                    <a href="" type='submit' onClick={() => navigate('/createproduct')}></a>
                    <span>Product</span>
                </a>

                <a className='list-group-item py-2'>
                    <i className='bi bi-person fs-6 me-3'></i>
                    <span>Customer</span>
                </a>

                <a className='list-group-item py-2'>
                    <i className='bi bi-box-seam fs-6 me-3'></i>
                    <span>Order</span>
                </a>

                <a className='list-group-item py-2'>
                    <i className='bi bi-gear fs-6 me-3'></i>
                    <span>Setting</span>
                </a>

                <hr className='text-dark'/>
                <a className='list-group-item py-2 my-5'>
                    <i class="bi bi-box-arrow-in-left fs-6 me-3"></i>
                    {/* kemudian di tombol logout akan menjalankan fungsi handleLogout. kemudian mengarahkan user ke halaman landing page */}
                    <a className='tombol-back text-dark' style={{ textDecoration: "none" }} onClick={handleLogout}>Logout</a>
                </a>
            </div>
        </div>
    )
}

export default Sidebar