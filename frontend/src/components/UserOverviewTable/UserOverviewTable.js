import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./UserOverviewTable.css";
import { ModalPopup } from '../';
import { observer } from 'mobx-react';
import { getAuthorityString, DELETE_USER_PATH } from '../../constants';
import { READ_USER_PATH } from '../../constants';
import { authenticationStore, popupStore } from '../../stores';

class UserOverviewTable extends React.Component {

    constructor(props) {
        super(props);

        this.onModalClose = this.onModalClose.bind(this);
        this.translationTexts = {
            previousText: 'Vorherige', nextText: 'Nächste', loadingText: 'Daten werden geladen...',
            pageText: 'Seite', ofText: 'von', rowsText: 'Einträge'
        };
        this.state = {
            data: [],
            clickedCellIndex: -1,
            isPopupVisible: false
        };
        this.updateUserData = this.updateUserData.bind(this);
        this.updateUserData();
    }

    updateUserData() {
        fetch(READ_USER_PATH,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + authenticationStore.token
                },
            })
            .then(response => response.json())
            .then(json => {
                const data = json.users;
                this.setState({ data });
            })
            .catch(error => {
                if (error && error.message) {
                    popupStore.showPopup("Fehler", error.message)
                } else {
                    popupStore.showPopup("Fehler", JSON.stringify(error))
                }
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

    onAnnulmentClick(clickedCellIndex) {

        this.setState({ clickedCellIndex, isPopupVisible: true })
    }
    dateCell = (cell) => {
        try {
            const date = new Date(cell.value);
            const dateStr = date.getFullYear() + '-';
            let month = date.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
            let day = date.getDate();
            day = day < 10 ? "0" + day : day
            return dateStr + month + '-' + day;
        } catch (ex) {
            return cell.value;
        }

    }
    authorityLevelCell = (cell) => {
        return getAuthorityString(cell.value);
    }
    annulmentCell = (row) => {
        return (
            <div
                className="annulment-link"      // mimic anchor tag style for annulment links
                onClick={this.onAnnulmentClick.bind(this, row.index)}
            >
                Löschen
            </div>
        );
    }
    getColumnDefinition() {
        let columnDefinition = [{
            Header: 'Vorname',
            accessor: 'forename' // String-based value accessors!
        }, {
            Header: 'Nachname',
            accessor: 'surname'
        }, {
            Header: 'Unternehmen',
            accessor: 'company'
        }, {
            Header: 'E-Mail',
            accessor: 'email'
        }, {
            Header: 'Autoritätsebene',
            accessor: 'authorityLevel',
            Cell: this.authorityLevelCell
        }, {
            Header: 'Erstelldatum',
            accessor: 'date',
            Cell: this.dateCell
        }, {
            Header: 'Aktion',
            Cell: this.annulmentCell,
        }
        ];

        return columnDefinition;
    }
    onModalClose(isActionConfirmed) {
        if (isActionConfirmed === true) {
            const user = this.state.data[this.state.clickedCellIndex];
            fetch(DELETE_USER_PATH,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Method": "DELETE",
                        'Authorization': "Bearer " + authenticationStore.token
                    },
                    body: JSON.stringify(user)
                })
                .then(response => response.json() )
                .then(json => {
                    this.updateUserData();
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
                    title="Benutzer löschen"
                    description="Soll der Benutzer wirklich gelöscht werden?"
                />
                <ReactTable
                    filterable
                    style={{ width: '100%' }}
                    {...this.translationTexts}
                    data={this.state.data}
                    columns={this.getColumnDefinition()}
                    defaultPageSize={10}
                    noDataText="Keine User gefunden."
                />
            </ React.Fragment>
        )
    }
};

const WrappedUserOverviewTable = observer(UserOverviewTable);
WrappedUserOverviewTable.propTypes = {
    userLevel: PropTypes.number.isRequired
}

export default WrappedUserOverviewTable;