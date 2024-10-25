import { Card, CardContent, Typography } from "@mui/material";
import AgregarCurso from '../assets/add.svg';
import ModificarCurso from '../assets/update.svg';
import '../Estilos/RegistroMain.css';
import { useState } from "react";
import SelectCurso from "../Componentes/SelectCurso.jsx";
import CrearCurso from '../Componentes/PopupCrearCurso.jsx';
import PopupMSJBien from '../Componentes/PopupMSJBien.jsx'
import ConfirmIcon from '../assets/check.svg';
import ErrorIcon from '../assets/error.svg';


function RegistroMain() {
  const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
  const [isPopupOpenAddMsj, setIsPopupOpenAddMsj] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const [isError, setIsError] = useState(false);
  const [dataError, setDataError] = useState({
    titulo: '',
    mensaje: '',
    });


    const handleOpenPopupAddMsj  = (errorData, errorStatus) => {
      setDataError(errorData);
      setIsError(errorStatus);
      setIsPopupOpenAddMsj(true);
      document.body.style.overflow = "hidden";
      setScrollEnabled(false);
  };

  const handleClosePopupAddMsj = () => {
      const popup = document.querySelector('.popup-content-msj');
      if (popup) {
          popup.classList.remove('popup-show');
          popup.classList.add('popup-hide');
          setTimeout(() => {
              setIsPopupOpenAddMsj(false);
              Props.reloadCursos()
              document.body.style.overflow = "auto";
              setScrollEnabled(true);
          }, 300); // Duración de la animación de salida
      }
  };


  const [isPopupUpdateOpen, setIsPopupUpdateOpen] = useState(false);





    const handleOpenAddPopup = () => {
      setIsPopupAddOpen(true);
      document.body.style.overflow = "hidden";
      setScrollEnabled(false);
  };

  const handleCloseAddPopup = () => {
      const popup = document.querySelector('.popup-content');
      if (popup) {
          popup.classList.remove('popup-show');
          popup.classList.add('popup-hide');
          setTimeout(() => {
            setIsPopupAddOpen(false);
              document.body.style.overflow = "auto";
              setScrollEnabled(true);
          }, 300); // Duración de la animación de salida
      }
  };




    const handleOpenUpdatePopup = () => {
      setIsPopupUpdateOpen(true);
      document.body.style.overflow = "hidden";
      setScrollEnabled(false);
  };

  const handleCloseUpdatePopup = () => {
      const popup = document.querySelector('.popup-content');
      if (popup) {
          popup.classList.remove('popup-show');
          popup.classList.add('popup-hide');
          setTimeout(() => {
            setIsPopupUpdateOpen(false);
              document.body.style.overflow = "auto";
              setScrollEnabled(true);
          }, 300); // Duración de la animación de salida
      }
  };





  
    return (
      <>
            <Card onClick={handleOpenAddPopup} variant="outlined" sx={{ width:'20vw',height:'40vh',minHeight:'1vh',maxHeight:'30vh', borderColor:'#a35494', borderWidth:'.5vh', borderRadius:3, display:'inline-flex', marginLeft:5, cursor:'pointer' }}>
                <CardContent sx={{ textAlign:'center', width:'100%'}}>
                    <img src={AgregarCurso} className="IconoCard"/>
                    <Typography variant="h3" sx={{ color:'#A35494', fontSize:"5vh" }}> Agregar </Typography>
                    <Typography variant='h3' sx={{ color:'#A35494', fontSize:"5vh" }}>Curso</Typography>
                </CardContent>
            </Card>
  
        
            <Card onClick={handleOpenUpdatePopup} variant="outlined" sx={{ width:'20vw',height:'40vh',minHeight:'1vh',maxHeight:'30vh',minWidth:'10vw', borderColor:'#a35494', borderWidth:'.5vh', borderRadius: 3, display:'inline-flex',marginLeft:5, cursor: 'pointer'}}>
                <CardContent sx={{ textAlign:'center', width:'100%' }}> 
                    <img src={ModificarCurso} className="IconoCard"/>
                    <Typography variant='h3' sx={{ color:'#A35494', fontSize:"5vh" }}>Modificar</Typography>
                    <Typography variant='h3' sx={{ color:'#A35494', fontSize:"5vh" }}>Curso</Typography>
                </CardContent>
            </Card>
      

      
        {isPopupAddOpen && (
          <div className="popup-overlay" >
              <div className={`popup-content ${isPopupAddOpen ? 'popup-show' : 'popup-hide'}`}>
              <CrearCurso 
                  onClose={handleCloseAddPopup}
                  onOpenPopupMsj={(errorData, errorStatus) => handleOpenPopupAddMsj(errorData, errorStatus)}

              /> 
            </div>
          </div>
        )}

        {isPopupOpenAddMsj && (
                        <div className="popup-overlay">
                            <div className={`popup-content-msj ${isPopupOpenAddMsj ? 'popup-show' : 'popup-hide'}`}>
                            {isError ? (
                            <PopupMSJBien
                                icon={ErrorIcon}
                                title={dataError.titulo}
                                message={dataError.mensaje}
                                buttonText="Cerrar"
                                onClose={handleClosePopupAddMsj}
                            />
                        ) : (
                            <PopupMSJBien
                                icon={ConfirmIcon}
                                title="Registro Exitoso"
                                message="El proceso se ha realizado correctamente. Le hemos enviado un correo electrónico con el enlace de acceso, favor de verificar todas las bandejas del correo electrónico."
                                buttonText="Cerrar"
                                onClose={handleClosePopupAddMsj}
                                onClosePrev={handleCloseAddPopup}
                            />
                        )}
                            </div>
                        </div>
                    )}




            {isPopupUpdateOpen && (
                <div className="popup-overlay" >
                     <div className={`popup-content ${isPopupUpdateOpen ? 'popup-show' : 'popup-hide'}`}>
                     <SelectCurso onClose={handleCloseUpdatePopup} /> 
                    </div>
                </div>
            )}


      </>
    );
  }
  
  export default RegistroMain;