import { AttachFile } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { ReactNode } from "react";

type UiIconProps = {
    type: 'attach';
    onClick?: any;
};

type IconProperties = {
    icon: ReactNode;
}

const UiIcon: React.FC<UiIconProps> = (props: UiIconProps) => {

    let iconProperties: IconProperties = {
        icon: <></>
    }

    switch (props.type) {
        case 'attach':
            iconProperties.icon = <AttachFile />;
            break;
    }
    return (
        <IconButton
            onClick={props.onClick}
        >
            {iconProperties.icon}
        </IconButton>
    );
};

export default UiIcon;