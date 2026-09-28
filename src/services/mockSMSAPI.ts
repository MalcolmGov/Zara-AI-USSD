export interface OutboundMessage {
  id: string;
  channel: 'sms' | 'whatsapp' | 'voice';
  recipient: string;
  sender: string;
  content: string;
  timestamp: string;
}

type MessageListener = (msg: OutboundMessage) => void;

class MessageBus {
  private static listeners: MessageListener[] = [];
  private static history: OutboundMessage[] = [];

  static subscribe(fn: MessageListener) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  static emit(msg: OutboundMessage) {
    this.history.unshift(msg);
    this.listeners.forEach(fn => fn(msg));
  }

  static getHistory() {
    return [...this.history];
  }
}

export class MockSMSAPI {
  static async send(recipient: string, content: string, delayMs = 300): Promise<{ success: boolean; messageId: string }> {
    await new Promise(res => setTimeout(res, delayMs));

    const msg: OutboundMessage = {
      id: `sms-${Date.now()}`,
      channel: 'sms',
      recipient,
      sender: 'Zara AI (31022)',
      content,
      timestamp: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
    };

    MessageBus.emit(msg);
    return { success: true, messageId: msg.id };
  }

  static subscribe(fn: MessageListener) {
    return MessageBus.subscribe(fn);
  }

  static getHistory() {
    return MessageBus.getHistory();
  }
}

export class MockWhatsAppAPI {
  static async send(recipient: string, content: string, delayMs = 350): Promise<{ success: boolean; messageId: string }> {
    await new Promise(res => setTimeout(res, delayMs));

    const msg: OutboundMessage = {
      id: `wa-${Date.now()}`,
      channel: 'whatsapp',
      recipient,
      sender: 'Zara AI Verified (+27 82 000 9272)',
      content,
      timestamp: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
    };

    MessageBus.emit(msg);
    return { success: true, messageId: msg.id };
  }
}

export class MockVoiceAPI {
  static async triggerCall(recipient: string, promptSummary: string, delayMs = 400): Promise<{ success: boolean; callId: string }> {
    await new Promise(res => setTimeout(res, delayMs));

    const msg: OutboundMessage = {
      id: `voice-${Date.now()}`,
      channel: 'voice',
      recipient,
      sender: 'Zara Voice (+27 16 880 0712)',
      content: `Incoming AI audio briefing: "${promptSummary}"`,
      timestamp: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })
    };

    MessageBus.emit(msg);
    return { success: true, callId: msg.id };
  }
}
