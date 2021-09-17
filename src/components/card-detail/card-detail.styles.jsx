import styled from "styled-components";

export const NotFoundContainer = styled.h1`
  margin: 100px auto;
  text-align: center;
`;

export const PageContainer = styled.div`
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
  width: 80%;
  max-width: 700px;
  margin: 20px auto;
  padding: 15px;
  border: 2px solid black;
  border-radius: 15px;

  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-template-rows: 5rem repeat(4, auto);
  grid-template-areas:
    "name name"
    "profile todo"
    "times todo"
    "note  note"
    "control  control";
  grid-gap: 10px;
  font-size: ${(props) => props.theme.fontSizes.text};

  @media ${(props) => props.theme.breakpoints.mobile} {
    width: 100%;
    font-size: ${(props) => props.theme.fontSizes.mobileText};
    grid-template-columns: auto;
    grid-template-areas:
      "name"
      "profile"
      "times"
      "todo"
      "note"
      "control";

    button {
      font-size: ${(props) => props.theme.fontSizes.mobileText};
    }
  }
`;

export const TitleContainer = styled.h1`
  grid-area: name;
  color: ${(props) => props.theme.colors.primary};
  margin: 10px;
  text-align: center;
`;

export const ProfileContainer = styled.div`
  grid-area: profile;
  width: 100%;
  border-bottom: 2px solid lightgray;
  margin: ${(props) => props.theme.sizes.xsm} auto;
  padding-bottom: 15px;
`;

export const TimesContainer = styled.div`
  grid-area: times;
  width: 100%;
  margin: ${(props) => props.theme.sizes.xsm} auto;

  @media ${(props) => props.theme.breakpoints.mobile} {
    border-bottom: 2px solid lightgray;
  }
`;

export const TodosContainer = styled.div`
  grid-area: todo;
  width: 100%;
  margin: ${(props) => props.theme.sizes.xsm} auto;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  border-left: 2px solid lightgray;
  padding: 20px;

  @media ${(props) => props.theme.breakpoints.mobile} {
    border-left: none;
    border-bottom: 2px solid lightgray;
    padding: 0;

    h3 {
      font-size: ${(props) => props.theme.fontSizes.mobileSubtitle};
    }
  }
`;

export const NoteContainer = styled.div`
  grid-area: note;
  box-sizing: border-box;

  .editorcontainer {
    background-color: ${(props) => props.theme.colors.accent};
    padding: 10px ${(props) => props.theme.sizes.lg};
    height: 200px;
    overflow-y: scroll;
  }

  @media ${(props) => props.theme.breakpoints.mobile} {
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
  color: gray;
  margin-bottom: 10px;
  margin-left: 5px;
`;

export const ConfirmDeleteContainer = styled.div`
  grid-area: control;
  width: 100%;
  box-sizing: border-box;
  border-radius: ${(props) => props.theme.sizes.xsm};
  border: 2px solid ${(props) => props.theme.colors.highlight};
  margin: 20px auto;
  padding: 30px;
  display: flex;
  flex-direction: column;

  button {
    width: 48%;
  }
`;

export const InteractionsContainer = styled.div`
  grid-area: control;
  width: 100%;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
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

// InnerGrid is fixing the grid template discrepency between card-overview page and card-detail Component.
export const InnerGrid = styled.div`
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
  grid-template-rows: 3rem 3rem 1fr;
  grid-template-columns: 1fr;
`;
