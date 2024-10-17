import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import '../Principal/Principal.css';
import { useNavigate } from 'react-router-dom';

function PopupMSJBien({ icon, title, message, buttonText, onClose, onAction, buttonStyle = {}, cardStyle = {}, reloadCursos }) {
    const navigate = useNavigate();

    const handleButtonClick = async (evento) => {
        evento.preventDefault();
        if (onAction) onAction();
        if (reloadCursos) reloadCursos();
        if (onClose) onClose();
    };

    return (
        <>
            <Card variant="outlined" sx={{ maxWidth: '40%', minHeight: '50%', borderRadius: 5, zIndex: 2, marginLeft: 20, ...cardStyle }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    {icon && <img src={icon} className="IconoCard" alt="Popup Icon" />}
                    <Typography variant="h4">{title}</Typography>
                    <Typography sx={{ marginTop: 3 }} variant="body2">
                        {message}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button
                        onClick={handleButtonClick}
                        sx={{ backgroundColor: '#E7B756', color: '#1E1E1E', minWidth: 150, marginBottom: 2, ...buttonStyle }}
                        variant="contained"
                    >
                        {buttonText}
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}

export default PopupMSJBien;
