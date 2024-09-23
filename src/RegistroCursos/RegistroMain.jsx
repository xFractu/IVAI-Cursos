import { Card, CardContent, Typography } from "@mui/material";
import AgregarCurso from '../assets/add.svg';
import ModificarCurso from '../assets/update.svg';
import '../Estilos/RegistroMain.css';
import { useState } from "react";
import SelectCurso from "../Componentes/SelectCurso.jsx";
import CrearCurso from '../Componentes/PopupCrearCurso.jsx';


function RegistroMain() {
    const [isPopupUpdateOpen, setIsPopupUpdateOpen] = useState(false);
    const [isPopupAddOpen, setIsPopupAddOpen] = useState(false);
  
    const handleOpenUpdatePopup = () => {
      setIsPopupUpdateOpen(true);
    };
  
    const handleCloseUpdatePopup = () => {
      setIsPopupUpdateOpen(false);
    };

    const handleOpenAddPopup = () => {
      setIsPopupAddOpen(true);
    };
  
    const handleCloseAddPopup = () => {
      setIsPopupAddOpen(false);
    };
  
    return (
      <>
            <Card onClick={handleOpenAddPopup} variant="outlined" sx={{ width:'30%', maxHeight:'70%', borderColor:'#a35494', borderWidth:4, borderRadius:3, display:'inline-flex', margin:2, cursor:'pointer' }}>
                <CardContent sx={{ textAlign:'center', width:'100%' }}>
                    <img src={AgregarCurso} className="IconoCard"/>
                    <Typography variant="h4" sx={{ color:'#A35494', fontSize:50 }}>Agregar Curso</Typography>
                </CardContent>
            </Card>
  
        
            <Card onClick={handleOpenUpdatePopup} variant="outlined" sx={{ width:'30%', maxHeight:'70%', borderColor:'#a35494', borderWidth:4, borderRadius: 3, display:'inline-flex',margin:2, cursor: 'pointer'}}>
                <CardContent sx={{ textAlign:'center', width:'100%' }}> 
                    <img src={ModificarCurso} className="IconoCard"/>
                    <Typography variant='h4' sx={{ color:'#A35494', fontSize:50 }}>Modificar Curso</Typography>
                </CardContent>
            </Card>

        {isPopupAddOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <CrearCurso onClose={handleCloseAddPopup} /> 
            </div>
          </div>
        )}

        {isPopupUpdateOpen && (
          <div className="popup-overlay">
            <div className="popup-content">
              <SelectCurso onClose={handleCloseUpdatePopup} /> 
            </div>
          </div>
        )}
      </>
    );
  }
  
  export default RegistroMain;