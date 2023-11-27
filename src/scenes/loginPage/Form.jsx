import { useState } from "react";
import {
    Box,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
    Button
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    nametag: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string(),
    times: yup.string(),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    nametag: "",
    email: "",
    password: "",
    location: "",
    times: "",
    picture: "",
};

const initialValuesLogin = {
    email: "",
    password: "",
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values, onSubmitProps) => {
        // Mandar indormación de formulario con imagen
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value])
        }
        formData.append("picturePath", values.picture.name);
        

        const savedUserResponse = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if (savedUser) {
            setPageType("login");
        }
    };

    const login = async(values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type" : "application/json"},
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/home");
        }
    }

    const handleFormSubmit = async(values, onSubmitProps) => {
        if (isLogin) await login(values, onSubmitProps);
        if (isRegister) {
            await register(values, onSubmitProps);
            
        }
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                        sx={{
                            "& > div" : { gridColumn: isNonMobile ? undefined : "span 4"},
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField 
                                    label = "Nombre"
                                    defaultValue = ""
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.nametag}
                                    name="nametag"
                                    error={Boolean(touched.nametag) && Boolean(errors.nametag)}
                                    helperText={touched.nametag && errors.nametag}
                                    sx={{ gridColumn: "span 2"}}
                                />
                                <TextField 
                                    label = "Ubicación"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={Boolean(touched.location) && Boolean(errors.location)}
                                    helperText={touched.location && errors.location}
                                    sx={{ gridColumn: "span 2"}}
                                />
                                <TextField 
                                    label = "Horarios (opcional)"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.times}
                                    name="times"
                                    error={Boolean(touched.times) && Boolean(errors.times)}
                                    helperText={touched.times && errors.times}
                                    sx={{ gridColumn: "span 4"}}
                                />
                                <Box
                                    gridColumn="span 4"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png"
                                        multiple={false}
                                        onDrop={(acceptedFiles) => 
                                            setFieldValue("picture" , acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) =>(
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{ "&:hover": { cursor: "pointer" }}}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Añade una imagen aquí</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>{values.picture.name}</Typography> {/* CHECK THIS NAME */}
                                                        <ModeEditOutlineIcon />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>

                                </Box>
                            </>
                        )}
                        <TextField 
                            label = "Correo Electrónico"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 2"}}
                        />
                        <TextField 
                            label = "Contraseña"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 2"}}
                        />
                    </Box>

                    {/* BUTTONS */}
                    <Box>
                        <Button 
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem 0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                },
                            }}
                        >
                            {isLogin ? "No tienes cuenta? Registrate aquí." : "Ya tienes cuenta? Inicia sesión."}
                        </Typography>
                    </Box>
                </form>
            )}

        </Formik>
    )
}

export default Form;