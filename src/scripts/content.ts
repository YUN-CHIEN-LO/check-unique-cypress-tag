/**
 * Generates a random color.
 * @returns {string} - A random color in hexadecimal format.
 */
function getRandomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

/**
 * Finds duplicates in an array and counts their occurrences.
 * @param {any[]} arr - The input array.
 * @returns {{ [key: string]: number }} - An object containing duplicate values as keys and their counts as values.
 */
function findDuplicatesWithCounts(arr: any[]): { [key: string]: number } {
  const duplicatesObject: { [key: string]: number } = {};

  arr.forEach((value, index, self) => {
    if (self.indexOf(value) !== index) {
      if (duplicatesObject[value] === undefined) {
        duplicatesObject[value] = 2;
      } else {
        duplicatesObject[value]++;
      }
    }
  });
  return duplicatesObject;
}

/**
 * Highlights all HTML elements with a specific data-cy attribute value.
 *
 * @param {string} dataCyValue - The value of the data-cy attribute to highlight.
 * @returns {void}
 */
function highlightElementsWithCypressTag(dataCyValue: string) {
  const elements = document.querySelectorAll(`[data-cy="${dataCyValue}"]`);
  const borderColor = getRandomColor();

  elements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.setAttribute(
        "style",
        `border: 5px solid ${borderColor} !important`
      );
    }
  });
}

/**
 * Clears the highlight borders applied to all HTML elements with a data-cy attribute.
 *
 * @returns {void}
 */
function clearHighlightBorders() {
  const elements = document.querySelectorAll("[data-cy]");

  elements.forEach((element) => {
    if (element instanceof HTMLElement) {
      element.style.border = "";
    }
  });
}

/**
 * Listens for messages from the extension's background script.
 * If the action is "findDuplicates", it finds and counts duplicated data-cy tag values,
 * then sends the response back to the sender.
 * @param {any} request - The message object sent by the background script.
 * @param {chrome.runtime.MessageSender} _sender - Information about the sender of the message.
 * @param {(response: { duplicates: { [key: string]: number } }) => void} sendResponse - A function to send a response back to the sender.
 */
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  switch (request.action) {
    case "findDuplicates":
      const appHtmlString = document.getElementById("app")?.innerHTML ?? "";
      const regex = /data-cy="([^"]+)"/g;
      const duplicatesObject: { [key: string]: number } =
        findDuplicatesWithCounts(
          (appHtmlString.match(regex) ?? []).map((match) =>
            match.replace(/data-cy="([^"]+)"/, "$1")
          )
        );
      sendResponse({ duplicates: duplicatesObject });
      break;

    case "highlightElements":
      const dataCyValue = request.dataCyValue;
      highlightElementsWithCypressTag(dataCyValue);
      break;

    case "clearHighlightBorders":
      clearHighlightBorders();
      break;

    default:
      // Handle unknown actions, if necessary
      break;
  }
});
