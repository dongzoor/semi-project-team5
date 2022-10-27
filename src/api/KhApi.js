import axios from "axios";
const HEADER = 'application/json';
const DOMAIN = "http://localhost:8090/kh_mini_project/";

const KhApi = {
    // 로그인 기능
    userLogin: async function(id, pw) {
        const loginObj = {
            id: id,
            pwd: pw
        }
        return await axios.post(DOMAIN + "LoginServlet", loginObj, HEADER);
    },
    // 회원 정보 조회
    memberInfo: async function() {
        const regCmd = {
            cmd : "MemberInfo"
        }
        return await axios.post(DOMAIN + "Member", regCmd, HEADER);
    },
    // 회원 가입
    memberReg: async function(id, pwd, name, mail) {
        const memberObj = {
            id: id,
            pwd: pwd,
            name: name,
            mail: mail
        };
        return await axios.post(DOMAIN + "MemberReg", memberObj, HEADER);
    },
    // 회원 가입 여부 확인
    memberRegCheck: async function(id) {
        const regCheck = {
            id: id,
        }
        return await axios.post(DOMAIN + "MemberCheck", regCheck, HEADER);
    },

    memberDelete: async function(id) {
        const memberDel = {
            id:id,
        }
        return await axios.delete(DOMAIN + "MemberDelServlet", memberDel, HEADER);
    },

}

export default KhApi;