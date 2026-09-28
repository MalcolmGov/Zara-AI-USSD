import { ExtractedEntities } from '../types/router';

export class EntityExtractor {
  static extract(input: string): ExtractedEntities {
    const entities: ExtractedEntities = {};
    const text = input.trim();

    // 1. Amount extraction: "R100", "R 50", "100 rand", "200 zar"
    const rMatch = text.match(/(?:R|ZAR)\s*(\d+(?:\.\d{2})?)/i) || 
                   text.match(/(\d+(?:\.\d{2})?)\s*(?:rand|zar)/i) ||
                   text.match(/\b(?:buy|purchase|send|pay)\s+(\d{2,4})\b/i);

    if (rMatch && rMatch[1]) {
      entities.amount = parseFloat(rMatch[1]);
      entities.currency = 'ZAR';
    }

    // 2. Meter number extraction: 9 to 11 digits
    const meterMatch = text.match(/\b(\d{9,11})\b/);
    if (meterMatch) {
      entities.meterNumber = meterMatch[1];
    }

    // 3. ID number extraction: 4 digits (demo) or 13 digits (RSA ID)
    const idMatch = text.match(/\bid[:\s]*(\d{4,13})\b/i) || text.match(/\b(\d{13})\b/);
    if (idMatch) {
      entities.idNumber = idMatch[1];
    }

    // 4. Job Category
    if (/tech|developer|software|code|it|data/i.test(text)) {
      entities.category = 'technology';
    } else if (/retail|shop|cashier|pack/i.test(text)) {
      entities.category = 'retail';
    } else if (/admin|clerk|reception/i.test(text)) {
      entities.category = 'admin';
    } else if (/security|guard|patrol/i.test(text)) {
      entities.category = 'security';
    }

    // 5. Crop & Agronomy
    if (/maize|corn|mielie/i.test(text)) {
      entities.cropType = 'Maize';
    }
    if (/yellow|streak|blight|curled|wilt/i.test(text)) {
      entities.symptom = 'yellow_leaves';
    }

    // 6. Delivery channel preference
    if (/sms|text/i.test(text)) {
      entities.deliveryChannel = 'sms';
    } else if (/whatsapp/i.test(text)) {
      entities.deliveryChannel = 'whatsapp';
    } else if (/voice|call/i.test(text)) {
      entities.deliveryChannel = 'voice';
    }

    return entities;
  }
}
