import { useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import styles from "@/presentation/styles/pages/Login.module.scss"
import { Box, Button, Grow, IconButton, InputAdornment, Link as MuiLink } from "@mui/material";
import { TextField } from "@/presentation/components/shared";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import Link from "next/link";
import { ToggleRender } from "@/presentation/utils";

const Register = () => {
    const [ isPasswordVisible, setPasswordVisible ] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
        setPasswordVisible(prevState => !prevState)
    }, [])

    const {
        boxStyles,
        outerBox,
        formStyles,
        buttons
    } = useMemo(() => ({
        boxStyles: classNames(styles.box),
        outerBox: classNames(styles.outerBox),
        formStyles: classNames(styles.form),
        buttons: classNames(styles.buttons),
    }), [])

    return (
        <div className={ outerBox }>
            <Grow in={ true }>
                <div className={ boxStyles }>
                    <header>&lt;Code Craft Club&gt;</header>

                    <Box className={ formStyles }>
                        <Box display={ "flex" } gap={ 2 }>
                            <TextField
                                placeholder={ "John" }
                                label={ "Nome" }
                            />
                            <TextField
                                placeholder={ "Doe" }
                                label={ "Sobrenome" }
                            />
                        </Box>

                        <TextField
                            label={ "E-mail" }
                            placeholder={ "john.doe@email.com" }
                            InputProps={ {
                                startAdornment: (
                                    <InputAdornment position={ "start" }>
                                        <FiMail/>
                                    </InputAdornment>
                                )
                            } }
                        />
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
                            } }
                        />

                        <TextField
                            label={ "Confirmação de senha" }
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
                            } }
                            helperText={ "Digite novamente sua senha. Para garantir que não há erros de digitação" }
                        />

                        <div className={ buttons }>
                            <Button variant={ "contained" } fullWidth size={ "large" }>
                                Cadastrar
                            </Button>

                            <Link passHref href={ "/login" }>
                                <MuiLink textAlign={ "center" } underline={ "none" }>Já possui conta ? Acesse</MuiLink>
                            </Link>
                        </div>
                    </Box>
                </div>
            </Grow>
        </div>
    )
}

export default Register;