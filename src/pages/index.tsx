import { NextPage } from "next";
import Link from "next/link"
import { Box, FormControlLabel, Grow, IconButton, InputAdornment, Link as MuiLink, Switch } from "@mui/material";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { Button, Heading, TextField } from "@/presentation/components/shared";
import { ToggleRender } from "@/presentation/utils";
import { useLoginPage, usePasswordToggle } from "@/presentation/hooks";

type LoginProps = {}

const Index: NextPage<LoginProps> = () => {
    const { isPasswordVisible, togglePasswordVisibility } = usePasswordToggle()

    const {
        loginStyles,
        shouldRemember,
        setShouldRemember,
        onSubmit,
        onChangeEmail,
        onChangePassword,
        isDisabled,
        errors,
        getErrorText,
        isLoading
    } = useLoginPage()

    const {
        boxStyles,
        outerBox,
        formStyles,
        bottomForm,
        buttons
    } = loginStyles

    return (
        <>

            <Heading title={ "Acesso | Code Craft Club" }/>

            <div className={ outerBox }>
                <Grow in={ true }>
                    <div className={ boxStyles }>
                        <header>&lt;Code Craft Club&gt;</header>

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
                                error={ !!errors.emailErrors.length }
                                helperText={ getErrorText(errors.emailErrors) }
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
                                error={ !!errors.passwordErrors.length }
                                helperText={ getErrorText(errors.passwordErrors) }
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
                                    disabled={ isDisabled || isLoading }
                                    loading={ isLoading }
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
        </>
    )
}

export default Index;