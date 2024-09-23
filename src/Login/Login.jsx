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




function Login() {
    const navigate = useNavigate();

    const verificarCredenciales = () => {
        navigate('/RegistroCurso');
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

                    <p>Usuario</p>
                    <input type="input" name="usuario" />

                    <p>Contraseña</p>

                    <input type="password" name="password" />

                    <button onClick={verificarCredenciales} className="btn_ingresar">INGRESAR</button>




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