if (typeof window.kaonaviToolLoaded === 'undefined') {
  window.kaonaviToolLoaded = true;

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    
    // --- Export処理 ---
    if (request.action === "export") {
      const data = {};
      let foundCount = 0;

      // IDを持つdivを探す（カオナビの構造依存）
      const wrappers = document.querySelectorAll('div[id]');

      wrappers.forEach(wrapper => {
        const key = wrapper.id;
        
        // 除外条件: キーがない、システムID(:r..)、または "root" の場合
        if (!key || key.startsWith(':r') || key === 'root') return;

        const textarea = wrapper.querySelector('textarea');

        // 入力可能（disabled/readonlyでない）な場合のみ対象
        if (textarea && !textarea.disabled && !textarea.readOnly) {
           data[key] = textarea.value;
           foundCount++;
        }
      });
      
      sendResponse({ data: data, count: foundCount });
    }

    // --- Import処理 ---
    if (request.action === "import") {
      const data = request.data;
      let count = 0;

      for (const [key, value] of Object.entries(data)) {
        let targetTextarea = null;

        // 1. 親ID (div id="目標1") から探す
        const wrapper = document.getElementById(key);
        if (wrapper) {
            targetTextarea = wrapper.querySelector('textarea');
        }

        // 2. 見つからない場合、念のためID属性そのものを探す（フォールバック）
        if (!targetTextarea) {
            targetTextarea = document.getElementById(key);
        }

        if (targetTextarea && !targetTextarea.disabled && !targetTextarea.readOnly) {
          
          // React対策
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
          if (nativeInputValueSetter) {
             nativeInputValueSetter.call(targetTextarea, value);
          } else {
             targetTextarea.value = value;
          }

          // イベント発火
          targetTextarea.dispatchEvent(new Event('input', { bubbles: true }));
          targetTextarea.dispatchEvent(new Event('change', { bubbles: true }));
          targetTextarea.dispatchEvent(new Event('blur', { bubbles: true }));
          
          count++;
        }
      }

      sendResponse({ status: `${count} 箇所の項目に入力しました。\n(保存ボタンは手動で押してください)` });
    }
    
    return true; 
  });
}
