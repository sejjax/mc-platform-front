import styled, { css } from 'styled-components';

export const ListMarker = styled.span`
  padding-left: 20px;

  position: relative;

  &:before {
    position: absolute;
    content: '';
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 50%;
  }
`;

export const Present = styled.span`
  color: #8c8c8c;
  padding-left: 15px;

  position: relative;

  &:before {
    position: absolute;
    content: '';
    height: 60%;
    top: 20%;
    width: 1px;
    left: 25%;
    background-color: #8c8c8c;
  }
`;

export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  font-size: 13px;
`;
export const LegendGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  column-gap: 20px;
  row-gap: 10px;

  font-size: clamp(10px, 0.8vw, 13px);

  ${(props) =>
    props.mb &&
    css`
      margin-bottom: 10px;
    `}
`;
