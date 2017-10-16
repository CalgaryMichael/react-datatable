import React from 'react';
import DataTable from '../src/datatable.jsx';

export default class App extends React.Component {
  render() {
    const data = {
      'headings': ['First Name', 'Last Name'],
      'data': [
        ['Miles', 'Davis'],
        ['John', 'Coltrane'],
        ['Ornette', 'Coleman'],
      ]
    }
    return (
     <DataTable
       id='dt'
       data={data} />
   )
  }
}
