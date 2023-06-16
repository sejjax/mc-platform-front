import styled, { css } from "styled-components"

export const Root = styled.div`
  font-size: 16px;

  & > h3 {
    font-size: 20px;
  }
`

const maxWidth = css`
  max-width: 800px;
`

export const DiscloseresContainer = styled.div`
  display: grid;
  gap: 40px;

  /* margin-top: 60px; */

  ${maxWidth}
`
export const BSAContainer = styled.div`
  display: grid;
  gap: 32px;
  ${maxWidth}
`
