import './Login.css';
import FacebookIcon from '../assets/facebook.svg';
import YoutubeIcon from '../assets/youtube.svg';
import TwitterIcon from '../assets/twitter-x.svg';
import InstagramIcon from '../assets/instagram.svg';
import MailIcon from '../assets/email.svg';
import WebIcon from '../assets/web.svg';
import ivaiFachada from '../Imagenes/IVAI_Fachada.jpg';
import ivaiImage from '../Imagenes/ivai.webp';
import rlceImage from '../Imagenes/rlce.webp';
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import PopupMSJBien from "../Componentes/PopupMSJBien.jsx";
import checkIcon from '../assets/check.svg';
import errorIcon from '../assets/react.svg';

function Login() {
    const navigate = useNavigate();

    const [errores, setErrores] = useState({});

    const [cargando, setCargando] = useState(false);
    const [datosFormulario, setDatosFormulario] = useState({
        usuario: '',
        password: ''
    });

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [popupConfig, setPopupConfig] = useState({
        icon: checkIcon,
        title: "¡Bienvenido!",
        message: "Al dar clic en el botón de aceptar será redirigido a la siguiente pantalla.",
        buttonText: "Aceptar",
        onAction: () => navigate('/RegistroCurso')
    });

    const handleOpenPopup = (config) => {
        setPopupConfig(config);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        const popup = document.querySelector('.popup-overlay-confirmation');
        if (popup) {
            popup.classList.remove('popup-show');
            popup.classList.add('popup-hide');
            setTimeout(() => {
                setIsPopupOpen(false);
            }, 300);
        }
    };

    window.localStorage.clear();

    const peticionLogin = async () => {
        try {
            const respuesta = await axios.post("http://localhost:4567/validacion", datosFormulario);
            console.log("Respuesta de peticion: " + respuesta);
            return respuesta;
        } catch (error) {
            throw error;
        }
    };

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!datosFormulario.usuario) {
            nuevosErrores.usuario = 'El campo usuario es obligatorio.';
        }

        if (!datosFormulario.password) {
            nuevosErrores.password = 'El campo contraseña es obligatorio';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const procesarFormulario = async (evento) => {
        evento.preventDefault();
        setCargando(true);

        if (!validarFormulario()) {
            setCargando(false);
            return;
        }

        try {
            const respuesta = await peticionLogin();
            console.log("Respuesta de LOGIN: ", respuesta.data);

            if (respuesta.data.mensaje === 'Usuario correcto') {
                handleOpenPopup({
                    icon: checkIcon,
                    title: "¡Bienvenido!",
                    message: "Al dar clic en el botón de aceptar será redirigido a la siguiente pantalla.",
                    buttonText: "Aceptar",
                    onAction: () => navigate('/RegistroCurso')
                });
            } else {
                handleOpenPopup({
                    icon: checkIcon,
                    title: "¡Credenciales incorrectas!",
                    message: "Las credenciales ingresadas no son válidas. Inténtalo de nuevo.",
                    buttonText: "Reintentar",
                    onAction: handleClosePopup
                });
                setDatosFormulario({
                    usuario: '',
                    password: ''
                });
                setErrores({});
            }
        } catch (error) {
            console.error("Error en el login: ", error);
            handleOpenPopup({
                icon: checkIcon,
                title: "¡Error!",
                message: "Ocurrió un error durante el proceso. Por favor, inténtelo de nuevo más tarde.",
                buttonText: "Aceptar",
                onAction: handleClosePopup
            });
        } finally {
            setCargando(false);
        }
    };

    const cambiosFormulario = (evento) => {
        const { name, value } = evento.target;

        setErrores((prevErrores) => ({
            ...prevErrores,
            [name]: ''
        }));

        setDatosFormulario({
            ...datosFormulario,
            [name]: value
        });
    };

    return (<>
        <section class="layout_l">
            <div class="contenedorLogin">
                <div class="left">
                    <div id="ContenedorFachada">
                        <img className='fachada' src={ivaiFachada} />
                        <img class="logo_ivai" src={ivaiImage} />
                    </div>
                </div>
                <div class="right">
                    <img src={rlceImage} className='img-right-l'></img>

                    <form action="" onSubmit={procesarFormulario}>
                        <p>Usuario</p>
                        <input type="text" onChange={cambiosFormulario} name="usuario" value={datosFormulario.usuario} />
                        {errores.usuario && <span className="error-message">{errores.usuario}</span>}
                        <p>Contraseña</p>
                        <input type="password" onChange={cambiosFormulario} name="password" value={datosFormulario.password} />
                        {errores.password && <span className="error-message">{errores.password}</span>}
                        <input type="submit" className="btn_ingresar" disabled={cargando} value="INGRESAR" />
                    </form>
                </div>
            </div>

            <div className="footer_l">
                {/* Social links */}
            </div>
        </section>

        {isPopupOpen && (
            <div className="popup-overlay-confirmation">
                <div className={`popup-content-confirmation ${isPopupOpen ? 'popup-show' : 'popup-hide'}`}>
                    <PopupMSJBien
                        icon={popupConfig.icon}
                        title={popupConfig.title}
                        message={popupConfig.message}
                        buttonText={popupConfig.buttonText}
                        onClose={handleClosePopup}
                        onAction={popupConfig.onAction}
                    />
                </div>
            </div>
        )}
    </>);
}

export default Login;
