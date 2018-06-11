import common from '../../config';

function layout (content, data) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charSet='utf-8'/>
    <meta httpEquiv='X-UA-Compatible' content='IE=edge'/>
    <meta name='renderer' content='webkit'/>
    <meta name="author" content="张静宜">
    <meta name="description" content="张静宜个人前端博客">
    <meta name="keywords" content="张静宜个人前端博客, 前端博客, 张静宜">
    <meta name='viewport' content='width=device-width, initial-scale=1'/>
    <link rel="stylesheet" href="/css/index.css">
    <!--<link rel="stylesheet" href="/vendor.css">-->
    <script>
      window.__REDUX_DATA__ = ${JSON.stringify(data)};
    </script>
  </head>
  <body>
    <div id="root"><div>${content}</div></div>
 
  <script type="text/javascript" src="${common.publicPath}lib/react.js"></script>
  <script type="text/javascript" src="${common.publicPath}lib/redux.js"></script>
  <script type="text/javascript" src="${common.publicPath}lib/axios.js"></script>
  <script type="text/javascript" src="${common.publicPath}lib/remark.js"></script>
  <script type="text/javascript" src="${common.publicPath}lib/other.js"></script>
  <script type="text/javascript" src="${common.publicPath}js/index.js"></script>
  </body>
  </html>
`;
};

module.exports = layout