const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Set viewport to exact panaflex dimensions
    await page.setViewport({ width: 2000, height: 1000, deviceScaleFactor: 2 });

    // Load the HTML file
    const filePath = path.resolve(__dirname, '..', 'panaflex-print.html');
    await page.goto(`file:///${filePath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle0' });

    // Wait for fonts to load
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 2000));

    // Screenshot as PNG
    const outputPath = path.resolve(__dirname, '..', 'KAAJ-Panaflex-2000x1000.png');
    await page.screenshot({
        path: outputPath,
        clip: { x: 0, y: 0, width: 2000, height: 1000 },
        omitBackground: false
    });

    console.log(`✅ Saved: ${outputPath}`);

    // Also save a PDF
    const pdfPath = path.resolve(__dirname, '..', 'KAAJ-Panaflex.pdf');
    await page.pdf({
        path: pdfPath,
        width: '2000px',
        height: '1000px',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });

    console.log(`✅ Saved: ${pdfPath}`);

    await browser.close();
})();
