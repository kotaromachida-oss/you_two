import {
  AgeGroup,
  AnnualIncome,
  COMPANY_SIZE_COEFFICIENTS,
  DEVIATION_VALUE_TABLE,
  DeviationValueRange,
  DiagnosticInput,
  DiagnosticResult,
  INCOME_SCORE_TABLE,
  POSITION_COEFFICIENTS,
} from '@/lib/scoring-tables';

/**
 * Calculate individual score based on income, company size, and position.
 *
 * Scoring Formula:
 * Individual Score = Income Score * Company Size Coefficient * Position Coefficient
 *
 * @param ageGroup - User's age group (e.g., '20s_early')
 * @param annualIncome - Annual income value (e.g., '500_549')
 * @param companySizeLabel - Label for company size (e.g., '2,000名〜')
 * @param positionLabel - Label for position (e.g., '課長 / マネージャー')
 * @returns Calculated individual score
 */
export function calculateIndividualScore(
  ageGroup: AgeGroup,
  annualIncome: AnnualIncome,
  companySizeLabel?: string,
  positionLabel?: string
): number {
  // 1. Get Base Income Score
  const incomeTable = INCOME_SCORE_TABLE[ageGroup];
  if (!incomeTable) {
    console.warn(`No income table found for age group: ${ageGroup}`);
    return 0;
  }

  const incomeEntry = incomeTable.find((entry) => entry.income === annualIncome);
  const baseIncomeScore = incomeEntry ? incomeEntry.score : 0;

  // 2. Get Company Size Coefficient (Default to 1.0 if not found or not provided)
  const companyCoeffEntry = COMPANY_SIZE_COEFFICIENTS.find(
    (c) => c.label === companySizeLabel
  );
  const companyCoefficient = companyCoeffEntry ? companyCoeffEntry.value : 1.0;

  // 3. Get Position Coefficient (Default to 1.0 if not found or not provided)
  const positionCoeffEntry = POSITION_COEFFICIENTS.find(
    (p) => p.label === positionLabel
  );
  const positionCoefficient = positionCoeffEntry ? positionCoeffEntry.value : 1.0;

  // 4. Calculate Final Score
  const score = baseIncomeScore * companyCoefficient * positionCoefficient;

  // Return rounded to 2 decimal places for consistency
  return Math.round(score * 100) / 100;
}

/**
 * Calculate total score (product of two individual scores).
 *
 * @param userScore - Individual score of the user
 * @param partnerScore - Individual score of the partner
 * @returns Total product score
 */
export function calculateTotalScore(userScore: number, partnerScore: number): number {
  const total = userScore * partnerScore;
  return Math.round(total);
}

/**
 * Get deviation value and related info from total score.
 *
 * @param totalScore - The calculated product of individual scores
 * @returns DeviationValueRange object or null if out of range
 */
export function getDeviationValue(totalScore: number): DeviationValueRange | null {
  const score = Math.round(totalScore);

  const result = DEVIATION_VALUE_TABLE.find(
    (range) => score >= range.min && score <= range.max
  );

  return result || null;
}

/**
 * Helper to map numeric income to AnnualIncome range string.
 */
export function mapIncomeToRange(amount: number): AnnualIncome {
  if (amount < 200) return '-199';
  if (amount < 250) return '200_249';
  if (amount < 300) return '250_299';
  if (amount < 350) return '300_349';
  if (amount < 400) return '350_399';
  if (amount < 450) return '400_449';
  if (amount < 500) return '450_499';
  if (amount < 550) return '500_549';
  if (amount < 600) return '550_599';
  if (amount < 650) return '600_649';
  if (amount < 700) return '650_699';
  if (amount < 750) return '700_749';
  if (amount < 800) return '750_799';
  if (amount < 850) return '800_849';
  if (amount < 900) return '850_899';
  if (amount < 950) return '900_949';
  if (amount < 1000) return '950_999';
  if (amount < 1100) return '1000_1099';
  if (amount < 1200) return '1100_1199';
  if (amount < 1300) return '1200_1299';
  if (amount < 1400) return '1300_1399';
  if (amount < 1500) return '1400_1499';
  if (amount < 1600) return '1500_1599';
  if (amount < 1700) return '1600_1699';
  if (amount < 1800) return '1700_1799';
  if (amount < 1900) return '1800_1899';
  if (amount < 2000) return '1900_1999';
  if (amount < 2100) return '2000_2099';
  if (amount < 2200) return '2100_2199';
  if (amount < 2300) return '2200_2299';
  if (amount < 2400) return '2300_2399';
  if (amount < 2500) return '2400_2499';
  if (amount < 3000) return '2500_2999';
  if (amount < 4000) return '3000_3999';
  if (amount < 5000) return '4000_4999';
  if (amount < 10000) return '5000_9999';
  return '10000+';
}

