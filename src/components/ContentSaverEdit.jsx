import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
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
  const defaultValues = {
    javascriptCode: "",
    answerInput: "",
    question: "",
    type: "",
    language: "",
    approches: [{ javascriptCode: "", answerInput: "" }],
  };

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (props.data && props.data.data) {
      reset({
        ...props.data.data,
        approches: props.data.data.approches || [
          { javascriptCode: "", answerInput: "" }
        ],
      });
    }
  }, [props.data, reset]);

  const onSubmit = async (formData) => {
    try {
      await createQuestion(formData);
      toast.success("Data edited successfully!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      reset(defaultValues);
      props.onClose(false);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainContainer>
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ margin: "10px 0" }}
                id="outlined-basic"
                label="Select Language"
                variant="outlined"
                select
                fullWidth
                {...register("language")}
              >
                {languageArray.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ margin: "10px 0" }}
                id="outlined-basic"
                variant="outlined"
                label="Question Type"
                select
                fullWidth
                {...register("type")}
              >
                {questionType.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                style={{ margin: "10px 0" }}
                id="outlined-basic"
                label="Enter your question"
                variant="outlined"
                fullWidth
                {...register("question")}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                style={{ margin: "10px 0" }}
                id="outlined-textarea"
                label="Answer"
                placeholder="Type your answer here"
                multiline
                fullWidth
                {...register("approches[0].answerInput")}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                style={{ margin: "10px 0" }}
                id="outlined-textarea"
                label="Code"
                placeholder="Write JS code here"
                multiline
                fullWidth
                {...register("approches[0].javascriptCode")}
              />
            </Grid>
          </Grid>

          <ButtonContainer>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </ButtonContainer>
        </form>
      </InputContainer>
    </MainContainer>
  );
}

export default ContentSaverEdit;
