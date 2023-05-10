import React from 'react'

import nike from '../../img/size-nike.png'
import adidas from '../../img/size-adidas.png'

function SizeNike() {
    return (
        <section id="size" className="contact pb-5 mt-2" style={{ backgroundColor: "#f2f7f7" }}>
            <div className="container">
                <div className="row pt-4 mb-4">
                    <div className="col text-center">
                        <h2 className='pb-3 pt-3'>Size Chart</h2>
                        <hr />
                        
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card text-light mb-3">
                            <div className="card-body text-center pb-5 shadow">
                                <h5 className="card-title text-dark text-center pb-2">Nike</h5>
                                <img src={nike} alt="" className='nike-size' /><label className='text-white'></label> 
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card text-light mb-3">
                            <div className="card-body text-center pb-5 shadow">
                                <h5 className="card-title text-dark text-center pb-2">Adidas</h5>
                                <img src={adidas} alt="" className='nike-size' /><label className='text-white'></label> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        // <div className='size pb-5' style={{ backgroundColor: "#ebecf8" }}>
        //     <div className="container pt-4">
        //         <div className="row">
        //             <div className="col text-center">
        //                 <h2>Size Chart</h2>
        //                 <hr />
        //                 <img src={logo} alt="" className='nike-size' /><label className='text-white'></label> 
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}

export default SizeNike