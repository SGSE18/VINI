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
    }
    handleCancel = () => {
        this.props.onClose(false);
    }
    onKeyDown(e) {
        if (e.keyCode === 27 || e.keyCode === 8 ) { // ESC (27) and backspace (8)
            this.handleCancel();
        }
        if (e.keyCode === 13) { //Enter
            this.handleOk();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Modal id="Modal" open={this.props.isOpen} onKeyDown={this.onKeyDown.bind(this)}>
                <div style={getModalStyle()} className={classes.modal}>
                    <Typography variant="headline">
                        {this.props.title}
                    </Typography>
                    <p />
                    <Typography variant="subheading">
                        {this.props.description}
                    </Typography>
                    <p />
                    <Button id="btnOk" variant="raised" onClick={this.handleOk} style={{ marginRight: '10px' }}>OK</Button>
                    {
                        this.props.showCancelButton === undefined || this.props.showCancelButton
                            ?
                            <Button variant="raised" id="btnCancel" color="secondary" onClick={this.handleCancel}>Abbrechen</Button>
                            :
                            null
                    }
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
    isOpen: PropTypes.bool.isRequired,
    showCancelButton: PropTypes.bool
}

export default ModalPopup;
