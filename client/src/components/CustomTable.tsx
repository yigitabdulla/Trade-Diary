import React, { useEffect, useState, memo, useMemo, useCallback } from 'react';
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
import { Button, MenuItem, Select } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import { SearchState, DataType } from '../configs/types';
import AddTrade from "./AddTrade"

const CustomTable = () => {
  const [dynamicColumns, setDynamicColumns] = useState(Object.keys(dummyData[0] || {}));
  const [originalData] = useState<DataType[]>(dummyData);
  const [columnWidths, setColumnWidths] = useState(dynamicColumns.map(() => 150));
  const [visibleColumns, setVisibleColumns] = useState(dynamicColumns.map(() => true));
  const [search, setSearch] = useState<SearchState>({});
  const [globalSearch, setGlobalSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'dsc' } | null>(null);
  const [selectedColumnForSortUI, setSelectedColumnForSortUI] = useState(''); // For controlling which sort dropdown is open
  const [isSortVisible, setIsSortVisible] = useState(false); // For controlling sort dropdown visibility
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [isResizing, setIsResizing] = useState(false);
  const [draggedColIndex, setDraggedColIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


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
  const handleSearch = useCallback((column: string, value: string) => {
    setSearch(prev => ({ ...prev, [column]: value }));
  }, []);

  const handleRangeSearch = useCallback((column: string, bound: 'min' | 'max', value: string) => {
    const prevColumn = search[column] as { min?: number | ''; max?: number | '' } || {};
    setSearch(prev => ({
      ...prev,
      [column]: {
        ...prevColumn,
        [bound]: value ? Number(value) : ''
      }
    }));
  }, [search]); // Dependency: search state if logic relies on previous range values

  // Debounce global search state update
  const [debouncedGlobalSearch, setDebouncedGlobalSearch] = useState(globalSearch);
  useEffect(() => {
    const handler = setTimeout(() => {
      setGlobalSearch(debouncedGlobalSearch);
    }, 300); // 300ms delay

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedGlobalSearch]);

  // Memoize the filtered data
  const filteredData = useMemo(() => {
    console.log("Filtering data..."); // For debugging: check how often this runs
    let filtered = originalData.filter(item =>
      dynamicColumns.every(col => {
        const searchValue = search[col];
        const itemValue = item[col];
        const itemValueString = String(itemValue).toLowerCase();

        // Handle range search for 'price'
        if (col === 'price' && typeof searchValue === 'object' && searchValue !== null) {
          const { min, max } = searchValue as { min?: number | ''; max?: number | '' };
          const numericValue = Number(itemValue);
          const minCheck = (min === '' || min === undefined || min === null) ? true : numericValue >= min;
          const maxCheck = (max === '' || max === undefined || max === null) ? true : numericValue <= max;
          return minCheck && maxCheck;
        }

        // Handle normal string filtering (ignore empty searches)
        if (typeof searchValue === 'string' && searchValue) {
          return itemValueString.includes(searchValue.toLowerCase());
        }

        // If no search value for this column, include the item
        return true;
      })
    );

    // Global filtering
    if (globalSearch.trim()) {
      const lowerGlobalSearch = globalSearch.toLowerCase();
      filtered = filtered.filter(item =>
        dynamicColumns.some(col =>
          String(item[col]).toLowerCase().includes(lowerGlobalSearch)
        )
      );
    }
    return filtered;
  }, [originalData, search, globalSearch, dynamicColumns]);

  // Reset page number when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, globalSearch]);


  // Memoize the sorted data based on filtered data and sort config
  const sortedAndFilteredData = useMemo(() => {
    console.log("Sorting data..."); // For debugging
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        // Handle null or undefined values consistently
        if (aVal === null || aVal === undefined) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bVal === null || bVal === undefined) return sortConfig.direction === 'asc' ? 1 : -1;

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortConfig.direction === 'asc'
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        }

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        }

        // Fallback to string comparison for mixed types or others
        return sortConfig.direction === 'asc'
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  // Update sort config state
  const requestSort = useCallback((key: string) => {
    let direction: 'asc' | 'dsc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'dsc';
    }
    setSortConfig({ key, direction });
    setIsSortVisible(false); // Close dropdown after selecting sort
    setSelectedColumnForSortUI(''); // Reset UI state
  }, [sortConfig]); // Added sortConfig dependency


  //changing column visibility
  const toggleColumnVisibility = (index: number) => {
    setVisibleColumns(prev => {
      const updated = [...prev];
      updated.splice(index, 1, !updated.splice(index, 1)[0]);
      return updated;
    });
  };

  // Memoize pagination calculations
  const totalPages = useMemo(() => Math.ceil(sortedAndFilteredData.length / rowsPerPage), [sortedAndFilteredData.length, rowsPerPage]);

  const currentRows = useMemo(() => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return sortedAndFilteredData.slice(indexOfFirstRow, indexOfLastRow);
  }, [sortedAndFilteredData, currentPage, rowsPerPage]);


  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }, [totalPages, setCurrentPage]); // Include totalPages and setCurrentPage


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

  const handleDelete = useCallback((id: number) => {
    // IMPORTANT: This should ideally trigger an update to the *source* of originalData
    // (e.g., call an API, update parent state via a prop function).
    // Directly filtering `filteredData` or `sortedAndFilteredData` here will break the flow.
    // For demonstration, we'll log it. Replace with your actual delete logic.
    console.log(`Request delete for ID: ${id}`);
    // Example: If originalData was state:
    // setOriginalData(prev => prev.filter(item => item.id !== id));
  }, []); // Add dependencies if your actual delete logic needs them (e.g., a prop function)

  const getRangeValue = (column: string, bound: 'min' | 'max') => {
    const range = search[column];
    // Check if the range object exists for the column
    if (typeof range === 'object' && range !== null) {
      // If the specific bound (min/max) exists, return it, otherwise return an empty string.
      return range[bound] ?? ''; // Use nullish coalescing to handle undefined/null
    }
    return '';
  };

  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('darkMode') === 'true')

  useEffect(() => {
    const handleStorageChange = () => {
      setIsDarkMode(localStorage.getItem('darkMode') === 'true')
    }

    window.addEventListener('storage', handleStorageChange)

    // optional: handle theme toggle in same tab
    const observer = new MutationObserver(() => {
      handleStorageChange()
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      observer.disconnect()
    }
  }, [])



  return (
    <div className="table-wrapper">
      <h1>Trade Table</h1>


      <div className="table-top">
        <input
          className="global-search"
          type="text"
          placeholder="Search..."
          value={debouncedGlobalSearch} // Bind to debounced value for input display
          onChange={(e) => setDebouncedGlobalSearch(e.target.value)} // Update debounced value on change
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
          )} { /* Add Trade Button */ }
          <Button onClick={handleOpen}>Open modal</Button>
          <AddTrade isDarkMode={isDarkMode} open={open} handleClose={handleClose}/>
        </div>
      </div>

      {isLoading ? <div className='loading'>Data is loading <CircularProgress /></div> : <div className="table-container">
        <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 450 }} style={{
            overflowX: 'auto',
            backgroundColor: document.body.classList.contains('dark-mode') ? '#1e1e1e' : '#fff',
            color: document.body.classList.contains('dark-mode') ? '#e0e0e0' : '#000'
          }} aria-label="custom table">
            <TableHead>
              <TableRow>
                {dynamicColumns.map((column, idx) =>
                  visibleColumns[idx] && (
                    <TableCell
                      style={{
                        padding: 5,
                        height: '80px',
                        backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
                        color: isDarkMode ? '#fff' : '#000',
                        borderBottom: '1px solid #ccc'
                      }}
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
                              onClick={() => {
                                setSelectedColumnForSortUI(column); // Set which column's dropdown to open
                                setIsSortVisible(prev => !prev); // Toggle dropdown visibility
                              }}
                              className="sort-icon"
                              style={{ cursor: 'pointer' }} // Make it clear it's clickable
                            >
                              ↕
                            </span>
                            {isSortVisible && selectedColumnForSortUI === column && (
                              <div className="sort-options">
                                {/* Use requestSort for sorting */}
                                <span onClick={() => requestSort(column)} style={{ cursor: 'pointer' }}>Sort {sortConfig?.key === column && sortConfig.direction === 'asc' ? 'Descending ▼' : 'Ascending ▲'}</span>
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
                              // Consider debouncing handleSearch if individual column search feels slow
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
                {visibleColumns[visibleColumns.length - 1] && <TableCell style={{
                  color: isDarkMode ? '#f0f0f0' : '#000'
                }} className='actions'><strong>Actions</strong></TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {/* Map over the memoized currentRows */}
              {currentRows.map((row) => (
                <TableRow key={row.id} className='data-row'>
                  {dynamicColumns.map((col, idx) =>
                    visibleColumns[idx] && (
                      <TableCell align='left' key={col} style={{
                        width: columnWidths[idx], border: 'none', padding: 8,
                        height: '80px',
                        backgroundColor: isDarkMode ? '#2c2c2c' : '#f9f9f9',
                        color: isDarkMode ? '#f0f0f0' : '#000',
                        borderBottom: '1px solid #ccc'
                      }}>
                        {row[col]}
                      </TableCell>
                    )
                  )}
                  {visibleColumns[visibleColumns.length - 1] && <TableCell style={{
                    padding: 5,
                    height: '80px',
                    backgroundColor: isDarkMode ? '#2c2c2c' : '#f9f9f9',
                    color: isDarkMode ? '#f0f0f0' : '#000',
                    borderBottom: '1px solid #ccc'
                  }} align='left'>
                    <EditOutlinedIcon onClick={() => console.log("Edit:", row)} style={{ cursor: 'pointer' }} />
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

          {/* Use the memoized totalPages */}
          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
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

export default memo(CustomTable); // Keep memo wrapper
