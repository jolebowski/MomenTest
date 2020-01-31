import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { API_KEY } from '../../constants';


const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
};

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class MoviesOnly extends Component {
    state = {
        open: false,
        show: null
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-FR`)
            .then((response) => response.json())
            .then(json => this.setState({ show: json, open: true }))
    }
    render() {
        const { show } = this.state;
        return (
            <div >
                {show !== null &&
                    <Dialog
                        fullScreen
                        open={this.state.open}
                        onClose={this.handleClose}
                        TransitionComponent={Transition}
                    >
                        <AppBar style={styles.appBar}>
                            <Toolbar>
                                <Link to={'/'}>
                                    <IconButton color="default" onClick={this.handleClose} aria-label="Close">
                                        <CloseIcon />
                                    </IconButton>
                                </Link>
                                <Typography variant="title" color="inherit" style={styles.flex}>
                                    {show.original_title}
                                </Typography>
                            </Toolbar>
                        </AppBar>

                        <div style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <div>
                                <List>
                                    <ListItem button>
                                        <ListItemText primary="Détails" secondary={show.overview} />
                                    </ListItem>
                                    <Divider />

                                </List>
                            </div>
                        </div>
                    </Dialog>
                }
            </div>
        )
    }

}

export default MoviesOnly;