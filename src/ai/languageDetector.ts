import { LanguageCode } from '../types/router';

export class LanguageDetector {
  private static zuluKeywords = [
    'ngifuna', 'ukuthenga', 'ugesi', 'imali', 'umsebenzi', 'usizo', 'ngisize',
    'sawubona', 'unjan', 'yini', 'ngicela', 'amaphoyisa', 'isibhedlela'
  ];

  private static sothoKeywords = [
    'ke', 'batla', 'kopa', 'motlakase', 'chelete', 'mosebetsi', 'thuso',
    'dumela', 'le', 'kae', 'ntate', 'mme'
  ];

  private static afrikaansKeywords = [
    'ek', 'soek', 'koop', 'krag', 'elektrisiteit', 'werk', 'geld', 'hulp',
    'dokter', 'plaas', 'mielies', 'dankie', 'asseblief'
  ];

  static detect(input: string): { code: LanguageCode; name: string; confidence: number } {
    const lower = input.toLowerCase().trim();
    const words = lower.split(/\s+/);

    let zuCount = 0;
    let stCount = 0;
    let afCount = 0;

    for (const w of words) {
      if (this.zuluKeywords.some(k => w.includes(k))) zuCount++;
      if (this.sothoKeywords.some(k => w.includes(k))) stCount++;
      if (this.afrikaansKeywords.some(k => w.includes(k))) afCount++;
    }

    if (zuCount > 0 && zuCount >= stCount && zuCount >= afCount) {
      return { code: 'zu-ZA', name: 'isiZulu', confidence: 0.94 };
    }
    if (stCount > 0 && stCount >= afCount) {
      return { code: 'st-ZA', name: 'Sesotho', confidence: 0.92 };
    }
    if (afCount > 0) {
      return { code: 'af-ZA', name: 'Afrikaans', confidence: 0.95 };
    }

    return { code: 'en-ZA', name: 'English (South Africa)', confidence: 0.98 };
  }
}
