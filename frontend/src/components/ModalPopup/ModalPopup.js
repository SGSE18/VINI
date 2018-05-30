import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const popupStyle = theme => ({
    modal: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
});

function getModalStyle() {

    // sets the modal into the mid of the screen
    return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    };
}

class UnstyledModalPopup extends React.Component {

    handleOk = () => {
        this.props.onClose(true);
    };
    handleCancel = () => {
        this.props.onClose(false);
    };

    render() {
        const { classes } = this.props;
        return (
            <Modal open={this.props.isOpen}>
                <div style={getModalStyle()} className={classes.modal}>
                    <Typography variant="headline">
                        {this.props.title}
                    </Typography>
                    <p />
                    <Typography variant="subheading">
                        {this.props.description}
                    </Typography>
                    <p />
                    <Button variant="raised" onClick={this.handleOk} style={{ marginRight: '10px' }}>OK</Button>
                    <Button variant="raised" color="secondary" onClick={this.handleCancel}>Abbrechen</Button>
                </div>
            </Modal>
        );
    }
}

const ModalPopup = withStyles(popupStyle)(UnstyledModalPopup);
ModalPopup.propTypes = {
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default ModalPopup;
