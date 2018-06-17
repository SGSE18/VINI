import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./TransactionOverviewTable.css";
import { ModalPopup } from '../';
import { observer } from 'mobx-react';
import { USER_LEVEL, TRANSACTION_VALID, TRANSACTION_INVALID, TRANSACTION_PENDING, TRANSACTION_REJECTED } from '../../constants';

const NO_DATA_AVAILABLE_TEXT = "Keine Daten vorhanden";

class TransactionOverviewTable extends React.Component {

    constructor(props) {
        super(props);
        this.onModalClose = this.onModalClose.bind(this);
        this.translationTexts = {
            previousText: 'Vorherige', nextText: 'Nächste', loadingText: 'Daten werden geladen...',
            pageText: 'Seite', ofText: 'von', rowsText: 'Einträge'
        };
        this.state = {
            clickedCellIndex: -1,
            isPopupVisible: false
        };
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

    onAnnulmentClick(clickedCellIndex) {

        this.setState({ clickedCellIndex, isPopupVisible: true })
    }
    getAnullmentColumnText(cellValue) {
        switch (cellValue) {
            case TRANSACTION_VALID:
                return "Annullierung beantragen";
            case TRANSACTION_INVALID:
                return "Bereits annulliert";
            case TRANSACTION_PENDING:
                return "Annullierung beantragt"
            case TRANSACTION_REJECTED:
                return "Annullierung abgebrochen"
            default:
                return "invalid state";
        }
    }
    annulmentCell = (cell) => {
        let onClick = null;
        let className = "";
        const text = this.getAnullmentColumnText(cell.value);
        if (this.props.userLevel > USER_LEVEL.NOT_LOGGED_IN && 
            cell.value === TRANSACTION_VALID) {

            className = "annulment-link";
            onClick = this.onAnnulmentClick.bind(this, cell.index);
        }
        return (
            <div
                className={className} // mimic anchor tag style for annulment links
                onClick={onClick}     // 
            >
                {text}
            </div>
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
        }];

        columnDefinition.push({
            Header: 'Annullieren',
            accessor: 'state',
            Cell: this.annulmentCell,
            filterMethod: (filter, row) => this.getAnullmentColumnText(row[filter.id]).toUpperCase().indexOf(String(filter.value).toUpperCase()) >= 0
        });
        return columnDefinition;
    }
    determineCellBackgroundColor(rowInfo) {
        let backgroundColor = "";
        if (rowInfo != null) {
            if (rowInfo.row.state === TRANSACTION_INVALID) {
                backgroundColor = "#ff3c3c";
            } else if (rowInfo.row.state === TRANSACTION_PENDING) {
                backgroundColor = "#d8d8d8";
            } else if (rowInfo.row.state === TRANSACTION_REJECTED) {
                backgroundColor = "#eeee15";
            }
        }
        return backgroundColor;
    }
    onModalClose(isActionConfirmed) {
        if (isActionConfirmed === true) {
            const transaction = this.props.carTransactionData[this.state.clickedCellIndex];
            console.log("Beantrage Annullierung für: " + transaction.transactionId);
        }
        this.setState({ isPopupVisible: false })
    }
    render() {
        return (
            <React.Fragment>
                <ModalPopup
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    isOpen={this.state.isPopupVisible}
                    onClose={this.onModalClose}
                    title="Transaktion annullieren"
                    description="Soll die Transaktion wirklich annulliert werden?"
                />
                <ReactTable
                    style={{ width: '100%' }}
                    {...this.translationTexts}
                    data={this.props.carTransactionData}
                    columns={this.getColumnDefinition()}
                    filterable
                    defaultFilterMethod={(filter, row) => String(row[filter.id]).toUpperCase().indexOf(String(filter.value).toUpperCase()) >= 0}
                    defaultPageSize={10}
                    noDataText={NO_DATA_AVAILABLE_TEXT}
                    getTrProps={(state, rowInfo, column) => {
                        let backgroundColor = this.determineCellBackgroundColor(rowInfo)
                        return {
                            style: { backgroundColor }
                        };
                    }}
                />
            </ React.Fragment>
        )
    }
};

const WrappedTransactionOverviewTable = observer(TransactionOverviewTable);
WrappedTransactionOverviewTable.propTypes = {
    userLevel: PropTypes.number.isRequired,
}
export default WrappedTransactionOverviewTable;