/**
 * Calculate the full diagnostic result from input.
 */
export function calculateDiagnosticResult(input: DiagnosticInput): DiagnosticResult {
  const userIncomeRange = mapIncomeToRange(input.user.annualIncome);
  const partnerIncomeRange = mapIncomeToRange(input.partner.annualIncome);

  const userScore = calculateIndividualScore(
    input.ageGroup,
    userIncomeRange,
    input.user.company,
    input.user.position
  );

  const partnerScore = calculateIndividualScore(
    input.ageGroup,
    partnerIncomeRange,
    input.partner.company,
    input.partner.position
  );

  const totalScore = calculateTotalScore(userScore, partnerScore);
  const deviationData = getDeviationValue(totalScore);

  // Fallbacks if data missing (should match table bounds)
  const deviationValue = deviationData ? deviationData.deviation : 0;
  const comment = deviationData ? deviationData.comment : '';
  const certification = deviationData ? deviationData.certification : '';

  // Calculate Percentile (approximate logic)
  // Z = (deviation - 50) / 10
  // Percentile = 100 * (1 - CDF(Z))
  // Simplified lookup or calculation
  const z = (deviationValue - 50) / 10;
  // Approximation of normal CDF
  // Using a simple error function approximation or table would be better but for now:
  // If deviation 50 -> 50%
  // If deviation 60 -> 16% (top)
  // If deviation 70 -> 2.3%
  // If deviation 80 -> 0.13%
  // We can use a simple helper or just leave it naive?
  // Let's use a very rough approximation for display purposes
  let percentile = 50;
  if (deviationValue >= 50) {
      // rough tail approximation
      if (deviationValue >= 80) percentile = 0.1;
      else if (deviationValue >= 75) percentile = 0.6;
      else if (deviationValue >= 70) percentile = 2.3;
      else if (deviationValue >= 65) percentile = 6.7;
      else if (deviationValue >= 60) percentile = 15.9;
      else if (deviationValue >= 55) percentile = 30.9;
      else percentile = 50 - (deviationValue - 50) * 2; // linear fallback
  } else {
      percentile = 50 + (50 - deviationValue) * 2; // linear fallback (>50%)
      if (percentile > 99.9) percentile = 99.9;
  }
  
  // Rank Logic (Inferred)
  let rank = 'C';
  if (deviationValue >= 70) rank = 'S';
  else if (deviationValue >= 60) rank = 'A';
  else if (deviationValue >= 50) rank = 'B';
  else if (deviationValue >= 40) rank = 'C';
  else rank = 'D';

  // Invitation Logic
  // Assuming "Power Couple" certification implies potential/confirmed
  const isPowerCouple = certification.includes('パワーカップル');
  const isEligibleForInvitation = isPowerCouple || deviationValue >= 60;
  let invitationType: 'confirmed' | 'potential' | null = null;
  if (isEligibleForInvitation) {
      invitationType = deviationValue >= 65 ? 'confirmed' : 'potential';
  }

  return {
    userScore,
    partnerScore,
    totalScore,
    deviationValue,
    rank,
    rankLabel: certification || rank, // Use certification as label
    percentile: Number(percentile.toFixed(1)),
    comment,
    isEligibleForInvitation,
    invitationType,
  };
}
