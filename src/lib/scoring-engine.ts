import {
  INCOME_SCORE_TABLE,
  DEVIATION_VALUE_TABLE,
  UserInput,
  COMPANY_SIZE_COEFFICIENTS,
  POSITION_COEFFICIENTS,
  DeviationValueRange,
} from './scoring-tables';


export function calculateScore(input: UserInput) {

  // 年齢と年収によってスコアを取得
  if (!input.ageGroup || !input.annualIncome) return 0;
  const ageGroupTable = INCOME_SCORE_TABLE[input.ageGroup];
  const baseScore = ageGroupTable.find((incomeScore) => incomeScore.income === input.annualIncome)?.score || 0;

  // 会社規模による係数を取得
  const companySizeCofficient = COMPANY_SIZE_COEFFICIENTS.find((companySize) => companySize.value === input.companySize)?.coefficient || 0;

  // 役職による係数を取得
  const positionCofficient = POSITION_COEFFICIENTS.find((position) => position.value === input.position)?.coefficient || 0;

  // 係数を掛け合わせてスコアを算出
  const score = baseScore * companySizeCofficient * positionCofficient;

  return score;
}

export function getRankInfo(score: number): DeviationValueRange | undefined {
  return DEVIATION_VALUE_TABLE.find((item) => item.min <= score && score <= item.max);
}

// /**
//  * 年収からスコアを計算する
//  * @param income 年収（万円）
//  * @param ageGroupTable 年齢層テーブル（20s, 30s, 40s）
//  * @returns スコア（0-25）
//  */
// function calculateIncomeScore(income: number, ageGroupTable: AgeGroupTable): number {
//   const table = INCOME_SCORE_TABLE[ageGroupTable];
  
//   // テーブルから該当する範囲を検索
//   for (const range of table) {
//     if (income >= range.min && income <= range.max) {
//       return range.score;
//     }
//   }
  
//   // 範囲外の場合（念のため）
//   if (income < table[0].min) return 0;
//   return 25;
// }

// /**
//  * 合計スコアから偏差値を計算する
//  * @param totalScore 合計スコア
//  * @returns 偏差値
//  */
// function calculateDeviationValue(totalScore: number): number {
//   // テーブルから該当する範囲を検索
//   for (const range of DEVIATION_VALUE_TABLE) {
//     const [min, max] = range.scoreRange;
//     if (totalScore >= min && totalScore <= max) {
//       return range.deviationValue;
//     }
//   }
  
//   // 範囲外の場合（安全策）
//   if (totalScore < DEVIATION_VALUE_TABLE[0].scoreRange[0]) {
//     return DEVIATION_VALUE_TABLE[0].deviationValue;
//   }
//   return DEVIATION_VALUE_TABLE[DEVIATION_VALUE_TABLE.length - 1].deviationValue;
// }

// /**
//  * 偏差値からランクと評価を取得する
//  * @param deviationValue 偏差値
//  * @returns ランク情報
//  */
// function getRankInfo(deviationValue: number) {
//   // 偏差値に該当するランクを検索（降順でソート済み）
//   for (const rankDef of RANK_TABLE) {
//     if (deviationValue >= rankDef.minDeviation) {
//       return {
//         rank: rankDef.rank,
//         rankLabel: rankDef.label,
//         percentile: rankDef.percentile,
//         comment: COMMENT_TEMPLATES[rankDef.rank],
//       };
//     }
//   }
  
//   // 該当なし（最低ランク）
//   const lowestRank = RANK_TABLE[RANK_TABLE.length - 1];
//   return {
//     rank: lowestRank.rank,
//     rankLabel: lowestRank.label,
//     percentile: lowestRank.percentile,
//     comment: COMMENT_TEMPLATES[lowestRank.rank],
//   };
// }

// /**
//  * 招待資格を判定する
//  * @param deviationValue 偏差値
//  * @returns 招待情報
//  */
// function determineInvitation(deviationValue: number): {
//   isEligible: boolean;
//   type: 'confirmed' | 'potential' | null;
// } {
//   if (deviationValue >= INVITATION_THRESHOLDS.confirmed) {
//     return { isEligible: true, type: 'confirmed' };
//   }
//   if (deviationValue >= INVITATION_THRESHOLDS.potential) {
//     return { isEligible: true, type: 'potential' };
//   }
//   return { isEligible: false, type: null };
// }

// /**
//  * パワーカップル診断を実行する
//  * @param input 診断入力データ
//  * @returns 診断結果
//  */
// export function calculateDiagnosticResult(input: DiagnosticInput): DiagnosticResult {
//   // 1. 年齢層を20代・30代・40代にマッピング
//   const ageGroupTable = AGE_GROUP_MAPPING[input.ageGroup];
  
//   // 2. 各個人の年収スコアを計算
//   const userScore = calculateIncomeScore(input.user.annualIncome, ageGroupTable);
//   const partnerScore = calculateIncomeScore(input.partner.annualIncome, ageGroupTable);
  
//   // 3. 合計スコア算出
//   const totalScore = userScore + partnerScore;
  
//   // 4. 偏差値算出
//   const deviationValue = calculateDeviationValue(totalScore);
  
//   // 5. ランク・評価コメント取得
//   const rankInfo = getRankInfo(deviationValue);
  
//   // 6. 招待資格判定
//   const invitation = determineInvitation(deviationValue);
  
//   return {
//     userScore,
//     partnerScore,
//     totalScore,
//     deviationValue,
//     rank: rankInfo.rank,
//     rankLabel: rankInfo.rankLabel,
//     percentile: rankInfo.percentile,
//     comment: rankInfo.comment,
//     isEligibleForInvitation: invitation.isEligible,
//     invitationType: invitation.type,
//   };
// }
