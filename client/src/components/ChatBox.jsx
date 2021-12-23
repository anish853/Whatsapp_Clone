import { useContext } from "react";
import { Dialog, withStyles, Box, makeStyles } from "@material-ui/core";
import { UserContext } from "../Context/UserProvider";
import Menu from "./menu/Menu";

import Chat from './Chat/Chat';
import EmptyChat from "./Chat/EmptyChat";
const useStyles = makeStyles({
    component: { display: 'flex'},
    leftComponent: { minWidth: 320 ,padding:0},
    rightComponent: { borderLeft: '1px solid rgba(0,0,0,0.20)',width:'80%',minWidth:300,
    height:'100%',marginRight:1}
})
const style = {
    dialogPaper: {
        height: '97%',
        width: '91%',
        maxHeight: '100%',
        maxWidth: '100%',
        borderRadius:0,
        overflow: 'hidden',
        paddingTop:'auto',
        paddingRight:'.1px'
    }
};

const ChatBox = ({ classes }) => {
    const classname = useStyles();
    const {person} = useContext(UserContext);
    return (
        <Dialog open={true}
            classes={{ paper: classes.dialogPaper }} >
            <Box className={classname.component}>
                <Box className={classname.leftComponent}>
                    <Menu />
                </Box>
                <Box className={classname.rightComponent}>
                    {
                        Object.keys(person).length ? <Chat/> : <EmptyChat/>
                    }
                </Box>
            </Box>

        </Dialog>)
}

export default withStyles(style)(ChatBox);
