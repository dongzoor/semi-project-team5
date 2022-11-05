import { useState, useEffect } from "react";
import nbApi from "../../api/nbApi"
import "../../fonts/Font.css";
import styled from "styled-components";
import "./TboardStyle.css";
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.css';


const Box = styled.div`
  border: 4px solid #40BAAA;
  border-top: 200px;
  width: 1024px;
  height: auto;
  margin: 0 auto;
  background-color: rgb(0, 0, 0);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
;

const LogoBox = styled.div`
    box-sizing: border-box;
    padding-bottom: 3em;
    width: 1024px;
    margin: auto;
    margin-top: 2rem;
    font-family: "DungGeunMo";
    @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 1em;
      padding-right: 1em;
    }
  `;

  const BoardListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3em;
    width: 1024px;
    height : 900px;
    margin: auto;
    margin-top: 2rem;
    font-family: "DungGeunMo";
    @media screen and (max-width: 768px) {
      width: 100%;
      padding-left: 1em;
      padding-right: 1em;
    }
  `;

const isLogin = window.localStorage.getItem("isLogin");

const TBoardList = () => {
  const [TBoardList, setTboardList] = useState("");
  const [loading, setLoading] = useState(false);

  const onClickBoardList = (val) => {
    console.log("상세 게시판으로 이동 : " + val);
    window.localStorage.setItem("Detail", val);
    window.location.replace("/tBoardDetail");
  };

  

  

  useEffect(() => {
    const BoardData = async () => {
      setLoading(true);
      try {
        const response = await nbApi.TBoardList();
        setTboardList(response.data);
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    BoardData();
  }, []);

  if (loading) {
    return <BoardListBlock>대기 중...</BoardListBlock>;
  }

  const onClickWrite = (e) => {
    e.preventDefault();
    console.log("글쓰기 페이지로 이동");
    window.location.replace("/tWriteBoard");
  };

  return (
    <Box>
      <div style={{height:"130px"}}>
        <LogoBox>
          <div className="boardCategory">
            <h1>일 행 구 하 기</h1>
            <span>내 동료가 돼라!</span>
          </div>
        </LogoBox>
      </div>
      <div style={{height:"100%", width:"100%", overflow:"scroll"}}>
        <form className="board-form" style={{width:"100%"}}>
          <div>
            {isLogin === "TRUE" &&
              <button className="WriteBtn" onClick={onClickWrite}>
              글쓰기📝
            </button>}
            <div className="BoardListTable">
            <Table class="table table-striped" style={{textAlign:"center"}}>
              <thead>
                <tr>
                  <th width="80px">글번호</th>
                  <th width="*">제목</th>
                  <th width="100px">작성자</th>
                  <th width="100px">작성일</th>
                  <th width="80px">조회수</th>
                </tr>
              </thead>
              <tbody>
              {TBoardList &&
                TBoardList.map((list) => (
                  <tr key={list.gmb_id} onClick={() => onClickBoardList(list.gmb_id)}>
                    <td>{list.gmb_id}</td>
                    <td>{list.gmb_title}</td>
                    <td>{list.gmb_user_id}</td>
                    <td>{list.gmb_c_date}</td>
                    <td>{list.gmb_hit}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {/* <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} currentPage={currentPage} paginate={paginate}></Pagination> */}
          </div>
        </form>
      </div>
    </Box>
  );
};
export default TBoardList;