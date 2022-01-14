import { useState } from "react";

import MovieTable from "./MovieTable";

import useMovies from "../../../hooks/useMovies";

const AdminMovie = () => {
  const [orderFilters, setOrderFilters] = useState();
  const {
    movies,
    dataCount,
    pagination,
    handlePagination,
    createMovie,
    updateMovie,
    deleteMovie,
  } = useMovies(orderFilters);

  const handleFilter = (orderFilters) => {
    setOrderFilters(orderFilters);
  };

  return (
    movies && (
      <MovieTable
        data={movies}
        dataCount={dataCount}
        onFilter={handleFilter}
        onPagination={handlePagination}
        onCreate={createMovie}
        onEdit={updateMovie}
        onDelete={deleteMovie}
        pagination={pagination}
      />
    )
  );
};

export default AdminMovie;
