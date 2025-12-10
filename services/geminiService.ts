
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

// Declare process for TS environment that doesn't have @types/node
declare const process: { env: { [key: string]: string | undefined } };

const SYSTEM_INSTRUCTION = `
你是「育豪資優」(Yuhao Gifted Education) 的 AI 課程顧問。
你的任務是親切、專業地回答家長與學生關於我們補習班的問題。

請遵循以下資訊回答：
1. **課程範圍**：我們提供國小、國中、高中的全科輔導與量身規劃課程。
2. **班級特色**：採用小班制教學 (每班 8-12 人)，確保每位學生都能受到關注。
3. **教學方法**：我們重視「量身設計學習地圖」，並提供完整評量與回饋報告。
4. **目標**：用最有效率的方法提升學習成效，不只是死背，而是理解。
5. **預約試聽**：如果使用者想報名或試聽，請引導他們點擊網頁上的「立即報名」按鈕，或留下聯絡資訊。
6. **風格**：請使用繁體中文 (Traditional Chinese) 回答，語氣鼓勵且正向。

如果遇到你不確定的資訊（如具體學費或特定老師的排班），請誠實告知，並建議他們直接致電櫃檯詢問。
`;

export const sendMessageToGemini = async (
  history: ChatMessage[],
  newMessage: string
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "系統設定錯誤：找不到 API Key，請聯繫管理員。";
    }

    const ai = new GoogleGenAI({ apiKey });

    // Construct the prompt with history context
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage({
        message: newMessage
    });

    return result.text || "抱歉，我現在無法回答您的問題，請稍後再試。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "連線發生錯誤，請檢查網路或稍後再試。";
  }
};
