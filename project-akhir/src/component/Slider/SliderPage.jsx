import React from 'react'
import nike from "../../img/nike.jpg";

function SliderPage() {
    return (
        <div>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <img src={nike} alt="" className="img d-block w-100" />
                    {/* <div className="carousel-item active">
                    <div className="carousel-caption d-none d-md-block mt-5">
                        <h1 className="justify-content-center">
                        Selamat Datang di Webiste Fadilah Academy
                        </h1>
                        <hr />
                            <h3>...</h3>
                            <h3>..</h3>
                            <h3>.</h3 >
                    </div>
                    </div> */}
                     {/* <svg
                        className="bd-placeholder-img card-img-top"
                        width="100%"
                        height={225}
                        xmlns="http://www.w3.org/2000/svg"
                        >

                        <title>Product Name</title>
                        <rect width="100%" height="100%" fill="#55595c" />
                    </svg> */}
                </div>
                {/* <button
                   
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    
                >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button> */}
        </div>
        </div>

    // <div id="carouselExampleRide" class="carousel slide" data-bs-ride="true">
    //     <div class="carousel-inner">
    //         <div class="carousel-item active">
    //             <img src={slider3} alt="" className="img d-block w-100" />
    //         </div>
    //         <div class="carousel-item">
    //             <img src="..." class="d-block w-100" alt="..." />
    //         </div>
    //         <div class="carousel-item">
    //             <img src="..." class="d-block w-100" alt="..." />
    //         </div>
    //     </div>

    //     <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
    //         <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    //         <span class="visually-hidden">Previous</span>
    //     </button>
    //     <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
    //         <span class="carousel-control-next-icon" aria-hidden="true"></span>
    //         <span class="visually-hidden">Next</span>
    //     </button>
    // </div>
    )
}

export default SliderPage