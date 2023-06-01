import { ChangeEvent, useRef, useState } from "react";
import UiIcon from "../../../../../common/UI/Icon/UiIcon";
import { Box, Typography } from "@mui/material";

type FileInputProps = {
    setSelectedFile: (file: File) => void;
    selectedFile: File | null;
};

const FileInputComponent: React.FC<FileInputProps> = (props) => {
    const inputRef = useRef<HTMLInputElement>(null!);

    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            props.setSelectedFile(file);
            setSelectedFileName(file.name);
        }
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <UiIcon type='attach' onClick={handleClick} />
            {props.selectedFile && (
                <Box sx={{ margin: '0 10px' }}>
                    <Typography variant="body1">{selectedFileName}</Typography>
                </Box>
            )}
        </>
    )
};

export default FileInputComponent;