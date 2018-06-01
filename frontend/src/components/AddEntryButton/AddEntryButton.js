import React from 'react';
import { withRouter } from 'react-router-dom'
import { authenticationStore } from '../../stores';
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
        this.props.history.push(ADD_ENTRY_PATH)
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