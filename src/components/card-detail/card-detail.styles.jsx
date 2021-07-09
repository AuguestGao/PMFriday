import styled from "styled-components";

export const NotFoundContainer = styled.h1`
  margin: 100px auto;
  text-align: center;
`;

export const PageContainer = styled.div`
  width: 60%;
  margin: 20px auto;
  padding: 15px;
  border: 2px solid black;
  border-radius: 15px;
`;

export const TitleContainer = styled.h1`
  color: steelblue;
  margin: 10px;
  text-align: center;
`;

export const MainContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 10px;
`;

export const LeftPanelContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
`;

export const ProfileContainer = styled.div`
  width: 100%;
  border-bottom: 2px solid lightgray;
  margin: 10px;
  padding-bottom: 15px; ;
`;

export const TimesContainer = styled.div`
  width: 100%;
  margin: 10px;
`;

export const TodosContainer = styled.div`
  width: 100%;
  margin: 10px;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  border-left: 2px solid lightgray;
  padding: 20px;
`;

export const NoteContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: lightgray;
`;

export const CardDetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-radius: 10px;
  justify-items: flex-start;

  button {
    width: 100%;
  }
`;

export const NormalTextContainer = styled.div`
  justify-items: flex-start;
  font-size: 1rem;
  color: gray;
  margin-bottom: 10px;
  padding-left: 20px;

  textarea {
    width: 90%;
  }
`;

export const SmallTextContainer = styled.div``;

export const ConfirmDeleteContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  border: 2px solid red;
  /* position: absolute; */
  background-color: white;
  margin: 20px auto;
  padding: 30px;

  button {
    width: 40%;
  }
`;

export const InteractionsContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;

  /* flex-direction: row; */
  /* flex-wrap: nowrap; */
  justify-content: space-between;
  align-items: center;
`;

export const CustomFieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
`;
