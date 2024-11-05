import { useState, useEffect } from "react";
import { CardHeader, Grid, Typography, CardContent, TextField, CardActionArea, Button, Select, MenuItem } from "@mui/material";
import X from '../assets/cerrar.svg'
import axios from "axios";

function PopupCatalogoEditar({ onClose, onUpdateSuccess }) {
    const [dataTipoCurso, setDataTipoCurso] = useState([]);
    const [selectedCurso, setSelectedCurso] = useState('');
    const [textFieldValue, setTextFieldValue] = useState('');

    const getTiposCurso = async () => {
        try {
            const response = await axios.get('http://localhost:4567/obtenerTipoCurso');
            setDataTipoCurso(response.data);
        } catch (error) {
            console.error('Error al obtener los tipos de curso:', error);
        }
    };

    useEffect(() => {
        getTiposCurso();
    }, []);

    const handleSelectChange = (e) => {
        setSelectedCurso(e.target.value); // Esto guardará solo el id del curso seleccionado
        setTextFieldValue('');
    };

    const handleTextFieldChange = (e) => {
        setTextFieldValue(e.target.value);
    };

    const handleUpdateCurso = async () => {
        if (!selectedCurso || !textFieldValue) {
            console.error('Seleccione un curso y complete el nombre del tipo.');
            return;
        }
    
        try {
            const response = await axios.put('http://localhost:4567/actualizarTipoCurso', {
                id: selectedCurso,  // selectedCurso ahora es solo el id
                tipo: textFieldValue 
            });
            onUpdateSuccess()
            console.log(response.data.mensaje); 
        } catch (error) {
            console.error('Error al actualizar el tipo de curso:', error);
        }
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
                                        {dataTipoCurso.map((item) => (
                                            <MenuItem key={item.id} value={item.id}>{item.tipo}</MenuItem> // Aquí usamos item.id como value y mostramos item.tipo
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
                            <Button variant="contained" onClick={handleUpdateCurso} sx={{ backgroundColor: '#E7B756', color: "#1E1E1E", fontSize: '2vh', margin: '2vw', width: '10vw' }}>Actualizar</Button>
                        </CardActionArea>
                    </div>
                </main>
            </div>
        </>
    )
}

export default PopupCatalogoEditar;
