/**
 * Mercury / heavy-metal guidance for common conveyor-belt sushi fish.
 * Tier mapping loosely follows U.S. FDA / EPA "Advice about Eating Fish"
 * (Best Choices / Good Choices / Choices to Avoid) and related public
 * mercury monitoring summaries. Species used in Taiwan 迴轉壽司 may vary
 * by supplier; when uncertain we note it and lean cautious for pregnancy.
 */

export type SafetyTier = 'safer' | 'moderate' | 'limit' | 'avoid'

export interface FishItem {
  id: string
  nameZh: string
  nameJa?: string
  nameEn: string
  aliases: string[]
  tier: SafetyTier
  mercuryLevel: 'very-low' | 'low' | 'moderate' | 'high' | 'very-high' | 'uncertain'
  notesZh: string
  adultAdviceZh: string
  pregnancyAdviceZh: string
  infantAdviceZh: string
  tags: string[]
}

export const TIER_META: Record<
  SafetyTier,
  { label: string; short: string; color: string; bg: string; border: string; ring: string }
> = {
  safer: {
    label: '較安心',
    short: '安心',
    color: 'text-emerald-800',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    ring: 'ring-emerald-400',
  },
  moderate: {
    label: '適量',
    short: '適量',
    color: 'text-sky-800',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    ring: 'ring-sky-400',
  },
  limit: {
    label: '少吃',
    short: '少吃',
    color: 'text-amber-900',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    ring: 'ring-amber-400',
  },
  avoid: {
    label: '孕婦嬰幼兒避開',
    short: '避開',
    color: 'text-rose-900',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    ring: 'ring-rose-400',
  },
}

export const MERCURY_LABEL: Record<FishItem['mercuryLevel'], string> = {
  'very-low': '汞含量很低',
  low: '汞含量偏低',
  moderate: '汞含量中等',
  high: '汞含量偏高',
  'very-high': '汞含量很高',
  uncertain: '汞含量資料有限／視魚種而定',
}

/** Pregnancy mode remaps display emphasis: moderate→limit, limit→avoid. */
export function effectiveTier(tier: SafetyTier, pregnancyMode: boolean): SafetyTier {
  if (!pregnancyMode) return tier
  if (tier === 'safer') return 'safer'
  if (tier === 'moderate') return 'limit'
  if (tier === 'limit') return 'avoid'
  return 'avoid'
}

