import React from 'react';
import { withRouter } from 'react-router-dom'
import { authenticationStore, dataStore, popupStore } from '../../stores';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { ADD_ENTRY_PATH } from '../../app-config';

class AddEntryButton extends React.Component {
    constructor() {
        super();
        this.state = {
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const regexIsVinValid = /^[1234567890ABCDEFGHJKLMNPRSTUVWXYZ]{17}$/;
        if (regexIsVinValid.test(dataStore.vin)) {
            this.props.history.push(ADD_ENTRY_PATH)
            return true;
        } else {
            popupStore.showPopup("Fehler", "Die FIN ungültig!")
            return false;
        }
    }

    render() {
        return (
            <React.Fragment>
                {
                    authenticationStore.userLevel > 0
                        ?
                        <Button
                            variant="raised"
                            margin="normal"
                            style={{ marginLeft: '1em' }}
                            onClick={this.handleClick}
                        >
                            <Add />
                            Eintrag hinzufügen
                        </Button>
                        :
                        null
                }
            </React.Fragment>
        )
    }
}

export default withRouter(AddEntryButton);