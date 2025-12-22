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

