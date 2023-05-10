import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreateProduct from "./component/page/CreateProduct";
import HalamanUtama from "./component/page/HalamanUtama";
import LandingPage from "./component/page/LandingPage";
import Edit from "./component/Edit/Edit";

// baru
import { auth } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  
// Kode ini melakukan inisialisasi pada state isLogin. 
const [isLogin, setIsLogin] = useState(false)
  
  // Kemudian, menggunakan useEffect dengan dependency array kosong, 
  // sehingga hanya dijalankan sekali saat komponen mount.
  useEffect(() => {
    const auth = getAuth()

    // fungsi onAuthStateChanged dari Firebase Authentication 
    // digunakan untuk memeriksa status autentikasi pengguna
    onAuthStateChanged(auth, (result)=>{

      // Jika pengguna sudah login, 
      // maka state isLogin diubah menjadi true,
      if(result) {
        setIsLogin(true)
        
        return
      }
      // Jika pengguna belum login, 
      // maka state isLogin tetap false,
      setIsLogin(false)
      
    })
  },[])

  

  return (
    <>
      {/* conditional rendering */}
      {isLogin ? (
      <Router>
        <Routes> 
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<HalamanUtama />} />
          <Route path="/createproduct" element={<CreateProduct />} />
          <Route path="/createproduct/:id" element={<Edit />} />
        </Routes>
      </Router>

      ) : (
        <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<LandingPage />} />
          </Routes>
        </Router>
      )}
    

      {/* <Route path="/search/:product" element={<Search />} /> */}
      {/* <Route path="/login" element={<Login setSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />} />
      <Route path="/register" element={<Register />} /> */}

          {/* <Route
            path="/createproduct"
            element={
              <ProtectedRoute isSignedIn={isSignedIn}>
                <CreateProduct setSignedIn={setIsSignedIn} />
              </ProtectedRoute>
            }
          /> */}

          {/* 
          <Route path="/search/:name" element={<Search />} />

          <Route path="/loadmore" element={<LoadMore />} />

          <Route path="/account/:id" element={<DataProduct />} /> */}

          {/* <Route
            path="/account/:id"
            element={
              <ProtectedRoute isSignedIn={isSignedIn}>
                <DataProduct setSignedIn={setIsSignedIn} />
              </ProtectedRoute>
            }
          /> */}

          {/* <Route
            path="/login"
            element={
              <Login setSignedIn={setIsSignedIn} isSignedIn={isSignedIn} />
            }
          /> */}
          {/* <Route path="/register" element={<Register />} /> */}
        
    </>
  );
}

export default App;
