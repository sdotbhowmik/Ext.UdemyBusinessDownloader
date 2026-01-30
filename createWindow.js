let popupWindowId = null;

chrome.action.onClicked.addListener(async () => {
  // Prevent multiple popup windows
  if (popupWindowId !== null) {
    try {
      await chrome.windows.update(popupWindowId, { focused: true });
    } catch (e) {
      popupWindowId = null;
    }
    return;
  }

  const width = 1092;
  const height = 700;

  const win = await chrome.windows.create({
    url: "popup.html",
    type: "popup",
    width: width,
    height: height,
    focused: true
  });

  popupWindowId = win.id;
});

// Reset when popup is closed
chrome.windows.onRemoved.addListener((winId) => {
  if (winId === popupWindowId) {
    popupWindowId = null;
  }
});
