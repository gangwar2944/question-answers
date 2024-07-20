import React from 'react';
import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  height: 60px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: grid;
  grid-template-columns: 2fr 10fr; /* Define 2 columns with the specified fractions */
  grid-template-areas: "logo otherContent"; /* Define the grid areas */
  position: fixed;
`;

const Logo = styled.div`
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: logo; /* Assign the "logo" grid area */
`;

const OtherContent = styled.div`
  background-color: #63717e;
  grid-area: otherContent; /* Assign the "otherContent" grid area */
`;

const Navbar = ({ toggleDrawer }) => {
  return (
    <MainContainer>
      <Logo>
        logo
      </Logo>
      <OtherContent />
    </MainContainer>
  );
};

export default Navbar;
