import styled from "styled-components";

export const IndivTask = styled.div<{ children?: any; whom?: any }>`
  display: flex;
  justify-content: space-between;
  background-color: #424242;
  margin-left: 15px;
  height: 80px;
  width: 600px;
  border-bottom: 2px solid black;
  > div:first-child {
    font-family: "Nunito", sans-serif;
    > p:first-child {
      font-size: 35px;
      font-weight: 600;
      margin: 5px;
      color: ${(props) => (props.whom === "DONE" ? "black" : "#ffa726")};
      text-decoration: ${(props) =>
        props.whom === "DONE" ? "line-through" : "none"};
    }
    > p:nth-child(2) {
      margin: 5px;
      font-size: 15px;
      font-weight: 400;
      color: ${(props) => (props.whom === "DONE" ? "black" : "white")};
      text-decoration: ${(props) =>
        props.whom === "DONE" ? "line-through" : "none"};
    }
  }
  > div:nth-child(2) {
    > button {
      margin: 30px 10px 10px 10px;
      width: 80px;
      float: left;
    }
    > button:first-child {
      border-radius: 20px;
      height: 25px;
      border: 1px solid #2e7d32;
      color: #2e7d32;
      display: ${(props) => (props.whom === "DONE" ? "none" : "block")};
    }
    > button:nth-child(2) {
      border-radius: 20px;
      height: 25px;
      border: 1px solid #cc0000;
      color: #cc0000;
    }
  }
`;

export const FormWrapper = styled.div`
  position: absolute;
  left: 18%;
  top: 10%;
  background-color: #424242;
  width: 630px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #00c851;
  > form {
    padding: 35px;
    display: flex;
    justify-content: space-between;
    input {
      margin-left: 10px;
      width: 150px;
      height: 20px;
      border-radius: 10px;
      border: 1px solid #ffa726;
    }
    button {
      width: 80px;
      border-radius: 10px;
      background-color: #ffa726;
      border: 0;
    }
  }
`;

export const TodoWrapper = styled.div<{ children?: any; show?: any }>`
  position: relative;
  left: 15%;
  background-color: #212121;
  height: 650px;
  width: 1000px;
  border-radius: 10px;
  > button {
    position: absolute;
    right: 10px;
    top: 5px;
    padding: 5px;
    width: 70px;
    border-radius: 10px;
    background-color: #cc0000;
    border: 0;
    display: ${(props) => (props.show ? "block" : "none")};
  }
`;

export const TaskWrapper = styled.div`
  position: absolute;
  left: 18%;
  top: 30%;
  background-color: #424242;
  height: 350px;
  width: 630px;
  border-radius: 10px;
  overflow-y: auto;
`;

export const Title = styled.p`
  color: white;
  position: absolute;
  left: 38%;
  font-family: "Nunito", sans-serif;
  font-size: 35px;
  font-weight: 800;
  margin: 5px;
`;

export const TotalTask = styled.div`
  position: absolute;
  left: 28%;
  background-color: #424242;
  width: 450px;
  bottom: 4%;
  color: white;
  display: flex;
  border-radius: 10px;
  justify-content: space-between;
  border: 1px solid #ffa726;
  > * {
    margin: 10px;
  }
`;

export const LoginWrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 90px;
  border: 1px solid black;
  width: 400px;
  border-radius: 20px;
  padding: 20px;
`;

export const MForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px;
  > input {
    margin: 10px;
    border-radius: 20px;
    padding: 5px;
  }
  > input:nth-child(3) {
    margin-left: auto;
    margin-right: auto;
    width: 80px;
    border: 0;
    background-color: greenyellow;
  }
`;
