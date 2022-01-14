import { useState } from "react";
import _ from "lodash";
import styled from "styled-components/macro";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RatingTable from "./RatingTable";

import useRating from "../../../hooks/useRating";

const groupRating = (ratings) => {
  const dataGrouped = _.groupBy(ratings, (rating) => rating.movie);
  return Object.values(dataGrouped);
};

const AccordingContainer = styled.div`
  width: 100%;
`;

const AdminRating = () => {
  const { ratings, deleteRating } = useRating();
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const ratingGroup = groupRating(ratings);

  return (
    ratings &&
    ratingGroup &&
    ratingGroup.length > 0 && (
      <AccordingContainer>
        {ratingGroup.map((ratingItem, index) => (
          <Accordion
            key={index}
            expanded={expanded === index}
            onChange={handleChange(index)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography color="primary" variant="h5">
                {ratingItem[0].movie_name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RatingTable data={ratingItem} onDelete={deleteRating} />
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordingContainer>
    )
  );
};

export default AdminRating;
