import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { AlertColor } from "@mui/material";
import { Snackbar } from "@/presentation/components/shared";
import { RenderIf } from "@/presentation/utils";
import { useSnackbar } from "@/presentation/hooks";

type SnackbarStackProps = {
    children?: ReactNode
}

type SnackbarContextProps = {
    openSnackbar: ( c: SnackbarConfig ) => void
}

export type SnackbarConfig = {
    type: AlertColor,
    message: string,
}

export const SnackbarContext = createContext({} as SnackbarContextProps)

export const SnackbarStack = ( { children }: SnackbarStackProps ) => {

    const [ snackbar, setSnackbar ] = useState<SnackbarConfig | null>(null)
    const [ open, onOpen, onClose ] = useSnackbar()

    const openSnackbar = useCallback(( snackbarConfig: SnackbarConfig ) => {
        setSnackbar(snackbarConfig)
        onOpen()
    }, [ onOpen ])

    return (
        <SnackbarContext.Provider value={ { openSnackbar } }>
            { children }

            { RenderIf(
                open,
                (<Snackbar
                    type={ snackbar?.type || 'info' }
                    message={ snackbar?.message || "" }
                    onClose={ onClose }
                    open={ open }
                />)
            ) }
        </SnackbarContext.Provider>
    )
}

export function useSnackbarContext() {
    return useContext(SnackbarContext)
}