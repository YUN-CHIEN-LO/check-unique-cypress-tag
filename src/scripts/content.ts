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
 * Listens for messages from the extension's background script.
 * If the action is "findDuplicates", it finds and counts duplicated data-cy tag values,
 * then sends the response back to the sender.
 * @param {any} request - The message object sent by the background script.
 * @param {chrome.runtime.MessageSender} _sender - Information about the sender of the message.
 * @param {(response: { duplicates: { [key: string]: number } }) => void} sendResponse - A function to send a response back to the sender.
 */
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "findDuplicates") {
    const appHtmlString = document.getElementById("app")?.innerHTML ?? "";

    const regex = /data-cy="([^"]+)"/g;

    const duplicatesObject: { [key: string]: number } =
      findDuplicatesWithCounts(
        (appHtmlString.match(regex) ?? []).map((match) =>
          match.replace(/data-cy="([^"]+)"/, "$1")
        )
      );

    // Send the response back to the sender
    sendResponse({ duplicates: duplicatesObject });
  }
});
