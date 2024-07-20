import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Button, MenuItem, Grid } from "@mui/material";
import { createQuestion } from "../service";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  /* width: 60%; */
  text-align: right;
  margin: 0 10px;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
`;
export const questionType = [
  "String",
  "Array",
  "Arraylist",
  "Stack",
  "Queue",
  "Linklist",
];
export const languageArray = [
  "JavaScript",
  "Java",
  "React",
  "Next",
];
function ContentSaver(props) {
  const {onClose} = props;
  const [formData, setFormData] = useState({
    javascriptCode: "",
    answerInput: "",
    question: "",
    type: "",
    language:""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    // Combine JavaScript code and text
    const content = { ...formData };
    createQuestion(content)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    setFormData({
      javascriptCode: "",
      answerInput: "",
      question: "",
      type:"",
      language:""
    });
    onClose();
  };

  return (
    <MainContainer>
      <InputContainer>
        <Grid container width={"100%"} spacing={1}>
          <Grid item lg={6}>
            {" "}
            <TextField
              style={{ margin: "10px 0" }}
              id="outlined-basic"
              label="Select Lanugage"
              variant="outlined"
              name="language"
              value={formData.language}
              onChange={handleChange}
              fullWidth
              select
            >
               {languageArray.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item lg={6}>
            {" "}
            <TextField
              style={{ margin: "10px 0" }}
              id="outlined-basic"
              variant="outlined"
              label="Question Type"
              name="type"
              onChange={handleChange}
              select
              fullWidth
            >
              {questionType.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <TextField
              style={{ margin: "10px 0" }}
              id="outlined-basic"
              label="Enter your question"
              variant="outlined"
              name="question"
              value={formData.question}
              onChange={handleChange}
              fullWidth
            />
        <TextField
          style={{ margin: "10px 0" }}
          id="outlined-textarea"
          label="answer"
          placeholder="Type your answer here"
          name="answerInput"
          value={formData.answerInput}
          onChange={handleChange}
          multiline
        />
        <TextField
          style={{ margin: "10px 0" }}
          id="outlined-textarea"
          label="code"
          placeholder="write js code here"
          name="javascriptCode"
          value={formData.javascriptCode}
          onChange={handleChange}
          multiline
        />

        <ButtonContainer>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </ButtonContainer>
      </InputContainer>
    </MainContainer>
  );
}

export default ContentSaver;
