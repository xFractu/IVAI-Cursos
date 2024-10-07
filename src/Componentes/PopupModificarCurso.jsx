import { Button, Card, CardActions, CardContent, CardHeader, Typography, Grid, TextField, Select, MenuItem, Grid2, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import PopupMSJConfirmacion from './PopupMSJConfirmacion.jsx'
import Arrow from '../assets/arrow.svg'
import '../Principal/Principal.css'
import { Label } from '@mui/icons-material';

function PopupModificarCurso({ onClose }) {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleOpenConfirmation = () => {
        setIsPopupOpen(true);
    };

    const handleCloseConfirmation = () => {
        const popup = document.querySelector('.popup-confirmation');
        if (popup) {
            popup.classList.remove('popup-show');
            popup.classList.add('popup-hide');
            setTimeout(() => {
                setIsPopupOpen(false);
            }, 300); 
        }
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
                                    <Typography variant="h6" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'3vh', fontWeight: 'bold' }}>
                                        Salir
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item sx={{ alignItems: 'start' }}>
                                <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold',fontSize:'4vh', marginBottom: 0, textAlign: 'center', maxWidth: 'auto', maxHeight: 'auto',paddingRight:'3vw' }}>
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
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'2vh', fontWeight: 'bold' }}>Nombre del Curso:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant='outlined' size="small" sx={{
                                    backgroundColor: '#FFFFFF', borderRadius: '15px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                    }
                                }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'2vh', fontWeight: 'bold' }}>Fecha:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant="outlined" size="small" sx={{
                                    backgroundColor: '#FFFFFF', marginTop: 1, borderRadius: '15px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                    }
                                }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'2vh', fontWeight: 'bold' }}>Hora:</Typography>
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
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'2vh', fontWeight: 'bold' }}>Lugar:</Typography>
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
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'2vh', fontWeight: 'bold' }}>Persona que Imparte el Curso:</Typography>
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
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'2vh', fontWeight: 'bold' }}>Lugares Disponibles:</Typography>
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
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'2vh', fontWeight: 'bold' }}>Correo de Seguimiento:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth variant="outlined" placeholder='cursos.ivai@gmail.com' disabled={true} size="small" sx={{
                                    backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                    }
                                }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'2vh', fontWeight: 'bold' }}>Estatus Curso:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    fullWidth
                                    variant="outlined"
                                    size="small"
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
                                    <MenuItem value="Sala de conferencias" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'2vh', fontWeight: 'bold' }}>Sala de conferencias</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'2vh', fontWeight: 'bold' }}>Tipo Curso:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    fullWidth
                                    variant="outlined"
                                    size="small"
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
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'2vh', fontWeight: 'bold' }}>Curso:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    fullWidth
                                    variant="outlined"
                                    size="small"
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
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'2vh', fontWeight: 'bold' }}>Liga Teams:</Typography>
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
                                <Typography variant="body2" sx={{ color: '#FFFFFF', fontSize: '100%',fontSize:'2vh', fontWeight: 'bold' }}>Valor Curricular en Horas:</Typography>
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
                    </CardContent>

                    </div>
                    
                </main>

                <footer className="footer_Modificar_Curso">
                    
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <Button onClick={handleOpenConfirmation} variant="contained" sx={{ width: '10vw' ,backgroundColor: '#E7B756', color: "#1E1E1E", marginTop: 2 }}>Guardar</Button>
                    </CardActions>

                </footer>

            </div>                

            {isPopupOpen && (
                <div className="popup-overlay-confirmation">
                    <div className={`popup-confirmation ${isPopupOpen ? 'popup-show' : 'popup-hide'}`}>
                        <PopupMSJConfirmacion onClose={handleCloseConfirmation} />
                    </div>
                </div>
            )}

        </>
    )
}

export default PopupModificarCurso;