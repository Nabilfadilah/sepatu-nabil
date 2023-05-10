// login dengan firebase

import React from 'react'
import { useNavigate } from 'react-router-dom'

// baru
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function NavbarPage() {

    const navigate = useNavigate();

    // Login manggunakan Firebase Authentication user masuk menggunakan 
    // akun Google dengan menggunakan layanan Google Sign-in.
    const loginWithGoogle = () => {
        
        // getAuth() yaitu metode dari Firebase Authentication yang digunakan 
        // untuk mendapatkan instance autentikasi.
        const auth = getAuth();

        // GoogleAuthProvider yaitu objek yang digunakan untuk melakukan autentikasi dengan menggunakan Google.
        const provider = new GoogleAuthProvider();

        // signInWithPopup(auth, provider) yaitu metode untuk membuka jendela pop-up untuk 
        // mengizinkan pengguna masuk menggunakan akun Google mereka. 
        signInWithPopup(auth, provider)

            // Setelah pengguna berhasil masuk, maka data pengguna disimpan dalam 
            // localStorage dan pengguna dialihkan ke halaman admin menggunakan fungsi navigate(). 
            .then((result) => {
                console.info(result.user);
                localStorage.setItem("user", JSON.stringify(result.user));
                navigate("/admin");
            })

            // Jika terjadi kesalahan, pesan kesalahan akan ditampilkan di console menggunakan console.info(err).
            .catch((err) => {
                console.info(err);
        });
    };

    return (
        <div>
            <nav
                className="navbar navbar-expand-lg shadow fixed-top" style={{ fontSize: "18px", 
                backgroundColor: "#2f4f4f" }} data-bs-theme="dark"
                >
                <div className="container" style={{ height: "84px" }}>
                    <a className="navbar-brand" href="#">
                    {/* <img src={logo} alt="" className='img' width="50px" style={{ marginLeft: 30 }}/> */}
                    <h4>Bill Shoes</h4>
                    </a>
                    <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    >
                    <span className="navbar-toggler-icon" />
                    </button>
                    
                    <div
                    className="collapse navbar-collapse justify-content-end round" id="navbarNavDropdown"
                    >
                        
                    <ul
                        className="navbar-nav text-sm-center mt-lg-auto"
                        style={{ marginRight: 30 }}
                        >
                        <li className="nav-item">
                            <a className="nav-link me-3" href="#list-product">
                                Product
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link me-3" href="#size">
                                Size
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link me-3" href="#contact">
                                Contact
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="">
                                <i class="bi bi-cart-plus me-5 text-white"></i> 
                            </a>
                        </li>

                        <li className="nav-item">

                            <a className="login-firebase nav-link active bg-warning rounded" 

                            // kemudian di tombol login akan menjalankan fungsi loginWithGoogle yang akan melakukan proses otentikasi 
                            // dengan menggunakan Firebase Authentication dan provider GoogleAuthProvider. Fungsi tersebut akan memperbarui informasi
                            //  user pada local storage dan kemudian mengarahkan user ke halaman /admin
                            style={{ cursor: "pointer" }} aria-current="page" onClick={loginWithGoogle}>
                                Login
                            </a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavbarPage