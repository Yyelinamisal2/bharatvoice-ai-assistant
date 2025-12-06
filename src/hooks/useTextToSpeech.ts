import { useState, useCallback, useRef } from 'react';
import { type LanguageCode } from '@/lib/languages';

interface UseTextToSpeechProps {
  language: LanguageCode;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
}

export const useTextToSpeech = ({ language, onStart, onEnd, onError }: UseTextToSpeechProps) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(() => 'speechSynthesis' in window);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Map language codes to BCP-47 codes for speech synthesis
  const langMap: Record<string, string> = {
    en: 'en-IN',
    hi: 'hi-IN',
    bn: 'bn-IN',
    te: 'te-IN',
    mr: 'mr-IN',
    ta: 'ta-IN',
    gu: 'gu-IN',
    kn: 'kn-IN',
    ml: 'ml-IN',
    or: 'or-IN',
    pa: 'pa-IN',
    as: 'as-IN',
    mai: 'hi-IN', // Fallback to Hindi
    sa: 'hi-IN', // Fallback to Hindi
    ne: 'ne-NP',
    sd: 'sd-IN',
    ks: 'hi-IN', // Fallback to Hindi
    doi: 'hi-IN', // Fallback to Hindi
    kok: 'hi-IN', // Fallback to Hindi
    mni: 'hi-IN', // Fallback to Hindi
    sat: 'hi-IN', // Fallback to Hindi
    bo: 'hi-IN', // Fallback to Hindi
    ur: 'ur-IN',
  };

  const speak = useCallback((text: string) => {
    if (!isSupported) {
      onError?.('Text-to-speech is not supported in this browser.');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = langMap[language] || 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Try to find a voice for the language
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => v.lang.startsWith(langMap[language]?.split('-')[0] || 'en'));
    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      onStart?.();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      onError?.('Failed to speak text.');
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSupported, language, onStart, onEnd, onError]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return {
    isSpeaking,
    isSupported,
    speak,
    stop,
  };
};
