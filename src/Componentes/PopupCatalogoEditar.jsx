import { useState, useEffect } from "react";
import { CardHeader, Grid, Typography, CardContent, TextField, CardActionArea, Button, Select, MenuItem } from "@mui/material";
import X from '../assets/cerrar.svg'

function PopupCatalogoEditar({ onClose }) {
    const [dataTipoCurso, setDataTipoCurso] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState('');
    const [textFieldValue, setTextFieldValue] = useState('');

    const getTiposCurso = async () => {
        try {
            const response = await fetch('http://localhost:4567/tipos');
            const data = await response.json();
            setDataTipoCurso(data); 
        } catch (error) {
            console.error('Error al obtener los tipos de curso:', error);
        }
    };

    useEffect(() => {
        getTiposCurso();
    }, []);

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedCurso(selectedValue);
        setTextFieldValue(selectedValue); // Solo sincronizamos cuando cambia el Select
    };

    const handleTextFieldChange = (e) => {
        setTextFieldcValue(e.target.value);
    };

    return (
        <>
            <div className='layout_agregar_curso'>
                <header className="header_agregar_curso">
                    <CardHeader
                        sx={{ color: '#FFFFFF', width: '100%', marginLeft: -5 }}
                        title={
                            <Grid container justifyContent='space-between' alignItems='center'>
                                <Grid item></Grid>
                                <Grid item></Grid>
                                <Grid item sx={{ alignItems: 'start', marginLeft: -20 }}>
                                    <Typography variant='h4' sx={{ color: '#FFFFFF', fontWeight: 'bold', marginBottom: 0, textAlign: 'center', maxWidth: 'auto', maxHeight: 'auto' }}>
                                        Editar Tipo de Curso
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <img
                                        src={X}
                                        alt="Web"
                                        className='IconoSalir'
                                        onClick={onClose}
                                    />
                                </Grid>
                            </Grid>
                        }
                    />
                </header>
                <main className="main_agregar_tipo_curso">
                    <div>
                        <CardContent sx={{ color: '#FFFFFF' }}>
                            <Grid container item xs={12} alignItems='center' spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant='body2' sx={{ color: '#FFFFFF', fontSize: '100%', fontSize: '2vh', fontWeight: 'bold' }}>Curso:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Select
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        name='curso'
                                        value={selectedCurso}
                                        onChange={handleSelectChange}
                                        sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px', marginTop: 1,
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }}
                                    >
                                        {dataTipoCurso.map((item, index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} alignItems='center' marginTop={'12px'} spacing={2}>
                                <Grid item xs={6}>
                                    <Typography variant='body2' sx={{ color: '#FFFFFF', fontSize: '100%', fontSize: '2vh', fontWeight: 'bold' }}>Nombre del Tipo de Curso:</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        variant='outlined'
                                        size='small'
                                        name='nombreCurso'
                                        
                                        onChange={handleTextFieldChange}
                                        sx={{
                                            backgroundColor: '#FFFFFF', borderRadius: '15px',
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: '15px',
                                            }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActionArea sx={{ textAlign: 'center' }}>
                            <Button variant="contained" sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", fontSize: '2vh', margin: '2vw', width: '10vw' }}>Agregar</Button>
                        </CardActionArea>
                    </div>
                </main>
            </div>
        </>
    )
}

export default PopupCatalogoEditar;
