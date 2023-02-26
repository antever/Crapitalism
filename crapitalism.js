function replaceTextContent(node) {
  // Only replace text nodes with non-empty text
  if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== "") {
    // Check if the parent element is editable, and skip it if it is
    if (node.parentElement.isContentEditable) {
      return;
    }

    // Replace the word "capitalism" with "crapitalism" (case insensitive)
    var regex = new RegExp("\\b" + "capitalism" + "\\b", "gi");
    node.textContent = node.textContent.replace(regex, function(match) {
      // Determine the case of the original word
      var uppercase = match[0].toUpperCase() === match[0];
      var lowercase = match[0].toLowerCase() === match[0];

      // Apply the same case to the replacement word
      if (uppercase) {
        return "Crapitalism";
      } else if (lowercase) {
        return "crapitalism";
      } else {
        return "CRAPITALISM";
      }
    });
  }
}

// Select all the text nodes on the page
var nodes = document.createTreeWalker(
  document.body,
  NodeFilter.SHOW_TEXT,
  { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
  false
);

while (nodes.nextNode()) {
  replaceTextContent(nodes.currentNode);
}