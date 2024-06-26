import React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, FormControl, Input, InputLabel, MenuItem, OutlinedInput, Pagination, Select } from '@mui/material';
import DataModal from './DataModal';
import { TITLES } from '../static';
import { TPerson } from '../App';
import Filters from './Filters';

export interface ITable {
  data: TPerson[]
}
function TableGrid({ data }: ITable) {
  const [bcData, setBcData] = useState<TPerson[]>([])
  const [currentPageData, setCurrentPageData] = useState<TPerson[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const [filterValues, setFilterValues] = useState<string[]>([])
  const [modal, setModal] = useState<TPerson | undefined>(undefined)

  const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
    const newList = bcData.slice(((value * 10) - 10), value * 10)
    setCurrentPageData(newList)
  };


  useEffect(() => {
    setBcData(data)
  }, [data])
  
  useEffect(() => {
    if (inputValue) {
      const searchResult = data.filter(el => el.status === inputValue)
      setBcData(searchResult)
    } else {
      setBcData(data)
    }
  }, [inputValue])

  useEffect(() => {
    if (filterValues.length) {
      const newBackUpData = data.filter(el => filterValues.includes(el.status))
      setBcData(newBackUpData)
    } else setBcData(data)
  }, [filterValues])

  useEffect(() => {
    if (bcData.length > 10) {
      setCurrentPageData(bcData.slice(0, 10))
    } else setCurrentPageData(bcData)
  }, [bcData])

  return (
    <Box sx={{ display: "flex", width: "full", justifyContent: "center", mt: "2rem" }}>
      <Box sx={{
        width: "80%"
      }}>
        <Filters
          filterValues={filterValues}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setFilterValues={setFilterValues} />
        <TableContainer>
          <Table sx={{ minWidth: 700 }} size="small">
            <TableHead>
              <TableRow>
                {TITLES.map((title) => (
                  <TableCell align="right" sx={{ fontWeight: "bold" }}>{title}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentPageData.map((el) => (
                <TableRow key={el.id} className="item">
                  <TableCell align="right">{el.id}</TableCell>
                  <TableCell align="right">{el.age}</TableCell>
                  <TableCell align="right">{el.visits}</TableCell>
                  <TableCell align="right">{el.progress}</TableCell>
                  <TableCell sx={{ color: el.status === "relationship" ? "red" : "black" }} align="right">{el.status}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" onClick={() => setModal(el)}>open modal</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "center", width: "full", mt: "2rem" }}>
          <Pagination onChange={handlePagination} hideNextButton hidePrevButton count={Math.ceil(bcData.length / 10)} variant="outlined" color="secondary" />
        </Box>
      </Box>
      <DataModal setModal={setModal} modal={modal} />
    </Box >
  );
}

export default TableGrid;