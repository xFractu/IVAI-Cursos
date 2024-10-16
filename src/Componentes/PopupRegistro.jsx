import { Button, Card, CardActions, CardContent, CardHeader, Typography, IconButton, Grid, TextField, Select, MenuItem, ToggleButton, ToggleButtonGroup, Switch, Stack, Grid2 } from '@mui/material';
import { useState, useEffect } from 'react';
import PopupMSJBien from './PopupMSJBien.jsx'
import Arrow from '../assets/arrow.svg'
import '../Principal/Principal.css'
import '../Estilos/PopupRegistroCurso.css'
import axios from 'axios';
import ConfirmIcon from '../assets/check.svg';

function PopupRegistro({ onClose }) {

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [errors, setErrors] = useState({});

    const [isError, setIsError] = useState(false);

    const [dataRegistro, setDataRegistro] = useState({
        nombre: '',
        apellidos: '',
        gradoDeEstudios: '',
        lugarDeProcedencia: '',
        orden: '',
        genero: '',
        estado: '',
        so: '',
        areaAdquisicion: '',
        cargoPublico: '',
        recibirInformacion: false,
        correo: '',
        telefono: '',
        interprete: false,
        idCurso: window.localStorage.getItem('id')
    })

    const validateFields = () => {
        const newErrors = {};

        if (!dataRegistro.nombre) newErrors.nombre = "El nombre es obligatorio.";
        if (!dataRegistro.apellidos) newErrors.apellidos = "Los apellidos son obligatorios.";
        if (!dataRegistro.correo) {
            newErrors.correo = "El correo electrónico es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(dataRegistro.correo)) {
            newErrors.correo = "El correo no es válido.";
        }
        if (!dataRegistro.telefono) {
            newErrors.telefono = "El teléfono es obligatorio.";
        } else if (!/^\d{10}$/.test(dataRegistro.telefono)) {
            newErrors.telefono = "El teléfono debe tener 10 dígitos.";
        }

        return newErrors;
    };

    const handleRegistration = async () => {
        const validationErrors = validateFields();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4567/registrarse', dataRegistro);
            if(response.status === 200){
                console.log(dataRegistro);
                setIsError(false);
                setIsPopupOpen(true);
                return response;
            }else{
                setIsError(true);
                setIsPopupOpen(true);
            }
        } catch (error) {
            console.error('Error al registrarse', error);
            setIsError(true);
            setIsPopupOpen(true);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDataRegistro({ ...dataRegistro, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSwitchChange = (e) => {
        const { name, type, value, checked } = e.target;
        setDataRegistro({
            ...dataRegistro,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const [estados, setEstados] = useState([]);

    useEffect(() => {

        const obtenerEstados = async () => {
            try {
                const response = await axios.post('http://localhost:4567/estado');
                setEstados(response.data);
            } catch (error) {
                console.error('Error al obtener los estados:', error);
            }
        };

        obtenerEstados();
    }, []);

    const handleClose = () => {
        setIsPopupOpen(false);
        onClose();
    };

    return (
        <>
        <div className='layout_registrar_curso'>
        

            <header className="header_registrar_curso">
                <CardHeader className="card-header"
                    
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
                                    <label className='lbl-salir-header' >
                                        Salir
                                    </label>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <label className='lbl-campos-obligatorios' >
                                    Los campos marcados con <br />
                                    asterisco (*) son obligatorios
                                </label>
                            </Grid>
                        </Grid>
                    }
                />

                </header>

                <main className="main_registar_curso">
                    <div className='div-datos-personales'>
                        <label className='lbl-datos-personales'>
                            Datos Personales
                        </label>
                    </div>
                <div className='ScrollRegistro'>

                    <CardContent sx={{ color: '#FFFFFF' }}>
                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Nombre(s)*:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField required name='nombre' fullWidth variant='outlined' size="small" onChange={handleInputChange} error={!!errors.nombre} helperText={errors.nombre} sx={{
                                    backgroundColor: '#FFFFFF', borderRadius: '15px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                    }
                                }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Apellidos*:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth name='apellidos' variant="outlined" size="small" onChange={handleInputChange} error={!!errors.apellidos} helperText={errors.apellidos} sx={{
                                    backgroundColor: '#FFFFFF', marginTop: 1, borderRadius: '15px',
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                    }
                                }} />
                            </Grid>
                        </Grid>


                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Ultimo grado de estudios:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    name='gradoDeEstudios'
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onChange={handleInputChange}
                                    sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }}
                                    defaultValue=""
                                >
                                    <MenuItem value="Doctorado">Doctorado</MenuItem>
                                    <MenuItem value="Maestría">Maestría</MenuItem>
                                    <MenuItem value="Licenciatura">Licenciatura</MenuItem>
                                    <MenuItem value="Técnico Superior Universitario">Técnico Superior Universitario</MenuItem>
                                    <MenuItem value="Preparatoria">Preparatoria</MenuItem>
                                    <MenuItem value="Secundaria">Secundaria</MenuItem>
                                    <MenuItem value="Primaria">Primaria</MenuItem>
                                    <MenuItem value="Ninguno">Ninguno</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Lugar de procedencia:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField name='lugarDeProcedencia' fullWidth variant="outlined" size="small" onChange={handleInputChange} sx={{
                                    backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                    }
                                }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">orden de gobierno:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    name='orden'
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onChange={handleInputChange}
                                    sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }}
                                    defaultValue=""
                                >
                                    <MenuItem value="Federal">Federal</MenuItem>
                                    <MenuItem value="Estatal">Estatal</MenuItem>
                                    <MenuItem value="Municipal">Municipal</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Género:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    name='genero'
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onChange={handleInputChange}
                                    sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }}
                                    defaultValue=""
                                >
                                    <MenuItem value="Masculino">Masculino</MenuItem>
                                    <MenuItem value="Femenino">Femenino</MenuItem>
                                    <MenuItem value="Prefiero no decirlo">Prefiero No Decirlo</MenuItem>
                                </Select>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Estado:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Select
                                    name='estado'
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                    onChange={handleInputChange}
                                    sx={{
                                        backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px',
                                        }
                                    }}
                                >
                                    {estados.map((estado) => (
                                        <MenuItem value={estado}>{estado}</MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">nombre de la entidad o dependencia:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField name='so' fullWidth variant="outlined" size="small" onChange={handleInputChange} sx={{
                                    backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                    }
                                }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Área de adquisición:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField name='areaAdquisicion' fullWidth variant="outlined" size="small" onChange={handleInputChange} sx={{
                                    backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                    }
                                }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Cargo público que desempeña:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField name='cargoPublico' fullWidth variant="outlined" size="small" onChange={handleInputChange} sx={{
                                    backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                    }
                                }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">¿Desea recibir información de nuestros eventos?</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid item>
                                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                        <Typography>No</Typography>
                                        <Switch defaultChecked={false} name='recibirInformacion' onChange={handleSwitchChange} inputProps={{ 'aria-label': 'ant design' }} />
                                        <Typography>Sí</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Correo electrónico institucional*:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField name='correo' fullWidth variant="outlined" size="small" onChange={handleInputChange} error={!!errors.correo} helperText={errors.correo} sx={{
                                    backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                    }
                                }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">Telefono institucional*:</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField name='telefono' fullWidth variant="outlined" size="small" onChange={handleInputChange} error={!!errors.telefono} helperText={errors.telefono} sx={{
                                    backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '15px',
                                    }
                                }} />
                            </Grid>
                        </Grid>

                        <Grid container item xs={12} alignItems="center" spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="body2">¿Requiere un intérprete de lenguaje de señas mexicanas?</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid item>
                                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                        <Typography>No</Typography>
                                        <Switch defaultChecked={false} name='interprete' onChange={handleSwitchChange} inputProps={{ 'aria-label': 'ant design' }} />
                                        <Typography>Sí</Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>

                </div>
                </main>

                <footer className="footer_registrar_curso">
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={handleRegistration} variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", marginTop: 2 }}>Enviar registro</Button>
                </CardActions>
                </footer>
            </div>

            {isPopupOpen && (
                <div className="popup-overlay-confirmation">
                    <div className={`popup-confirmation ${isPopupOpen ? 'popup-show' : 'popup-hide'}`}>
                        {isError ? (
                            <PopupMSJBien   
                                icon={ConfirmIcon} 
                                title="Error en el Registro"
                                message="Ocurrió un error durante el proceso. Por favor, inténtelo de nuevo más tarde."
                                buttonText="Cerrar"
                                onClose={handleClose}
                            />
                        ) : (
                            <PopupMSJBien
                                icon={ConfirmIcon}
                                title="Registro Exitoso"
                                message="El proceso se ha realizado correctamente. Le hemos enviado un correo electrónico con el enlace de acceso, favor de verificar todas las bandejas del correo electrónico."
                                buttonText="Cerrar"
                                onClose={handleClose}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default PopupRegistro;