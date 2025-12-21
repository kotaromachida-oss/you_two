import fs from 'fs';
import path from 'path';

const OUTPUT_FILE = path.join(process.cwd(), 'tools', 'deviation-data.tsv');

const HEADER = 'Score\tDeviation\tCertification\tComment';

const CERT_JUN = '準パワーカップル';
const CERT_POWER = 'パワーカップル';

const COMMENT_LOW = '片方の年収が低い可能性があります。ここから伸びしろしかありません。';
const COMMENT_BOTH_LOW = '双方の年収を上げていきましょう。ここから伸びしろしかありません。';
const COMMENT_ENTRY = '"基盤は悪くありませんが、まだ“パワーカップルの入口”。\n役職・業界選択・年収アップなど、\n小さな一歩が大きな差を生む帯域です。"';
const COMMENT_ALMOST = '"世帯として十分に健闘しています。“あと一歩”でパワーカップル認定。\nどちらかの年収または役職アップが鍵です。"';
const COMMENT_EXCELLENT = '"優れた世帯構造です。\nどちらも一定のキャリアを築けており、\nこのまま進めばパワーカップルの仲間入りは目前です。"';
const COMMENT_SUSTAINABLE = 'パワーカップルです。この帯域の夫婦は“持続的成長力”が高いのが特徴。互いへの投資がさらなる飛躍を生みます。';
const COMMENT_TALENTED = '"実力派パワーカップル。収入バランス、業界構造ともに高水準で、\n周囲から“理想の夫婦”と見られる層です。"';
const COMMENT_STRONG = '"まさに“強い夫婦”。\nどちらか一方に大きく依存せず、\nお互いのキャリアが美しく補完しあうレベルです。"';
const COMMENT_IMPACT = '"社会的インパクトを持つパワーカップル。\n高い収入・役職だけでなく、\nライフスタイル全体が洗練されている層です。"';
const COMMENT_LEGEND = '"世界観をつくる夫婦。\n人生設計、キャリア構造、バランスすべてが\nトップオブトップのレベル。\n“伝説級のパワーカップル”と呼ぶにふさわしい存在です。"';

// Helper to generate rows
function generateRows(start: number, end: number, deviation: number | string, cert: string, comment: string): string[] {
  const rows: string[] = [];
  for (let i = start; i <= end; i++) {
    rows.push(`${i}\t${deviation}\t${cert}\t${comment}`);
  }
  return rows;
}

const lines: string[] = [HEADER];

// ... (Existing data 0-604) ...
// 0
lines.push(...generateRows(0, 0, '~39', '', COMMENT_LOW));
// 1
lines.push(...generateRows(1, 1, 40, '', COMMENT_BOTH_LOW));
// 2
lines.push(...generateRows(2, 2, 42, '', COMMENT_BOTH_LOW));
// 3
lines.push(...generateRows(3, 3, 44, '', COMMENT_BOTH_LOW));
// 4
lines.push(...generateRows(4, 4, 46, '', COMMENT_ENTRY));
// 5
lines.push(...generateRows(5, 5, 48, '', COMMENT_ENTRY));
// 6-8
lines.push(...generateRows(6, 8, 49, '', COMMENT_ENTRY));
// 9-14
lines.push(...generateRows(9, 14, 50, '', COMMENT_ALMOST));
// 15-19
lines.push(...generateRows(15, 19, 51, '', COMMENT_ALMOST));
// 20-24
lines.push(...generateRows(20, 24, 52, '', COMMENT_ALMOST));
// 25-29
lines.push(...generateRows(25, 29, 53, '', COMMENT_ALMOST));
// 30
lines.push(...generateRows(30, 30, 53, CERT_JUN, COMMENT_EXCELLENT));
// 31-35
lines.push(...generateRows(31, 35, 54, CERT_JUN, COMMENT_EXCELLENT));
// 36-39
lines.push(...generateRows(36, 39, 55, CERT_JUN, COMMENT_EXCELLENT));
// 40
lines.push(...generateRows(40, 40, 55, CERT_POWER, COMMENT_EXCELLENT));
// 41-45
lines.push(...generateRows(41, 45, 60, CERT_POWER, COMMENT_SUSTAINABLE));
// 46-50
lines.push(...generateRows(46, 50, 61, CERT_POWER, COMMENT_SUSTAINABLE));
// 51-59
lines.push(...generateRows(51, 59, 62, CERT_POWER, COMMENT_SUSTAINABLE));
// 60-69
lines.push(...generateRows(60, 69, 63, CERT_POWER, COMMENT_SUSTAINABLE));
// 70-79
lines.push(...generateRows(70, 79, 64, CERT_POWER, COMMENT_SUSTAINABLE));
// 80-86
lines.push(...generateRows(80, 86, 65, CERT_POWER, COMMENT_SUSTAINABLE));
// 87-89
lines.push(...generateRows(87, 89, 65, CERT_POWER, COMMENT_TALENTED));
// 90-99
lines.push(...generateRows(90, 99, 66, CERT_POWER, COMMENT_TALENTED));
// 100-109
lines.push(...generateRows(100, 109, 67, CERT_POWER, COMMENT_TALENTED));
// 110-119
lines.push(...generateRows(110, 119, 68, CERT_POWER, COMMENT_TALENTED));
// 120-129
lines.push(...generateRows(120, 129, 69, CERT_POWER, COMMENT_TALENTED));
// 130-149
lines.push(...generateRows(130, 149, 70, CERT_POWER, COMMENT_TALENTED));
// 150-169
lines.push(...generateRows(150, 169, 71, CERT_POWER, COMMENT_STRONG));
// 170-249 (pattern established)
lines.push(...generateRows(170, 189, 72, CERT_POWER, COMMENT_STRONG));
lines.push(...generateRows(190, 209, 73, CERT_POWER, COMMENT_STRONG));
lines.push(...generateRows(210, 229, 74, CERT_POWER, COMMENT_STRONG));
lines.push(...generateRows(230, 249, 75, CERT_POWER, COMMENT_STRONG));
// 250 -> 76
lines.push(...generateRows(250, 269, 76, CERT_POWER, COMMENT_IMPACT));
lines.push(...generateRows(270, 299, 77, CERT_POWER, COMMENT_IMPACT)); // 300 is 78
lines.push(...generateRows(300, 319, 78, CERT_POWER, COMMENT_IMPACT));
lines.push(...generateRows(320, 339, 79, CERT_POWER, COMMENT_IMPACT));
lines.push(...generateRows(340, 359, 80, CERT_POWER, COMMENT_IMPACT));

// Legend starts at 360 -> 81
// Extrapolating to 2350
let currentScore = 360;
let currentDeviation = 81;

// Loop until we reach 2350
while (currentScore <= 2350) {
    const nextScore = currentScore + 19; // 20 points per deviation (e.g. 360-379)
    // Actually wait, let's verify the loop condition and end range.
    // If we want to reach exactly 2350, we should ensure the last bucket covers it.
    
    const rangeEnd = Math.min(nextScore, 2350);
    
    lines.push(...generateRows(currentScore, rangeEnd, currentDeviation, CERT_POWER, COMMENT_LEGEND));
    
    currentScore = rangeEnd + 1;
    currentDeviation++;
}


fs.writeFileSync(OUTPUT_FILE, lines.join('\n'));
console.log('Restored and extrapolated data up to score 2350.');
