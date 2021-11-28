import { createTheme } from "@mui/material";
import { purplePalette, goldPalette, silverPalette } from "./colors";

export const theme = createTheme({
	palette: {
		mode: "dark",
		primary: goldPalette,
		secondary: purplePalette,
		background: {
			default: (silverPalette as any)['900'],
			paper: (silverPalette as any)["800"]
		},
	},
})