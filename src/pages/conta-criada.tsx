import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import Link from "next/link"
import { useRouter } from "next/router";
import { Button, Heading } from "@/presentation/components/shared";
import styles from "@/presentation/styles/pages/Login.module.scss"
import { Grow, Typography } from "@mui/material";

const AccountCreated = () => {
    const { replace } = useRouter()
    const [ timeLeft, setTimeLeft ] = useState(25)

    const { outerBox, boxStyles } = useMemo(() => ({
        outerBox: classNames(styles.outerBox),
        boxStyles: classNames(styles.box)
    }), [])

    useEffect(() => {
        // eslint-disable-next-line no-undef
        let timeout: NodeJS.Timeout

        if (timeLeft > 0) {
            timeout = setTimeout(() => {
                setTimeLeft(timeLeft - 1)
            }, 1000)
        } else {
            replace("/").then().catch(console.error)
        }

        return () => {
            clearTimeout(timeout)
        }
    }, [ timeLeft, replace ])

    return (
        <div className={ outerBox }>
            <Heading title={ "Conta criada com sucesso!" }/>
            <Grow in={ true }>
                <div className={ boxStyles }>
                    <Typography color={ "gold" } variant={ "h5" }>
                        Conta criada com sucesso!
                    </Typography>

                    <Typography>
                        Parabéns pela sua decisão. Agora falta pouco!<br/>
                        Acesse sua conta!
                    </Typography>

                    <Typography>
                        Redirecionando em { timeLeft }s...
                    </Typography>

                    <Link href={ "/" } passHref>
                        <Button variant={ "contained" }>
                            Acessar agora
                        </Button>
                    </Link>
                </div>
            </Grow>
        </div>
    )
}

export default AccountCreated