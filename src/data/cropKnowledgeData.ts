export interface CropDiagnosis {
  symptom: string;
  crop: string;
  causes: string[];
  recommendations: string[];
  treatmentSummary: string;
  urgency: 'Low' | 'Medium' | 'High';
}

export const CROP_KNOWLEDGE: Record<string, CropDiagnosis> = {
  'yellow_leaves_maize': {
    crop: 'Maize (Corn)',
    symptom: 'Yellowing of leaves starting from tip along midrib',
    causes: [
      '1. Nitrogen (N) deficiency due to heavy leaching rains',
      '2. Maize Streak Virus (MSV) transmitted by leafhoppers',
      '3. Soil waterlogging causing oxygen starvation at root zone'
    ],
    recommendations: [
      'Top-dress with Limestone Ammonium Nitrate (LAN 28%) at 150-200 kg/ha',
      'Check underside of leaves for leafhopper vectors; spray approved insecticide if present',
      'Ensure ridge drainage to prevent root rot during waterlogging'
    ],
    treatmentSummary: 'Top-dress with LAN (28% N) immediately; spray for leafhoppers if streak lines visible.',
    urgency: 'High'
  },
  'curled_leaves_maize': {
    crop: 'Maize (Corn)',
    symptom: 'Curled and wilting leaves',
    causes: [
      '1. Moisture stress / prolonged drought spell',
      '2. Fall Armyworm infestation inside whorl',
      '3. Root nematode damage'
    ],
    recommendations: [
      'Inspect whorl for frass (sawdust-like droppings) and caterpillar larvae',
      'Apply registered bio-pesticide (e.g., Spinetoram or Bacillus thuringiensis) in late afternoon',
      'Mulch to preserve soil moisture'
    ],
    treatmentSummary: 'Inspect central whorl for Armyworm; apply bio-pesticide late afternoon.',
    urgency: 'High'
  }
};
