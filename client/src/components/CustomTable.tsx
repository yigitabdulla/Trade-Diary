import React, { useEffect, useState, memo } from 'react';
import dummyData from '../data/data2.json';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "../styles/customTable.scss"
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { MenuItem, Select } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { SearchState, DataType } from '../configs/types';

const CustomTable = () => {
  const [dynamicColumns, setDynamicColumns] = useState(Object.keys(dummyData[0] || {}));
  const [originalData] = useState<DataType[]>(dummyData);
  const [filteredData, setFilteredData] = useState<DataType[]>(dummyData);
  const [columnWidths, setColumnWidths] = useState(dynamicColumns.map(() => 150));
  const [visibleColumns, setVisibleColumns] = useState(dynamicColumns.map(() => true));
  const [search, setSearch] = useState<SearchState>({});
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [isSortVisible, setIsSortVisible] = useState(false);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isResizing, setIsResizing] = useState(false);
  const [draggedColIndex, setDraggedColIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    //adding 1 more state for actions column
    setVisibleColumns(prev => [...prev, true]);


    //fake loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [])

  //State change for single column search
  const handleSearch = (column: string, value: string) => {
    setSearch(prev => ({ ...prev, [column]: value }));
  };

  const handleRangeSearch = (column: string, bound: 'min' | 'max', value: string) => {
    const prevColumn = search[column] as { min?: number | ''; max?: number | '' } || {};
    setSearch(prev => ({
      ...prev,
      [column]: {
        ...prevColumn,
        [bound]: value ? Number(value) : ''
      }
    }));
  };

  //handling data filters
  useEffect(() => {
    let filtered = originalData.filter(item =>
      dynamicColumns.every(col => {
        const searchValue = search[col] || '';
        const itemValue = String(item[col]).toLowerCase();

        // Special case: if the column is 'age' and searchValue is a range
        if (col === 'price' && typeof searchValue === 'object') {
          const { min, max } = searchValue;
          const age = Number(item[col]); //whole column values
          //console.log(age)
          return (!min || age >= min) && (!max || age <= max); //returning valus between min and max
        }

        // Normal string filtering
        if (typeof searchValue === 'string') {
          return itemValue.includes(searchValue.toLowerCase());
        }
        //)
      })
    );

    // Global filtering
    if (globalSearch.trim()) {
      filtered = filtered.filter(item =>
        dynamicColumns.some(col =>
          String(item[col]).toLowerCase().includes(globalSearch.toLowerCase())
        )
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [search, globalSearch, originalData]);


  //opening sort selector and setting the corresponding column
  const handleSort = (column: string) => {
    setSelectedColumn(column);
    setIsSortVisible(!isSortVisible);
  };


  //sorting data
  const sortData = (column: string, direction: string) => {
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return 0; // fallback
    });

    setFilteredData(sorted);
    setIsSortVisible(false);
    setSelectedColumn('');
  };


  //changing column visibility
  const toggleColumnVisibility = (index: number) => {
    setVisibleColumns(prev => {
    const updated = [...prev];
    updated.splice(index, 1, !updated.splice(index, 1)[0]);
    return updated;
    });
    };

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  //console.log(indexOfLastRow)
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  //console.log(indexOfFirstRow)
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  //console.log(currentRows)
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  //console.log(totalPages)

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  const handleDragStart = (index: number, e: React.DragEvent<HTMLDivElement>) => {
    if (isResizing) {
      e.preventDefault(); // Prevent drag if resizing
      return;
    }
    setDraggedColIndex(index);

  };

  const handleDrop = (index: number) => {

    if (isResizing || draggedColIndex === null || draggedColIndex === index) {
      return;
    }

    //make copies of the current dynamicColumns, visibleColumns, and columnWidths arrays
    const newDynamicColumns = [...dynamicColumns];
    const newVisibleColumns = [...visibleColumns];
    const newColumnWidths = [...columnWidths];

    //remove the dragged column's data (column name, visibility, width) from its original position
    const movedColumn = newDynamicColumns.splice(draggedColIndex, 1)[0];
    const movedVisibility = newVisibleColumns.splice(draggedColIndex, 1)[0];
    const movedWidth = newColumnWidths.splice(draggedColIndex, 1)[0];

    //insert the dragged column's data into the new position
    newDynamicColumns.splice(index, 0, movedColumn);
    newVisibleColumns.splice(index, 0, movedVisibility);
    newColumnWidths.splice(index, 0, movedWidth);

    //clear the dragged column index after drop is done
    setDraggedColIndex(null);

    //update the states with the new order
    setDynamicColumns(newDynamicColumns);
    setVisibleColumns(newVisibleColumns);
    setColumnWidths(newColumnWidths);
  };

  const handleDelete = (id: number) => {
    const newData = filteredData.filter(data => data.id !== id)
    setFilteredData(newData)
  }

  const getRangeValue = (column: string, bound: 'min' | 'max') => {
    const value = search[column];
    return typeof value === 'object' && value !== null ? value[bound] : '';
  };


  return (
    <div className="table-wrapper">
      <h1>Trade Table</h1>


      <div className="table-top">
        <input
          className="global-search"
          type="text"
          placeholder="Search..."
          value={globalSearch}
          onChange={(e) => setGlobalSearch(e.target.value)}
        />

        <div className="column-selector">
          <button className="selector-button" onClick={() => setShowColumnSelector(!showColumnSelector)}>
            Select Columns
          </button>
          {showColumnSelector && (
            <div className="dropdown">
              {dynamicColumns.map((col, idx) => (
                <label key={col} className="dropdown-item">
                  <input
                    type="checkbox"
                    checked={visibleColumns[idx]}
                    onChange={() => toggleColumnVisibility(idx)}
                  />
                  {col}
                </label>
              ))}
              <label className='dropdown-item'>
                <input
                  type="checkbox"
                  checked={visibleColumns[visibleColumns.length - 1]}
                  onChange={() => toggleColumnVisibility(visibleColumns.length - 1)}
                />
                actions
              </label>
            </div>
          )}
        </div>
      </div>

      {isLoading ? <div className='loading'>Data is loading <CircularProgress /></div> : <div className="table-container">
        <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 450 }} aria-label="custom table">
            <TableHead>
              <TableRow>
                {dynamicColumns.map((column, idx) =>
                  visibleColumns[idx] && (
                    <TableCell
                      key={column}
                      draggable={!isResizing} // disable dragging when resizing
                      onDragStart={(e) => handleDragStart(idx, e)} // pass the event
                      onDragOver={(e) => {
                        if (!isResizing) {
                          e.preventDefault();
                        }
                      }}
                      onDrop={(e) => {
                        if (!isResizing) {
                          handleDrop(idx);
                        }
                      }}
                      style={{ padding: 5, height: '80px' }}
                    >

                      <ResizableBox
                        width={columnWidths[idx]}
                        height={60}
                        axis="x"
                        resizeHandles={['e']}
                        onResizeStart={() => {
                          setIsResizing(true); //set resizing to true when resize starts
                        }}
                        onResizeStop={(e, { size }) => {
                          const updated = [...columnWidths];
                          updated[idx] = size.width;
                          setColumnWidths(updated);
                          setIsResizing(false); //reset when resize ends
                        }}
                      >
                        <div className="column-header">
                          <div>
                            <strong>{column[0].toUpperCase() + column.slice(1)}</strong>
                            <span
                              onClick={() => handleSort(column)}
                              className="sort-icon"
                            >
                              ↕
                            </span>
                            {isSortVisible && selectedColumn === column && (
                              <div className="sort-options">
                                <span onClick={() => sortData(column, 'asc')}>Ascending <p>▲</p></span>
                                <span onClick={() => sortData(column, 'dsc')}>Descending <p>▼</p></span>
                              </div>
                            )}
                          </div>
                          {column === 'price' ? (
                            <div className="range-inputs">
                              <input
                                type="number"
                                placeholder="Min"
                                value={getRangeValue(column, 'min')}
                                onChange={(e) => handleRangeSearch(column, 'min', e.target.value)}
                                className="range-input"
                              />
                              <input
                                type="number"
                                placeholder="Max"
                                value={getRangeValue(column, 'max')}
                                onChange={(e) => handleRangeSearch(column, 'max', e.target.value)}
                                className="range-input"
                              />

                            </div>
                          ) : (
                            <input
                              type="text"
                              placeholder={`Search ${column}`}
                              value={typeof search[column] === 'string' ? search[column] : ''}
                              onChange={(e) => handleSearch(column, e.target.value)}
                              className="search-input"
                            />

                          )}

                        </div>
                      </ResizableBox>
                    </TableCell>
                  )
                )}
                {visibleColumns[visibleColumns.length - 1] && <TableCell className='actions'><strong>Actions</strong></TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {currentRows.map((row) => (
                <TableRow key={row.id} className='data-row'>
                  {dynamicColumns.map((col, idx) =>
                    visibleColumns[idx] && (
                      <TableCell align='left' key={col} style={{ width: columnWidths[idx], border: 'none' }}>
                        {row[col]}
                      </TableCell>
                    )
                  )}
                  {visibleColumns[visibleColumns.length - 1] && <TableCell align='left'>
                    <EditOutlinedIcon onClick={() => console.log(row)} style={{ cursor: 'pointer' }} />
                    <DeleteOutlinedIcon onClick={() => handleDelete(row.id)} style={{ cursor: 'pointer' }} />
                  </TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>}

      {/* Pagination Controls */}
      <div className="pagination-container">
        <div className="pagination">
          <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>

        <div className="rows-per-page">
          <label htmlFor="rows-per-page-select">Rows per page: </label>
          <Select
            id="rows-per-page-select"
            value={rowsPerPage}
            onChange={(e) => {
              setCurrentPage(1); // reset to page 1
              setRowsPerPage(Number(e.target.value)); // Ensure the value is a number
            }}
            className="select-box"
            size="small"
          >
            {[5, 10, 15, 20].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>

        </div>
      </div>



    </div>
  );
}

export default memo(CustomTable);