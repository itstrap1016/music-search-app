const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // entry: 애플리케이션의 진입점입니다. 이 파일에서부터 애플리케이션이 시작되며, ./src/index.tsx는 React 애플리케이션의 루트 파일로, 모든 의존성들이 이 파일을 통해 묶이게 됩니다.
  entry: {
    client: './src/index.tsx', // React 애플리케이션의 클라이언트 코드
    server: './src/server/server.ts', // 서버 측 코드 (서버 코드 경로)
  },
  // output: 번들된 파일이 저장될 위치를 정의합니다. 여기서는 ./dist/bundle.js에 번들된 자바스크립트 파일을 저장합니다. path.resolve(__dirname, 'dist')는 프로젝트 루트에 있는 dist 폴더를 지정합니다.
  output: {
    filename: '[name].bundle.js', // 클라이언트와 서버 번들 파일을 각각 생성
    path: path.resolve(__dirname, 'dist'),
  },
  // extensions: Webpack이 모듈을 해결할 때, 파일 확장자를 자동으로 인식하게 해줍니다. 예를 들어, import App from './App'만 작성하면, .ts, .tsx, .js 확장자를 가진 파일을 자동으로 찾습니다.
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  //  module: 파일을 어떻게 처리할지를 정의하는 설정입니다. 즉, webpack이 특정 파일을 처리할 때 사용할 "로더(Loader)"를 지정합니다. 로더는 파일을 변환하거나 처리하는 과정에서 주로 사용됩니다. 예를 들어, JavaScript, CSS, TypeScript, 이미지 파일 등을 처리하는 역할을 합니다.
  // **rules**는 파일 유형에 따라 어떻게 처리할지를 정의합니다
  module: {
    rules: [
      // CSS 처리: .css 파일을 처리하는 로더 설정입니다. style-loader와 css-loader를 사용하여 CSS 파일을 자바스크립트로 변환하고, HTML 문서에 스타일을 삽입합니다.
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // TypeScript 처리: .ts와 .tsx 파일을 ts-loader로 처리합니다. TypeScript 파일을 자바스크립트로 변환하고, TypeScript에서 발생할 수 있는 오류를 컴파일할 때 체크합니다. exclude: /node_modules/는 node_modules 폴더의 파일을 제외시켜, 불필요한 컴파일을 피합니다.
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // plugins: webpack의 빌드 프로세스에서 추가적인 작업을 수행하는 도구입니다. 플러그인은 빌드를 최적화하거나, 번들된 결과물에 대해 추가적인 작업을 할 때 사용됩니다. 플러그인은 파일 변환뿐만 아니라, 빌드 결과를 처리하거나, 빌드 프로세스에 영향을 미치는 다양한 작업을 할 수 있습니다.
  // CleanWebpackPlugin: 매번 빌드를 할 때마다 이전의 빌드 결과물(dist 폴더)을 삭제하여, 새롭게 빌드된 파일만 남게 합니다. 이는 빌드 과정에서 생성된 불필요한 파일을 정리해줍니다.
  // HtmlWebpackPlugin: 이 플러그인은 HTML 파일을 자동으로 생성해주고, 생성된 자바스크립트 번들을 <script> 태그로 HTML 파일에 삽입해줍니다. template: './public/index.html'을 사용하여 ./public/index.html 파일을 템플릿으로 사용하고, 이를 기반으로 최종 HTML 파일을 생성합니다.
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  // **devServer**는 Webpack Dev Server의 설정을 정의합니다.
  // static: ./dist 디렉토리에서 정적 파일을 서빙합니다.
  // port: 개발 서버가 사용할 포트를 설정합니다. 여기서는 3000번 포트를 사용합니다.
  // open: 서버가 실행될 때, 기본 브라우저에서 자동으로 열리도록 설정합니다.
  // Hot Module Replacement (HMR): devServer 설정에서 HMR을 활성화하면, 코드 수정 시 페이지를 새로 고침하지 않고도 변경 사항을 실시간으로 반영할 수 있습니다. 이 기능을 추가하려면 hot: true를 설정할 수 있습니다.
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
  },
  target: 'node',
  node: {
    __dirname: false, // 서버에서 __dirname을 사용할 수 있도록 설정
  },
};
