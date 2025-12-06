import { useState, useCallback, useRef, useEffect } from 'react';
import { type LanguageCode } from '@/lib/languages';

interface UseVoiceRecognitionProps {
  language: LanguageCode;
  onResult: (transcript: string) => void;
  onError?: (error: string) => void;
}

// Type declarations for Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

export const useVoiceRecognition = ({ language, onResult, onError }: UseVoiceRecognitionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    
    // Map language codes to BCP-47 codes for speech recognition
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
      mai: 'mai-IN',
      sa: 'sa-IN',
      ne: 'ne-NP',
      sd: 'sd-IN',
      ks: 'ks-IN',
      doi: 'doi-IN',
      kok: 'kok-IN',
      mni: 'mni-IN',
      sat: 'sat-IN',
      bo: 'brx-IN',
      ur: 'ur-IN',
    };

    recognition.lang = langMap[language] || 'en-IN';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const lastResult = event.results[event.results.length - 1];
      if (lastResult.isFinal) {
        const transcript = lastResult[0].transcript;
        onResult(transcript);
        setIsListening(false);
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error:', event.error);
      if (event.error === 'not-allowed') {
        onError?.('Microphone access denied. Please allow microphone access.');
      } else if (event.error === 'no-speech') {
        onError?.('No speech detected. Please try again.');
      } else {
        onError?.(`Speech recognition error: ${event.error}`);
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [language, onResult, onError]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      onError?.('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      recognitionRef.current?.start();
      setIsListening(true);
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      onError?.('Failed to start speech recognition.');
    }
  }, [isSupported, onError]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
    toggleListening,
  };
};
