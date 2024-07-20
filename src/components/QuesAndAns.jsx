// import { Container } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";
import ContentSaverEdit from "./ContentSaverEdit";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deleteQuestion } from "../service";
import { toast } from "react-toastify";

const Container = styled.div`
`;
const Wapper = styled.div`
  background-color: #f2f2f2;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 20px;
  border-radius: 10px;
`;
const HeadingH3 = styled.h3`
  padding-top: 10px;
`;
const Paraghraph = styled.p`
  padding: 10px 0;
`;
const Pretag = styled.pre`
  padding: 15px 25px;
  background-color: #c5c4c4;
  border-radius: 10px;
  text-wrap: wrap;
`;
const Code = styled.code``;
const Button = styled.button`
  /* background-color: #0d83ea; */
  /* color: #fff; */
  outline: none;
  border: 1px solid #0d83ea;
  border-radius: 10px;
  padding: 5px;
  margin-right:10px ;
  cursor: pointer;
`;
const QuesAndAns = (props) => {
  const { javascriptCode, answerInput, question } = props.data;
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

  const deleteItem = (data)=>{
    deleteQuestion(data.id)
    .then((res)=>{
        console.log(res)
        toast.success("Question Deleted successfully !",{
            position: toast.POSITION.BOTTOM_RIGHT
          });
    }).catch((err)=>{
        console.log(err)
        toast.error("Something went wrong !",{
            position: toast.POSITION.BOTTOM_RIGHT
          });
    });
  }

  return (
    <Container style={{ margin: "20px" }}>
      <Wapper>
        <Button  onClick={openEditProductpage}><ModeEditOutlineOutlinedIcon/></Button>
        <Button  onClick={()=>deleteItem(props.data)}><DeleteOutlineOutlinedIcon style={{color:"red"}}/></Button>
        <Modal isOpen={isEditProductPage} onClose={closeEditProductModal}>
          <ContentSaverEdit
            data={props}
            onClose={closeEditProductModal}
          />
        </Modal>
        <HeadingH3>Question : {question}</HeadingH3>
        <Paraghraph>
          <b>Answer</b> : {answerInput}
        </Paraghraph>
        <Pretag>
          <Code>{javascriptCode}</Code>
        </Pretag>
      </Wapper>
    </Container>
  );
};

export default QuesAndAns;
