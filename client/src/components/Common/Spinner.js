import React from 'react'
import { css } from "@emotion/core";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

const Spinner = ({ loading }) => {
    return (
        <BeatLoader
        css={override}
        size={10}
        color={"white"}
        loading={loading}
        />
    )
}

export default Spinner