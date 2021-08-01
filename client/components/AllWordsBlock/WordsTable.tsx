import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import { wordsType } from './index'

interface ColumnWords {
  id: 'id' | 'eng' | 'rus'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columnsWords: ColumnWords[] = [
  { id: 'id', label: 'id', minWidth: 100 },
  { id: 'eng', label: 'eng', minWidth: 140 },
  { id: 'rus', label: 'rus', minWidth: 140 },
]

type DataWords = {
  id: number
  eng: string
  rus: string
}

function createDataWords(id: number, eng: string, rus: string): DataWords {
  return { id, eng, rus }
}

const rowsWords: Array<DataWords> = []

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
})

interface Props {
  words: wordsType
}

// @ts-ignore
const StickyHeadTable: React.FC<Props> = ({ words }) => {
  if (words[0].length)
    words.map((word) => rowsWords.push(createDataWords(+word[0], word[1], word[2])))

  const classes = useStyles()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  // @ts-ignore
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columnsWords.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsWords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columnsWords.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20]}
          component="div"
          count={rowsWords.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      ;
    </>
  )
}

export default StickyHeadTable
