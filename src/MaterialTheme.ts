import { createTheme } from "@mui/material";

export const colorTheme = createTheme({
    palette: {
        primary: {
            main: '#231f23',
            dark: '#0d0b0e',
        },
        secondary: {
            main: '#c33945',
        },
        error: {
            main: '#FF3945',
        },
        background: {
            default: '#44423f',
        },
        action: {
            active:'#231f23',
            hover: '#000000',

        },
        text: {
            primary: '#000000',
            secondary: '#FFFFFF',
            disabled: '#AFAFAF',
        },
    },
});