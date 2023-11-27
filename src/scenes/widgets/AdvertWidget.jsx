import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper>
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight={"500"}>
                    Proximos Eventos
                </Typography>
                <Typography color={medium}>Sede Bogotá</Typography>
            </FlexBetween>
            <img
                width="100%"
                height="auto"
                alt="advert"
                src={`${process.env.REACT_APP_BACKEND_URL}/assets/p1.png`}
                style={{ borderRadius: "0.75rem", margin: "0.75rem 0"}}
            />
            <FlexBetween>
                <Typography color={main}>
                    Festival de Actividad Física
                </Typography>
                <Typography color={medium}>
                    Miércoles - 6 a 8 pm
                </Typography>
            </FlexBetween>
            <Typography color={medium} m="0.5rem 0">
                HOLA!, TE INVITAMOS A PARTICIPAR DEL FESTIVAL DE ACTIVIDAD FÍSICA QUE INCLUYE LA ICÓNICA CARRERA 1K Y ACTIVIDADES DE INTEGRACIÓN CON INFLABLES, CORRE, SALTA Y DIVIÉRTE.
EL FESTIVAL SE REALIZARÁ EL DÍA 17 DE NOVIEMBRE DESDE LAS 9AM HASTA LAS 7PM EN LA PLAZA CENTRAL.
            </Typography>
        </WidgetWrapper>
    )
}

export default AdvertWidget;