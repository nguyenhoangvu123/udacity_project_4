import jwt from 'jsonwebtoken';
const { verify } = jwt;

const certificate = `-----BEGIN CERTIFICATE-----
MIIDHTCCAgWgAwIBAgIJA2g37sbqo/1PMA0GCSqGSIb3DQEBCwUAMCwxKjAoBgNV
BAMTIWRldi1kN2Eyb2FsenJoc2MzdWVjLnVzLmF1dGgwLmNvbTAeFw0yNDA2MTgx
MzUyMzZaFw0zODAyMjUxMzUyMzZaMCwxKjAoBgNVBAMTIWRldi1kN2Eyb2FsenJo
c2MzdWVjLnVzLmF1dGgwLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBAMDzyjVitup0I7c11wW3M+g3N3Yj8d6DsdDz9hYX4RLD63z1Q7uuljjKWDUV
CeOfquzF+4v3ZmFSVKfKFiw3YM4EyeC+1ZrphZqHfj4m5zEKfZaHM/xHZfvOw6sO
D9zyh+rro10aBWHXXqiu+PDY/AWEH1xq3fsbMhP8sf8QX+FkeBF7hOSKf/LnGY79
uszAkDlvVuT292iCSbGkhMrhTXyjmwYlX+GfcHFy6erOa+NTfoQIQcQ95a0Vl5Wi
273NRMxpO9YqOtmDZv3EWx0ScIUa+3RsrrtoZRUjnHPc0g01bA7nRquhMUzVpbif
HARv1wYVnT4B7SuAww1DFAi8tqECAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAd
BgNVHQ4EFgQUqWdgkWncgOradPkUv12sd06Bo28wDgYDVR0PAQH/BAQDAgKEMA0G
CSqGSIb3DQEBCwUAA4IBAQATF9wvQet8GfAIM45GhS5Q4KWg7Tu+oi/G6EgzIbr9
uFQGpaiJdyrwjSO6yNY4qN97PnxKWFbcTiQI6lg/LuH0R6f11ZrOAs0/lGtmdWED
KdiGGecTz9x9uA3C/z5PUBmncRsXn4YRB/xsXmDeCWgSXtdcWkYsdOJTEfnwQz7z
9+xfrfbmUyr0LOUV4CrBfZyTP6JRTvZuwAKV0YZHbCJyRFz2bxx7+9W9Q/AwDYi8
NCEhI8FIA9AkBQNW/w00khgaVOHvZhXmlZMZvTDY3HYmccmWNx9KopzGE233zkLv
0tiPQitYKnOHiyw8By/Rg5EBT5XaHjLkLdUPrZvNECem
-----END CERTIFICATE-----`;

function getToken(authHeader){
  if (!authHeader) throw new Error('No authentication header');
  if (!authHeader.toLowerCase().startsWith('bearer ')) {
    throw new Error('Invalid authentication header');
  }
  const jwtArr = authHeader.split(' ');
  const token = jwtArr[1];
  return token;
}

export async function verifyToken(authHeader){
  const token = getToken(authHeader);
  return verify(token, certificate, { algorithms: ['RS256'] });
}

