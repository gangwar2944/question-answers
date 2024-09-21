import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QuesAndAns from "../components/QuesAndAns";
import Navbar from "../components/Navbar";
import { Box, CssBaseline, Grid } from "@mui/material";
import { getAllQuestions, searchQuestions } from "../service";
import ContentSaver from "../components/ContentSaver";
import { CustomiseModal } from "../components/CustomiseModal";
import FilterComponent from "./FilterComponent";

const MainContainer = styled.div`
  background-color: #e3eaf2;
`;

const ContentContainer = styled(Box)`
  flex-grow: 1;
  margin-left: ${({ filterOpen }) => (filterOpen ? "320px" : "0px")};
  transition: margin-left 0.3s;
`;

const Section = styled.section``;

const HeadingH1 = styled.h1`
  padding: 10px 10px 0 10px;
`;

const QuestionAnswerList = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchDto, setSearchDto] = useState({
    language: "",
    question: "",
    type: "",
  });

  useEffect(() => {
    getAllQuestions()
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    filterData();
  }, [searchDto]);

  const [isEditProductPage, setIsEditProductPage] = useState(false);

  const openEditProductPage = () => {
    setIsEditProductPage(true);
    document.body.classList.add("body-scroll-lock");
  };

  const closeEditProductModal = () => {
    setIsEditProductPage(false);
    document.body.classList.remove("body-scroll-lock");
  };

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setSearchDto((prevSearchDto) => ({
      ...prevSearchDto,
      [name]: value,
    }));
  };

  const filterData = async () => {
    try {
      const result = await searchQuestions(searchDto);
      setFilteredData(result);
    } catch (err) {
      console.log(err);
    }
  };

  const resetFields = () => {
    setSearchDto({
      language: "",
      question: "",
      type: "",
    });
  };

  const toggleFilterOpen = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <MainContainer>
      <CssBaseline />
      <Navbar filterClose={toggleFilterOpen} />
      <Box display="flex" marginTop={"60px"}>
        <FilterComponent
          filterOpen={filterOpen}
          searchDto={searchDto}
          data={data}
          handleSearch={handleSearch}
          openEditProductPage={openEditProductPage}
          filterData={filterData}
          resetFields={resetFields}
        />
        <ContentContainer filterOpen={filterOpen}>
          <Section>
            <HeadingH1>List Of All Questions And Answers</HeadingH1>  
            <Grid container>
              {filteredData.map((data) => (
                <Grid item key={data.id} lg={6} xs={12}>
                  <QuesAndAns data={data} />
                </Grid>
              ))}
            </Grid>
          </Section>
        </ContentContainer>
      </Box>
      <CustomiseModal open={isEditProductPage} onClose={closeEditProductModal}>
        <ContentSaver onClose={closeEditProductModal} />
      </CustomiseModal>
    </MainContainer>
  );
};

export default QuestionAnswerList;
