import { Box, Grow, IconButton, InputAdornment, Typography } from "@mui/material";
import { Button, Heading, TextField } from "@/presentation/components/shared";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { RenderIf, ToggleRender } from "@/presentation/utils";
import { usePasswordToggle, useRecoverPassword } from "@/presentation/hooks";

const RecoverPassword = () => {
    const { isPasswordVisible, togglePasswordVisibility } = usePasswordToggle()

    const {
        recoverPasswordStyles,
        onChangePassword,
        onChangeNewPassword,
        onSubmit,
        isLoading,
        isDisabled,
        errors,
        getErrors
    } = useRecoverPassword()

    const { outerBox, boxStyles, formStyles, buttons } = recoverPasswordStyles

    return (
        <div className={ outerBox }>
            <Heading title={ "Redefinição de senha | Code Craft Club" }/>

            <Grow in={ true }>
                <div className={ boxStyles }>
                    <header>&lt;Code Craft Club&gt;</header>

                    <Typography>
                        Certifique-se de escolher uma senha forte e que você lembrará. <br/>
                        Mas não se preocupe, se esquecer outra vez te ajudaremos a recuperar
                    </Typography>

                    { RenderIf(
                        !!getErrors(errors.tokenErrors),
                        (
                            <Typography color={ "error" } variant={ "h4" } textAlign={ "center" }>
                                { getErrors(errors.tokenErrors) }
                            </Typography>
                        )
                    ) }

                    { RenderIf(
                        !!getErrors(errors.formErrors),
                        (
                            <Typography color={ "error" } variant={ "h4" } textAlign={ "center" }>
                                { getErrors(errors.formErrors) }
                            </Typography>
                        )
                    ) }

                    <Box component={ "form" } onSubmit={ onSubmit } className={ formStyles }>
                        <TextField
                            id={ "password-field" }
                            label={ "Senha" }
                            placeholder={ "Sua_senha@ultra#!secreta123" }
                            required
                            onChange={ onChangePassword }
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
                            error={ !!getErrors(errors.new_passwordErrors) }
                            helperText={ getErrors(errors.new_passwordErrors) }
                        />

                        <TextField
                            id={ "confirm-password-field" }
                            label={ "Confirmação de senha" }
                            placeholder={ "Sua_senha@ultra#!secreta123" }
                            required
                            onChange={ onChangeNewPassword }
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
                            error={ !!getErrors(errors.new_password_confirmationErrors) }
                            helperText={ getErrors(errors.new_password_confirmationErrors) }
                        />

                        <div className={ buttons }>
                            <Button
                                type={ "submit" }
                                variant={ "contained" }
                                fullWidth
                                size={ "large" }
                                disabled={ isDisabled || isLoading }
                                loading={ isLoading }
                            >
                                Redefinir
                            </Button>
                        </div>
                    </Box>
                </div>
            </Grow>
        </div>
    )
}

export default RecoverPassword