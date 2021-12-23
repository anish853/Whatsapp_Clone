import { useContext } from "react";
import { Dialog, withStyles, Box, Typography, makeStyles, List, ListItem } from "@material-ui/core";
import { GoogleLogin } from 'react-google-login';

//components
import { AccountContext } from "../../Context/AccountProvider";
import { addUser } from "../../services/api.js";

const useStyles = makeStyles({
    components: { display: 'flex' },
    leftComponent: { padding: '56px 0 56px 56px', },
    qr: { padding: '40px 0 0 40px', height: 264, width: 264 },
    title: {
        fontSize: 26,
        marginBottom: 25,
        color: '#525252',
        fontFamily: 'Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif',
        fontWeight: 300
    },
    list: {
        '&  > *': {
            padding: 0,
            marginTop: 15,
            fontSize: 18,
            lineHeight: '28px',
            color: '#4a4a4a'
        }
    }
})

const style = {
    dialogPaper: {
        height: '95%',
        width: '65%',
        marginTop: '12%',
        maxHeight: '100%',
        maxWidth: '100%',
        borderRadius: 0,
        overflow: 'hidden'
    }
};

const Login = ({ classes }) => {
    const classname = useStyles();
    const url = 'https://www.ginifab.com/feeds/qr_code/img/qrcode.jpg';
    const clientId = '97817595326-6aqm3hscaudbgh9fm2sqhf8b2av82a4e.apps.googleusercontent.com';
    const { account, setAccount } = useContext(AccountContext);
    const onLoginSuccess = async(res) => {
        console.log('login', res.profileObj); setAccount(res.profileObj);
        await addUser(res.profileObj);
    };
    const onLoginFailure = () => { console.log('loginfail'); };
    return (
        <Dialog open={true}
            classes={{ paper: classes.dialogPaper }} BackdropProps={{ style: { backgroundColor: 'unset' } }}>
            <Box className={classname.components}>
                <Box className={classname.leftComponent}>
                    <Typography className={classname.title}>To use WhatsApp on your computer:</Typography>
                    <List className={classname.list}>
                        <ListItem>1. Open WhatsApp on your phone</ListItem>
                        <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
                        <ListItem>3. Point your phone to this screen to capture the code</ListItem>
                    </List>
                </Box>
                <Box style={{ position: 'relative' }}>
                    <img src={url} alt="QR" className={classname.qr} />
                    <Box style={{ position: 'absolute', left: '50%', top: '50%' }}>
                        <GoogleLogin
                            clientId={clientId}
                            buttonText=""
                            onSuccess={onLoginSuccess}
                            onFailure={onLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />
                    </Box>
                </Box>
            </Box>

        </Dialog>
    )
}
export default withStyles(style)(Login);