
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.json'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Home from '../Home/Home'
import './HalamanUtama.css'


function HalamanUtama() {

    // mendefinisikan state toggle yang awalnya diinisialisasi dengan nilai true. 
    const [toggle, setToggle] = useState(true)

    // Kemudian, fungsi Toggle digunakan untuk mengubah nilai menjadi nilai 
    // kebalikan dari nilai saat ini. Dalam hal ini, ketika fungsi Toggle dipanggil,
    // nilai toggle akan diubah antara true dan false.
    const Toggle = () => {
        setToggle(!toggle)
    }

  
    //     dispatch(setIsEdit(true));
    //     formik.setValues({
    //       productName: product.productName,
    //       productCategory: product.productCategory,
    //       radioProduct: product.radioProduct,
    //       imageProduct: product.imageProduct,
    //       additional_information: product.additional_information,
    //       productPrice: product.productPrice,
    //       id: product.id,
    //     });
    // };
    
    // const handleEdit = (newValues, event) => {
    //     event.preventDefault();
    //     updateProductt({
    //       variables: {
    //         id: newValues.id,
    //         productName: newValues.productName,
    //         productCategory: newValues.productCategory,
    //         radioProduct: newValues.radioProduct,
    //         imageProduct: newValues.imageProduct,
    //         additional_information: newValues.additional_information,
    //         productPrice: newValues.productPrice,
    //       },
    //     });
    // };
    
    return (
        <div className="container-fluid halamanUtama min-vh-100">
            <div className='row'>
                {toggle && <div className='sibarUtama col-4 col-md-2 vh-100 position-fixed'>
                <Sidebar />
                </div>}

                {toggle && <div className='col-4 col-md-2 '></div>}

                {/* <div className='col-10 vh-100'></div> */}
                <div className='col'>
                <Home Toggle={Toggle} />

                {/* <InputProduct /> */}
                {/* <Table productData={productData} handleSetEdit={handleSetEdit} /> */}
                </div>
            </div>  
        </div>
    )
}

export default HalamanUtama
