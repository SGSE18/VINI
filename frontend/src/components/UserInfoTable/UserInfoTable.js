import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./UserInfoTable.css";
import Modal from '@material-ui/core/Modal';

const TRANSACTION_VALID_TEXT = "valid";
const TRANSACTION_INVALID_TEXT = "invalid";
const TRANSACTION_PENDING_TEXT = "offen";
const NO_DATA_AVAILABLE_TEXT = "Keine Daten vorhanden";

class UserInfoTable extends React.Component {
    constructor() {
        super();
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
            data
        };
        this.columns = this.getColumnDefinition();
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
        alert("Simulierte REST-Anfrage... :)")
    }

    annulmentCell = (cell) => {
        let text;
        let onClick = null;
        let className = "";

        switch (cell.value) {
            case TRANSACTION_VALID_TEXT:
                text = "Annulierung beantragen";
                className = "annulment-link";
                onClick = this.onAnnulmentClick;
                break;
            case TRANSACTION_INVALID_TEXT:
                text = "Bereits annuliert";
                break;
            case TRANSACTION_PENDING_TEXT:
                text = "Annulierung beantragt"
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
        return [{
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
        }, {
            Header: 'Annulieren',
            accessor: 'state',
            Cell: this.annulmentCell
        }
        ];
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

    render() {
        return <ReactTable
            {...this.translationTexts}
            data={this.state.data}
            columns={this.columns}
            defaultPageSize={10}
            noDataText={NO_DATA_AVAILABLE_TEXT}
            getTrProps={(state, rowInfo, column) => {
                let backgroundColor = this.determineCellBackgroundColor(rowInfo)
                return {
                    style: { backgroundColor }
                };
            }}
        />
    }
}

export default UserInfoTable;