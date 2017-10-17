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
        ['Nina', 'Simone'],
        ['Sonny', 'Rollins'],
        ['Kamasi', 'Washington']
      ]
    }
    return (
     <DataTable
       id='dt'
       data={data}
       showRowNum={true} />
   )
  }
}
