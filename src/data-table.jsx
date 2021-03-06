import React from 'react';
import PropTypes from 'prop-types';
import { Parser } from './parser.js';
import Styles from './styles.js';
import DataRow from './data-row.jsx';
import DataHeader from './data-header.jsx';
import DataFilter from './data-filter.jsx';

export default class DataTable extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    data: PropTypes.object.isRequired,
    filterable: PropTypes.bool,
    placeholderFilterText: PropTypes.string,
    onFilter: PropTypes.func,
    unfilterableCol: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    ),
    sortable: PropTypes.bool,
    unsortableCol: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    ),
    defaultSortedCol: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        PropTypes.string
      ),
      PropTypes.shape({
        column: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        direction: PropTypes.string
      })
    ]),
    paginate: PropTypes.bool,
    pageLimit: PropTypes.number,
    onRowSelect: PropTypes.func,
    onRowHover: PropTypes.func,
    showRowNum: PropTypes.bool,
    titleStyle: PropTypes.object,
    tableStyle: PropTypes.object,
    headerStyle: PropTypes.object,
    rowStyle: PropTypes.object,
    entryStyle: PropTypes.object
  };

  static defaultProps = {
    paginate: false,
    pageLimit: 10,
    filterable: true,
    placeholderFilterText: 'Filter...',
    onFilter: () => {},
    unfilterableCol: [],
    sortable: true,
    unsortableCol: [],
    onRowSelect: () => {},
    onRowHover: () => {},
    showRowNum: true,
    titleStyle: {},
    tableStyle: {},
    headerStyle: {},
    rowStyle: {},
    entryStyle: {}
  };

  constructor(props) {
    super(props);
    const data = Parser.parseData(this.props.data.data);
    const headings = Parser.parseHeadings(this.props.data);
    const { sortedIndex, direction } = this.normalizeSortedCol(headings);
    const unfilterableCol = this.normalizeUnfilterableCol();

    this.state = {
      rawData: data,
      displayData: data,
      headings: headings,
      selectedRow: null,
      hoveredRow: null,
      sortedCol: sortedIndex,
      sortDirection: direction,
      filter: '',
      unfilterableCol: unfilterableCol,
      focused: false
    };
  }

  /**
   *  =====================
   *  =    Normalizers    =
   *  =====================
   */

   normalizeUnfilterableCol() {
     let unfilterableCol = [];
     for (let entry of this.props.unfilterableCol) {
       if (typeof entry === 'number') {
         unfilterableCol.push(entry);
       }
       else {
         const entryLoc = this.state.headings.indexOf(entry);
         unfilterableCol.push(entryLoc);
       }
     }

     return unfilterableCol
   }

   normalizeSortedCol(headings) {
     const determineIndex = (value) => {
       return typeof value === 'string' ? headings.indexOf(value) : value;
     }

     let sortedIndex = 0;
     let direction = 'asc';
     if (this.props.defaultSortedCol) {
       if (this.props.defaultSortedCol instanceof Array) {
         sortedIndex = determineIndex(this.props.defaultSortedCol[0], headings);
         direction = this.props.defaultSortedCol[1];
       }
       else if (this.props.defaultSortedCol instanceof Object) {
         sortedIndex = determineIndex(this.props.defaultSortedCol.column, headings);
         direction = this.props.defaultSortedCol.direction;
       }
       else {
         sortedIndex = determineIndex(this.props.defaultSortedCol, headings);
       }
     }

     return { sortedIndex, direction };
   }

  /**
   *  ======================
   *  =   Style Managers   =
   *  ======================
   */

  getStyle = () => {
    return Object.assign({}, this.props.tableStyle, Styles.baseTable);
  }

  getTitleStyle = () => {
    return Object.assign({}, this.props.titleStyle, Styles.baseTitle);
  }

  /**
   *  ======================
   *  =   Event Managers   =
   *  ======================
   */

  onRowSelect = (event, rowData) => {
    this.setState({selectedRow: rowData[0]});
    this.props.onRowSelect(event, rowData);
  };

  onRowHover = (event, rowData, leaving=false) => {
    const rowNum = leaving ? null : rowData[0];
    this.setState({hoveredRow: rowNum});
    this.props.onRowHover(event, rowData, leaving);
  };

  onFilter = (event) => {
    if (!this.props.filterable) {
      return;
    }

    this.setState({
      filter: event.target.value,
      displayData: Parser.filter(this.state.rawData, event.target.value, this.state.unfilterableCol)
    });
    this.props.onFilter(event);
  };

  onFilterFocus = (event) => {
    this.setState({
      focused: !this.state.focused
    });
  };

  onHeaderSelect = (colIndex) => {
    const reverseDirection = (direction) => {
      return direction === 'asc' ? 'desc' : 'asc';
    }

    if (this.props.sortable) {
      const colHeader = this.state.headings[colIndex];
      if (!this.props.unsortableCol.length ||
          !this.props.unsortableCol.includes(colIndex) ||
          !this.props.unsortableCol.includes(colHeader)) {
        let direction = this.state.sortDirection;
        if (this.state.sortedCol === colIndex) {
          direction = reverseDirection(direction);
        }
        else {
          direction = 'asc';
        }
        this.setState({
          displayData: Parser.sort(this.state.rawData, colIndex, direction),
          sortedCol: colIndex,
          sortDirection: direction
        });
      }
    }
  };

  /**
   *  =======================
   *  =   Render Managers   =
   *  =======================
   */

  renderFilter() {
    if (this.props.filterable) {
      return (
        <DataFilter
          value={this.state.filter}
          focused={this.state.focused}
          placeHolderText={this.props.placeholderFilterText}
          onFilter={this.onFilter}
          onFocus={this.onFilterFocus} />
      )
    }
  }

  renderHeadings() {
    if (this.state.headings) {
      return (
        <DataHeader
          data={this.state.headings}
          onClick={this.onHeaderSelect}
          sortedCol={this.state.sortedCol}
          sortDirection={this.state.sortDirection}
          rowStyle={this.props.rowStyle}
          entryStyle={this.props.headerStyle}
          showRowNum={this.props.showRowNum} />
      );
    }
  };

  renderRows() {
    if (this.state.displayData == null || this.state.displayData === []) {
      return <span style={{textAlign: 'center'}}>No Data</span>;
    }

    return this.state.displayData.map((row, index) => {
      return (
        <DataRow
          key={index}
          data={row}
          selected={this.state.selectedRow === row[0]}
          onClick={this.onRowSelect}
          hovered={this.state.hoveredRow === row[0]}
          onHover={this.onRowHover}
          rowStyle={this.props.rowStyle}
          entryStyle={this.props.entryStyle}
          rowNum={index}
          showRowNum={this.props.showRowNum} />
      )
    });
  }

  render() {
    const style = this.getStyle();
    const titleStyle = this.getTitleStyle();
    const filter = this.renderFilter();
    const heading = this.renderHeadings();
    const rows = this.renderRows();

    return (
      <div id={this.props.id} className='dt-outer'>
        <div className='dt-table' style={style}>
          <div style={{display: 'table-caption'}}>
            <div style={Styles.baseCaption}>
              <div style={titleStyle}>{this.props.title}</div>
              {filter}
            </div>
          </div>
          <div style={{display: 'table-row-group'}}>
            {heading}
            {rows}
          </div>
        </div>
      </div>
    )
  };
}
