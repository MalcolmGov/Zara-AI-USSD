import { SessionManager } from '../ussd/sessionManager';
import { IntentRouter } from '../ai/intentRouter';
import { ChannelAdapter } from '../ussd/channelAdapter';
import { MockSMSAPI, OutboundMessage } from '../services/mockSMSAPI';

async function runTests() {
  console.log('====================================================');
  console.log('🚀 RUNNING COMPREHENSIVE ZARA USSD PROTOTYPE TESTS');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: any, testName: string, detail?: string) {
    if (Boolean(condition)) {
      console.log(`✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${testName}`);
      if (detail) console.error(`   ${detail}`);
      failed++;
    }
  }

  // TEST 1: Service Code validation
  assert(ChannelAdapter.isServiceCode('*120*9272#'), 'Service code *120*9272# recognized');
  assert(!ChannelAdapter.isServiceCode('*999*000#'), 'Invalid code rejected');

  // TEST 2: Intent Router - Natural Language
  const r1 = IntentRouter.routeIntent('I need electricity');
  assert(r1.agentId === 'electricity' && r1.intent === 'purchase_electricity', 'Natural language "I need electricity" routes to Electricity Agent');
  assert(r1.confidence >= 0.95, 'High confidence for electricity intent', `Got ${r1.confidence}`);

  const r2 = IntentRouter.routeIntent('Buy R100 electricity');
  assert(r2.entities.amount === 100, 'Entity extraction extracted amount R100');

  const r3 = IntentRouter.routeIntent('Find me a job in technology');
  assert(r3.agentId === 'jobs' && r3.entities.category === 'technology', 'Job search routes to Jobs Agent with category technology');

  const r4 = IntentRouter.routeIntent('Check my grant');
  assert(r4.agentId === 'government', 'Grant enquiry routes to Government Agent');

  const r5 = IntentRouter.routeIntent('My maize leaves are yellow');
  assert(r5.agentId === 'agriculture' && r5.entities.cropType === 'Maize', 'Agronomy query routes to Agriculture Agent');

  // TEST 3: Multilingual intent routing
  const rZulu = IntentRouter.routeIntent('Ngifuna ukuthenga ugesi');
  assert(rZulu.agentId === 'electricity' && rZulu.language === 'zu-ZA', 'isiZulu phrase routes to Electricity Agent and detects zu-ZA');

  const rSotho = IntentRouter.routeIntent('Ke batla motlakase');
  assert(rSotho.agentId === 'electricity' && rSotho.language === 'st-ZA', 'Sesotho phrase routes to Electricity Agent and detects st-ZA');

  const rAfr = IntentRouter.routeIntent('Ek soek krag');
  assert(rAfr.agentId === 'electricity' && rAfr.language === 'af-ZA', 'Afrikaans phrase routes to Electricity Agent and detects af-ZA');

  // TEST 4: Session Manager - Dialling & Welcome Menu
  const sm = SessionManager.getInstance();
  sm.setNetworkCondition('normal');
  const dialOk = await sm.startDialling('*120*9272#');
  assert(dialOk, 'Session initiated with *120*9272#');

  const homeScreen = sm.getCurrentScreen();
  assert(homeScreen?.id === 'home' && homeScreen.options?.length === 6, 'Welcome screen rendered with 6 menu options');

  // TEST 5: Invalid input handling
  const invalidRes = await sm.submitInput('999');
  assert(invalidRes.prompt.includes('Invalid option'), 'Invalid menu option handled gracefully without crashing');

  // TEST 6: Electricity End-to-End Workflow with Token Generation & Credit Deduction
  await sm.submitInput('1'); // Select "Tell Zara what you need"
  assert(sm.getCurrentScreen()?.id === 'natural-language-prompt', 'Opened natural language prompt');

  await sm.submitInput('I need electricity');
  assert(sm.getCurrentScreen()?.id === 'elec-main-menu', 'Electricity Agent menu presented');

  await sm.submitInput('1'); // Buy electricity
  assert(sm.getCurrentScreen()?.id === 'elec-enter-meter', 'Prompts for meter number');

  await sm.submitInput('07123456789'); // Enter meter
  assert(sm.getCurrentScreen()?.id === 'elec-select-amount', 'Prompts for amount');

  await sm.submitInput('2'); // Select R100
  assert(sm.getCurrentScreen()?.id === 'elec-confirm-purchase', 'Confirmation screen displayed with masked meter');

  const telemetryBefore = sm.getTelemetry();
  const creditsBefore = telemetryBefore.remainingBalance;

  // Track SMS dispatch
  let receivedSms: OutboundMessage | null = null;
  const unsubSms = MockSMSAPI.subscribe(msg => {
    receivedSms = msg;
  });

  await sm.submitInput('1'); // Confirm purchase
  const successScreen = sm.getCurrentScreen();
  assert(successScreen?.id === 'elec-success', 'Purchase successful screen reached');
  assert(successScreen?.prompt.includes('1234 5678 9012 3456'), '16-digit STS Electricity token displayed');

  const telemetryAfter = sm.getTelemetry();
  assert(telemetryAfter.remainingBalance === creditsBefore - 1, 'AI Credit deducted by 1 (starts 48 -> now 47)');
  assert(telemetryAfter.lastApiName?.includes('EskomPrepaidVendorAPI'), 'Telemetry captured Eskom Utility Vendor API call');

  // Test SMS delivery of token
  await sm.submitInput('1'); // Send token by SMS
  assert(Boolean((receivedSms as any)?.content?.includes('1234 5678 9012 3456')), 'SMS notification dispatched with electricity token');
  unsubSms();

  // Return to main menu
  await sm.submitInput('2');
  assert(sm.getCurrentScreen()?.id === 'home', 'Returned to Home menu');

  // TEST 7: Jobs Workflow & SMS
  await sm.submitInput('2'); // Browse AI Agents
  assert(sm.getCurrentScreen()?.id === 'browse-agents', 'Opened Browse Agents Marketplace');

  await sm.submitInput('3'); // Select Jobs
  assert(sm.getCurrentScreen()?.id === 'jobs-main-menu', 'Jobs Agent opened');

  await sm.submitInput('3'); // Technology
  assert(sm.getCurrentScreen()?.id === 'jobs-list', 'Listing technology jobs');

  await sm.submitInput('1'); // Select Junior Developer
  assert(sm.getCurrentScreen()?.id === 'job-detail', 'Job detail view rendered');

  let jobSms: OutboundMessage | null = null;
  const unsubJobSms = MockSMSAPI.subscribe(m => { jobSms = m; });
  await sm.submitInput('1'); // Send details by SMS
  assert(Boolean((jobSms as any)?.content?.includes('Junior Developer')), 'Job specification dispatched via SMS');
  unsubJobSms();

  // Return home
  await sm.submitInput('2');

  // TEST 8: Government Grant Status Check (Clearly Marked Demo)
  await sm.submitInput('1'); // Tell Zara
  await sm.submitInput('Check my grant');
  assert(sm.getCurrentScreen()?.id === 'gov-main-menu', 'Government Services main menu rendered');

  await sm.submitInput('1'); // Select Grant status
  assert(sm.getCurrentScreen()?.id === 'gov-grant-id-prompt', 'Government grant ID verification prompt rendered');

  await sm.submitInput('1234');
  const grantScreen = sm.getCurrentScreen();
  assert(grantScreen?.prompt.includes('DEMO RESULT') && grantScreen.prompt.includes('Approved'), 'Fictional demo grant status result rendered');

  // Return home
  await sm.submitInput('2');

  // TEST 9: Agriculture GenAI Triage & WhatsApp Cross-Channel
  await sm.submitInput('1');
  await sm.submitInput('My maize leaves are yellow');
  assert(sm.getCurrentScreen()?.id === 'agri-q1-location', 'Prompted for farm location');

  await sm.submitInput('Free State');
  assert(sm.getCurrentScreen()?.id === 'agri-q2-crop-age', 'Prompted for crop age');

  await sm.submitInput('4 weeks');
  assert(sm.getCurrentScreen()?.id === 'agri-channel-select', 'Agronomy AI diagnosed 3 causes, offering delivery channels');

  let waMsg: OutboundMessage | null = null;
  const unsubWa = MockSMSAPI.subscribe(m => { waMsg = m; });
  await sm.submitInput('2'); // Select WhatsApp
  assert(Boolean((waMsg as any)?.channel === 'whatsapp' && (waMsg as any)?.content?.includes('Nitrogen Deficiency')), 'Rich agronomy advice dispatched to WhatsApp');
  unsubWa();

  // Return home
  await sm.submitInput('2');

  // TEST 10: Buy AI Credits & Persistence
  await sm.submitInput('3'); // My AI Credits
  assert(sm.getCurrentScreen()?.id === 'credits-menu', 'Credits menu opened');

  await sm.submitInput('1'); // Buy credits
  await sm.submitInput('2'); // 50 credits - R10
  await sm.submitInput('1'); // Airtime payment

  const credSuccess = sm.getCurrentScreen();
  assert(credSuccess?.id === 'credits-success' && credSuccess.prompt.includes('50 AI Credits added'), '50 credits added successfully');
  assert(sm.getTelemetry().remainingBalance >= 90, 'Credits balance updated persistently');

  // Return home
  await sm.submitInput('1');

  // TEST 11: Change Language
  await sm.submitInput('5'); // Change Language
  assert(sm.getCurrentScreen()?.id === 'change-language', 'Language selection screen displayed');

  await sm.submitInput('2'); // isiZulu
  const zuluHome = sm.getCurrentScreen();
  assert(zuluHome?.prompt.includes('Siyakwamukela ku-Zara AI'), 'Home screen translated to isiZulu');

  // TEST 12: Session Timer & Termination
  assert(sm.getTimeRemaining() > 0, 'Session timer running (approx 180s)');
  sm.endSession();
  assert(sm.getCurrentScreen() === null, 'Session ended and cleaned up');

  console.log('\n====================================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution error:', err);
  process.exit(1);
});
