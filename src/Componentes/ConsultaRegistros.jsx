import ivaiImage from '../Imagenes/ivai.webp';
import '../Estilos/ConsultaRegistros.css';
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
import PopupRegistro from './PopupRegistro';
import { useNavigate } from 'react-router-dom';


function ConsultaRegistros() {

    const [dataRegistros, setDataRegistros] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const id = window.localStorage.getItem('id');
    const navigate = useNavigate();

    const getRegistros = async (idCurso) => {
        try {
            const response = await fetch(`http://localhost:4567/obtenerRegistros/${idCurso}`);
            const data = await response.json();
            setDataRegistros(data);
        } catch (error) {
            console.error('Error al obtener los registros de curso:', error);
        }
    };

    useEffect(() => {
        getRegistros(id);
    }, []);

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
        document.body.style.overflow = "hidden";
        setScrollEnabled(false);
    };

    const handleClosePopup = () => {
        const popup = document.querySelector('.popup-content-compo-1');
        if (popup) {
            popup.classList.remove('popup-show');
            popup.classList.add('popup-hide');
            setTimeout(() => {
                setIsPopupOpen(false);
                Props.reloadCursos()
                document.body.style.overflow = "auto";
                setScrollEnabled(true);
            }, 300); // Duración de la animación de salida
        }
    };

    const obtenerRegistros = async (idCurso) => {
        try {
            const response = await fetch(`http://localhost:4567/obtenerExcelRegistros/${idCurso}`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `registros_curso_${idCurso}.xlsx`;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    };

    const handleNavigation = () => {
        navigate('/RegistroCurso');
    }

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
                        <img src={Arrow} alt='Flecha Regresar' className='icon' onClick={handleNavigation}/>
                        <label className='icon-text'>Regresar</label>
                    </div>
                    <div className='table-Container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Sujeto Obligado</th>
                                    <th>Teléfono</th>
                                    <th>Correo Electrónico</th>
                                    <th>Intérprete</th>
                                    <th>Asistencia</th>
                                </tr>
                            </thead>
                            <tbody className='table-Data'>
                                {dataRegistros.length > 0 ? (
                                    dataRegistros.map((registro , index) => (
                                        <tr key={index}>
                                            <td>{registro.nombre}</td>
                                            <td>{registro.apellidos}</td>
                                            <td>{registro.so}</td>
                                            <td>{registro.telefono}</td>
                                            <td>{registro.correo}</td>
                                            <td>{registro.interprete}</td>
                                            <td>{registro.asistencia}</td>
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
                    <div className='button-Container'>
                        <Button onClick={() => obtenerRegistros(id)} variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", fontSize:'2vh', margin:'2vw'  }}>Descargar Registros</Button>
                        <Button onClick={handleOpenPopup} variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", fontSize:'2vh', margin:'2vw'  }}>Agregar Registro</Button>
                        <Button variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", fontSize:'2vh', margin:'2vw'  }}>Eliminar Registro</Button>
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
                        <div className= "pupup-responsive">
                            <PopupRegistro onClose={handleClosePopup} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConsultaRegistros;