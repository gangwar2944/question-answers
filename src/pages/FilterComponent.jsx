import React from "react";
import { Box, Button, MenuItem, TextField } from "@mui/material";
import styled from "styled-components";
import { languageArray, questionType } from "../components/ContentSaver";
import { Add, Close, Search } from "@mui/icons-material";

const FilterContainer = styled(Box)`
  width: 300px;
  position: fixed;
  top: 70px;
  left: 10px;
  background-color: #fff;
  height: 100vh;
  padding: 5px;
`;

const FilterComponent = ({
  filterOpen,
  searchDto,
  data,
  handleSearch,
  openEditProductPage,
  filterData,
  resetFields,
}) => {
  return (
    <FilterContainer sx={{ display: filterOpen ? "block" : "none" }}>
      <Box width={"100%"}>
        <Button
          variant="contained"
          onClick={openEditProductPage}
          style={{ marginTop: "10px" }}
          startIcon={<Add />}
        >
          Add New Question
        </Button>
      </Box>
      <Box width={"100%"} mt={2}>
        <TextField
          variant="standard"
          label="Select Language Filter"
          fullWidth
          onChange={handleSearch}
          value={searchDto.language}
          name="language"
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
          onChange={handleSearch}
          value={searchDto.type}
          name="type"
          SelectProps={{
            MenuProps: {
              sx: { maxHeight: "600px", width: "100%" },
            },
          }}
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
          onChange={handleSearch}
          value={searchDto.question}
          name="question"
          SelectProps={{
            MenuProps: {
              sx: {
                maxHeight: "600px",
                width: "200px",
                scrollbarWidth: "thin",
              },
            },
          }}
        >
          {data.map((item) => (
            <MenuItem key={item.id} value={item.question}>
              {item.question}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box width={"100%"} mt={2}>
        <Button
          variant="contained"
          startIcon={<Search />}
          onClick={filterData}
        >
          Search
        </Button>
        <Button
          variant="contained"
          startIcon={<Close />}
          onClick={resetFields}
          sx={{ marginLeft: "10px" }}
        >
          Reset
        </Button>
      </Box>
    </FilterContainer>
  );
};

export default FilterComponent;
