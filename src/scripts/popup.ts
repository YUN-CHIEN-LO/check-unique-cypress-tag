/**
 * Requests to highlight elements with a specific data-cy attribute value in the active tab.
 *
 * @param {string} dataCyValue - The value of the data-cy attribute to highlight.
 * @returns {void}
 */
function requestHighlight(dataCyValue: string) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0]?.id ?? -1;
    chrome.tabs.sendMessage(tabId, {
      action: "highlightElements",
      dataCyValue,
    });
  });
}

/**
 * Requests to clear the highlight borders applied to elements in the active tab.
 *
 * @returns {void}
 */
function clearHighlightElements() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0]?.id ?? -1;
    chrome.tabs.sendMessage(tabId, { action: "clearHighlightBorders" });
  });
}

/**
 * Displays duplicate information in a table based on the provided duplicates object.
 * @param {{ [key: string]: number }} duplicates - An object containing duplicate values as keys and their counts as values.
 */
function displayDuplicates(duplicates: { [key: string]: number }) {
  const tableContainer = document.getElementById("table-container");

  if (tableContainer === null) {
    return;
  }

  // Clear previous content
  tableContainer.innerHTML = "";

  if (Object.keys(duplicates).length === 0) {
    // If duplicates object is empty, show a message and hide the table container
    const messageElement = document.createElement("p");
    messageElement.textContent = "No duplicates found.";
    tableContainer.appendChild(messageElement);
  } else {
    // Create a table
    const table = document.createElement("table");
    table.border = "1";

    // Create table header
    const headerRow = table.insertRow(0);
    const headerCell1 = headerRow.insertCell(0);
    const headerCell2 = headerRow.insertCell(1);
    const headerCell3 = headerRow.insertCell(2);

    headerCell1.innerHTML = "Data-cy Value";
    headerCell2.innerHTML = "Count";
    headerCell3.innerHTML = "Highlight";

    // Populate the table with duplicate information
    let rowIndex = 1;
    for (const value in duplicates) {
      const row = table.insertRow(rowIndex);
      const cell1 = row.insertCell(0);
      const cell2 = row.insertCell(1);
      const cell3 = row.insertCell(2);

      cell1.innerHTML = value;
      cell2.innerHTML = duplicates[value]?.toString() ?? "-";

      // Create a button to highlight the element
      const highlightButton = document.createElement("button");
      highlightButton.textContent = "Highlight";
      highlightButton.addEventListener("click", () => {
        requestHighlight(value);
      });
      cell3.appendChild(highlightButton);

      rowIndex++;
    }

    // Append the table to the container
    tableContainer.appendChild(table);

    // Show the table container
    tableContainer.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const findDuplicatesButton = document.getElementById(
    "findDuplicates"
  ) as HTMLButtonElement;

  findDuplicatesButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id ?? -1;
      chrome.tabs.sendMessage(
        tabId,
        { action: "findDuplicates" },
        (response) => {
          displayDuplicates(response?.duplicates ?? {});
        }
      );
    });
  });

  const clearHighlightButton = document.getElementById(
    "clearHighlight"
  ) as HTMLButtonElement;

  clearHighlightButton.addEventListener("click", () => {
    clearHighlightElements();
  });
});
