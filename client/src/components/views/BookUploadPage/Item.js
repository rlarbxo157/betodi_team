import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        margin: 10,
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 100,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    media: {
        marginTop: '20'
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

const Item = props => {

    const classes = useStyles();
    const theme = useTheme();


    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.cover}
                component="img"
                image={props.thumbnail}
                title={props.title}
            />
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h6" variant="h6">
                        {props.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.authors}
                    </Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                        {props.publisher}
                    </Typography>
                </CardContent>
            </div>
        </Card>

        // <li>
        //     <dl>
        //         <dt>
        //             <img src={props.thumbnail} alt={props.thumbnail} />
        //         </dt>
        //         <dd>
        //             <h3 dangerouslySetInnerHTML={{ __html: props.title }} />
        //             <p>{props.price}</p>
        //             <p>{props.isbn}</p>
        //             <p>{props.publisher}</p>
        //             {/* <article dangerouslySetInnerHTML={{ __html: props.contents }} /> */}
        //             <a href={props.url} target="_blank">
        //                 링크 바로가기
        //   </a>
        //         </dd>
        //     </dl>
        // </li>
    );
};

export default Item;
