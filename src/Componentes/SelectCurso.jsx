import React, { useState, useEffect } from 'react';
import '../Estilos/SelectCursos.css';
import { Button, } from "@mui/material";
import CardModificar from '../Componentes/CardModificar';
function SelectCurso({ onClose }) {

    const [dataCursos, setDataCurso] = useState([]);

    useEffect(() => {
        const getCursos = async () => {
            try {
                const response = await fetch('http://localhost:4567/obtenerCursos');
                const data = await response.json();
                setDataCurso(data);
            } catch (error) {
                console.error('Error al obtener los registros de curso:', error);
            }
        };
        getCursos();
    }, []);

    return (
        <>

            <div className='layout_Select'>

                <header className="header_Select">
                    <h1>Seleccione el curso a modificar:</h1>
                </header>

                <main className="main_Select">
                    {dataCursos != null ? (  // Verifica que haya datos antes de mapear
                        dataCursos.map((curso) => (
                            <div key={curso.idCurso}>
                                <CardModificar NombreCurso={curso.nombreCurso} FechaCurso={curso.fecha} LugarCurso={curso.lugar} ExpositorCurso={curso.imparte} HoraCurso={curso.hora}></CardModificar>
                            </div>
                        ))
                    ) : (
                        <p>Cargando cursos...</p>
                    )}
                </main>

                <footer className="footer_Select">
                    <Button variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", marginTop: -2, marginLeft: 3, marginBottom: 3 }} onClick={onClose}>Cancelar</Button>
                </footer>

            </div>

        </>
    )
}
export default SelectCurso;