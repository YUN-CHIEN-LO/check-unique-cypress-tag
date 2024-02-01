# LYC Check Unique Cypress Tag

>  LYC 檢查唯一的 Cypress 標籤

A simple Chrome extension tool to help detect duplicated Cypress tags on a single page.
一個簡單的 Chrome 擴充工具，用於在單一頁面上檢測重複的 Cypress 標籤。

## Description 描述

This Chrome extension provides a tool for identifying and counting duplicated `data-cy` tags on a webpage. It consists of a popup with a button that, when clicked, sends a message to the content script running on the active tab. The content script analyzes the HTML of the page, counts the occurrences of `data-cy` tags, and sends the information back to the popup, where it is displayed in a table.

這個 Chrome 擴充提供了一個工具，用於識別和計數網頁上重複的 `data-cy` 標籤。它包含一個彈出視窗，其中有一個按鈕，當點擊時，會向正在運行的內容腳本發送一條消息。內容腳本分析頁面的 HTML，計算 `data-cy` 標籤的出現次數，然後將信息發送回彈出窗口，在其中以表格形式顯示。


## Installation

1. Download the extension files or clone the repository: <br>
    下載擴充文件或複製分支：

   ```bash
   git clone https://github.com/YUN-CHIEN-LO/check-unique-cypress-tag

2. run install and build script: <br>
    執行安裝和構建腳本：

   ```bash
   npm i && npm run build

3. Open Chrome and go to chrome://extensions/. <br>
    打開 Chrome 並前往 chrome://extensions/。

4. Enable "Developer mode" at the top right. <br>
    在右上角啟用「開發者模式」。

5. Click on "Load unpacked" and select the `/dist` folder containing the extension files. <br>
    點擊「載入未封裝」，並選擇包含擴充文件的 /dist 文件夾。

6. The extension icon should appear in the Chrome toolbar. <br>
    擴充圖標應該出現在 Chrome 工具欄中。

## How to Use 如何使用

1. Visit a webpage where you want to check for duplicated data-cy tags. <br>
    訪問要檢查重複的 data-cy 標籤的網頁。

2. Click on the LYC Check Unique Cypress Tag icon in the toolbar. <br>
    點擊 Chrome 工具欄中的 LYC 檢查唯一的 Cypress 標籤圖標。

3. The popup will open with a button labeled "Find Duplicates." <br>
    彈出視窗將打開，其中有一個標記為「查找重複」的按鈕。

4. Click the "Find Duplicates" button to analyze the page and display the results. <br>
    點擊「查找重複」按鈕以分析頁面並顯示結果。

## Credits 貢獻者

This extension was created by Chien Lo as a simple tool for Cypress tag analysis. <br>
此擴充由 Chien Lo 創建，作為 Cypress 標籤分析的簡單工具。

## License 授權

This project is licensed under the MIT License. <br>
本項目根據 MIT 授權條款許可。