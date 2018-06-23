import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./AnnulmentTransactionsTable.css";
import { ModalPopup } from '../';
import { observer } from 'mobx-react';
import { USER_LEVEL, GET_ANNULMENT_PATH, DECLINE_ANNULMENT_PATH, ACCEPT_ANNULMENT_PATH, TRANSACTION_PENDING, TRANSACTION_INVALID } from '../../constants';
import { authenticationStore, popupStore } from '../../stores';

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

        this.refreshAnnulments();
    }
    refreshAnnulments() {
        fetch(GET_ANNULMENT_PATH,
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
                if (!json.annulments) throw new TypeError("invalid response body (annulment)")
                let data = json.annulments;
                data = data
                    .filter(row => row.state === TRANSACTION_PENDING || row.state === TRANSACTION_INVALID)
                    // ascending by time, pending first
                    .sort((rowA, rowB) => {
                        const aState = rowA.state;
                        const bState = rowB.state;

                        if (aState === TRANSACTION_PENDING && bState === TRANSACTION_INVALID) {
                            return -1;
                        }
                        if (bState === TRANSACTION_PENDING && aState === TRANSACTION_INVALID) {
                            return 1;
                        }

                        const aTime = this.parseDateString(rowA.date).getTime();
                        if (!aTime) return -1;
                        const bTime = this.parseDateString(rowB.date).getTime();
                        if (!bTime) return 1;
                        return aTime - bTime;
                    })
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
            const transaction = this.state.data[this.state.clickedCellIndex];
            const body = {
                vin: transaction.vin,
                transactionHash: transaction.transactionHash,
                timestamp: new Date().toISOString(),
                email: transaction.applicant
            }
            if (this.state.clickedState === ButtonStatus.ACCEPT_CLICKED) {
                fetch(ACCEPT_ANNULMENT_PATH,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': "Bearer " + authenticationStore.token
                        },
                        body: JSON.stringify(body)
                    })
                    .then(response => response.json())
                    .then(json => {
                        this.refreshAnnulments();
                        if (json && json.message) {
                            popupStore.showPopup("", json.message)
                        } else {
                            popupStore.showPopup("", JSON.stringify(json))
                        }
                    })
                    .catch(error => {
                        if (error && error.message) {
                            popupStore.showPopup("Fehler", error.message)
                        } else {
                            popupStore.showPopup("Fehler", JSON.stringify(error))
                        }
                    })

            } else if (this.state.clickedState === ButtonStatus.DECLINE_CLICKED) {
                fetch(DECLINE_ANNULMENT_PATH,
                    {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            "Access-Control-Allow-Method": "DELETE",
                            'Authorization': "Bearer " + authenticationStore.token
                        },
                        body: JSON.stringify(body)
                    })
                    .then(response => response.json())
                    .then(json => {
                        this.refreshAnnulments();
                        if (json && json.message) {
                            popupStore.showPopup("", json.message)
                        } else {
                            popupStore.showPopup("", JSON.stringify(json))
                        }
                    })
                    .catch(error => {
                        if (error && error.message) {
                            popupStore.showPopup("Fehler", error.message)
                        } else {
                            popupStore.showPopup("Fehler", JSON.stringify(error))
                        }
                    })
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
            return <div> angenommen</div>
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
    parseDateString(s) {
        if (!s) {
            return new Date("invalid"); // invlid date
        }
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], b[1], b[2], b[3], b[4], b[5], 0));
    }
    getColumnDefinition() {
        let columnDefinition = [{
            Header: 'Datum',
            id: "date",
            accessor: d => {
                const date = this.parseDateString(d.date);
                let timestamp = date.toString(); // fallback
                try {
                    timestamp = date.toISOString().substring(0, 10); // yyyy-mm-dd
                } catch (ex) {
                    console.error(timestamp, ex);
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
            Header: 'Service I',
            accessor: 'service1',
            Cell: this.checkBox
        }, {
            Header: 'Service II',
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
        if (!this.props.userLevel || (this.props.userLevel !== USER_LEVEL.STVA && this.props.userLevel !== USER_LEVEL.ASTVA)) {
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