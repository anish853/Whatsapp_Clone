
import { Drawer,Box, Typography, makeStyles } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";

//components
import Profile from "./Profile";

const useStyle=makeStyles({header:{backgroundColor:'#00bfa5',height:120,display:'flex',
'& >*':{marginTop:'auto',fontWeight:600}}})

const InfoDrawer = ({ open, setOpen }) => {
    const classes=useStyle();
    const handleClose = () => {
        setOpen(false);
    }
    return (
        <Drawer open={open} onClose={handleClose}>
            <Box className={classes.header}>
                <ArrowBack onClick={()=>handleClose()}/>
                <Typography>PROFILE</Typography>
            </Box>
            <Box>
                <Profile/>
            </Box>
        </Drawer>
    )
}

export default InfoDrawer;