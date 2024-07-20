import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QuesAndAns from "../components/QuesAndAns";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
  CssBaseline,
  MenuItem,
  TextField,
} from "@mui/material";
import { getAllQuestions } from "../service";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Modal from "../components/Modal";
import ContentSaver, { languageArray, questionType } from "../components/ContentSaver";
import { Search } from "@mui/icons-material";

const MainContainer = styled.div`
  background-color: #e3eaf2;
`;

const FilterContainer = styled(Box)`
  width: 300px;
  position: fixed;
  top: 70px; /* Adjust top position to be below the fixed navbar */
  left: 10px;
  background-color: #fff;
  height: 100vh;
  padding: 5px;
`;

const ContentContainer = styled(Box)`
  flex-grow: 1;
  margin-left: 320px; /* Adjust margin to make space for the fixed filter box */
`;

const Section = styled.section``;

const HeadingH1 = styled.h1`
  padding: 20px 20px 0 20px;
`;

const QuestionAnswerList = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAllQuestions()
      .then((res) => {
        console.log("res", res);
        setData(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const [isEditProductPage, setIsEditProductPage] = useState(false);

  const openEditProductpage = () => {
    setIsEditProductPage(true);
    document.body.classList.add("body-scroll-lock");
  };

  const closeEditProductModal = () => {
    setIsEditProductPage(false);
    document.body.classList.remove("body-scroll-lock");
  };

  return (
    <MainContainer>
      <CssBaseline />
      <Navbar />
      <Box display="flex">
        <FilterContainer>
          <Box width={"100%"}>
            <Button
              variant="contained"
              onClick={openEditProductpage}
              style={{ marginTop: "10px" }}
              startIcon={<AddOutlinedIcon />}
            >
              Add New Question
            </Button>
          </Box>
          <Box width={"100%"} mt={2}>
            <TextField
              variant="standard"
              label="Select Language Filter"
              fullWidth
              select
            >
              {languageArray.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box width={"100%"} mt={2}>
            <TextField
              variant="standard"
              label="Select Question Type Filter"
              fullWidth
              select
            >
              {questionType.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box width={"100%"} mt={2}>
            <TextField
              variant="standard"
              label="Select Question"
              fullWidth
              select
            >
              {["Q1", "Q2", "Q3"].map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box width={"100%"} mt={2}>
            <Button variant="contained" startIcon={<Search />}>
              Search
            </Button>
          </Box>
        </FilterContainer>
        <ContentContainer>
          <Section>
            <HeadingH1>List Of All Questions And Answer</HeadingH1>
            {data &&
              data.map((data, index) => <QuesAndAns data={data} key={index} />)}
          </Section>
        </ContentContainer>
      </Box>
      <Modal isOpen={isEditProductPage} onClose={closeEditProductModal}>
        <ContentSaver onClose={closeEditProductModal} />
      </Modal>
    </MainContainer>
  );
};

export default QuestionAnswerList;
