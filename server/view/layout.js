import common from '../../client/config/server.dev.config';

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
    <link rel="stylesheet" href="/index.css">
    <link rel="stylesheet" href="/vendor.css">
    <script>
      window.__REDUX_DATA__ = ${JSON.stringify(data)};
    </script>
  </head>
  <body>
    <div id="root"><div>${content}</div></div>
 
  <script src="${common.publicPath}vendor.bundle.js"></script>
  <script src="${common.publicPath}index.bundle.js"></script>
  </body>
  </html>
`;
};

module.exports = layout
