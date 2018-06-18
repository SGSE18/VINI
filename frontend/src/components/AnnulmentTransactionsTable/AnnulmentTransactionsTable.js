import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./AnnulmentTransactionsTable.css";
import { ModalPopup } from '../';
import { observer } from 'mobx-react';
import { USER_LEVEL, ANNULMENT_PATH, TRANSACTION_PENDING } from '../../constants';
import { authenticationStore } from '../../stores';

const NO_DATA_AVAILABLE_TEXT = "Keine Daten vorhanden";

const ButtonStatus = {
    NOTHING_CLICKED: 0,
    ACCEPT_CLICKED: 1,
    DECLINE_CLICKED: 2
}

class AnnulmentTransactionsTable extends React.Component {

    constructor(props) {
        super(props);
        this.onModalClose = this.onModalClose.bind(this);
        this.translationTexts = {
            previousText: 'Vorherige', nextText: 'Nächste', loadingText: 'Daten werden geladen...',
            pageText: 'Seite', ofText: 'von', rowsText: 'Einträge'
        };
        this.state = {
            clickedState: ButtonStatus.NOTHING_CLICKED,
            clickedCellIndex: -1,
            isPopupVisible: false,
            data: [],
            popupTitle: "",
            popupDescription: ""
        };
        this.displayPopup = this.displayPopup.bind(this);

        fetch(ANNULMENT_PATH,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + authenticationStore.token
                },
            })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                if(json.transactionPayload === undefined) throw new TypeError("invalid response body (annulment)")
                // filter out every transaction that's state is not pending (should not be the case though!)
                let data = json.transactionPayload;
                    data = data
                    .filter(row => row.state === TRANSACTION_PENDING)
                    .filter(row => !isNaN(Date.parse(row.timestamp))) // filter invalid timestamps
                    .sort((rowA, rowB) => new Date(rowB.timestamp).getTime() - new Date(rowA.timestamp).getTime()) // descending by time
                this.setState({ data });
            })
            .catch(message => {
                console.error(message)
            })
    }

    checkBox = (cell) => {
        return (
            <input
                type="checkbox"
                className="checkbox"
                checked={cell.value}
                readOnly={true}
            />
        );
    }
    displayPopup(title, description) {
        this.setState({
            isPopupVisible: true,
            popupTitle: title,
            popupDescription: description
        })
    }

    onAcceptClick(clickedCellIndex) {
        this.setState({ clickedState: ButtonStatus.ACCEPT_CLICKED, clickedCellIndex })
        this.displayPopup("Anfrage annehmen", "Transaktion annullieren?")
    }
    onDeclineClick(clickedCellIndex) {
        this.setState({ clickedState: ButtonStatus.DECLINE_CLICKED, clickedCellIndex })
        this.displayPopup("Anfrage ablehnen", "Anfrage abbrechen?")
    }

    onModalClose(isActionConfirmed) {
        if (isActionConfirmed === true) {

            if (this.state.clickedState === ButtonStatus.ACCEPT_CLICKED) {
                const transaction = this.state.data[this.state.clickedCellIndex];
                console.log("Bestätige Annullierung für: " + transaction.transactionId);
            } else if (this.state.clickedState === ButtonStatus.DECLINE_CLICKED) {
                const transaction = this.state.data[this.state.clickedCellIndex];
                console.log("Lehne ab: " + transaction.transactionId);
            }
        }

        this.setState({
            isPopupVisible: false,
            clickedState: ButtonStatus.NOTHING_CLICKED // reset state
        })
    }

    annulmentCell = (cell) => {
        let onAcceptClick = null;
        let onDeclineClick = null;
        let className = "";
        if (this.props.userLevel >= USER_LEVEL.STVA &&
            cell.value === TRANSACTION_PENDING) {
            className = "annulment-link";
            onAcceptClick = this.onAcceptClick.bind(this, cell.index);
            onDeclineClick = this.onDeclineClick.bind(this, cell.index);

        } else {
            return <div /> // should not happen!
        }
        return (
            <React.Fragment>
                <div style={{ display: 'inline' }}
                    className={className} // mimic anchor tag style for annulment links
                    onClick={onAcceptClick}     // 
                >
                    annehmen
                </div>
                <span>   </span>
                <div style={{ display: 'inline' }}
                    className={className} // mimic anchor tag style for annulment links
                    onClick={onDeclineClick}     // 
                >
                    ablehnen
                </div>
            </React.Fragment>
        );
    }
    getColumnDefinition() {
        let columnDefinition = [{
            Header: 'Datum',
            id: "date",
            accessor: d => {
                const date = new Date(d.timestamp);
                let timestamp = date.toString(); // fallback
                try {
                    timestamp = date.toISOString().substring(0, 10); // yyyy-mm-dd
                } catch (ex) {
                    console.error(ex);
                }
                return timestamp;

            }
        }, {
            Header: 'FIN',
            accessor: 'vin'
        }, {
            Header: 'KM',
            accessor: 'mileage'
        }, {
            Header: '# Vorbesitzer',
            accessor: 'ownerCount'
        }, {
            Header: 'Eintragender',
            accessor: 'entrant'
        }, {
            Header: 'TÜV',
            accessor: 'mainInspection',
            Cell: this.checkBox
        }, {
            Header: 'Inspektion I',
            accessor: 'service1',
            Cell: this.checkBox
        }, {
            Header: 'Inspektion II',
            accessor: 'service2',
            Cell: this.checkBox
        }, {
            Header: 'Ölwechsel',
            accessor: 'oilChange',
            Cell: this.checkBox
        }, {
            Header: 'Antragsteller',
            accessor: 'applicant'
        }];

        columnDefinition.push({
            Header: 'Antrag',
            accessor: 'state',
            Cell: this.annulmentCell,
        });
        return columnDefinition;
    }

    render() {
        if (this.props.userLevel === undefined || (this.props.userLevel !== USER_LEVEL.STVA && this.props.userLevel !== USER_LEVEL.ASTVA)) {
            return <div style={{ margin: 'auto' }}> Nicht autorisiert! Bitte einloggen!</div>
        }
        return (
            <React.Fragment>
                <ModalPopup
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    isOpen={this.state.isPopupVisible}
                    onClose={this.onModalClose}
                    title={this.state.popupTitle}
                    description={this.state.popupDescription}
                />
                <ReactTable
                    style={{ width: '100%' }}
                    {...this.translationTexts}
                    data={this.state.data}
                    columns={this.getColumnDefinition()}
                    filterable
                    defaultFilterMethod={(filter, row) => String(row[filter.id]).toUpperCase().indexOf(String(filter.value).toUpperCase()) >= 0}
                    defaultPageSize={10}
                    noDataText={NO_DATA_AVAILABLE_TEXT}
                />
            </ React.Fragment>
        )
    }
};

const WrappedAnnulmentTransactionsTable = observer(AnnulmentTransactionsTable);
WrappedAnnulmentTransactionsTable.propTypes = {
    userLevel: PropTypes.number.isRequired,
}
export default WrappedAnnulmentTransactionsTable;