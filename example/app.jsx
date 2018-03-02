import React from 'react';
import DataTable from '../src/data-table.jsx';

export default class App extends React.Component {
  render() {
    const data = {
      'headings': ['First Name', 'Last Name', 'Instrument'],
      'data': [
        ['Miles', 'Davis', 'Trumpet'],
        ['John', 'Coltrane', 'Saxophone'],
        ['Ornette', 'Coleman', 'Saxophone'],
        ['Nina', 'Simone', 'Vocals & Piano'],
        ['Sonny', 'Rollins', 'Saxophone'],
        ['Kamasi', 'Washington', 'Saxophone']
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
       title='Example Table'
       headerStyle={headerStyle}
       rowStyle={rowStyle}
       showRowNum={true} />
   )
  }
}
