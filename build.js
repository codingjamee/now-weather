// build.js
const esbuild = require('esbuild');
const dotenv = require('dotenv');
const fs = require('fs');

// .env 파일을 읽어서 환경 변수를 로드합니다.
const env = dotenv.config().parsed;

// 환경 변수를 esbuild Define 옵션에 맞게 변환합니다.
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

// esbuild로 빌드를 수행합니다.
esbuild.build({
  entryPoints: ['src/app.js'],
  bundle: true,
  outfile: 'dist/app.js',
  define: envKeys,
  loader: { '.js': 'jsx' },
  platform: 'browser', // 클라이언트용 빌드를 위해 platform을 'browser'로 설정
}).catch(() => process.exit(1));