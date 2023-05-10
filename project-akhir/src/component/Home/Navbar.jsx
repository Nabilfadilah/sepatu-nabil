import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

function Navbar({Toggle}) {

    const navigate = useNavigate();

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-white text-white px-5 rounded">
                <i className="navbar-brand bi bi-justify-left fs-4 text-white" onClick={Toggle}></i>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation"><i className='bi bi-justify me-3'></i></button>
                    
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    <a href=""><i class="bi bi-bell-fill text-white me-4"></i></a>
                    <a href=""><i class="bi bi-envelope-fill text-white"></i></a>
                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
                        <li className="nav-item dropdown md-4">
                            <a className="nav-link dropdown-toggle me-2 text-white" href="#" id="dropdownId" 
                            data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Mohammad</a>
                            <div className="dropdown-menu" aria-labelledby="dropdownId">
                                <a className="dropdown-item" href="#"><i class="bi bi-person-fill"></i> Profile</a>
                                <a className="dropdown-item" href="#"><i class="bi bi-gear"></i> Setting</a>
                                <a className="dropdown-item" href="#" onClick={() => navigate('/')}><i class="bi bi-box-arrow-left"></i> Logout</a>
                            </div>
                        </li>
                    </ul>

                    <a className='list-group-item py-2'>
                        <a href=""><i className='bi bi-person text-white fs-5 me-5'></i></a>
                    </a>
                </div>
            </nav>
        </div>
    )
}

export default Navbar