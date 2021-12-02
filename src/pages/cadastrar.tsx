import { Box, Button, Grow, IconButton, InputAdornment, Link as MuiLink, Typography } from "@mui/material";
import { Heading, TextField } from "@/presentation/components/shared";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import Link from "next/link";
import { RenderIf, ToggleRender } from "@/presentation/utils";
import { useCreateAccount, usePasswordToggle } from "@/presentation/hooks";

const Register = () => {
    const {
        createAccountStyles,
        onChangeName,
        onChangeLastname,
        onChangeEmail,
        onChangePassword,
        onChangeConfirmPassword,
        onSubmit,
        errors,
        getError
    } = useCreateAccount()

    const { togglePasswordVisibility, isPasswordVisible } = usePasswordToggle()

    const {
        boxStyles,
        outerBox,
        formStyles,
        buttons
    } = createAccountStyles

    return (
        <div className={ outerBox }>
            <Heading title={ "Registrar-se | Code Craft Club" }/>

            <Grow in={ true }>
                <form className={ boxStyles } onSubmit={ onSubmit }>
                    <header>&lt;Code Craft Club&gt;</header>

                    <Box className={ formStyles }>
                        <Box display={ "flex" } gap={ 2 }>
                            <TextField
                                placeholder={ "John" }
                                label={ "Nome" }
                                onChange={ onChangeName }
                                required
                                error={ !!getError(errors.nameErrors) }
                                helperText={ getError(errors.nameErrors) }
                            />
                            <TextField
                                placeholder={ "Doe" }
                                label={ "Sobrenome" }
                                onChange={ onChangeLastname }
                                required
                                error={ !!getError(errors.lastnameErrors) }
                                helperText={ getError(errors.lastnameErrors) }
                            />
                        </Box>

                        <TextField
                            label={ "E-mail" }
                            placeholder={ "john.doe@email.com" }
                            onChange={ onChangeEmail }
                            required
                            error={ !!getError(errors.emailErrors) }
                            helperText={ getError(errors.emailErrors) }
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
                            onChange={ onChangePassword }
                            required
                            error={ !!getError(errors.passwordErrors) }
                            helperText={ getError(errors.passwordErrors) }
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
                            onChange={ onChangeConfirmPassword }
                            required
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
                            error={ !!getError(errors.new_passwordErrors) }
                            helperText={ getError(errors.new_passwordErrors) ? getError(errors.new_passwordErrors) : "Digite novamente sua senha. Para garantir que não há erros de digitação" }
                        />

                        { RenderIf(!!getError(errors.formErrors), (
                            <Typography color={ "error" } textAlign={ "center" }>
                                { getError(errors.formErrors) }
                            </Typography>
                        )) }

                        <div className={ buttons }>
                            <Button variant={ "contained" } fullWidth size={ "large" } type={ "submit" }>
                                Cadastrar
                            </Button>

                            <Link passHref href={ "/" }>
                                <MuiLink textAlign={ "center" } underline={ "none" }>Já possui conta ? Acesse</MuiLink>
                            </Link>
                        </div>
                    </Box>
                </form>
            </Grow>
        </div>
    )
}

export default Register;