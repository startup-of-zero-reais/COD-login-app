import {
    Alert,
    AlertColor,
    IconButton,
    Snackbar as MuiSnackbar,
    SnackbarProps as MuiSnackbarProps
} from "@mui/material"
import { FiX } from "react-icons/fi";
import { MouseEvent, SyntheticEvent } from "react";

export interface SnackbarProps extends MuiSnackbarProps {
    type: AlertColor
}

type CloseActionProps = {
    onClose: ( event: SyntheticEvent | MouseEvent, reason?: string ) => void;
}

const CloseAction = ( { onClose }: CloseActionProps ) => {
    return <IconButton onClick={ onClose } size={ "small" }><FiX/></IconButton>
}

export const Snackbar = (
    {
        key = (randKey()),
        children,
        message,
        autoHideDuration = 6000,
        anchorOrigin = {
            horizontal: "center",
            vertical: "top"
        },
        type = 'info',
        ...rest
    }: SnackbarProps
) => {
    return (
        <MuiSnackbar
            key={ key }
            autoHideDuration={ autoHideDuration }
            anchorOrigin={ anchorOrigin }
            { ...rest }
        >
            <Alert
                severity={ type }
                variant={ "filled" }
                action={ (<CloseAction onClose={ rest.onClose as any }/>) }
            >
                { message }
            </Alert>
        </MuiSnackbar>
    )
}

function randKey(): string {
    return (Math.random() * 1e8).toString(16).replace('.', '-')
}