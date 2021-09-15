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
  color: ${(props) => props.theme.colors.primary};
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
  margin: 10px 3px;
  padding-bottom: 15px; ;
`;

export const TimesContainer = styled.div`
  width: 100%;
  margin: 5px;
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

  .editorcontainer {
    background-color: ${(props) => props.theme.colors.accent};
    padding: 10px ${(props) => props.theme.sizes.lg};
    height: 100px;
  }
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
  margin-left: 5px;

  textarea {
    width: 90%;
    height: 200px;
  }
`;

export const ConfirmDeleteContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-radius: ${(props) => props.theme.sizes.xsm};
  border: 2px solid ${(props) => props.theme.colors.highlight};
  margin: 20px auto;
  padding: 30px;

  button {
    width: 48%;
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

  button {
    width: 40%;
    max-width: 160px;
  }
`;

export const CustomFieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
`;

export const InlineTodo = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 20px 1fr 20px;
  align-items: center;
  justify-content: center;

  input {
    grid-column: 1 / span 1;
  }

  div.content {
    grid-column: 2 / span 1;
  }

  div.complete {
    grid-column: 2 / span 1;
    text-decoration: line-through;
  }

  div.delete {
    color: ${(props) => props.theme.colors.highlight};
    cursor: pointer;
  }
`;

export const InlineTimes = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: baseline;
  justify-content: start;
  grid-column-gap: 5px;

  p {
    grid-column: 1 / span 1;
  }

  div.progress {
    grid-column: 2 / span 1;
  }

  div.action {
    grid-column: 3 / span 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    input {
      width: 70%;
    }

    button {
      width: 30%;
    }
  }
`;
