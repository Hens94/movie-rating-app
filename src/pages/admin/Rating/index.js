import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Divider as MuiDivider,
  Typography,
} from "@material-ui/core";
import { spacing } from "@material-ui/system";

import AdminRatingComponent from "../../../components/Admin/AdminRating";

const Divider = styled(MuiDivider)(spacing);

const Breadcrumbs = styled(MuiBreadcrumbs)(spacing);

const AdminRating = () => {
  return (
    <>
      <Helmet title="Movie Administration" />

      <Typography variant="h3" gutterBottom display="inline">
        Rating Administration
      </Typography>

      <Breadcrumbs aria-label="Breadcrumb" mt={2}>
        <Typography>Administration</Typography>
        <Typography>Rating</Typography>
      </Breadcrumbs>

      <Divider my={6} />

      <AdminRatingComponent />
    </>
  );
};

export default AdminRating;
