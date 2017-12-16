
const drawerWidth = 240;
export const styles = theme => ({
    root: {
        width: '100%',
        height: 430,
        // marginTop: theme.spacing.unit * 3,
        marginTop: 0,

        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
    },
    appBar: {

    },
    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    drawerHeader: theme.mixins.toolbar,
    drawerPaper: {
        width: 250,
        backgroundColor: '#0277bd',
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            position: 'relative',
            height: '100%',
        },
    },
    content: {
        backgroundColor: theme.palette.background.default,
        width: '100%',
        padding: theme.spacing.unit * 3,
        height: 'calc(100% - 56px)',
        marginTop: 56,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
            marginTop: 64,
        },
    },
    headerWrapper: {
        padding: '8px',
        backgroundColor: '#0277bd',
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,

        },
    },
    toolbar: {
        minHeight: 'auto',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 10,
    },
    colorWhite:{
        color: '#ffffff',
        textDecoration: 'none'
    }
});
