import {
  calculateIndividualScore,
  calculateTotalScore,
  getDeviationValue,
} from '../src/utils/scoring';
import { AgeGroup, AnnualIncome } from '../src/lib/scoring-tables';

const TEST_CASES = [
  // Case 1: Low Income (10s, <199)
  {
    name: 'Young Low Income',
    user: { age: '10s' as AgeGroup, income: '-199' as AnnualIncome, company: '〜499名', position: '一般社員' },
    partner: { age: '10s' as AgeGroup, income: '-199' as AnnualIncome, company: '〜499名', position: '一般社員' },
  },
  // Case 2: Mid Income (30s early, 500-549)
  {
    name: 'Mid Carry',
    user: { age: '30s_early' as AgeGroup, income: '500_549' as AnnualIncome, company: '500名〜1,999名', position: '主任 / リーダー' },
    partner: { age: '30s_early' as AgeGroup, income: '500_549' as AnnualIncome, company: '500名〜1,999名', position: '主任 / リーダー' },
  },
  // Case 3: High Income, Large Company, High Position
  {
    name: 'Power Couple',
    user: { age: '40s' as AgeGroup, income: '1000_1099' as AnnualIncome, company: '2,000名〜', position: '部長 / シニアマネージャー' },
    partner: { age: '40s' as AgeGroup, income: '1000_1099' as AnnualIncome, company: '2,000名〜', position: '部長 / シニアマネージャー' },
  },
  // Case 4: Extrapolated Range (High Score)
  {
    name: 'Legendary Couple',
    user: { age: '50s+' as AgeGroup, income: '10000+' as AnnualIncome, company: '2,000名〜', position: '代表（CEO / 社長 / 事業オーナー）' },
    partner: { age: '50s+' as AgeGroup, income: '10000+' as AnnualIncome, company: '2,000名〜', position: '代表（CEO / 社長 / 事業オーナー）' },
  }
];

async function runTests() {
  console.log('--- Starting Scoring Logic Verification ---\n');

  for (const test of TEST_CASES) {
    console.log(`[Test Case: ${test.name}]`);

    // User Calculation
    const userScore = calculateIndividualScore(
      test.user.age,
      test.user.income,
      test.user.company,
      test.user.position
    );
    console.log(`  User: Age=${test.user.age}, Income=${test.user.income}, Coeffs=(${test.user.company}, ${test.user.position})`);
    console.log(`  -> Individual Score: ${userScore}`);

    // Partner Calculation
    const partnerScore = calculateIndividualScore(
      test.partner.age,
      test.partner.income,
      test.partner.company,
      test.partner.position
    );
    console.log(`  Partner: Age=${test.partner.age}, Income=${test.partner.income}, Coeffs=(${test.partner.company}, ${test.partner.position})`);
    console.log(`  -> Individual Score: ${partnerScore}`);

    // Total Calculation
    const totalScore = calculateTotalScore(userScore, partnerScore);
    console.log(`  -> Total Score: ${totalScore}`);

    // Deviation Lookup
    const deviationData = getDeviationValue(totalScore);
    if (deviationData) {
      console.log(`  -> Deviation: ${deviationData.deviation}`);
      console.log(`  -> Certification: ${deviationData.certification}`);
      console.log(`  -> Comment: ${deviationData.comment.substring(0, 30)}...`);
    } else {
      console.error(`  -> ERROR: No deviation data found for score ${totalScore}`);
    }
    console.log('');
  }
}

runTests();
