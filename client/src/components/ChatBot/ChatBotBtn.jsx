import * as React from 'react';

// MUI import
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import ChatBot from './ChatBot';

// component import

export default function ChatBotBtn() {

    const [anchor, setAnchor] = React.useState(null);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;

    return (

        <>
            <div aria-describedby={id} type="button" onClick={handleClick}>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <Fab color="primary" aria-label="add">
                        <QuestionAnswerIcon />
                    </Fab>
                </Box>
            </div>
            <BasePopup id={id} open={open} anchor={anchor}>
                <div>
                    <ChatBot />
                </div>
            </BasePopup>


        </>
    );
}