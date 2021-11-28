import { useMemo } from "react";
import { NextPage } from "next";
import Link from "next/link"
import { Box, Button, Grow, InputAdornment, Typography } from "@mui/material";
import { FiMail } from "react-icons/fi";
import classNames from "classnames";
import { TextField } from "@/presentation/components/shared";
import styles from "@/presentation/styles/pages/Login.module.scss";

type ForgotPasswordProps = {}

const ForgotPassword: NextPage<ForgotPasswordProps> = () => {
    const {
        boxStyles,
        outerBox,
        buttons
    } = useMemo(() => ({
        boxStyles: classNames(styles.box),
        outerBox: classNames(styles.outerBox),
        buttons: classNames(styles.buttons)
    }), [])

    return (
        <div className={ outerBox }>
            <Grow in={ true }>
                <div className={ boxStyles }>
                    <header>&lt;Code Craft Club&gt;</header>

                    <Typography variant={ "h5" } color={ "gold" } textAlign={ "center" } fontWeight={ "500" }>
                        Esqueceu sua senha ?
                    </Typography>

                    <Typography variant={ "body1" }>
                        Mas relaxe! Vamos te ajudar a recuperar.<br/>
                        Qual o e-mail do seu cadastro ?
                    </Typography>

                    <Box>
                        <TextField
                            fullWidth
                            label={ "E-mail" }
                            placeholder={ "john.doe@email.com" }
                            InputProps={ {
                                startAdornment: (
                                    <InputAdornment position={ "start" }>
                                        <FiMail/>
                                    </InputAdornment>
                                )
                            } }/>
                    </Box>

                    <Box className={ buttons }>
                        <Button variant={ "contained" } fullWidth size={ "large" }>
                            Enviar
                        </Button>

                        <Link href={ "/login" } passHref>
                            <Button color={ "warning" } variant={ "outlined" } fullWidth size={ "large" }>
                                Voltar
                            </Button>
                        </Link>
                    </Box>
                </div>
            </Grow>
        </div>
    )
}

export default ForgotPassword;