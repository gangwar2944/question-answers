import React, { useState } from "react";
import styled from "styled-components";
import ContentSaverEdit from "./ContentSaverEdit";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteQuestion } from "../service";
import { toast } from "react-toastify";
import { CustomiseModal } from "./CustomiseModal";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ContentSaver from "./ContentSaver";

const Container = styled.div``;
const Wapper = styled.div`
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 10px;
`;
const Paraghraph = styled.p`
  padding: 10px 0;
`;
const Pretag = styled.pre`
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;
  text-wrap: wrap;
  font-size: 12px;
`;
const Code = styled.code``;

const QuesAndAns = (props) => {
  const { approaches, question, id } = props.data;
  // console.log("props",javascriptCode,answerInput, question);

  const [isEditProductPage, setIsEditProductPage] = useState(false);

  const openEditProductpage = () => {
    setIsEditProductPage(true);
    document.body.classList.add("body-scroll-lock");
  };

  const closeEditProductModal = () => {
    setIsEditProductPage(false);
    document.body.classList.remove("body-scroll-lock");
  };

  const deleteItem = (data) => {
    deleteQuestion(data.id)
      .then((res) => {
        console.log(res);
        toast.success("Question Deleted successfully !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong !", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  return (
    <Container style={{ margin: "5px" }}>
      <Wapper>
        <CustomiseModal
          open={isEditProductPage}
          onClose={closeEditProductModal}
        >
          {/* <ContentSaverEdit data={props} onClose={closeEditProductModal} /> */}
          <ContentSaver data={props} onClose={closeEditProductModal} />
        </CustomiseModal>
        <Accordion>
          <AccordionSummary
            id="panel1-header"
            aria-controls="panel1-content"
            expandIcon={<ExpandMore />}
          >
            <Typography>
              {" "}
              Question {id}: {question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {approaches.map((item) => (
              <Box key={item.id}>
                <Box>
                  <EditNoteIcon
                    onClick={openEditProductpage}
                    sx={{ cursor: "pointer" }}
                  />
                  <DeleteOutlineOutlinedIcon
                    sx={{ cursor: "pointer", color: "error.main" }}
                    onClick={() => deleteItem(props.data)}
                  />
                </Box>
                <Typography>
                  <Paraghraph>
                    <b>Answer</b> : {item.answerInput}
                  </Paraghraph>
                  <Pretag>
                    <Code>{item.javascriptCode}</Code>
                  </Pretag>
                </Typography>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      </Wapper>
    </Container>
  );
};

export default QuesAndAns;
