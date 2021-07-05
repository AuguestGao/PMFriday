import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  background-color: slategrey;
  text-align: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 25px;
  position: float;
  justify-content: space-between;
  align-items: center;

  span {
    color: white;
    font-size: 1rem;
    margin: 13px 20px;

    .Friday {
      color: black;
      font-size: 1.5rem;
      margin: 0;
    }
  }
`;

export default HeaderContainer;
