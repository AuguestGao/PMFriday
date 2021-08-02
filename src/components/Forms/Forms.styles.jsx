import styled from "styled-components";

export const FormPageContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const FormContainer = styled.form`
  width: 40%;
  max-width: 400px;
  margin: 4rem auto;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 20px;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 25px;

  h2 {
    text-align: center;
  }

  button {
    width: 100%;
  }
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px auto;
  padding: 0;

  button {
    width: 40%;
    margin: auto;
  }
`;

export const CustomFieldRenderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
`;