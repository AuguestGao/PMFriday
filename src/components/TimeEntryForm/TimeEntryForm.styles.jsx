import styled from "styled-components";

export const TimeEntryPageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 100%;
`;

export const EntriesContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  color: #000;
  width: 600px;
  height: auto;
  padding: 20px;
  border: solid 1px #999;
  box-shadow: 0 4px 23px 5px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.15);
  display: block;

  h1 {
    text-align: center;
  }
`;

export const LineContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
`;
