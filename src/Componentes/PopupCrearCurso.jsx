import { Button, Card, CardActions, CardContent, CardHeader, Typography, Grid, TextField, Select, MenuItem, Grid2, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState, useEffect } from 'react';
import PopupMSJConfirmacion from './PopupMSJConfirmacion.jsx'
import Arrow from '../assets/arrow.svg'
import '../Principal/Principal.css'
import axios from 'axios';

function PopupCrearCurso({ onClose }) {

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

    const [DataCurso, setDataCurso] = useState({
        NombreCurso: '',
        Fecha: '',
        Hora: '',
        Imparte: '',    
        Cupo: 0,
        EstatusCupo: 0,
        EstatusCurso: '',
        Lugar: '',
        CorreoSeguimiento: 'cursos.ivai@gmail.com',
        Tipo: '',
        Curso: '',
        LigaTeams: '',
        ValorCurricular: ''
    })


    const [isLoading, setLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenConfirmation = () => {
        setIsPopupOpen(true);
    };

    const handleCloseConfirmation = () => {
        setIsPopupOpen(false);
    };
    
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setDataCurso({ ...DataCurso, [name]: value });
        };

    const handleSubmit = async () => {
        try {
            const respuesta = await axios.post("http://localhost:4567/registroCurso", DataCurso);
            console.log("Respuesta de peticion: " + respuesta);
            return respuesta;
        } catch (error) {
            throw error;
        }
    }

    return (
        <>
            <Card variant='elevation' sx={{ maxWidth: '100%', maxHeight: '100vh', backgroundColor: '#A35494', margin: 0, justifyContent: 'center', borderRadius: 5, padding: 3 }}>
                <CardHeader
                    sx={{ color: '#FFFFFF', width: '100%', marginLeft: -5 }}
                    title={
                        <Grid container justifyContent='space-between' alignItems='center'>
                            <Grid item>
                                <Grid container alignItems='center'>
                                    <img
                                        src={Arrow}
                                        alt='Web'
                                        className='IconoSalir'
                                        onClick={onClose}
                                    />
                                    <Typography variant='h6' sx={{ color: '#FFFFFF', fontSize: '100%', fontWeight: 'bold' }}>
                                        Salir
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ alignItems: 'start', marginLeft: -7 }}>
                                <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: 0, textAlign: 'center', maxWidth: 'auto', maxHeight: 'auto' }}>
                                    Agregar Curso
                                </Typography>
                            </Grid>
                            <Grid item>

                            </Grid>
                        </Grid>
                    }
                />

                <div className='ScrollRegistro'>

                    <CardContent sx={{ color: '#FFFFFF' }}>
                        <Grid container item xs={12} alignItems='center' spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='body2'>Nombre del Curso:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant='outlined' size='small' name='nombreCurso'
                                    value={DataCurso.nombreCurso}
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems='center' spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='body2'>Fecha:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant='outlined' size='small' name='fecha'
                                    value={DataCurso.fecha}
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', marginTop: 1, borderRadius: '15px',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems='center' spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='body2'>Hora:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant='outlined' size='small' name='hora'
                                    value={DataCurso.hora}
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems='center' spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='body2'>Lugar:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant='outlined' size='small' name='lugar'
                                    value={DataCurso.lugar}
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems='center' spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='body2'>Persona que Imparte el Curso:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant='outlined' size='small' name='imparte'
                                    value={DataCurso.imparte}
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems='center' spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='body2'>Lugares Disponibles:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant='outlined' size='small' name='estatusCupo'
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems='center' spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='body2'>Correo de Seguimiento:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant='outlined' placeholder='cursos.ivai@gmail.com' size='small' name='correoSeguimiento'
                                    disabled='true'
                                    value='cursos.ivai@gmail.com'
                                    onChange={handleInputChange} sx={{
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
                                    name='estatusCurso'
                                    value={DataCurso.estatusCurso}
                                    onChange={handleInputChange}
                                    sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }}
                                    defaultValue=''
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
                                    value={DataCurso.tipo}
                                    onChange={handleInputChange}
                                    sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }}
                                    defaultValue=''
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
                                    value={DataCurso.curso}
                                    onChange={handleInputChange}
                                    sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }}
                                    defaultValue=''
                                >
                                    {dataTiposCurso.map((item) => (
                                            <MenuItem value={item}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} alignItems='center' spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='body2'>Liga Teams:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant='outlined' size='small' name='ligaTeams' 
                                onChange={handleInputChange}
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
                                <Typography variant='body2'>Valor Curricular en Horas:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant='outlined' size='small' name='valorCurricular'
                                    value={DataCurso.valorCurricular}
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>
                    </CardContent>

                </div>

                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={handleSubmit} variant='contained' sx={{ width: '10vw', backgroundColor: '#E7B756', color: '#1E1E1E', marginTop: 2 }}>Guardar</Button>
                </CardActions>
            </Card>

            {isPopupOpen && (
                <div className='popup-confirmation'>
                    <PopupMSJConfirmacion onClose={handleCloseConfirmation} />
                </div>
            )}

        </>
    )
}

export default PopupCrearCurso;