import { useState, useEffect } from "react";
import Api from "../../api/FbApi";
import "./FreeBoardStyle.css";
import Modal from "../../util/Modal";
import styled from "styled-components";
import Comment from "../../components/comment/CommentList";
import BoardTitleHeader from './BoardMain/Components/BoardTitle';

const BoardBlock = styled.div`
border: 4px solid #40BAAA;
border-top: none;
width: 1024px;
height: 100%;
margin: 0 auto;
background-color: rgb(0, 0, 0);
display: flex;
flex-direction: column;
align-items: center;
padding: 20px;
@media screen and (max-width: 768px) {
  width: 100%;
  padding-left: 1em;
  padding-right: 1em;
}
.buttonBox {
  width: 1024px;
  padding-right: 110px;
  margin: 10px;
  text-align: right;
}
.commentHr {
  background-color: white;
  height: 20px;
}
`

const Button = styled.button`
display :inline-block;
font-family: "Sfont";
font-size: 1.4em;
font-weight: bold;
color: white;
text-shadow: 2px 2px 2px gray;
width: 100px;
height: 40px;
margin: 10px;
background-color: #ed9dcc;
box-shadow: 3px 3px #40BAAA;
border: solid 3px #40BAAA;
border-radius: 6px;
  &:hover {
    background-color: #dbdbdb;
    color: #ed9dcc;
    }
`

const ButtonUD = styled.button`
display :inline-block;
font-family: "Sfont";
font-size: 1.4em;
font-weight: bold;
color: white;
text-shadow: 2px 2px 2px gray;
width: 100px;
height: 40px;
margin: 10px;
background-color: #ed9dcc;
border: none;
border-radius: 6px;
box-shadow: 3px 3px 2px gray;
margin: 10px;
  &:hover {
  background-color: #dbdbdb;
  }
`

const ReadTitle = styled.div `
border: 2px solid #8DC0F1;
border-radius: 20px;
width: 800px;
padding: 5px;
margin: 3px;
padding: 12px;
font-size: 1.7em;
background-color: #303030;
color: #ded9c5;
`

const ReadInfo = styled.div `
border: 2px solid #8DC0F1;
border-radius: 20px;
width: 800px;
padding: 10px;
margin: 5px;
background-color: #303030;
.fb_id{
  display: none;
}
.user_id,
.date {
  color: #ded9c5;
}
`
const ReadContents = styled.div `
border: 2px solid #8DC0F1;
border-radius: 20px;
width: 800px;
height: 400px;
padding: 10px;
margin: 5px;
background-color: #303030;
color: #ded9c5;
`
const BoardDetail = () => {

  const getFb_id = window.localStorage.getItem("fb_id");
  const getUserId = window.localStorage.getItem("userId");
  const getFb_user_id = window.localStorage.getItem("fb_user_id");

  const [boardDetail, setBoardDetail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
 
  // ????????? ???????????? ??????
  function onClickMain() {
    window.location.replace("/totalBoard");
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  // ????????? ?????? ??????
  const confirmModal = async () => {
    setModalOpen(false);
    const boardReg = await Api.fBoardDelete(getFb_id);
    console.log(boardReg.data.result);
    if (boardReg.data.result === "OK") {
      window.location.replace("/totalBoard");
    } else {
    }
  };

  // ????????? ??????
  const onClickUpdate = (val) => {
      console.log("????????? ?????????????????? ?????? : " + val);
      window.location.replace("/boardUpdate");
  }
  
  // ????????? ??????
  function onClickDelete() {
      setModalOpen(true);
  }

  // FB_ID??? DB ?????? ??? ????????????
  useEffect(() => {
    const boardData = async () => {
      try {
        const response = await Api.boardDetail(getFb_id);
        setBoardDetail(response.data);
        console.log(response.data)
        // ?????????
        await Api.fBoardHit(response.data[0].fb_id, response.data[0].fb_hit);
      } catch (e) {
        console.log(e);
      }
    };
    boardData();
  }, []);

  return (
    <BoardBlock>
      <BoardTitleHeader />
        <div className="buttonBox">
          <Button onClick={onClickMain}>?????????</Button>
        </div>
        <div>
          {boardDetail && boardDetail.map(list => (
            <div key={list.fb_id}>
              {/* html ?????? ??? ???????????? ????????? ?????? */}
              <ReadTitle className="read-title">{list.fb_category} {(list.fb_title).replace(/<[^>]*>?/g,'')}</ReadTitle>
              <ReadInfo className="read-info">
                {/* fb_id??? display: none?????? ???????????? */}
                <div className="fb_id">????????? : {list.fb_id}</div>
                <div className="user_id">????????? : {list.fb_user_id}</div>
                <div className="date">????????? : {list.fb_c_date}</div>
              </ReadInfo>
              {/* html ?????? ??? ???????????? ????????? ?????? */}
              <ReadContents className="read-contents">{(list.fb_content).replace(/<[^>]*>?/g,'')}</ReadContents>
            </div>
          ))}
        </div>
        {getFb_user_id === getUserId && (
          <div className="UD-ButtonBox">
            <ButtonUD onClick={()=>onClickUpdate(getFb_id)}>??????</ButtonUD>
            <ButtonUD onClick={onClickDelete}>??????</ButtonUD>
          </div>
        )}
        <hr className="commentHr"/>
        {/* ?????? ???????????? ?????? <- ??????: ?????? ???????????? ???????????????! ????????? ????????? ????????? ???????????? ????????? ????????? ?????? ????????? ???????????????, ???????????? ????????? ?????????????????? :)  */}
        <Comment />
        {modalOpen && <Modal open={modalOpen} confirm={confirmModal} close={closeModal} type={true} header="??????">?????? ?????????????????????????</Modal>}
      </BoardBlock>
  )
}
export default BoardDetail