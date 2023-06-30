import styled from 'styled-components';

export const Root = styled.div`
  border: 1px solid #e1e6ef;
`;
export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 2fr;
  border-top: 1px solid #e1e6ef;
  border-bottom: 1px solid #e1e6ef;
  color: #495057;

  padding: 18px 12px;

  font-size: 14px;
`;

export const GridHeader = styled.p`
  text-transform: uppercase;

  margin: 0;
  font-weight: 500;
`;

export const Agency = styled.div`
  display: grid;
  gap: 5px;

  & > p {
    margin: 0;
  }
`;
