import styled from "styled-components";

export const CardDetailContainer = styled.div`
  width: 50%;
  margin: 20px auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  border: 2px solid black;
  box-sizing: border-box;
  border-radius: 10px;
  justify-items: flex-start;

  button {
    width: 100%;
  }
`;

export const NameContainer = styled.h1`
  text-align: center;
  color: steelblue;
  margin-bottom: 10px;
`;

export const NormalTextContainer = styled.div`
  justify-items: flex-start;
  font-size: 1rem;
  color: gray;
  margin-bottom: 10px;
  padding-left: 20px;
`;

export const SmallTextContainer = styled.div`
  font-size: 0.6rem;
  color: black;
  margin: 10px auto;
`;

export const ConfirmDeleteContainer = styled.div`
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  border: 2px solid red;
  /* position: absolute; */
  background-color: white;
  margin: 20px, auto;
  padding: 30px;

  .warning {
    color: red;
  }
`;
