import { Button, Card, CardActions, CardContent, CardHeader, Typography, Grid, TextField, Select, MenuItem, Grid2, styled } from '@mui/material';
import { useState, useEffect } from 'react';
import PopupMSJBien from './PopupMSJBien.jsx'
import Arrow from '../assets/arrow.svg'
import '../Principal/Principal.css'
import Axios from 'axios';
import ConfirmIcon from '../assets/check.svg';

function PopupModificarCurso({ onClose, nombreCurso, fecha, hora, modalidad, direccion, imparte, estatusCupo, estatusCurso, tipoCurso, curso, valorCurricular, ligaTeams, reloadCursos }) {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [dataTiposCurso, setDataTiposCurso] = useState([])

    const getTiposCurso = async () => {
        try {
            const response = await fetch('http://localhost:4567/tipos');
            const data = await response.json();
            setDataTiposCurso(data);
        } catch (error) {
            console.error('Error al obtener los tipos de curso:', error);
        }
    };

    useEffect(() => {
        const fetchTiposCurso = async () => {
            const tipos = await getTiposCurso();
            setItems(tipos);
        };

        fetchTiposCurso();
    }, []);

    const handleOpenConfirmation = () => {
        setIsPopupOpen(true);
    };

    const [formData, setFormData] = useState({
        nombreCurso: nombreCurso,
        fecha: fecha,
        hora: hora,
        imparte: imparte,
        estatusCupo: estatusCupo,
        estatusCurso: estatusCurso,
        modalidad: modalidad,
        direccion: direccion,
        correoSeguimiento: 'cursos.ivai@gmail.com',
        tipo: tipoCurso,
        curso: curso,
        ligaTeams: ligaTeams,
        valorCurricular: valorCurricular,
        idCurso: window.localStorage.getItem('id')
    });


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'modalidad') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async () => {
        let finalFormData = { ...formData };

        if (formData.modalidad === 'Presencial') {
            finalFormData.ligaTeams = '';
        } else if (formData.modalidad === 'Virtual') {
            finalFormData.direccion = '';
        }

        try {
            console.log("Datos a enviar:", finalFormData);
            const response = await Axios.put('http://localhost:4567/actualizar', finalFormData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response.data);
            setIsPopupOpen(true);
        } catch (error) {
            console.error("Error al actualizar el curso", error);
        }
    };

    const handleClose = () => {
        setIsPopupOpen(false);
        reloadCursos();
        onClose();
    };

    return (
        <>
            <div className='layout_Modificar_Curso'>

                <header className="header_Modificar_Curso">
                    <CardHeader
                        title={
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Grid item>
                                    <Grid container alignItems="center" >
                                        <img
                                            src={Arrow}
                                            alt="Web"
                                            className='IconoSalir'
                                            onClick={onClose}

                                        />
                                        <Typography variant="h6" sx={{ color: '#FFFFFF', fontSize: '100%', fontSize: '3vh', fontWeight: 'bold' }}>
                                            Salir
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item sx={{ alignItems: 'start' }}>
                                    <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: '4vh', marginBottom: 0, textAlign: 'center', maxWidth: 'auto', maxHeight: 'auto', paddingRight: '3vw' }}>
                                        Modificar Curso
                                    </Typography>
                                </Grid>
                                <Grid item>

                                </Grid>
                            </Grid>
                        }
                    />

                </header>

                <main className="main_Modificar_Curso">



                    <div className='ScrollRegistro2'>

                        <CardContent sx={{ color: '#FFFFFF' }}>
                            <Grid container item xs={12} alignItems="center" spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%', fontSize: '2vh', fontWeight: 'bold' }}>Nombre del Curso:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        size="small"
                                        name="nombreCurso"
                                        value={formData.nombreCurso}
                                        onChange={handleChange}
                                        sx={{
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '15px',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} alignItems="center" spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%', fontSize: '2vh', fontWeight: 'bold' }}>Fecha:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth variant="outlined" size="small"
                                        name="fecha"
                                        value={formData.fecha}
                                        onChange={handleChange} sx={{
                                            backgroundColor: '#FFFFFF', marginTop: 1, borderRadius: '15px',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }} />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} alignItems="center" spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%', fontSize: '2vh', fontWeight: 'bold' }}>Hora:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth variant="outlined" size="small"
                                        name="hora"
                                        value={formData.hora}
                                        onChange={handleChange}
                                        sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }} />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} alignItems='center' spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant='body2'>Modalidad:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Select
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        name='modalidad'
                                        value={formData.modalidad}
                                        onChange={handleChange}
                                        sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }}
                                        defaultValue='modalidad'
                                    >
                                        <MenuItem value='Presencial'>Presencial</MenuItem>
                                        <MenuItem value='Virtual'>Virtual</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>

                            {formData.modalidad === 'Presencial' && (
                                <Grid container item xs={12} alignItems="center" spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">Dirección:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth variant='outlined' size='small' value={formData.direccion} name='direccion'
                                            onChange={handleChange} sx={{
                                                backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '15px',
                                                }
                                            }} />
                                    </Grid>
                                </Grid>
                            )}

                            {formData.modalidad === 'Virtual' && (
                                <Grid container item xs={12} alignItems="center" spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="body2">Liga Teams:</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth variant='outlined' size='small' value={formData.ligaTeams} name='ligaTeams'
                                            onChange={handleChange} sx={{
                                                backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '15px',
                                                }
                                            }} />
                                    </Grid>
                                </Grid>
                            )}

                            <Grid container item xs={12} alignItems="center" spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%', fontSize: '2vh', fontWeight: 'bold' }}>Persona que Imparte el Curso:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth variant="outlined" size="small" name="imparte"
                                        value={formData.imparte}
                                        onChange={handleChange} sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }} />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} alignItems="center" spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%', fontSize: '2vh', fontWeight: 'bold' }}>Lugares Disponibles:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth variant="outlined" size="small"
                                        name="estatusCupo"
                                        value={formData.estatusCupo}
                                        onChange={handleChange} sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }} />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} alignItems="center" spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%', fontSize: '2vh', fontWeight: 'bold' }}>Correo de Seguimiento:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth variant="outlined" placeholder='cursos.ivai@gmail.com' disabled={true} size="small"
                                        name="correoSeguimiento"
                                        value={formData.correoSeguimiento}
                                        onChange={handleChange} sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }} />
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} alignItems='center' spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant='body2'>Estatus Curso:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Select
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        name="estatusCurso"
                                        value={formData.estatusCurso}
                                        onChange={handleChange}
                                        sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }}
                                        defaultValue='estatusCurso'
                                    >
                                        <MenuItem value='Activo'>Activo</MenuItem>
                                        <MenuItem value='Finalizado'>Finalizado</MenuItem>
                                        <MenuItem value='Cancelado'>Cancelado</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} alignItems='center' spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant='body2'>Tipo Curso:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Select
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        name='tipo'
                                        value={formData.tipo}
                                        onChange={handleChange}
                                        sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }}
                                        defaultValue='tipoCurso'
                                    >
                                        <MenuItem value='Conferencia'>Conferencia</MenuItem>
                                        <MenuItem value='Cursos'>Curso</MenuItem>
                                        <MenuItem value='Foro'>Foro</MenuItem>
                                        <MenuItem value='Jornada'>Jornada</MenuItem>
                                        <MenuItem value='Taller'>Taller</MenuItem>
                                        <MenuItem value='Segundo Trimestre 2017'>Segundo Trimestre 2017</MenuItem>
                                        <MenuItem value='Otro'>Otro</MenuItem>
                                    </Select>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} alignItems='center' spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant='body2'>Curso:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Select
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        name='curso'
                                        value={formData.curso}
                                        onChange={handleChange}
                                        sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }}
                                        defaultValue='curso'
                                    >
                                        {dataTiposCurso.map((item) => (
                                            <MenuItem value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} alignItems="center" spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%', fontSize: '2vh', fontWeight: 'bold' }}>Valor Curricular en Horas:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth variant="outlined" size="small"
                                        name="valorCurricular"
                                        value={formData.valorCurricular}
                                        onChange={handleChange} sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }} />
                                </Grid>
                            </Grid>
                        </CardContent>

                    </div>

                </main>

                <footer className="footer_Modificar_Curso">

                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button onClick={handleSubmit} variant="contained" sx={{ width: '10vw', backgroundColor: '#E7B756', color: "#1E1E1E", marginTop: 2 }}>Guardar</Button>
                    </CardActions>
                </footer>

            </div>

            {isPopupOpen && (
                <div className="popup-overlay-confirmation">
                    <div className={`popup-confirmation ${isPopupOpen ? 'popup-show' : 'popup-hide'}`}>
                        <PopupMSJBien
                            icon={ConfirmIcon}
                            title="Modificación exitosa"
                            message="¡El curso ha sido modificado exitosamente!"
                            buttonText="Cerrar"
                            onClose={handleClose}
                            reloadCursos={reloadCursos} 
                        />
                    </div>
                </div>
            )}

        </>
    )
}

export default PopupModificarCurso;