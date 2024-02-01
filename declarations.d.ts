// declarations.d.ts
declare namespace chrome {
  namespace tabs {
    function query(
      queryInfo: chrome.tabs.QueryInfo,
      callback: (result: chrome.tabs.Tab[]) => void
    ): void;

    function sendMessage(
      tabId: number,
      message: any,
      options: any,
      responseCallback: (response: any) => void
    ): void;
  }

  namespace runtime {
    interface MessageEvent {
      addListener(
        callback: (message: any, sender: chrome.runtime.MessageSender) => void
      ): void;
    }
  }
}
