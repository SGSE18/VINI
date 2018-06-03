import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter,Route } from "react-router-dom";
import AddEntryPage from './AddEntryPage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter><AddEntryPage /></BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
});
