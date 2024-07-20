import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Button, Grid, MenuItem } from "@mui/material";
import { createQuestion } from "../service";
import { toast } from "react-toastify";
import { languageArray, questionType } from "./ContentSaver";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ButtonContainer = styled.div`
  text-align: right;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-height: 850px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
`;
function ContentSaverEdit(props) {
  const [formData, setFormData] = useState({
    javascriptCode: "",
    answerInput: "",
    question: "",
    type: "",
    language: "",
  });
  console.log(" data", props.data);
  //   const [savedData, setSavedData] = useState([]);

  useEffect(() => {
    setFormData(props.data.data);
  }, []);

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
        toast.success("data edited successfully !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((err) => console.log(err));

    setFormData({
      javascriptCode: "",
      answerInput: "",
      question: "",
      type: "",
      language: "",
    });

    props.onClose(false);
    window.location.reload();
  };

  return (
    <MainContainer>
      <InputContainer>
        <Grid container width={"100%"}>
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
              style={{ margin: "10px" }}
              id="outlined-basic"
              variant="outlined"
              label="Question Type"
              name="type"
              onChange={handleChange}
              select
              value={formData.type}
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
        <Grid container fullWidth>
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
        </Grid>
        <Grid
          container
          width={"100%"}
          maxHeight={"200px"}
          overflow={"auto"}
          sx={{ overflowX: "hidden", scrollbarWidth: "thin" }}
        >
          <TextField
            style={{ margin: "10px 0" }}
            id="outlined-textarea"
            label="answer"
            placeholder="Type your answer here"
            name="answerInput"
            value={formData.answerInput}
            onChange={handleChange}
            multiline
            fullWidth
          />
        </Grid>
        <Grid
          container
          width={"100%"}
          maxHeight={"600px"}
          overflow={"auto"}
          sx={{ overflowX: "hidden", scrollbarWidth: "thin" }}
        >
          <TextField
            style={{ margin: "10px 0" }}
            id="outlined-textarea"
            label="code"
            placeholder="write js code here"
            name="javascriptCode"
            value={formData.javascriptCode}
            onChange={handleChange}
            multiline
            fullWidth
          />
        </Grid>

        <ButtonContainer>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </ButtonContainer>
      </InputContainer>
    </MainContainer>
  );
}

export default ContentSaverEdit;
