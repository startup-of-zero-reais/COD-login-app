import { NextPage } from "next";
import Link from "next/link"
import { Box, Button, Grow, InputAdornment, Typography } from "@mui/material";
import { FiMail } from "react-icons/fi";
import classNames from "classnames";
import { TextField } from "@/presentation/components/shared";
import styles from "@/presentation/styles/pages/Login.module.scss";
import { useMemo } from "react";

type ForgotPasswordProps = {}

const ForgotPassword: NextPage<ForgotPasswordProps> = () => {
    const {
        boxStyles,
        outerBox,
        formStyles,
        bottomForm
    } = useMemo(() => ({
        boxStyles: classNames(styles.box),
        outerBox: classNames(styles.outerBox),
        formStyles: classNames(styles.form),
        bottomForm: classNames(styles.bottomForm),
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

                    <Box className={ formStyles }>
                        <TextField label={ "E-mail" } InputProps={ {
                            startAdornment: (
                                <InputAdornment position={ "start" }>
                                    <FiMail/>
                                </InputAdornment>
                            )
                        } }/>

                        <Button variant={ "contained" } fullWidth size={ "large" }>
                            Enviar
                        </Button>

                        <Link href={ "/" } passHref>
                            <Button color={ "secondary" } variant={ "contained" } fullWidth size={ "large" }>
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