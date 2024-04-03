const REST_API_KEY = 'f99c39ffcdf63597195c1d3678b78fde';
const REDIRECT_URI = `${process.env.KAKAO_REDIRECT_URL}/auth/kakao/callback`;

const config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
  kakaoAuthUrl: `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`,
};

export default config;
