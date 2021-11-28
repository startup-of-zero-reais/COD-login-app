import {
    createTheme,
    TextField as MuiTextField,
    TextFieldProps as MuiTextFieldProps,
    ThemeProvider
} from "@mui/material";
import classNames from "classnames";
import { goldPalette, purplePalette } from "@/presentation/styles/shared/colors";
import styles from "@/presentation/styles/components/Text-field.module.scss"

const theme = createTheme({
    palette: {
        primary: goldPalette,
        secondary: purplePalette,
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "white"
                }
            }
        },
    }
})

export type TextFieldProps = MuiTextFieldProps

export const TextField = ( props: TextFieldProps ) => {

    const customClassname = classNames(styles.textField)

    return (
        <ThemeProvider theme={ theme }>
            <MuiTextField className={ customClassname } { ...props } />
        </ThemeProvider>
    )
}