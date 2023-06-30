import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  padding: 28px 0 28px 24px;

  position: relative;

  display: grid;
  gap: 30px;

  font-size: 16px;
  color: #555555;
  font-weight: 400;
`;

export const Link = styled.div`
  cursor: pointer;
  position: relative;

  ${(props) =>
    props.active &&
    css`
      color: #556ee6;

      &:after {
        position: absolute;
        right: 0;
        content: '';

        width: 2px;
        height: 100%;
        background-color: #556ee6;
      }
    `}
`;

export const StSection = styled.section`
  margin-bottom: 64px;
  font-size: 16px;

  & > h2 {
    color: #333333;
    font-size: 32px;
    line-height: 1.2rem;
    padding-bottom: 32px;
  }
`;

export const RulesWrapper = styled.div`
  padding-top: 15px;
`;

export const FeesLink = styled.a`
  color: #556ee6;
`;

export const UL = styled.ul`
  padding: 0;

  font-size: 14px;

  & > li {
    list-style: none;
  }
`;

export const Grid = styled.div`
  display: grid;

  max-width: 500px;

  grid-template-columns: 1fr 1fr;
  justify-content: space-between;

  font-size: 14px;
  gap: 15px;

  & > p {
    padding: 0;
    margin: 0;
  }
`;
