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

function Login() {
    const navigate = useNavigate();

    const [cargando, setCargando] = useState(false);
    const [datosFormulario, setDatosFormulario] = useState({
        correo: '',
        password: ''
    })

    //?SE LIMPIA EL ALMACENAMIENTO LOCAL DEL NAVEGADOR QUE ALOJA EL USUARIO DE LA SESION
    window.localStorage.clear();

    //!METODO DE PETICIÓN PARA VERIFICAR REGISTRO DE USUARIO (LOGIN)
    const peticionLogin = async () => {
        try {
            const respuesta = await axios.post("http://localhost:4567/validacion", datosFormulario);
            console.log("Respuesta de peticion: " + respuesta);
            return respuesta;
        } catch (error) {
            throw error;
        }
    }

    const procesarFormulario = async (evento) => {
        evento.preventDefault();
        setCargando(true);
        try {
            const respuesta = await peticionLogin();
            console.log("Respuesta de LOGIN: ", respuesta.data);
            if (respuesta.data.mensaje === 'Usuario correcto') {
                navigate('/RegistroCurso');
                window.localStorage.setItem('Usuario', datosFormulario.correo);
            } else {
                alert("Usuario o contraseña incorrecto");
            }
        } catch (error) {
            console.error("Error en el login: ", error);
        } finally {
            setCargando(false);
        }
    }

    //!METODO PARA DETECTAR LOS CAMBIOS EN EL FORMULARIO
    const cambiosFormulario = (evento) => {
        const { name, value } = evento.target;
        setDatosFormulario({
            ...datosFormulario,
            [name]: value
        })
    }

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
                        <input type="text" onChange={cambiosFormulario} name='usuario' />

                        <p>Contraseña</p>
                        <input type="password" onChange={cambiosFormulario} name='password' />

                        <input type="submit" className="btn_ingresar" disabled={cargando} value="INGRESAR" />
                    </form>
                </div>
            </div>

            <div className="footer_l">

                <div className="social-group_l">
                    <a href="https://www.facebook.com/ivaiveracruz" target="_blank" rel="noopener noreferrer">
                        <img src={FacebookIcon} alt="Facebook" />
                    </a>
                    <a href="https://www.youtube.com/@IVAIVeracruz" target="_blank" rel="noopener noreferrer">
                        <img src={YoutubeIcon} alt="YouTube" />
                    </a>
                    <p>ivaiveracruz</p>
                </div>


                <div className="social-group_l">
                    <a href="https://x.com/VERIVAI" target="_blank" rel="noopener noreferrer">
                        <img src={TwitterIcon} alt="Twitter" />
                    </a>
                    <a href="https://www.instagram.com/verivai" target="_blank" rel="noopener noreferrer">
                        <img src={InstagramIcon} alt="Instagram" />
                    </a>
                    <p>verivai</p>
                </div>


                <div className="social-group_l">
                    <a href="mailto:contacto@verivai.org.mx">
                        <img src={MailIcon} alt="Correo" />
                    </a>
                    <p>contacto@verivai.org.mx</p>
                </div>


                <div className="social-group_l">
                    <a href="https://ivai.org.mx" target="_blank" rel="noopener noreferrer">
                        <img src={WebIcon} alt="Web" />
                    </a>
                    <p>ivai.org.mx</p>
                </div>
            </div>

        </section>

    </>);


}

export default Login;