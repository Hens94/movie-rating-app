import { useState } from "react";
import styled from "styled-components/macro";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel as MuiTableSortLabel,
  Paper as MuiPaper,
  IconButton,
  Tooltip,
} from "@material-ui/core";

import { Trash as DeleteIcon } from "react-feather";

import RatingDialogDelete from "./RatingDialogDelete";

const headCells = [
  {
    id: "score",
    label: "Score",
  },
  {
    id: "comment",
    label: "Comment",
  },
  {
    id: "user",
    label: "User",
  },
  {
    id: "created_at",
    label: "Created at",
  },
];

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const ComponentContainer = styled.div`
  width: 100%;
`;

const Paper = styled(MuiPaper)`
  width: 100%;
  margin-bottom: ${(props) => props.theme.spacing(2)}px;
`;

const Table = styled(MuiTable)`
  min-width: 650px;
`;

const HeaderTableCell = styled(TableCell)`
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.contrastText};
`;

const TableSortLabel = styled(MuiTableSortLabel)`
  &.MuiTableSortLabel-active {
    color: ${(props) => props.theme.palette.primary.contrastText};
  }

  &:hover {
    color: ${(props) => props.theme.palette.primary.contrastText};
  }

  &:hover .MuiTableSortLabel-icon {
    color: ${(props) =>
      props.active
        ? props.theme.palette.primary.contrastText
        : "rgba(255,255,255,0.5)"} !important;
  }

  .MuiTableSortLabel-icon {
    color: rgba(255, 255, 255, 0.7) !important;
  }
`;

const SelectedTableRow = styled(TableRow)`
  height: 53px;
`;

const RatingTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(({ id, label }) => {
          return (
            <HeaderTableCell
              key={id}
              sortDirection={orderBy === id ? order : false}
            >
              <TableSortLabel
                active={orderBy === id}
                direction={orderBy === id ? order : "asc"}
                onClick={createSortHandler(id)}
              >
                {label}
              </TableSortLabel>
            </HeaderTableCell>
          );
        })}
        <HeaderTableCell width={80} align="center" />
      </TableRow>
    </TableHead>
  );
};

const RatingTableRow = ({ data, onDelete }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { score, comment, user: userCreated, created_at: createdAt } = data;

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <SelectedTableRow>
        <TableCell>{score ? score : "?"}</TableCell>
        <TableCell>{comment}</TableCell>
        <TableCell>{userCreated}</TableCell>
        <TableCell>{createdAt}</TableCell>
        <TableCell align="center">
          <Tooltip title={`Click to delete the rating`} arrow placement="top">
            <IconButton
              style={{ color: "red" }}
              size="small"
              onClick={() => setOpenDeleteDialog(!openDeleteDialog)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      </SelectedTableRow>
      {openDeleteDialog && (
        <RatingDialogDelete
          onDelete={onDelete}
          open={openDeleteDialog}
          onClose={handleDeleteDialogClose}
          data={data}
        />
      )}
    </>
  );
};

const MovieTable = ({ data, onDelete }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("movie_name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

  return (
    <ComponentContainer>
      <Paper>
        <TableContainer>
          <Table size="small" stickyHeader>
            <RatingTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, index) => (
                  <RatingTableRow key={index} data={item} onDelete={onDelete} />
                ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </ComponentContainer>
  );
};

export default MovieTable;
