import { Button, Card, CardActions, CardContent, CardHeader, Typography, Grid, TextField, Select, MenuItem, Grid2, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import PopupMSJConfirmacion from './PopupMSJConfirmacion.jsx'
import Arrow from '../assets/arrow.svg'
import '../Principal/Principal.css'
import { Label } from '@mui/icons-material';
import axios from 'axios';

function PopupCrearCurso({ onClose }) {

    const [cursoData, setCursoData] = useState({
        nombreCurso: '',
        fecha: '',
        hora: '',
        lugar: '',
        personaImparte: '',
        lugaresDisponibles: '',
        correoSeguimiento: '',
        estatusCurso: '',
        ligaTeams: '',
        valorCurricular: ''
    });

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenConfirmation = () => {
        setIsPopupOpen(true);
    };

    const handleCloseConfirmation = () => {
        setIsPopupOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCursoData({ ...cursoData, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/registroCurso', cursoData, {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
                console.log('Curso registrado exitosamente:', response.data);
                handleOpenConfirmation();
            } else {
                alert("Error al registrar el curso");
            }
        } catch (error) {
            console.error('Error registrando curso:', error);
        }
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <>
            <Card variant="elevation" sx={{ maxWidth: '100%', maxHeight: '100vh', backgroundColor: '#A35494', margin: 0, justifyContent: 'center', borderRadius: 5, padding: 3 }}>
                <CardHeader
                    sx={{ color: '#FFFFFF', width: '100%', marginLeft: -5 }}
                    title={
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Grid container alignItems="center">
                                    <img
                                        src={Arrow}
                                        alt="Web"
                                        className='IconoSalir'
                                        onClick={onClose}
                                    />
                                    <Typography variant="h6" sx={{ color: '#FFFFFF', fontSize: '100%', fontWeight: 'bold' }}>
                                        Salir
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ alignItems: 'start', marginLeft: -7 }}>
                                <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: 0, textAlign: 'center', maxWidth: 'auto', maxHeight: 'auto' }}>
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
                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Nombre del Curso:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant='outlined' size="small" name="nombreCurso"
                                    value={cursoData.nombreCurso}
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Fecha:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant="outlined" size="small" name="fecha"
                                    value={cursoData.fecha}
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', marginTop: 1, borderRadius: '15px',
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Hora:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant="outlined" size="small" name="hora"
                                    value={cursoData.hora}
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Lugar:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant="outlined" size="small" name="lugar"
                                    value={cursoData.lugar}
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Persona que Imparte el Curso:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant="outlined" size="small" name="imparte"
                                    value={cursoData.imparte}
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Lugares Disponibles:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant="outlined" size="small" name="estatusCupo"
                                    value={cursoData.estatusCupo}
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Correo de Seguimiento:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant="outlined" placeholder='cursos.ivai@gmail.com' size="small" name="correoSeguimiento"
                                    value={cursoData.correoSeguimiento}
                                    onChange={handleInputChange} sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Estatus Curso:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    name="estatusCurso"
                                    value={cursoData.estatusCurso}
                                    onChange={handleInputChange}
                                    sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }}
                                    defaultValue=""
                                >
                                    <MenuItem value="Aula 1">Aula 1</MenuItem>
                                    <MenuItem value="Aula 2">Aula 2</MenuItem>
                                    <MenuItem value="Sala de conferencias">Sala de conferencias</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Anexar Programa</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Button
                                    style={{ backgroundColor: '#FFFFFF', color: '#1E1E1E', width: '15vw', marginTop: '1vh', borderRadius: '15px' }}
                                    component="label"
                                    name="programa"
                                    value={cursoData.programa}
                                    onChange={handleInputChange}
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}>
                                    Seleccionar Archivo
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={(event) => console.log(event.target.files)}
                                        multiple
                                    />
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Tipo Curso:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    name="tipo"
                                    value={cursoData.tipo}
                                    onChange={handleInputChange}
                                    sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }}
                                    defaultValue=""
                                >
                                    <MenuItem value="Aula 1">Aula 1</MenuItem>
                                    <MenuItem value="Aula 2">Aula 2</MenuItem>
                                    <MenuItem value="Sala de conferencias">Sala de conferencias</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Curso:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    name="curso"
                                    value={cursoData.curso}
                                    onChange={handleInputChange}
                                    sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }}
                                    defaultValue=""
                                >
                                    <MenuItem value="Aula 1">Aula 1</MenuItem>
                                    <MenuItem value="Aula 2">Aula 2</MenuItem>
                                    <MenuItem value="Sala de conferencias">Sala de conferencias</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Liga Teams:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant="outlined" size="small" sx={{
                                    backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                    }
                                }} />
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Valor Curricular en Horas:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant="outlined" size="small" name="valorCurricular"
                                    value={cursoData.valorCurricular}
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
                    <Button onClick={handleSubmit} variant="contained" sx={{ width: '10vw', backgroundColor: '#E7B756', color: "#1E1E1E", marginTop: 2 }}>Guardar</Button>
                </CardActions>
            </Card>

            {isPopupOpen && (
                <div className="popup-confirmation">
                    <PopupMSJConfirmacion onClose={handleCloseConfirmation} />
                </div>
            )}

        </>
    )
}

export default PopupCrearCurso;