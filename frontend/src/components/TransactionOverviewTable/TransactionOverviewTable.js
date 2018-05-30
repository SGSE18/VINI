import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./TransactionOverviewTable.css";
import { ModalPopup } from '../';
import { observer } from 'mobx-react';

const TRANSACTION_VALID_TEXT = "valid";
const TRANSACTION_INVALID_TEXT = "invalid";
const TRANSACTION_PENDING_TEXT = "offen";
const NO_DATA_AVAILABLE_TEXT = "Keine Daten vorhanden";

class TransactionOverviewTable extends React.Component {

    constructor(props) {
        super(props);

        this.onAnnulmentClick = this.onAnnulmentClick.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.translationTexts = {
            previousText: 'Vorherige', nextText: 'Nächste', loadingText: 'Daten werden geladen...',
            pageText: 'Seite', ofText: 'von', rowsText: 'Einträge'
        };
        // TODO remove
        const data = [{
            date: "20.05.2018",
            mileage: 100000,
            preowner: 1,
            entrant: "STVA",
            mainInspection: true,
            Inspection1: false,
            Inspection2: false,
            oilChange: false,
            state: TRANSACTION_PENDING_TEXT
        },
        {
            date: "19.05.2018",
            mileage: 90000,
            preowner: 1,
            entrant: "Werkstatt",
            mainInspection: false,
            Inspection1: true,
            Inspection2: false,
            oilChange: false,
            state: TRANSACTION_INVALID_TEXT
        },
        {
            date: "19.05.2018",
            mileage: 90000,
            preowner: 1,
            entrant: "Werkstatt",
            mainInspection: false,
            Inspection1: true,
            Inspection2: false,
            oilChange: false,
            state: TRANSACTION_VALID_TEXT
        },
        {
            date: "19.05.2018",
            mileage: 90000,
            preowner: 1,
            entrant: "Werkstatt",
            mainInspection: false,
            Inspection1: true,
            Inspection2: false,
            oilChange: false,
            state: TRANSACTION_VALID_TEXT
        },
        {
            date: "19.05.2018",
            mileage: 90000,
            preowner: 1,
            entrant: "Werkstatt",
            mainInspection: false,
            Inspection1: true,
            Inspection2: false,
            oilChange: false,
            state: TRANSACTION_VALID_TEXT
        },
        {
            date: "19.05.2018",
            mileage: 90000,
            preowner: 1,
            entrant: "Werkstatt",
            mainInspection: false,
            Inspection1: true,
            Inspection2: false,
            oilChange: false,
            state: TRANSACTION_INVALID_TEXT
        },
        {
            date: "19.05.2018",
            mileage: 90000,
            preowner: 1,
            entrant: "Werkstatt",
            mainInspection: false,
            Inspection1: true,
            Inspection2: false,
            oilChange: false,
            state: TRANSACTION_VALID_TEXT
        },
        {
            date: "19.05.2018",
            mileage: 90000,
            preowner: 1,
            entrant: "Werkstatt",
            mainInspection: false,
            Inspection1: true,
            Inspection2: false,
            oilChange: false,
            state: TRANSACTION_VALID_TEXT
        },
        {
            date: "19.05.2018",
            mileage: 90000,
            preowner: 1,
            entrant: "Werkstatt",
            mainInspection: false,
            Inspection1: true,
            Inspection2: false,
            oilChange: false,
            state: TRANSACTION_VALID_TEXT
        },
        {
            date: "19.05.2018",
            mileage: 90000,
            preowner: 1,
            entrant: "Werkstatt",
            mainInspection: false,
            Inspection1: true,
            Inspection2: false,
            oilChange: false,
            state: TRANSACTION_VALID_TEXT
        },
        {
            date: "19.05.2018",
            mileage: 90000,
            preowner: 1,
            entrant: "Werkstatt",
            mainInspection: false,
            Inspection1: true,
            Inspection2: false,
            oilChange: false,
            state: TRANSACTION_VALID_TEXT
        }]
        this.state = {
            data,
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

    onAnnulmentClick() {
        this.setState({ isPopupVisible: true })
    }

    annulmentCell = (cell) => {
        let text;
        let onClick = null;
        let className = "";

        switch (cell.value) {
            case TRANSACTION_VALID_TEXT:
                text = "Annullierung beantragen";
                className = "annulment-link";
                onClick = this.onAnnulmentClick;
                break;
            case TRANSACTION_INVALID_TEXT:
                text = "Bereits annulliert";
                break;
            case TRANSACTION_PENDING_TEXT:
                text = "Annullierung beantragt"
                break;
            default:
                text = "invalid state";
                break;
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
            accessor: 'date' // String-based value accessors!
        }, {
            Header: 'KM',
            accessor: 'mileage'
        }, {
            Header: '# Vorbesitzer',
            accessor: 'preowner'
        }, {
            Header: 'Eintragender',
            accessor: 'entrant'
        }, {
            Header: 'TÜV',
            accessor: 'mainInspection',
            Cell: this.checkBox
        }, {
            Header: 'Inspektion I',
            accessor: 'Inspection1',
            Cell: this.checkBox
        }, {
            Header: 'Inspektion II',
            accessor: 'Inspection2',
            Cell: this.checkBox
        }, {
            Header: 'Ölwechsel',
            accessor: 'oilChange',
            Cell: this.checkBox
        }];

        if (this.props.userLevel > 0) {
            columnDefinition.push({
                Header: 'Annullieren',
                accessor: 'state',
                Cell: this.annulmentCell
            });
        }
        return columnDefinition;
    }
    determineCellBackgroundColor(rowInfo) {
        let backgroundColor = "";
        if (rowInfo != null) {
            if (rowInfo.row.state === TRANSACTION_INVALID_TEXT) {
                backgroundColor = "#ff3c3c";
            } else if (rowInfo.row.state === TRANSACTION_PENDING_TEXT) {
                backgroundColor = "#d8d8d8";
            }
        }
        return backgroundColor;
    }
    onModalClose(isActionConfirmed) {
        if (isActionConfirmed === true) {
            alert("Simulierte REST-Anfrage... :)");
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
                    {...this.translationTexts}
                    data={this.state.data}
                    columns={ this.getColumnDefinition() }
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

TransactionOverviewTable.propTypes = {
    userLevel: PropTypes.number.isRequired
}

export default observer(TransactionOverviewTable);