import React from "react";
import { Canvas } from "./components/cavas";
import {
  songNameSelector,
  albumCoverSelector,
  artistSelector,
  progressSelector,
  durationSelector
} from "../app/selectors";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SongTitle } from "./components/songTitle";
import { Artist } from "./components/artist";
import { Line } from "rc-progress";
import { useTheme } from "styled-components";
import styled from "styled-components";
import { Controls } from "../controls";

//TODO: constants
const StyledProgressLine = styled(Line)`
  width: 70vh;
  margin-top: 35px;
  margin-left: calc(30px + 5vh);
`;

const ControlsRow = styled(Row)`
  text-align: "center";
  align-items: center;
  justify-content: center;
  height: 50vh;
`;

const TextRow = styled(Row)`
  justify-content: center;
  height: 50vh;
`;

export const CurrentlyPlayingDisplay = () => {
  const albumCover = useSelector(albumCoverSelector);
  const songName = useSelector(songNameSelector);
  const artist = useSelector(artistSelector);
  const progress = useSelector(progressSelector);
  const duration = useSelector(durationSelector);
  const theme = useTheme();

  return (
    <Container fluid>
      <Row>
        <Col>
          <Canvas imgUrl={albumCover} />
          <StyledProgressLine
            percent={(progress / duration) * 100}
            strokeColor={theme.colors.progressFront}
            trailColor={theme.colors.progressBack}
            strokeWidth={2}
            trailWidth={2}
          />
        </Col>
        <Col>
          <TextRow>
            <SongTitle title={songName} />
            <Artist name={artist} />
          </TextRow>
          <ControlsRow>
            <Controls />
          </ControlsRow>
        </Col>
      </Row>
    </Container>
  );
};
