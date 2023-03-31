const PDFCreator = require("pdf-creator-node");
const fs = require("fs");
const MyComponent = require("../Components/MyComponent");
const ReactDOMServer = require("react-dom/server");

const html = ReactDOMServer.renderToString(<MyComponent />);
const options = {
  format: "A4",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "10mm",
  },
  footer: {
    height: "10mm",
  },
  type: "buffer",
  template: {
    content: html,
  },
};

PDFCreator.create(options)
  .then((pdf) => {
    // Write the PDF to a file
    fs.writeFileSync("output.pdf", pdf);
  })
  .catch((error) => {
    console.error(error);
  });
