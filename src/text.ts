import { Position, TextIndex } from "./types";

  let textToCheck: string = "";
  let allIndices: TextIndex[] = [];
  let dataToSend: { text: string; indices: TextIndex[] }[] = [];
  let globalOffset = 0;



  function findOriginalPosition(apiIndex: number, originalData: TextIndex[]): Position | null {
    for (let i = 0; i < originalData.length; i++) {
      const lineInfo = originalData[i];
      const nextLine = originalData[i + 1];

      if (apiIndex >= lineInfo.globalStart! && (!nextLine || apiIndex < nextLine.globalStart!)) {
        return {
          line: lineInfo.line,
          start: apiIndex - lineInfo.globalStart! + lineInfo.start,
          end: apiIndex - lineInfo.globalStart! + lineInfo.start + lineInfo.text.length
        };
      }
    }
    return null;
  }

  function mapApiResponseToOriginalIndices(apiResponse: any, data: { text: string; indices: TextIndex[] }): Promise<any[]> {
    return new Promise((resolve) => {
      const results = apiResponse.result.map((item: any) => {
        const match = data.indices.find(
          (entry) => entry.globalStart! <= item.index && item.index < entry.globalEnd!
        );
    
        return {
          word: item.word,
          originalLine: match?.line ?? -1,
          originalStart: match?.start ?? -1,
          originalEnd: match?.end ?? -1,
          suggests: item.suggests,
          response: apiResponse.result,
        };
      });
      resolve(results);
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
        globalOffset += matchText.length + 1;
  
        if (textToCheck.length >= 1000) {
          dataToSend.push({ text: textToCheck.trim(), indices: [...allIndices] });
          textToCheck = "";
          allIndices = [];
          globalOffset = 0;
        }
      }
    }
  
    if (textToCheck.length > 0) {
      dataToSend.push({ text: textToCheck.trim(), indices: [...allIndices] });
    }
  }
  
  export {
    tabActiveLineCount,
    mapApiResponseToOriginalIndices,
    findOriginalPosition,
    textToCheck,
    allIndices,
    dataToSend,
  };
  