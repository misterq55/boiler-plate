const path = require('path');

module.exports = {
  // 기타 설정...

  resolve: {
    fallback: {
      "zlib": require.resolve("browserify-zlib"), // zlib 모듈의 폴리필 설정
      "querystring": require.resolve("querystring-es3"), // querystring 모듈의 폴리필 설정
      "path": require.resolve("path-browserify"), // path 모듈의 폴리필 설정
      "crypto": require.resolve("crypto-browserify"), // crypto 모듈의 폴리필 설정
      "stream": require.resolve("stream-browserify"), // stream 모듈의 폴리필 설정
      "fs": false, // fs 모듈의 폴리필 설정 없음
      "http": require.resolve("stream-http"), // http 모듈의 폴리필 설정
      "util": require.resolve("util/"), // util 모듈의 폴리필 설정
      "url": require.resolve("url/"), // url 모듈의 폴리필 설정
      "buffer": require.resolve("buffer/"), // buffer 모듈의 폴리필 설정
    }
  },

  // 기타 설정...
};