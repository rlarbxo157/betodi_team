import axios from "axios";

const Kakao = axios.create({
    baseURL: "https://dapi.kakao.com", // 공통 요청 경로를 지정해준다.
    headers: {
        Authorization: `KakaoAK 73e470644500e24e60b78b142ae26411` // 공통으로 요청 할 헤더
    }
});

// search book api
export const bookSearch = (params) => {
    return Kakao.get("/v3/search/book", { params });
};
