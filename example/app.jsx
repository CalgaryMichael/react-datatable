import React from 'react';
import DataTable from '../src/data-table.jsx';

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

    const rowStyle = {
      ':focus': {
        backgroundColor: 'blue',
        color: 'white'
      },
      ':hover': {
        backgroundColor: 'red'
      }
    }

    const headerStyle = {
      ':asc': {
        borderBottom: '1px solid black'
      },
      ':desc': {
        borderTop: '1px solid black'
      }
    }

    return (
     <DataTable
       id='dt'
       data={data}
       headerStyle={headerStyle}
       rowStyle={rowStyle}
       showRowNum={true} />
   )
  }
}
