import { Button, Card, CardActions, CardContent, CardHeader, Typography, Grid, TextField, Select, MenuItem, Grid2, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState, useEffect } from 'react';
import PopupMSJConfirmacion from './PopupMSJConfirmacion.jsx'
import Arrow from '../assets/arrow.svg'
import '../Principal/Principal.css'
import axios from 'axios';
import PopupMSJBien from './PopupMSJBien.jsx'
import ConfirmIcon from '../assets/check.svg';
import { DocumentScannerTwoTone } from '@mui/icons-material';

function PopupCrearCurso({ onClose }) {

    const [dataTiposCurso, setDataTiposCurso] = useState([])
    const [validationErrors, setValidationErrors] = useState({});

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
        nombreCurso: '',
        fecha: '',
        Hora: '',
        imparte: '',
        Cupo: 0,
        estatusCupo: 0,
        estatusCurso: '',
        modalidad: '',
        direccion: '',
        correoSeguimiento: 'cursos.ivai@gmail.com',
        tipo: '',
        curso: '',
        ligaTeams: '',
        valorCurricular: ''
    })

    const validateForm = () => {
        let errors = {};

        if (!DataCurso.nombreCurso.trim()) {
            errors.nombreCurso = 'El nombre del curso es obligatorio';
        }

        if (!DataCurso.fecha) {
            errors.fecha = 'La fecha es obligatoria';
        }

        if (!DataCurso.Hora) {
            errors.Hora = 'La hora es obligatoria';
        }

        if (!DataCurso.imparte.trim()) {
            errors.imparte = 'El nombre de la persona que imparte el curso es obligatorio';
        }

        if (DataCurso.Cupo <= 0) {
            errors.Cupo = 'El cupo debe ser mayor a 0';
        }

        if (!DataCurso.modalidad) {
            errors.modalidad = 'La modalidad es obligatoria';
        } else if (DataCurso.modalidad === 'Presencial' && !DataCurso.direccion.trim()) {
            errors.direccion = 'La dirección es obligatoria para cursos presenciales';
        } else if (DataCurso.modalidad === 'Virtual' && !DataCurso.ligaTeams.trim()) {
            errors.ligaTeams = 'La liga de Teams es obligatoria para cursos virtuales';
        }

        if (!DataCurso.tipo) {
            errors.tipo = 'El tipo de curso es obligatorio';
        }

        if (!DataCurso.estatusCurso) {
            errors.tipo = 'El estatus del curso es obligatorio';
        }

        if (!DataCurso.curso) {
            errors.curso = 'Debe seleccionar un curso';
        }

        if (!DataCurso.valorCurricular || DataCurso.valorCurricular <= 0) {
            errors.valorCurricular = 'El valor curricular debe ser mayor a 0';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const [isLoading, setLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataCurso({ ...DataCurso, [name]: value });
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const respuesta = await axios.post("http://localhost:4567/registroCurso", DataCurso);
                console.log("Respuesta de peticion: " + respuesta);
                setIsPopupOpen(true);
                return respuesta;
            } catch (error) {
                console.error('Error al registrar el curso:', error);
            }
        } else {
            console.log('Errores en el formulario:', validationErrors);
        }
    };


    const handleClose = () => {
        setIsPopupOpen(false);
        onClose();
    };

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
                                    onChange={handleInputChange} error={!!validationErrors.nombreCurso}
                                    helperText={validationErrors.nombreCurso} sx={{
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
                                    onChange={handleInputChange} error={!!validationErrors.fecha}
                                    helperText={validationErrors.fecha} sx={{
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
                                    onChange={handleInputChange}
                                    error={!!validationErrors.Hora}
                                    helperText={validationErrors.Hora} sx={{
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
                                    value={DataCurso.modalidad}
                                    error={!!validationErrors.modalidad}
                                    helperText={validationErrors.modalidad}
                                    onChange={handleInputChange}
                                    sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }}
                                    defaultValue=''
                                >
                                    <MenuItem value='Presencial'>Presencial</MenuItem>
                                    <MenuItem value='Virtual'>Virtual</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>

                        {DataCurso.modalidad === 'Presencial' && (
                            <Grid container item xs={12} alignItems="center" spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Dirección:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth variant='outlined' size='small' name='direccion'
                                        onChange={handleInputChange} 
                                        error={!!validationErrors.direccion}
                                    helperText={validationErrors.direccion}sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }} />
                                </Grid>
                            </Grid>
                        )}

                        {DataCurso.modalidad === 'Virtual' && (
                            <Grid container item xs={12} alignItems="center" spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant="body2">Liga Teams:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth variant='outlined' size='small' name='ligaTeams'
                                        onChange={handleInputChange} 
                                        error={!!validationErrors.ligaTeams}
                                    helperText={validationErrors.ligaTeams}sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }} />
                                </Grid>
                            </Grid>
                        )}

                        <Grid container item xs={12} alignItems='center' spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant='body2'>Persona que Imparte el Curso:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant='outlined' size='small' name='imparte'
                                    value={DataCurso.imparte}
                                    onChange={handleInputChange} 
                                    error={!!validationErrors.imparte}
                                    helperText={validationErrors.imparte}sx={{
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
                                    onChange={handleInputChange} 
                                    error={!!validationErrors.estatusCupo}
                                    helperText={validationErrors.estatusCupo}sx={{
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
                                    error={!!validationErrors.estatusCurso}
                                    helperText={validationErrors.estatusCurso}
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
                <div className="popup-overlay-confirmation">
                    <div className={`popup-confirmation ${isPopupOpen ? 'popup-show' : 'popup-hide'}`}>
                        <PopupMSJBien
                            icon={ConfirmIcon}
                            title="Registro Exitoso"
                            message="El proceso se ha realizado correctamente. Le hemos enviado un correo electrónico con el enlace de acceso, favor de verificar todas las bandejas del correo electrónico."
                            buttonText="Cerrar"
                            onClose={handleClose}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default PopupCrearCurso;