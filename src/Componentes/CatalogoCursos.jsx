import ivaiImage from '../Imagenes/ivai.webp';
import '../Estilos/CatalogoCursos.css';
import FacebookIcon from '../assets/facebook.svg';
import YoutubeIcon from '../assets/youtube.svg';
import TwitterIcon from '../assets/twitter-x.svg';
import InstagramIcon from '../assets/instagram.svg';
import MailIcon from '../assets/email.svg';
import WebIcon from '../assets/web.svg';
import Ubi from '../assets/ubi.svg';
import Arrow from '../assets/arrow.svg';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PopupCatalogo from './PopupCatalogo';
import PopupCatalogoEditar from './PopupCatalogoEditar';

function catalogoCursos() {
    const [dataTipoCurso, setDataTipoCurso] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpenUno, setIsPopupOpenUno] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const CursoPerPage = 10;
    const navigate = useNavigate();

    const getTipoCursos = async () => {
        try {
            const response = await fetch(`http://localhost:4567/obtenerTipoCurso`);
            const data = await response.json();
            setDataTipoCurso(data);
        } catch (error) {
            console.error('Error al obtener los tipos de curso:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4567/eliminarTipoCurso`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            const result = await response.json();
            
            if (result.message === "Tipo curso eliminado con exito") {
                getTipoCursos(); 
            } else {
                console.error(result.message); 
            }
        } catch (error) {
            console.error("Error al eliminar el tipo de curso:", error);
        }
    };
    


    useEffect(() => {
        getTipoCursos();
    }, []);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
        document.body.style.overflow = "hidden";
    };

    const handleOpenPopupUno = () => {
        setIsPopupOpenUno(true);
        document.body.style.overflow = "hidden";
    };

    const handleClosePopup = () => {
        const popup = document.querySelector('.popup-content-compo-1');
        if (popup) {
            popup.classList.remove('popup-show');
            popup.classList.add('popup-hide');
            setTimeout(() => {
                setIsPopupOpen(false);
                document.body.style.overflow = "auto";
                setScrollEnabled(true);
            }, 300);
        }
    };

    const handleClosePopupUno = () => {
        const popup = document.querySelector('.popup-content-compo-1');
        if (popup) {
            popup.classList.remove('popup-show');
            popup.classList.add('popup-hide');
            setTimeout(() => {
                setIsPopupOpenUno(false);
                document.body.style.overflow = "auto";
                setScrollEnabled(true);
            }, 300);
        }
    };

    const handleNavigation = () => {
        navigate('/RegistroCurso');
    }

    const handleAgregarTipoCursoExitoso = () => {
        getTipoCursos();
    };

    const indexOfLastCurso = currentPage * CursoPerPage;
    const indexOfFirstCurso = indexOfLastCurso - CursoPerPage;
    const currentCurso = dataTipoCurso.slice(indexOfFirstCurso, indexOfLastCurso);

    const totalPages = Math.ceil(dataTipoCurso.length / CursoPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            <section className="layout">
                <div className="header">
                    <h1 className="header-title">
                    </h1>
                    <img src={ivaiImage} alt="Icono IVAI" className="header-img-left" />
                </div>
                <div className='Main-Admin'>
                    <div className='back-icon'>
                        <img src={Arrow} alt='Flecha Regresar' className='icon' onClick={handleNavigation} />
                        <label className='icon-text'>Regresar</label>
                    </div>
                    <div className='table-Container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                </tr>
                            </thead>
                            <tbody className='table-Data'>
                                {currentCurso.length > 0 ? (
                                    currentCurso.map((tipoCurso, index) => (
                                        <tr key={index}>
                                            <td>{tipoCurso.id}</td>
                                            <td>{tipoCurso.tipo}</td>
                                            <td>
                                                <label
                                                    className='delete-register'
                                                    onClick={() => handleDelete(tipoCurso.id)} 
                                                >
                                                    <u>Eliminar</u>
                                                </label>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" style={{ textAlign: 'center' }}>No hay datos disponibles</td>
                                    </tr>
                                )}
                            </tbody>


                        </table>
                    </div>

                    <div className="pagination">
                        <Button onClick={prevPage} disabled={currentPage === 1}>Anterior</Button>
                        <span>Página {currentPage} de {totalPages}</span>
                        <Button onClick={nextPage} disabled={currentPage === totalPages}>Siguiente</Button>
                    </div>

                    <div className='button-Container'>
                        <Button variant="contained" onClick={handleOpenPopup} sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", fontSize: '2vh', margin: '2vw' }}>Agregar</Button>
                        <Button variant="contained" onClick={handleOpenPopupUno} sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", fontSize: '2vh', margin: '2vw' }}>Modificar</Button>
                    </div>
                    <div className="address-container">
                        <p className="dir">
                            Calle Guadalupeee Victoria #7, Zona Centro, C.P. 91000, Xalapa, Veracruz.
                        </p>
                        <a href="https://maps.app.goo.gl/q4NLaByuVnYCrV9RA" target="_blank" rel="noopener noreferrer">
                            <img className="imgUb" src={Ubi} alt="Ubicación" />
                        </a>
                    </div>
                </div>


                <div className="footer">

                    <div className="social-group">
                        <a href="https://www.facebook.com/ivaiveracruz" target="_blank" rel="noopener noreferrer">
                            <img src={FacebookIcon} alt="Facebook" />
                        </a>
                        <a href="https://www.youtube.com/@IVAIVeracruz" target="_blank" rel="noopener noreferrer">
                            <img src={YoutubeIcon} alt="YouTube" />
                        </a>
                        <p>ivaiveracruz</p>
                    </div>


                    <div className="social-group">
                        <a href="https://x.com/VERIVAI" target="_blank" rel="noopener noreferrer">
                            <img src={TwitterIcon} alt="Twitter" />
                        </a>
                        <a href="https://www.instagram.com/verivai" target="_blank" rel="noopener noreferrer">
                            <img src={InstagramIcon} alt="Instagram" />
                        </a>
                        <p>verivai</p>
                    </div>


                    <div className="social-group">
                        <a href="mailto:contacto@verivai.org.mx">
                            <img src={MailIcon} alt="Correo" />
                        </a>
                        <p>contacto@verivai.org.mx</p>
                    </div>


                    <div className="social-group">
                        <a href="https://ivai.org.mx" target="_blank" rel="noopener noreferrer">
                            <img src={WebIcon} alt="Web" />
                        </a>
                        <p>ivai.org.mx</p>
                    </div>
                </div>

            </section>
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className={`popup-content-compo-1 ${isPopupOpen ? 'popup-show' : 'popup-hide'}`}>
                        <div className="pupup-responsive">
                            <PopupCatalogo onClose={handleClosePopup} reloadCursos={handleAgregarTipoCursoExitoso}/>
                        </div>
                    </div>
                </div>
            )}

            {isPopupOpenUno && (
                <div className="popup-overlay">
                    <div className={`popup-content-compo-1 ${isPopupOpenUno ? 'popup-show' : 'popup-hide'}`}>
                        <div className="pupup-responsive">
                            <PopupCatalogoEditar onClose={handleClosePopupUno} onUpdateSuccess={getTipoCursos} />
                        </div>
                    </div>
                </div>
            )}


        </>
    )
}

export default catalogoCursos;