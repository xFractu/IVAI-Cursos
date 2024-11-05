import React, { useState, useEffect } from 'react';
import '../Estilos/SelectCursos.css';
import { Button, } from "@mui/material";
import CardModificar from '../Componentes/CardModificar';


function SelectCurso({ onClose,handleOpenPopupUpdateCurso }) {

    
    const [cursoBuscado, setCursoBuscado] = useState('');

    const [dataCursos, setDataCurso] = useState([]);
    const reloadCursos = async () => {
        try {
            const response = await fetch('http://localhost:4567/obtenerCursos');
            const data = await response.json();
            setDataCurso(data);
        } catch (error) {
            console.error('Error al obtener los registros de curso:', error);
        }
    };

    useEffect(() => {
        reloadCursos(); 
    }, []);

    const obtenerId = (idCurso) => {
        window.localStorage.setItem('id', idCurso)
    }

    const cursosFiltrados = dataCursos.filter(curso =>
        curso.nombreCurso.toLowerCase().includes(cursoBuscado.toLowerCase()) ||
        curso.fecha.toLowerCase().includes(cursoBuscado.toLowerCase())
    );


    return (
        <>

            <div className='layout_Select'>

                <header className="header_Select">
                    <h1>Seleccione el curso a modificar:</h1>
                    <label htmlFor='campoBusqueda' className='textoBusqueda'><strong>Buscar Curso: </strong></label>
                    <input type='text' id='campoBusqueda' className='cuadroBusqueda' placeholder='Ingrese el nombre o fecha del curso (Año-Mes-Día)' onChange={(e) => setCursoBuscado(e.target.value)}></input>
                </header>

                <main className="main_Select">
                {cursosFiltrados.length > 0 ? (  
                        cursosFiltrados.map((curso) => (
                            <div key={curso.idCurso} onClick={() => obtenerId(curso.idCurso)}>
                                <CardModificar 
                                    NombreCurso={curso.nombreCurso} 
                                    FechaCurso={curso.fecha} 
                                    ModalidadCurso={curso.modalidad} 
                                    DireccionCurso={curso.direccion} 
                                    ExpositorCurso={curso.imparte} 
                                    HoraCurso={curso.hora} 
                                    EstatusCupo={curso.estatusCupo} 
                                    EstatusCurso={curso.estatusCurso} 
                                    TipoCurso={curso.tipo} 
                                    Curso={curso.curso} 
                                    ValorCurricular={curso.valorCurricular} 
                                    LigaTeams={curso.ligaTeams} 
                                    IdCurso={curso.idCurso} 
                                    reloadCursos={reloadCursos} 
                                    onOpenPopupUpdateCurso={() => handleOpenPopupUpdateCurso(curso)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron cursos.</p>
                    )}
                </main>

                <footer className="footer_Select">
                    <Button variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", marginTop: -2, marginLeft: 3, marginBottom: 3, fontSize:'2vh'}} onClick={onClose}>Cancelar</Button>
                </footer>

            </div>

            

        </>
    )
}

export default SelectCurso;