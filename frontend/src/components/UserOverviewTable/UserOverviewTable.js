import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./UserOverviewTable.css";
import { ModalPopup } from '../';
import { observer } from 'mobx-react';
import { getAuthorityString } from '../../constants';
import { READ_USER_PATH } from '../../constants';

class UserOverviewTable extends React.Component {

    constructor(props) {
        super(props);

        this.onAnnulmentClick = this.onAnnulmentClick.bind(this);
        this.onModalClose = this.onModalClose.bind(this);
        this.translationTexts = {
            previousText: 'Vorherige', nextText: 'Nächste', loadingText: 'Daten werden geladen...',
            pageText: 'Seite', ofText: 'von', rowsText: 'Einträge'
        };
        this.state = {
            data: [],
            isPopupVisible: false
        };
        fetch(READ_USER_PATH,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(json => {
                console.log(json.transactionPayload)
                const data = json.transactionPayload;
                data.action= "dummy";
                this.setState({data});
            })
            .catch(message => {
                alert(message) // TODO
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

    onAnnulmentClick() {
        this.setState({ isPopupVisible: true })
    }
    authorityLevelCell = (cell) => {
        return getAuthorityString(cell.value);
    }
    annulmentCell = () => {
        return (
            <div
                className="annulment-link"      // mimic anchor tag style for annulment links
                onClick={this.onAnnulmentClick}     
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
        }, {
            Header: 'Erstelldatum',
            accessor: 'date'
        }, {
            Header: 'Aktion',
            accessor: 'action',
            Cell: this.annulmentCell,
        }
        ];

        return columnDefinition;
    }
    determineCellBackgroundColor(rowInfo) {
        let backgroundColor = "";
        if (rowInfo != null) {
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
                    title="Benutzer löschen"
                    description="Soll der Benutzer wirklich gelöscht werden?"
                />
                <ReactTable
                    style={{ width: '100%' }}
                    {...this.translationTexts}
                    data={this.state.data}
                    columns={this.getColumnDefinition()}
                    defaultPageSize={10}
                    noDataText="Keine User gefunden."
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

const WrappedUserOverviewTable = observer(UserOverviewTable);
WrappedUserOverviewTable.propTypes = {
    userLevel: PropTypes.number.isRequired
}

export default WrappedUserOverviewTable;