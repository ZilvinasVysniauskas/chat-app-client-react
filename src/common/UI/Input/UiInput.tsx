import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Email, Lock, Person } from '@mui/icons-material';
import { ReactElement } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Type = 'text' | 'password' | 'email' | 'username' | 'message';

type InputProps = {
    type: Type;
    register?: UseFormRegisterReturn;
    errorMessage?: string;
    setTextValue?: (value: string) => void;
    value?: string;
}

type InputStyleProperties = {
    type: Type;
    fullWidth: boolean;
    placeholder?: string;
    adornment?: ReactElement;
    multiline?: boolean;
    sx?: any;
}

const UiInput: React.FC<InputProps> = (props) => {
    let inputParams: InputStyleProperties = {
        type: 'text',
        fullWidth: true,
    };

    const createAdornment = (element: ReactElement): ReactElement => {
        return (
            <InputAdornment
                position="start">
                <IconButton>
                    {element}
                </IconButton>
            </InputAdornment>
        )
    }

    switch (props.type) {
        case 'email':
            inputParams.type = 'email';
            inputParams.placeholder = 'Email';
            inputParams.adornment = createAdornment(<Email />);
            break;
        case 'password':
            inputParams.type = 'password';
            inputParams.placeholder = 'Password';
            inputParams.adornment = createAdornment(<Lock />);
            break
        case 'username':
            inputParams.placeholder = 'Username';
            inputParams.adornment = createAdornment(<Person />);
            break
        case 'message':
            inputParams.placeholder = 'Enter message...';
            inputParams.multiline = true;
            inputParams.fullWidth = false;
            inputParams.sx = { flexGrow: 1, flexBasis: '90%', mr: 1 }
    }

    return (
        <TextField
            margin="dense"
            {...props.register}
            type={inputParams.type}  
            placeholder={inputParams.placeholder}
            fullWidth={inputParams.fullWidth}
            InputProps={{
            startAdornment: inputParams.adornment
            }}
            sx = {inputParams.sx}
            helperText={props.errorMessage}
            error={Boolean(props.errorMessage)}
            multiline={inputParams.multiline}
            onChange={(e: any) => {
                if (props.setTextValue) {
                    props.setTextValue(e.target.value);
                }
            }}
            value={props.value}
        />
    );
}

export default UiInput;