// templates/email-template.js

const path = require("path");

const mailObj = {
    from: "code1000craft@outlook.com",
    to: "no",
    subject: "CodeCraft",
    html: (param1, param2) => `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CodeCraft</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh; /* Ensures the content is vertically centered on the page */
                }
                .logo img {
                    width: 200px;
                    height: 200px;
                }
                .topic {
                    color: grey;
                    font-size: 24px;
                    margin-top: 10px;
                }
                .param {
                    color: grey;
                    font-size: 16px;
                }
                .param2 {
                    color: #4D4B4B;
                    font-size: 20px;
                }
            </style>
        </head>
        <body>
            <div class="logo">
                <img src="cid:background_image" alt="Logo">
            </div>
            <div class="topic">CodeCraft</div>
            <h5 class="param">${param1}</h5>
            <h4 class="param2">${param2}</h4>
        </body>
        </html>
    `,
    attachments: [{
        filename: "background_image.png",
        path: path.resolve(__dirname, "./img/background_image.png"),
        cid: "background_image" // Use the same CID in the HTML img src attribute
    }]
};

module.exports = mailObj;
