import React from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class InfoTable extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    checkBox = (data) => {
        return (
            <input
                type="checkbox"
                className="checkbox"
                checked={data.value}
                readOnly={true}
            />
        );
    }
    render() {
        const data = [{
            date: "20.05.2018",
            mileage: 100000,
            preowner: 1,
            entrant: "STVA",
            mainInspection: true,
            Inspection1: false,
            Inspection2: false,
            oilChange: false,
            state: "valide"

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
            state: "valide"

        }]

        const columns = [{
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
            Header: 'Status',
            accessor: 'state'
        }
        ]

        return <ReactTable
            data={data}
            columns={columns}
        />
    }
}

export default InfoTable;