export const fishData: FishItem[] = [
  {
    id: 'salmon',
    nameZh: '鮭魚',
    nameJa: 'サーモン',
    nameEn: 'Salmon',
    aliases: ['salmon', '鮭', 'さけ', 'しゃけ', 'sake', 'shake', '大西洋鮭', '挪威鮭'],
    tier: 'safer',
    mercuryLevel: 'very-low',
    notesZh:
      'FDA／EPA「較佳選擇」清單常見魚種之一。養殖與野生鮭魚汞含量普遍偏低，是迴轉壽司裡相對安心的選擇。',
    adultAdviceZh: '一般成人可經常食用；注意熱量與脂肪即可。',
    pregnancyAdviceZh: '屬較佳選擇，可依公開建議納入每週魚類份量（烹熟或可信來源生食）。',
    infantAdviceZh: '適合作為低汞魚類之一；幼兒請切小塊、注意骨刺與過敏。',
    tags: ['魚', '常見', '低汞'],
  },
  {
    id: 'shrimp',
    nameZh: '蝦',
    nameJa: 'エビ',
    nameEn: 'Shrimp',
    aliases: ['shrimp', 'prawn', 'えび', '甜蝦', 'アマエビ', 'amaebi', '煮蝦', '牡丹蝦'],
    tier: 'safer',
    mercuryLevel: 'very-low',
    notesZh: '甲殼類，公開汞監測中通常極低。甜蝦、煮蝦等壽司常見款皆歸此類。',
    adultAdviceZh: '可安心作為日常壽司選擇。',
    pregnancyAdviceZh: '汞風險低；生食需注意新鮮度與食物安全，孕期可優先選熟蝦。',
    infantAdviceZh: '低汞；注意過敏與咀嚼安全。',
    tags: ['海鮮', '甲殼類', '低汞'],
  },
  {
    id: 'scallop',
    nameZh: '干貝',
    nameJa: 'ホタテ',
    nameEn: 'Scallop',
    aliases: ['scallop', 'hotate', 'ほたて', '帆立', '帶子'],
    tier: 'safer',
    mercuryLevel: 'very-low',
    notesZh: '雙殼貝類，汞含量通常很低，屬公開指引中較安心的海鮮。',
    adultAdviceZh: '可經常食用。',
    pregnancyAdviceZh: '汞風險低；同樣留意生食衛生。',
    infantAdviceZh: '低汞；切小塊避免噎到。',
    tags: ['貝類', '低汞'],
  },
  {
    id: 'squid',
    nameZh: '花枝／魷魚',
    nameJa: 'イカ',
    nameEn: 'Squid',
    aliases: ['squid', 'ika', 'いか', '魷魚', '花枝', '軟絲'],
    tier: 'safer',
    mercuryLevel: 'low',
    notesZh: '頭足類，多數公開資料顯示汞偏低，常見於壽司與軍艦。',
    adultAdviceZh: '適合日常食用。',
    pregnancyAdviceZh: '屬較低汞選擇。',
    infantAdviceZh: '低汞；質地偏韌，請切細。',
    tags: ['頭足類', '低汞'],
  },
  {
    id: 'octopus',
    nameZh: '章魚',
    nameJa: 'タコ',
    nameEn: 'Octopus',
    aliases: ['octopus', 'tako', 'たこ', '章魚腳', '八爪魚'],
    tier: 'safer',
    mercuryLevel: 'low',
    notesZh: '頭足類，汞含量一般偏低；壽司多為水煮章魚。',
    adultAdviceZh: '可經常食用。',
    pregnancyAdviceZh: '汞風險低；熟食相對安心。',
    infantAdviceZh: '低汞；嚼勁大，切小塊。',
    tags: ['頭足類', '低汞'],
  },
  {
    id: 'crab',
    nameZh: '蟹',
    nameJa: 'カニ',
    nameEn: 'Crab',
    aliases: ['crab', 'kani', 'かに', '蟹肉', '松葉蟹', '鱈場蟹', '仿蟹棒'],
    tier: 'safer',
    mercuryLevel: 'low',
    notesZh:
      '蟹類汞含量多半偏低。仿蟹棒（蟹味棒）原料常為魚漿，汞風險通常不高，但請留意鈉含量。',
    adultAdviceZh: '真實蟹肉與蟹味棒皆可作低汞選項。',
    pregnancyAdviceZh: '汞風險低；仿蟹棒注意加工與鈉。',
    infantAdviceZh: '低汞；注意過敏（甲殼類）。',
    tags: ['甲殼類', '低汞'],
  },
  {
    id: 'uni',
    nameZh: '海膽',
    nameJa: 'ウニ',
    nameEn: 'Sea urchin (uni)',
    aliases: ['uni', 'うに', '雲丹', '海膽'],
    tier: 'safer',
    mercuryLevel: 'low',
    notesZh:
      '公開汞資料不如常見魚種完整，但海膽通常不被列為高汞物種；主要風險多在新鮮度與過敏，而非汞。',
    adultAdviceZh: '汞疑慮相對低；選擇衛生可靠店家。',
    pregnancyAdviceZh: '汞非主要顧慮；生食衛生與品質更重要，不確定時可略過。',
    infantAdviceZh: '一般不建議幼兒生食海膽；汞本身非首要問題。',
    tags: ['其他', '低汞', '資料有限'],
  },
  {
    id: 'anago',
    nameZh: '星鰻（穴子）',
    nameJa: 'アナゴ',
    nameEn: 'Conger eel (anago)',
    aliases: ['anago', 'あなご', '穴子', '星鰻', '海鰻'],
    tier: 'safer',
    mercuryLevel: 'low',
    notesZh: '海鰻類，多數參考資料中汞偏低，壽司常見蒲燒或蒸煮。',
    adultAdviceZh: '可適量經常食用；醬汁糖分較高可留意。',
    pregnancyAdviceZh: '屬較低汞選項。',
    infantAdviceZh: '低汞；注意醬汁與刺。',
    tags: ['鰻', '低汞'],
  },
  {
    id: 'unagi',
    nameZh: '鰻魚（蒲燒）',
    nameJa: 'ウナギ',
    nameEn: 'Freshwater eel (unagi)',
    aliases: ['unagi', 'うなぎ', '鰻', '蒲燒鰻', '白燒鰻'],
    tier: 'safer',
    mercuryLevel: 'low',
    notesZh:
      '淡水鰻汞含量多半不高；公開討論較多的是養殖環境與永續，而非汞。醬汁熱量高。',
    adultAdviceZh: '汞角度可安心；注意熱量與來源標示。',
    pregnancyAdviceZh: '汞風險低；熟食為主較佳。',
    infantAdviceZh: '低汞；醬汁甜鹹，少量即可。',
    tags: ['鰻', '低汞'],
  },
  {
    id: 'iwashi',
    nameZh: '鰯魚（沙丁魚）',
    nameJa: 'イワシ',
    nameEn: 'Sardine (iwashi)',
    aliases: ['iwashi', 'いわし', '沙丁魚', 'sardine', '鰯'],
    tier: 'safer',
    mercuryLevel: 'very-low',
    notesZh: '小型洄游魚，FDA／EPA 常列為較佳選擇；富含 omega-3，汞很低。',
    adultAdviceZh: '非常適合常吃。',
    pregnancyAdviceZh: '較佳選擇之一。',
    infantAdviceZh: '低汞；注意細刺。',
    tags: ['青魚', '低汞'],
  },
  {
    id: 'aji',
    nameZh: '竹筴魚（鯵）',
    nameJa: 'アジ',
    nameEn: 'Horse mackerel (aji)',
    aliases: ['aji', 'あじ', '竹筴魚', '鯵', '馬鮫魚（易混淆）'],
    tier: 'safer',
    mercuryLevel: 'low',
    notesZh: '小型鯵類，汞通常偏低。勿與大型「馬加／king mackerel」混淆。',
    adultAdviceZh: '適合日常食用。',
    pregnancyAdviceZh: '屬較低汞青魚類選項。',
    infantAdviceZh: '低汞；注意刺。',
    tags: ['青魚', '低汞'],
  },
  {
    id: 'tai',
    nameZh: '鯛魚（真鯛）',
    nameJa: 'タイ',
    nameEn: 'Sea bream / red snapper (tai)',
    aliases: ['tai', 'たい', '鯛', '真鯛', '加吉魚', 'sea bream', 'madai', 'マダイ'],
    tier: 'safer',
    mercuryLevel: 'low',
    notesZh:
      '真鯛等鯛科魚汞多半偏低至中低。店家若混用其他「鯛／snapper」品種，汞可能略有差異。',
    adultAdviceZh: '整體偏安心，可經常食用。',
    pregnancyAdviceZh: '多數情況下屬較佳或良好選擇；品種不明時適量。',
    infantAdviceZh: '通常低汞；確認無細刺。',
    tags: ['白身', '低汞'],
  },
  {
    id: 'hirame',
    nameZh: '比目魚（平目）',
    nameJa: 'ヒラメ',
    nameEn: 'Flounder / hirame',
    aliases: ['hirame', 'ひらめ', '比目魚', '平目', 'flounder', 'engawa', '縁側', 'エンガワ'],
    tier: 'safer',
    mercuryLevel: 'low',
    notesZh: '比目魚／鰈類在公開指引中多屬較佳選擇；緣側（engawa）為同一類魚的鰭邊肉。',
    adultAdviceZh: '可經常食用。',
    pregnancyAdviceZh: '較佳選擇傾向。',
    infantAdviceZh: '低汞。',
    tags: ['白身', '低汞'],
  },
  {
    id: 'amaebi',
    nameZh: '甜蝦',
    nameJa: 'アマエビ',
    nameEn: 'Sweet shrimp (amaebi)',
    aliases: ['amaebi', 'あまえび', '甜蝦', '北極甜蝦'],
    tier: 'safer',
    mercuryLevel: 'very-low',
    notesZh: '蝦類，汞極低；生食看重新鮮與衛生。',
    adultAdviceZh: '汞角度很安心。',
    pregnancyAdviceZh: '汞低；孕期若擔心生食可改熟蝦。',
    infantAdviceZh: '低汞；幼兒避免生食為宜。',
    tags: ['甲殼類', '低汞'],
  },
  {
    id: 'saba',
    nameZh: '鯖魚',
    nameJa: 'サバ',
    nameEn: 'Mackerel (saba)',
    aliases: ['saba', 'さば', '鯖', 'mackerel', '挪威鯖', '腌鯖', '醋鯖'],
    tier: 'moderate',
    mercuryLevel: 'moderate',
    notesZh:
      '壽司常見的大西洋鯖／挪威鯖汞通常中低，但「King mackerel（國王鯖）」屬高汞應避開。台灣店家多為較小型鯖，仍建議適量。',
    adultAdviceZh: '一般成人可適量享用醋鯖等品項。',
    pregnancyAdviceZh: '確認非大型國王鯖後可偶爾食用；不確定來源時改選鮭魚等更低汞魚。',
    infantAdviceZh: '少量即可；優先更低汞魚種。',
    tags: ['青魚', '中汞'],
  },
  {
    id: 'hamachi',
    nameZh: '鰤魚（哈馬奇）',
    nameJa: 'ハマチ',
    nameEn: 'Yellowtail / hamachi',
    aliases: ['hamachi', 'はまち', '鰤', 'yellowtail', 'buri', 'ブリ', '幼鰤'],
    tier: 'moderate',
    mercuryLevel: 'moderate',
    notesZh:
      '鰤／黃尾鰤體型中等，公開汞資料多落在中等區間，常被列為「良好選擇」而非「較佳」。養殖與野生略有差異。',
    adultAdviceZh: '適合偶爾至適量食用，不必每餐堆疊。',
    pregnancyAdviceZh: '建議減少頻率，改以鮭、蝦、鯛等更低汞品項為主。',
    infantAdviceZh: '不作為幼兒主要魚類；偶可一小口。',
    tags: ['魚', '中汞'],
  },
  {
    id: 'kanpachi',
    nameZh: '間八（勘八）',
    nameJa: 'カンパチ',
    nameEn: 'Amberjack (kanpachi)',
    aliases: ['kanpachi', 'かんぱち', '間八', '勘八', 'amberjack'],
    tier: 'moderate',
    mercuryLevel: 'moderate',
    notesZh: '與鰤同類群、體型可較大，汞傾向中等；資料不如鮭蝦完整，建議適量。',
    adultAdviceZh: '適量享用。',
    pregnancyAdviceZh: '建議少於一般成人頻率。',
    infantAdviceZh: '非首選。',
    tags: ['魚', '中汞'],
  },
  {
    id: 'katsuo',
    nameZh: '鰹魚（松魚）',
    nameJa: 'カツオ',
    nameEn: 'Skipjack / bonito (katsuo)',
    aliases: ['katsuo', 'かつお', '鰹', 'skipjack', 'bonito', '松魚', '柴魚'],
    tier: 'moderate',
    mercuryLevel: 'moderate',
    notesZh:
      '鰹魚相對大型鮪魚汞較低，罐頭「light tuna」常以 skipjack 為主並列較佳選擇；生食刺身仍建議適量。',
    adultAdviceZh: '可適量；整體優於大眼鮪、藍鰭。',
    pregnancyAdviceZh: '可偶食，但仍優先鮭、蝦等。',
    infantAdviceZh: '少量；罐頭鰹若全熟可作替代參考。',
    tags: ['鮪相關', '中汞'],
  },
  {
    id: 'akami',
    nameZh: '鮪魚赤身',
    nameJa: 'マグロ赤身',
    nameEn: 'Tuna lean (akami)',
    aliases: ['akami', 'あかみ', '赤身', 'maguro', 'まぐろ', '鮪', '黑鮪赤身', '黃鰭鮪'],
    tier: 'limit',
    mercuryLevel: 'high',
    notesZh:
      '赤身可能來自黃鰭、大目或藍鰭等。大目與藍鰭汞偏高；黃鰭中高。FDA 將部分鮪魚列為應限制或避開。店家若未標魚種，宜當作偏高汞處理。',
    adultAdviceZh: '建議少吃，不要一盤接一盤只轉鮪魚。',
    pregnancyAdviceZh: '建議避開或極少；改選鮭、蝦、干貝、鯛。',
    infantAdviceZh: '建議避開生鮪；幼兒更應避免高汞魚。',
    tags: ['鮪', '高汞'],
  },
  {
    id: 'chutoro',
    nameZh: '中腹（中トロ）',
    nameJa: '中トロ',
    nameEn: 'Tuna medium-fatty (chutoro)',
    aliases: ['chutoro', 'ちゅうとろ', '中トロ', '中腹', '中トロ鮪'],
    tier: 'limit',
    mercuryLevel: 'high',
    notesZh:
      '部位（脂肪多寡）不改變魚種的汞累積邏輯；中腹與赤身若同魚種，汞風險同屬偏高。',
    adultAdviceZh: '當作偶爾奢侈品，控制份量。',
    pregnancyAdviceZh: '建議避開。',
    infantAdviceZh: '建議避開。',
    tags: ['鮪', '高汞'],
  },
  {
    id: 'otoro',
    nameZh: '大腹（大トロ）',
    nameJa: '大トロ',
    nameEn: 'Tuna fatty belly (otoro)',
    aliases: ['otoro', 'おとろ', '大トロ', '大腹', '甜腹'],
    tier: 'limit',
    mercuryLevel: 'high',
    notesZh:
      '大腹多為藍鰭等大型鮪，汞與生態足跡都需留意；美味與頻率應分開看待。',
    adultAdviceZh: '偶一為之即可。',
    pregnancyAdviceZh: '建議避開。',
    infantAdviceZh: '建議避開。',
    tags: ['鮪', '高汞'],
  },
  {
    id: 'maguro-bluefin',
    nameZh: '黑鮪／藍鰭鮪',
    nameJa: 'クロマグロ',
    nameEn: 'Bluefin tuna',
    aliases: ['bluefin', '黑鮪', '藍鰭', 'くろまぐろ', '本鮪', 'honmaguro', 'ホンマグロ'],
    tier: 'avoid',
    mercuryLevel: 'very-high',
    notesZh:
      '大型頂級掠食鮪，汞含量通常很高，接近公開指引中應避免的高汞魚（如某些大型鮪、旗魚）。',
    adultAdviceZh: '應很少吃；不要當成日常迴轉選擇。',
    pregnancyAdviceZh: '應避開。',
    infantAdviceZh: '應避開。',
    tags: ['鮪', '很高汞'],
  },
  {
    id: 'bigeye',
    nameZh: '大目鮪',
    nameJa: 'メバチ',
    nameEn: 'Bigeye tuna',
    aliases: ['bigeye', 'めばち', '大目', '大眼鮪', 'mebachi'],
    tier: 'avoid',
    mercuryLevel: 'very-high',
    notesZh: '大目鮪在多項汞監測中偏高，常被建議孕婦與兒童避免。',
    adultAdviceZh: '少吃為宜。',
    pregnancyAdviceZh: '應避開。',
    infantAdviceZh: '應避開。',
    tags: ['鮪', '很高汞'],
  },
  {
    id: 'swordfish',
    nameZh: '旗魚',
    nameJa: 'カジキ',
    nameEn: 'Swordfish',
    aliases: ['swordfish', '旗魚', 'かじき', 'swordfish steak', '鬼頭刀（不同魚）'],
    tier: 'avoid',
    mercuryLevel: 'very-high',
    notesZh: 'FDA／EPA「應避免」清單代表魚種之一，汞很高。迴轉壽司較少見，菜單若出現請避開高風險族群。',
    adultAdviceZh: '一般成人也應嚴格限制。',
    pregnancyAdviceZh: '應避開。',
    infantAdviceZh: '應避開。',
    tags: ['高汞', '少見'],
  },
  {
    id: 'albacore',
    nameZh: '長鰭鮪（白皮）',
    nameJa: 'ビンナガ',
    nameEn: 'Albacore tuna',
    aliases: ['albacore', 'びんなが', '長鰭鮪', '白鮪', 'white tuna'],
    tier: 'limit',
    mercuryLevel: 'high',
    notesZh:
      '長鰭鮪汞高於 skipjack，FDA 將「白鮪／albacore」列為應限制頻率的選項（相對 light tuna）。',
    adultAdviceZh: '可偶食，控制週頻率。',
    pregnancyAdviceZh: '嚴格限制或避開，改選更低汞魚。',
    infantAdviceZh: '不建議作為常備。',
    tags: ['鮪', '高汞'],
  },
  {
    id: 'shimaaji',
    nameZh: '縞鯵',
    nameJa: 'シマアジ',
    nameEn: 'Striped jack (shima-aji)',
    aliases: ['shimaaji', 'しまあじ', '縞鯵', 'しま鯵'],
    tier: 'moderate',
    mercuryLevel: 'moderate',
    notesZh: '高端白／青身魚，公開汞數據有限；體型與營養層級類似中型鯵／鰤，建議當中汞適量。',
    adultAdviceZh: '適量享用。',
    pregnancyAdviceZh: '建議少於低汞魚的頻率。',
    infantAdviceZh: '非首選。',
    tags: ['魚', '中汞', '資料有限'],
  },
  {
    id: 'sawara',
    nameZh: '鰆魚',
    nameJa: 'サワラ',
    nameEn: 'Spanish mackerel (sawara)',
    aliases: ['sawara', 'さわら', '鰆', '西班牙鯖', 'spanish mackerel'],
    tier: 'limit',
    mercuryLevel: 'high',
    notesZh:
      '西班牙鯖／鰆體型較大時汞可偏高；部分地區監測將其列為需限制。與小型鯖（saba）不同。',
    adultAdviceZh: '少吃。',
    pregnancyAdviceZh: '建議避開或極少。',
    infantAdviceZh: '建議避開。',
    tags: ['青魚', '高汞'],
  },
  {
    id: 'ikura',
    nameZh: '鮭魚卵',
    nameJa: 'イクラ',
    nameEn: 'Salmon roe (ikura)',
    aliases: ['ikura', 'いくら', '鮭魚卵', '魚子', 'salmon roe'],
    tier: 'safer',
    mercuryLevel: 'low',
    notesZh: '來自低汞鮭魚的卵，汞累積通常不高；注意鹽分與生食衛生。',
    adultAdviceZh: '汞角度安心；鈉含量偏高宜適量。',
    pregnancyAdviceZh: '汞低；生食與鹽分需自行評估。',
    infantAdviceZh: '低汞但很鹹，幼兒不宜多。',
    tags: ['魚卵', '低汞'],
  },
  {
    id: 'tamago',
    nameZh: '玉子燒',
    nameJa: 'タマゴ',
    nameEn: 'Egg omelette (tamago)',
    aliases: ['tamago', 'たまご', '玉子', '蛋皮', '出汁卷'],
    tier: 'safer',
    mercuryLevel: 'very-low',
    notesZh: '非魚類，無汞疑慮；列出力求查詢完整。注意糖分與過敏（蛋）。',
    adultAdviceZh: '與重金屬無關，可正常吃。',
    pregnancyAdviceZh: '無汞問題；蛋需全熟較佳。',
    infantAdviceZh: '無汞問題；注意蛋過敏。',
    tags: ['非魚', '低汞'],
  },
]

export function searchFish(query: string): FishItem[] {
  const q = query.trim().toLowerCase()
  if (!q) return fishData
  return fishData.filter((f) => {
    const hay = [
      f.nameZh,
      f.nameJa ?? '',
      f.nameEn,
      ...f.aliases,
      ...f.tags,
    ]
      .join(' ')
      .toLowerCase()
    return hay.includes(q) || f.nameZh.includes(query.trim())
  })
}

export const ALL_TIERS: SafetyTier[] = ['safer', 'moderate', 'limit', 'avoid']
