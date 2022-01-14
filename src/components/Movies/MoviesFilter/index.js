import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell as MuiTableCell,
  TableSortLabel as MuiTableSortLabel,
} from "@material-ui/core";
import styled from "styled-components/macro";

const FilterTable = styled(Table)`
  width: auto;
`;

const TableCell = styled(MuiTableCell)`
  border-bottom: none;
  padding: 0;
  font-size: 1rem;
`;

const TableSortLabel = styled(MuiTableSortLabel)`
  background-color: transparent;
  color: ${(props) => props.theme.palette.primary.main};
  border: 1px solid ${(props) => props.theme.palette.primary.main};
  border-radius: 10px 2px 10px 2px;
  padding: ${(props) => props.theme.spacing(1)}px
    ${(props) => props.theme.spacing(2)}px;
  margin-left: ${(props) => props.theme.spacing(2)}px;
  font-weight: 300;

  &.MuiTableSortLabel-active {
    background-color: ${(props) => props.theme.palette.primary.main};
    color: rgba(255, 255, 255, 0.7);
  }

  &:hover {
    color: ${(props) =>
      props.active
        ? props.theme.palette.primary.contrastText
        : props.theme.palette.primary.main};
  }

  &:hover .MuiTableSortLabel-icon {
    color: ${(props) =>
      props.active
        ? props.theme.palette.primary.contrastText
        : props.theme.palette.primary.main} !important;
  }

  .MuiTableSortLabel-icon {
    color: rgba(255, 255, 255, 0.7) !important;
  }
`;

const MoviesFilter = ({ onFilter }) => {
  const [orderDate, setOrderDate] = useState(null);
  const [orderRating, setOrderRating] = useState(null);

  const handleSortDate = () => {
    const order = orderDate === "asc" ? "desc" : "asc";
    setOrderDate(order);
    setOrderRating(null);
    onFilter(order === "asc" ? "+year" : "-year");
  };

  const handleSortRating = () => {
    const order = orderRating === "asc" ? "desc" : "asc";
    setOrderRating(order);
    setOrderDate(null);
    onFilter(order === "asc" ? "+rating_avg" : "-rating_avg");
  };

  return (
    <FilterTable aria-labelledby="movie sort">
      <TableHead>
        <TableRow>
          <TableCell>Sort by:</TableCell>
          <TableCell sortDirection={!!orderDate ? orderDate : false}>
            <TableSortLabel
              active={!!orderDate}
              direction={!!orderDate ? orderDate : "asc"}
              onClick={handleSortDate}
            >
              Year
            </TableSortLabel>
          </TableCell>
          <TableCell sortDirection={!!orderRating ? orderRating : false}>
            <TableSortLabel
              active={!!orderRating}
              direction={!!orderRating ? orderRating : "asc"}
              onClick={handleSortRating}
            >
              Rating average
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    </FilterTable>
  );
};

export default MoviesFilter;
