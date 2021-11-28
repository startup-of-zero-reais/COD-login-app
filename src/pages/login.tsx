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
    Switch,
    Typography
} from "@mui/material";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { TextField } from "@/presentation/components/shared";
import { RenderIf, ToggleRender } from "@/presentation/utils";
import { useLoginPage } from "@/presentation/hooks";

type LoginProps = {}

const Login: NextPage<LoginProps> = () => {
    const {
        loginStyles,
        isPasswordVisible,
        togglePasswordVisibility,
        shouldRemember,
        setShouldRemember,
        onSubmit,
        onChangeEmail,
        onChangePassword,
        isDisabled,
        errors,
        getErrorText
    } = useLoginPage()

    const {
        boxStyles,
        outerBox,
        formStyles,
        bottomForm,
        buttons
    } = loginStyles

    return (
        <div className={ outerBox }>
            <Grow in={ true }>
                <div className={ boxStyles }>
                    <header>&lt;Code Craft Club&gt;</header>

                    { RenderIf(
                        errors.form.length > 0,
                        (
                            <Typography variant={ "h5" } color={ "error" } textAlign={ "center" }>
                                Oops! { errors.form[0] }
                            </Typography>
                        )
                    ) }

                    <Box
                        component={ "form" }
                        onSubmit={ onSubmit }
                        className={ formStyles }
                    >
                        <TextField
                            id={ "email-field" }
                            label={ "E-mail" }
                            placeholder={ "john.doe@email.com" }
                            onChange={ onChangeEmail }
                            required
                            InputProps={ {
                                startAdornment: (
                                    <InputAdornment position={ "start" }>
                                        <FiMail/>
                                    </InputAdornment>
                                )
                            } }
                            error={ !!errors.email.length }
                            helperText={ getErrorText(errors.email) }
                        />

                        <TextField
                            id={ "password-field" }
                            label={ "Senha" }
                            placeholder={ "Sua_senha@ultra#!secreta123" }
                            required
                            InputProps={ {
                                onChange: onChangePassword,
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
                            error={ !!errors.password.length }
                            helperText={ getErrorText(errors.password) }
                        />

                        <div className={ bottomForm }>
                            <Link passHref href={ "/esqueci-minha-senha" }>
                                <MuiLink underline={ "none" }>Esqueci minha senha</MuiLink>
                            </Link>

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={ shouldRemember }
                                        onClick={ () => setShouldRemember(!shouldRemember) }
                                        size={ "small" }
                                    />
                                }
                                label={ "Manter conectado" }
                            />
                        </div>

                        <div className={ buttons }>
                            <Button
                                type={ "submit" }
                                variant={ "contained" }
                                fullWidth
                                size={ "large" }
                                disabled={ isDisabled }
                            >
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