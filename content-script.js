if (typeof window.kaonaviToolLoaded === 'undefined') {
  window.kaonaviToolLoaded = true;

  /**
   * ページ上の編集可能なtextareaを出現順に収集する
   */
  function collectEditableTextareas() {
    const results = [];
    const wrappers = document.querySelectorAll('div[id]');

    wrappers.forEach(wrapper => {
      const id = wrapper.id;
      if (!id || id.startsWith(':r') || id === 'root') return;

      const textarea = wrapper.querySelector('textarea');
      if (textarea && !textarea.disabled && !textarea.readOnly) {
        results.push({ id, textarea });
      }
    });

    return results;
  }

  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {

    // --- Export処理 (v2: ポジションベース) ---
    if (request.action === "export") {
      const entries = collectEditableTextareas();
      const fields = entries.map((entry, index) => ({
        index,
        id: entry.id,
        value: entry.textarea.value
      }));

      sendResponse({
        data: { _version: 2, fields },
        count: fields.length
      });
    }

    // --- Import処理 (v1/v2 両対応) ---
    if (request.action === "import") {
      const data = request.data;
      let count = 0;

      if (data._version === 2 && Array.isArray(data.fields)) {
        // v2: ポジションベースで復元
        const entries = collectEditableTextareas();

        for (const field of data.fields) {
          const target = entries[field.index];
          if (target) {
            setTextareaValue(target.textarea, field.value);
            count++;
          }
        }
      } else {
        // v1: 従来のIDベースで復元（後方互換）
        for (const [key, value] of Object.entries(data)) {
          let targetTextarea = null;

          const wrapper = document.getElementById(key);
          if (wrapper) {
            targetTextarea = wrapper.querySelector('textarea');
          }
          if (!targetTextarea) {
            targetTextarea = document.getElementById(key);
          }

          if (targetTextarea && !targetTextarea.disabled && !targetTextarea.readOnly) {
            setTextareaValue(targetTextarea, value);
            count++;
          }
        }
      }

      sendResponse({ status: `${count} 箇所の項目に入力しました。\n(保存ボタンは手動で押してください)` });
    }

    return true;
  });

  /**
   * React管理下のtextareaに値をセットしイベントを発火する
   */
  function setTextareaValue(textarea, value) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLTextAreaElement.prototype, "value"
    ).set;

    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(textarea, value);
    } else {
      textarea.value = value;
    }

    textarea.dispatchEvent(new Event('input', { bubbles: true }));
    textarea.dispatchEvent(new Event('change', { bubbles: true }));
    textarea.dispatchEvent(new Event('blur', { bubbles: true }));
  }
}
