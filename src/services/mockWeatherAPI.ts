export interface FarmTelemetry {
  location: string;
  temperature: string;
  rainfall7Days: string;
  soilMoisture: string;
  riskFactor: string;
}

export class MockWeatherAPI {
  static async getAgronomyConditions(location = 'Free State', delayMs = 350): Promise<FarmTelemetry> {
    await new Promise(res => setTimeout(res, delayMs));

    return {
      location,
      temperature: '24°C / 13°C (Mild)',
      rainfall7Days: '48mm (High - Leaching likely)',
      soilMoisture: '78% (Near saturation)',
      riskFactor: 'Moderate Nitrogen Runoff'
    };
  }
}
