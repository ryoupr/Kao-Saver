// 共通Export処理
async function handleExport(mode) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  }, () => {
    chrome.tabs.sendMessage(tab.id, { action: "export" }, (response) => {
      if (chrome.runtime.lastError) {
        alert("エラー: ページをリロードしてから再試行してください。");
        return;
      }
      
      if (!response || response.count === 0) {
        alert("入力可能な項目が見つかりませんでした。\n・評価画面が開かれているか確認してください\n・「編集モード」になっているか確認してください");
        return;
      }

      const jsonStr = JSON.stringify(response.data, null, 2);
      
      // テキストエリアにも一応表示しておく
      document.getElementById('jsonInput').value = jsonStr;

      if (mode === 'clipboard') {
        navigator.clipboard.writeText(jsonStr).then(() => {
            alert(`成功: ${response.count} 項目のデータをクリップボードにコピーしました！`);
        });
      } else if (mode === 'file') {
        // Blobを作成してダウンロードリンクを生成・クリック
        const blob = new Blob([jsonStr], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        // ファイル名に日時を入れる (例: kao_saver_20231128.json)
        const date = new Date();
        const ymd = date.toISOString().slice(0,10).replace(/-/g, "");
        a.download = `kao_saver_${ymd}.json`;
        
        a.href = url;
        a.click();
        URL.revokeObjectURL(url);
      }
    });
  });
}

// ボタンイベント: クリップボード
document.getElementById('btnExportClip').addEventListener('click', () => {
  handleExport('clipboard');
});

// ボタンイベント: ファイル保存
document.getElementById('btnExportFile').addEventListener('click', () => {
  handleExport('file');
});


// ファイル読み込み処理
document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    // 読み込んだ内容をテキストエリアにセット
    document.getElementById('jsonInput').value = e.target.result;
  };
  reader.readAsText(file);
});


// Importボタン (画面反映)
document.getElementById('btnImport').addEventListener('click', async () => {
  const jsonStr = document.getElementById('jsonInput').value;
  let jsonData;
  
  if (!jsonStr.trim()) {
      alert("JSONデータがありません。貼り付けるかファイルを読み込んでください。");
      return;
  }

  try {
    jsonData = JSON.parse(jsonStr);
  } catch (e) {
    alert('JSONの形式が正しくありません。\n' + e.message);
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  }, () => {
    chrome.tabs.sendMessage(tab.id, { action: "import", data: jsonData }, (response) => {
      if (chrome.runtime.lastError) {
        alert("エラー: 実行できませんでした。");
      } else {
        alert(response ? response.status : '処理完了');
      }
    });
  });
});
