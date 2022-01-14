import { Divider as MuiDivider } from "@material-ui/core";
import { spacing } from "@material-ui/system";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";

import MoviesListComponent from "../../components/WatchList";

const Divider = styled(MuiDivider)(spacing);

const WatchList = () => {
  return (
    <>
      <Helmet title="Watchlist" />
      <Divider my={6} />
      <MoviesListComponent />
    </>
  );
};

export default WatchList;
