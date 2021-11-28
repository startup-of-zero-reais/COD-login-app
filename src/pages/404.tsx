import { useRouter } from "next/router";
import { Button, Grid, Typography } from "@mui/material";
import { FiArrowLeftCircle } from "react-icons/fi";

const NotFound = () => {
    const { back } = useRouter();

    return (
        <Grid container padding={ 8 }>
            <Grid
                item
                display={ "grid" }
                alignContent={ "center" }
                marginX={ "auto" }
                sm={ 12 }
                md={ 8 }
                lg={ 6 }
                xl={ 4 }
                gap={ 4 }>
                <Typography variant={ "h1" } sx={ { fontSize: 96, fontWeight: "500" } }>
                    Ops 404.
                </Typography>

                <Typography variant={ "h2" }>
                    Oops! Não encontramos a página que você está buscando { ":'(" }
                </Typography>

                <Typography>
                    <Button
                        color={ "warning" }
                        variant={ "outlined" }
                        size={ "large" }
                        sx={ { display: "flex", alignItems: "center", justifyContent: "center", gap: 1, fontSize: 18 } }
                        onClick={ back }
                    >
                        <FiArrowLeftCircle size={ 24 }/>
                        <span>Voltar</span>
                    </Button>
                    
                </Typography>
            </Grid>
        </Grid>
    )
}

export default NotFound;