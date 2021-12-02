import { NextPage } from "next";
import Link from "next/link"
import { Box, Grow, InputAdornment, Typography } from "@mui/material";
import { FiMail } from "react-icons/fi";
import { Button, Heading, TextField } from "@/presentation/components/shared";
import { useRecoverAccount } from "@/presentation/hooks";
import { RenderIf } from "@/presentation/utils";

type ForgotPasswordProps = {}

const ForgotPassword: NextPage<ForgotPasswordProps> = () => {
    const { recoverStyles, onChangeEmail, errors, onSubmit, getErrorText, isLoading, isDisabled } = useRecoverAccount()

    const {
        boxStyles,
        outerBox,
        buttons
    } = recoverStyles

    return (
        <div className={ outerBox }>
            <Heading title={ "Esqueci minha senha | Code Craft Club" }/>

            <Grow in={ true }>
                <form className={ boxStyles } onSubmit={ onSubmit }>
                    <header>&lt;Code Craft Club&gt;</header>

                    <Typography variant={ "h5" } color={ "gold" } textAlign={ "center" } fontWeight={ "500" }>
                        Esqueceu sua senha ?
                    </Typography>

                    <Typography variant={ "body1" }>
                        Mas relaxe! Vamos te ajudar a recuperar.<br/>
                        Qual o e-mail do seu cadastro ?
                    </Typography>

                    { RenderIf(errors.formErrors.length > 0, (
                        <Typography variant={ "h6" } color={ "error" } textAlign={ "center" } fontWeight={ "500" }>
                            { errors.formErrors[0] }
                        </Typography>
                    )) }

                    <Box>
                        <TextField
                            fullWidth
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
                    </Box>

                    <Box className={ buttons }>
                        <Button
                            variant={ "contained" }
                            fullWidth
                            size={ "large" }
                            type={ "submit" }
                            loading={ isLoading }
                            disabled={ isDisabled || isLoading }
                        >
                            Enviar
                        </Button>

                        <Link href={ "/" } passHref>
                            <Button color={ "warning" } variant={ "outlined" } fullWidth size={ "large" }>
                                Voltar
                            </Button>
                        </Link>
                    </Box>
                </form>
            </Grow>
        </div>
    )
}

export default ForgotPassword;