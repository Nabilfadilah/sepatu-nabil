import React from 'react'

function Maps() {
    return (
    <div>
        <section id="contact" className="contact mb-4 pt-5">
            <div className="container">
                <div className="row pt-4 mb-4">
                    <div className="col text-center">
                        <h2>Contact Us</h2>
                        <hr />
                    </div>
                </div>
                <div className="row justify-content-center">
                <div className="col-lg-4">
                    <div className="card text-light mb-3 shadow" style={{ backgroundColor: "#2f4f4f" }}>
                    <div className="card-body shadow">
                        <h5 className="card-title text-center">Contact Info</h5>
                        <p className="card-text text-center">
                        Silahkan hubungi kami untuk informasi lebih lanjut.
                        </p>
                        <p className="card-phone text-center">085-233-344-007</p>
                        <p className="card-email text-center">mnabilfadilahh@gmail.com</p>
                    </div>
                    </div>
                    <ul className="list-group">
                    <li className="list-group-item text-center"><i class="bi bi-pin-map"></i> Location</li>
                    <li className="list-group-item">
                        Kota Bandung, Jawa Barat, Indonesia.
                    </li>
                    </ul>
                </div>
                
                <div className="col-lg-6">
                    <div className='maps text-center pb-5'>
                
                    <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.215886109678!2d107.59081967464758!3d-6.864712593133868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6be609b88cf%3A0x683394510b22192f!2sJl.%20Gegerkalong%20Girang%20No.15%2C%20Isola%2C%20Kec.%20Sukasari%2C%20Kota%20Bandung%2C%20Jawa%20Barat%2040153!5e0!3m2!1sid!2sid!4v1682922388512!5m2!1sid!2sid"
                            width={600}
                            height={450}
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
                </div>
            </div>
        </section>
    </div>
    )
}

export default Maps