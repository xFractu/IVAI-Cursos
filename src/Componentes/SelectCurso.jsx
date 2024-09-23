import React, { useState } from 'react';
import '../Estilos/SelectCursos.css';
import { Button, } from "@mui/material";
import CardModificar from '../Componentes/CardModificar';
function SelectCurso({ onClose }) {
    return (
        <>

        <div className='layout_Select'>

        <header className="header_Select">
            <h1>Seleccione el curso a modificar:</h1>
        </header>

        <main className="main_Select">
        <CardModificar NombreCurso="Capacitación: “Archivos: Datos personales y Acceso a la informacion: un vínculo normativo” ---> 24/09/2024" FechaCurso="19/09/2024" LugarCurso="Virtual" ExpositorCurso="Dirección de Archivos" HoraCurso="11:00" TextoBoton="Modificar" />
        <CardModificar NombreCurso="Capacitación: “Archivos: Datos personales y Acceso a la informacion: un vínculo normativo” ---> 24/09/2024" FechaCurso="19/09/2024" LugarCurso="Virtual" ExpositorCurso="Dirección de Archivos" HoraCurso="11:00" TextoBoton="Modificar" />
        <CardModificar NombreCurso="Capacitación: “Archivos: Datos personales y Acceso a la informacion: un vínculo normativo” ---> 24/09/2024" FechaCurso="19/09/2024" LugarCurso="Virtual" ExpositorCurso="Dirección de Archivos" HoraCurso="11:00" TextoBoton="Modificar" />
        </main>

        <footer className="footer_Select">
        <Button variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E",marginTop:-2, marginLeft:3, marginBottom:3 }} onClick={onClose}>Cancelar</Button>
        </footer>

        </div>
            
        </>
    )
}
export default SelectCurso;