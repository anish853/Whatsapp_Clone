import { Box, makeStyles, InputBase } from "@material-ui/core";
import { EmojiEmotions, AttachFile, Mic } from "@material-ui/icons";

const usestyles = makeStyles((theme) =>({
    footer: {
        height: '50px', width: '100%', background: '#ededed', display: 'flex', alignItems: 'center',
        padding: '0 13px', '& >*': { margin: 5, color: '#919191' }
    },
    clipicon: { transform: 'rotate(40deg)' },
    inputRoot: {width: '100%'},
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: 25,
        fontSize: 14,
        height: 18,
        width: '100%'
    },
    searchBox:{borderRadius: 18,
        backgroundColor: '#FFFFFF',
        width: 'calc(94% - 100px)'}
}));
const Footer = ({sendText,setValue,value}) => {
    const classes = usestyles();
    return (
        <Box className={classes.footer}>
            <EmojiEmotions />
            <AttachFile className={classes.clipicon} />
            <Box className={classes.searchBox}>
                <InputBase
                    placeholder="Type a message"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyPress={(e)=>sendText(e)}
                    onChange={(e)=>setValue(e.target.value)}
                    value = {value}
                />
            </Box>
            <Mic />
        </Box>
    )
}

export default Footer;