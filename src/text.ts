type TextIndex = {
    line: number;
    start: number;
    end: number;
    text: string;
    globalStart?: number;
    globalEnd?: number; 
  };
  
  let textToCheck: string = "";
  let allIndices: TextIndex[] = [];
  let dataToSend: { text: string; indices: TextIndex[] }[] = [];
  let globalOffset = 0;

  function mapApiResponseToOriginalIndices(apiResponse: any, data: { text: string; indices: TextIndex[] }) {
    return apiResponse.result.map((item: any) => {
      const match = data.indices.find(
        (entry) => entry.globalStart! <= item.index && item.index < entry.globalEnd!
      );
  
      return {
        word: item.word,
        originalLine: match?.line ?? -1,
        originalStart: match?.start ?? -1,
        originalEnd: match?.end ?? -1,
        suggests: item.suggests,
      };
    });
  }
  
  function tabActiveLineCount(lines: number, document: any) {
    const thaiPattern = /[\u0E00-\u0E7F]+/g;
  
    for (let i = 0; i < lines; i++) {
      const text = document.lineAt(i).text;
      let match;
  
      thaiPattern.lastIndex = 0; // รีเซ็ต regex ก่อนวนลูป
      while ((match = thaiPattern.exec(text)) !== null) {
        const matchText = match[0];
  
        allIndices.push({
          line: i,
          start: match.index,
          end: match.index + matchText.length,
          text: matchText,
          globalStart: globalOffset,
          globalEnd: globalOffset + matchText.length,
        });
  
        textToCheck += matchText + " ";
        globalOffset += matchText.length + 1; // +1 สำหรับช่องว่างที่เพิ่มเข้าไป
  
        if (textToCheck.length >= 1000) {
          dataToSend.push({ text: textToCheck.trim(), indices: [...allIndices] });
  
          // รีเซ็ตค่าทั้งหมด
          textToCheck = "";
          allIndices = [];
          globalOffset = 0;
        }
      }
    }
  
    // กรณีเหลือข้อมูลท้ายสุดที่ยังไม่ถูกส่ง
    if (textToCheck.length > 0) {
      dataToSend.push({ text: textToCheck.trim(), indices: [...allIndices] });
    }
  }
  
  export {
    tabActiveLineCount,
    mapApiResponseToOriginalIndices,
    textToCheck,
    allIndices,
    dataToSend,
  };
  