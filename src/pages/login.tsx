import { NextPage } from "next";
import Link from "next/link"
import {
    Box,
    Button,
    FormControlLabel,
    Grow,
    IconButton,
    InputAdornment,
    Link as MuiLink,
    Switch
} from "@mui/material";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import classNames from "classnames";
import { TextField } from "@/presentation/components/shared";
import styles from "@/presentation/styles/pages/Login.module.scss";
import { ToggleRender } from "@/presentation/utils";
import { useCallback, useMemo, useState } from "react";

type LoginProps = {}

const Login: NextPage<LoginProps> = () => {
    const [ isPasswordVisible, setPasswordVisible ] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
        setPasswordVisible(prevState => !prevState)
    }, [])

    const {
        boxStyles,
        outerBox,
        formStyles,
        bottomForm,
        buttons
    } = useMemo(() => ({
        boxStyles: classNames(styles.box),
        outerBox: classNames(styles.outerBox),
        formStyles: classNames(styles.form),
        bottomForm: classNames(styles.bottomForm),
        buttons: classNames(styles.buttons),
    }), [])

    return (
        <div className={ outerBox }>
            <Grow in={ true }>
                <div className={ boxStyles }>
                    <header>&lt;Code Craft Club&gt;</header>

                    <Box className={ formStyles }>
                        <TextField
                            label={ "E-mail" }
                            placeholder={ "john.doe@email.com" }
                            InputProps={ {
                                startAdornment: (
                                    <InputAdornment position={ "start" }>
                                        <FiMail/>
                                    </InputAdornment>
                                )
                            } }/>
                        <TextField
                            label={ "Senha" }
                            placeholder={ "Sua_senha@ultra#!secreta123" }
                            InputProps={ {
                                startAdornment: (
                                    <InputAdornment position={ "start" }>
                                        <FiLock/>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position={ "end" }>
                                        <IconButton color={ "primary" } onClick={ togglePasswordVisibility }>
                                            { ToggleRender(!isPasswordVisible,
                                                (<FiEye color={ "white" } size={ 18 }/>),
                                                (<FiEyeOff color={ "white" } size={ 18 }/>)
                                            ) }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                type: isPasswordVisible ? "text" : "password"
                            } }/>

                        <div className={ bottomForm }>
                            <Link passHref href={ "/esqueci-minha-senha" }>
                                <MuiLink underline={ "none" }>Esqueci minha senha</MuiLink>
                            </Link>

                            <FormControlLabel
                                control={ <Switch value={ false } size={ "small" }/> }
                                label={ "Manter conectado" }
                            />
                        </div>

                        <div className={ buttons }>
                            <Button variant={ "contained" } fullWidth size={ "large" }>
                                Acessar
                            </Button>

                            <Link passHref href={ "/cadastrar" }>
                                <MuiLink textAlign={ "center" } underline={ "none" }>Cadastre-se</MuiLink>
                            </Link>
                        </div>
                    </Box>
                </div>
            </Grow>
        </div>
    )
}

export default Login;