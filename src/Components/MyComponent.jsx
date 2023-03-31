import React from "react";
import { useState } from "react";

const PDFCreator = require("pdf-creator-node");
const fs = require("fs");
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

function MyComponent() {
  const [pdfData, setPdfData] = useState(null);

  function generatePdf() {
    PDFCreator.create(options)
      .then((pdf) => {
        setPdfData(pdf);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDownloadClick() {
    const blob = new Blob([pdfData], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-pdf.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <div>
      <h1>My PDF</h1>
      <p>This is some sample text.</p>
      <button onClick={generatePdf}>Generate PDF</button>
      {pdfData && <button onClick={handleDownloadClick}>Download PDF</button>}
    </div>
  );
}

export default MyComponent;
