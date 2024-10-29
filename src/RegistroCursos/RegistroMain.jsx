import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import AgregarCurso from '../assets/add.svg';
import ModificarCurso from '../assets/update.svg';
import CatalogoIcon from '../assets/catalogo.svg';
import '../Estilos/RegistroMain.css';
import SelectCurso from '../Componentes/SelectCurso.jsx';
import CrearCurso from '../Componentes/PopupCrearCurso.jsx';
import CatalogoCurso from '../Componentes/CatalogoCursos.jsx'


function RegistroMain() {
  const [isPopupUpdateOpen, setIsPopupUpdateOpen] = useState(false);
  const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);

  const navigate = useNavigate();

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

  const handleNavigationCatalog = () => {
    navigate('/CatalogoCursos');
  }

  return (
    <>
      <Card onClick={handleOpenAddPopup} variant="outlined" sx={{ width: '20vw', height: '40vh', minHeight: '1vh', maxHeight: '30vh', borderColor: '#a35494', borderWidth: '.5vh', borderRadius: 3, display: 'inline-flex', marginLeft: 5, cursor: 'pointer' }}>
        <CardContent sx={{ textAlign: 'center', width: '100%' }}>
          <img src={AgregarCurso} className="IconoCard" />
          <Typography variant="h3" sx={{ color: '#A35494', fontSize: "5vh" }}> Agregar </Typography>
          <Typography variant='h3' sx={{ color: '#A35494', fontSize: "5vh" }}>Curso</Typography>
        </CardContent>
      </Card>

      <Card onClick={handleOpenUpdatePopup} variant="outlined" sx={{ width: '20vw', height: '40vh', minHeight: '1vh', maxHeight: '30vh', minWidth: '10vw', borderColor: '#a35494', borderWidth: '.5vh', borderRadius: 3, display: 'inline-flex', marginLeft: 5, cursor: 'pointer' }}>
        <CardContent sx={{ textAlign: 'center', width: '100%' }}>
          <img src={ModificarCurso} className="IconoCard" />
          <Typography variant='h3' sx={{ color: '#A35494', fontSize: "5vh" }}>Modificar</Typography>
          <Typography variant='h3' sx={{ color: '#A35494', fontSize: "5vh" }}>Curso</Typography>
        </CardContent>
      </Card>

      <Card onClick={handleNavigationCatalog} variant="outlined" sx={{ width: '20vw', height: '40vh', minHeight: '1vh', maxHeight: '30vh', minWidth: '10vw', borderColor: '#a35494', borderWidth: '.5vh', borderRadius: 3, display: 'inline-flex', marginLeft: 5, cursor: 'pointer' }}>
        <CardContent sx={{ textAlign: 'center', width: '100%' }}>
          <img src={CatalogoIcon} className="IconoCard" />
          <Typography variant='h3' sx={{ color: '#A35494', fontSize: "5vh" }}>Modificar</Typography>
          <Typography variant='h3' sx={{ color: '#A35494', fontSize: "5vh" }}>Curso</Typography>
        </CardContent>
      </Card>

      {isPopupAddOpen && (
        <div className="popup-overlay" >
          <div className={`popup-content ${isPopupAddOpen ? 'popup-show' : 'popup-hide'}`}>
            <CrearCurso onClose={handleCloseAddPopup} />
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