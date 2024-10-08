import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Button, MenuItem, Grid, IconButton } from "@mui/material";
import { createQuestion } from "../service";
import AddIcon from "@mui/icons-material/Add";
import { Close } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
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
  "Functions",
  "Theory",
];
export const languageArray = ["JavaScript", "Java", "React", "Next"];

function ContentSaver(props) {
  const { onClose, data } = props;
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      question: "",
      type: "",
      language: "",
      approaches: [{ javascriptCode: "", answerInput: "" }],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "approaches",
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;
    move(result.source.index, result.destination.index);
  };

  useEffect(() => {
    if (props.data && props.data.data) {
      reset({
        ...props.data.data,
        approaches: props.data.data.approaches || [
          { javascriptCode: "", answerInput: "" },
        ],
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    try {
      console.log("formData", formData);
      const res = await createQuestion(formData);
      console.log(res);
      reset(); // Reset the form after successful submission
      onClose(); // Close the form
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainContainer>
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container width={"100%"} spacing={1}>
            <Grid item lg={6}>
              <Controller
                name="language"
                control={control}
                rules={{ required: "Language is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    style={{ margin: "10px 0" }}
                    label="Select Language"
                    variant="outlined"
                    fullWidth
                    select
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    {languageArray.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item lg={6}>
              <Controller
                name="type"
                control={control}
                rules={{ required: "Question Type is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    style={{ margin: "10px 0" }}
                    label="Question Type"
                    variant="outlined"
                    fullWidth
                    select
                    {...field}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    {questionType.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
          <Grid container fullWidth>
            <Controller
              name="question"
              control={control}
              rules={{ required: "Question is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  style={{ margin: "10px 0" }}
                  label="Enter your question"
                  variant="outlined"
                  fullWidth
                  {...field}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          {/* Approaches Section */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="approaches">
              {(provided) => (
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {fields.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <Grid
                          container
                          item
                          spacing={2}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Grid item xs={11}>
                            <Controller
                              name={`approaches[${index}].answerInput`}
                              control={control}
                              rules={{ required: "Answer is required" }}
                              render={({ field, fieldState }) => (
                                <TextField
                                  label="Approach Answer"
                                  placeholder="Type your answer for this approach"
                                  multiline
                                  fullWidth
                                  {...field}
                                  error={!!fieldState.error}
                                  helperText={fieldState.error?.message}
                                />
                              )}
                            />
                          </Grid>
                          <Grid item xs={1} display="flex" alignItems="center">
                            <IconButton
                              onClick={() => remove(index)}
                              color="secondary"
                            >
                              <Close sx={{ color: "red", cursor: "pointer" }} />
                            </IconButton>
                          </Grid>
                          <Grid item xs={12}>
                            <Controller
                              name={`approaches[${index}].javascriptCode`}
                              control={control}
                              rules={{
                                required: "JavaScript code is required",
                              }}
                              render={({ field, fieldState }) => (
                                <TextField
                                  label="Approach JavaScript Code"
                                  placeholder="Write JS code for this approach"
                                  multiline
                                  fullWidth
                                  {...field}
                                  error={!!fieldState.error}
                                  helperText={fieldState.error?.message}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
          <Grid item>
            <Button
              onClick={() => append({ javascriptCode: "", answerInput: "" })}
              startIcon={<AddIcon />}
              variant="contained"
            >
              Add Approach
            </Button>
          </Grid>
          <ButtonContainer>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </ButtonContainer>
        </form>
      </InputContainer>
    </MainContainer>
  );
}

export default ContentSaver;
