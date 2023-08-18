const pdfParse = require('pdf-parse');
const { createCanvas, loadImage } = require('canvas');
const Tesseract = require('tesseract.js');

// Function to perform OCR using Tesseract.js
async function performOCR(imageDataUrl) {
  try {
    const { data: { text } } = await Tesseract.recognize(
      imageDataUrl,
      'eng',
      { logger: (info) => console.log(info) }
    );
    return text;
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Error performing OCR on the image.');
  }
}


async function pdfToImages(pdfBuffer) {
  try {
    if (!pdfBuffer || pdfBuffer.length === 0) {
      throw new Error('Invalid PDF buffer.');
    }

    const pdfData = await pdfParse(pdfBuffer);
    console.log('PDF Document Loaded Successfully.');

    const numPages = pdfData.numpages;
    console.log('Number of Pages:', numPages);
    let ocrTextbyme;
    const images = [];
    for (let i = 0; i < numPages; i++) {
      // Get text from the current page using the pdf-parse function getPageText
      const pageText = await pdfParse(pdfBuffer, { max: i + 1 });
      const text = pageText.text;

      // Create a canvas with an appropriate size for the image
      const canvas = createCanvas(600, 800);
      const ctx = canvas.getContext('2d');

      // Set a solid background color (e.g., white)
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set font properties
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black';

      // Split the text into lines and draw it on the canvas
      const lines = text.split('\n');
      const lineHeight = 25;
      const topMargin = 50;
      lines.forEach((line, index) => {
        ctx.fillText(line, 50, topMargin + index * lineHeight);
      });

      // Convert the canvas to a data URL and perform OCR on the image
      const imageDataUrl = canvas.toDataURL('image/png');
      const ocrText = await performOCR(imageDataUrl);

      // Optionally, you can log the recognized text for each page
      console.log('OCR Text for Page', i + 1, ':', ocrText);
      ocrTextbyme=ocrText;
      // Add the OCR text to the images array
      images.push({ imageDataUrl, ocrText });
    }
    return ocrTextbyme;
  } catch (error) {
    console.error('Error:', error.message);
    throw new Error('Error loading or processing the PDF document.');
  }
}

module.exports = { pdfToImages };