import { Menu } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  height: 60px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: grid;
  grid-template-columns: 2fr 10fr;
  grid-template-areas: "logo otherContent";
  position: fixed;
  top: 0;
  background-color: #fff;
  z-index: 10;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  grid-area: logo;
  width: 300px;
  justify-content: flex-start;
  gap: 10px;
  padding: 15px;
`;

const OtherContent = styled.div`
  grid-area: otherContent;
`;

const Navbar = ({ filterClose = () => {} }) => {
  return (
    <MainContainer>
      <Logo>
        <Box>
          <Menu onClick={filterClose} sx={{cursor:"pointer"}}/>
        </Box>
        <Typography>Filter</Typography>
      </Logo>
      <OtherContent />
    </MainContainer>
  );
};

export default Navbar;
