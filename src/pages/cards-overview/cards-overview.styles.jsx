import styled from "styled-components";

export const PageWrapper = styled.article`
  grid-area: main;
  display: grid;
  justify-content: center;
  grid-template-rows: 3rem 3rem 1fr;
  grid-template-columns: 1fr;

  p.user-name {
    grid-row: 1 / span 1;
    grid-column: 1 / span 1;
    align-self: center;
    justify-self: center;
  }

  p.user-name span {
    font-size: ${(props) => props.theme.fontSizes.title};
    text-decoration-thickness: 3px;
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-color: ${(props) => props.theme.colors.highlight};
  }
`;

export const CardsOverviewContainer = styled.div`
  grid-row: 3 / span 1;
  box-sizing: border-box;
  margin: ${(props) => props.theme.sizes.md} auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 30px;
  align-items: center;
  flex-wrap: wrap;
`;

export const NoRecordContainer = styled.h1`
  grid-row: 3 / span 1;
  width: 100%;
  text-align: center;
`;

export const SearchAndAddContainer = styled.div`
  grid-row: 2 / span 1;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  justify-content: space-around;

  input {
    width: 80%;
  }

  button {
    width: 20%;
    max-width: 100px;
  }
`;
