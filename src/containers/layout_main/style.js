const drawerWidth = 240;
export const styles = theme => ({
    // root: {
    //     width: '100%',
    //     height: '100%',
    //     // marginTop: theme.spacing.unit * 3,
    //     marginTop: 0,
    //
    //     zIndex: 1,
    //     overflow: 'hidden',
    // },
    // appFrame: {
    //     position: 'relative',
    //     display: 'flex',
    //     width: '100%',
    //     height: '100%',
    // },

    // navIconHide: {
    //     [theme.breakpoints.up('md')]: {
    //         display: 'none',
    //     },
    // },
    // drawerHeader: theme.mixins.toolbar,
    // drawerPaper: {
    //     width: 250,
    //     backgroundColor: '#0277bd',
    //     [theme.breakpoints.up('md')]: {
    //         width: drawerWidth,
    //         position: 'relative',
    //         height: '100%',
    //     },
    // },
    // drawerPaperLeft: {
    //     width: 250,
    //     backgroundColor: '#0277bd',
    //     [theme.breakpoints.up('md')]: {
    //         width: drawerWidth,
    //         position: 'relative',
    //         height: '100%',
    //     },
    // },
    // drawerPaperBottom: {
    //     width: '100%',
    //     backgroundColor: '#0277bd',
    //     [theme.breakpoints.up('md')]: {
    //         width: drawerWidth,
    //         position: 'relative',
    //         height: '100%',
    //     },
    // },
    // drawerDocked: {
    //     height: '100%'
    // },
    // content: {
    //     backgroundColor: theme.palette.background.default,
    //     width: '100%',
    //     height: 'calc(100% - 64px)',
    //     marginTop: 64,
    //
    // },
    headerWrapper: {
        padding: '8px',
        backgroundColor: '#0277bd',
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - 256px)`,
            marginLeft: drawerWidth,

        },
    },
    toolbar: {
        minHeight: 'auto',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 10,
        display: 'inline-flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    // menuButtonBottom:{
    //     position: 'fixed',
    //     bottom: '20px',
    //     left: '50%',
    //     transform:' translate(-50%, 0)',
    //     display: 'inline-flex',
    //     zIndex: '1000',
    //     backgroundColor: '#0277bd',
    //     [theme.breakpoints.up('md')]: {
    //         display: 'none',
    //     },
    // },
    searchButton: {
        marginLeft: -12,
        marginRight: 10,
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'inline-flex',
        },
    },
    searchButtonMobile: {
        marginLeft: -12,
        marginRight: 10,
        display: 'inline-flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    colorWhite: {
        color: '#ffffff',
        textDecoration: 'none'
    }
});
