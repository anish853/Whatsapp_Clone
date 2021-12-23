import { Box, makeStyles, Typography, Divider } from '@material-ui/core';

const useStyle = makeStyles({
    component: {
        background: '#f8f9fa',
        padding: '50px 0',
        textAlign: 'center',
        height: '100%'
    },
    image: {
        width: 420
    }
});

const EmptyChat = () => {
    const classes = useStyle();
    const url = 'https://ik.imagekit.io/ag/wp-content/uploads/2015/01/QR-connected.png';

    return (
        <Box className={classes.component}>
            <img src={url} alt="dp" className={classes.image}/>
        </Box>
    )
}

export default EmptyChat;