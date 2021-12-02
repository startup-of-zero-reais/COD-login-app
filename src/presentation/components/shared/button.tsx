import { Button as MuiButton, ButtonProps as MuiButtonProps, CircularProgress } from "@mui/material"
import { RenderIf } from "@/presentation/utils";

export interface ButtonProps extends MuiButtonProps {
    loading?: boolean
    loadingSize?: number
}

export const Button = ( { loading = false, loadingSize = 24, children, ...rest }: ButtonProps ) => {

    return (
        <MuiButton { ...rest } sx={ { gap: 2 } }>
            { RenderIf(loading, (
                <CircularProgress size={ 25 }/>
            )) }
            { children }
        </MuiButton>
    )
}