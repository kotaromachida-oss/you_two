import { calculateScore } from "./scoring-engine";
import { DiagnosticInput } from "./scoring-tables";

/**
 * 診断結果をURLパラメータ用の文字列にエンコードする
 * @param result 診断結果
 * @returns エンコードされた文字列
 */
export function encodeResultToUrl(result: DiagnosticInput): string {
  const userScore = calculateScore(result.user);
  const partnerScore = calculateScore(result.partner);
  const totalScore = userScore * partnerScore;

  const data = {
    ua: result.user.ageGroup,
    ts: Math.round(totalScore),
  };
  
  const jsonString = JSON.stringify(data);
  // Edge runtimeとブラウザの両方で動作するbase64エンコード
  if (typeof Buffer !== 'undefined') {
    // Node.js/Edge runtime環境
    return Buffer.from(jsonString, 'utf-8').toString('base64');
  } else {
    // ブラウザ環境
    return btoa(unescape(encodeURIComponent(jsonString)));
  }
}

/**
 * URLパラメータから診断結果をデコードする
 * @param encoded エンコードされた文字列
 * @returns 診断結果の一部（再計算に必要なデータ）
 */
export function decodeResultFromUrl(encoded: string): {
  userAgeGroup: string;
  totalScore: number;
} | null {
  try {
    // Edge runtimeとブラウザの両方で動作するbase64デコード
    let jsonString: string;
    if (typeof Buffer !== 'undefined') {
      // Node.js/Edge runtime環境
      jsonString = Buffer.from(encoded, 'base64').toString('utf-8');
    } else {
      // ブラウザ環境
      jsonString = decodeURIComponent(escape(atob(encoded)));
    }
    const data = JSON.parse(jsonString);
    
    return {
      userAgeGroup: data.ua,
      totalScore: data.ts,
    };
  } catch (error) {
    console.error('Failed to decode result from URL:', error);
    return null;
  }
}
