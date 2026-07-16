"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_LANGUAGE,
  VOYLME_EVENTS,
  VOYLME_STORAGE,
} from "@/lib/voylme/config/storage";

import {
  getLanguage,
  normalizeLanguageCode,
} from "@/lib/voylme/i18n/languages";

export function useVoylmeLanguage() {
  const [
    languageCode,
    setLanguageCode,
  ] = useState(DEFAULT_LANGUAGE);

  useEffect(() => {
    const syncLanguage = () => {
      setLanguageCode(
        normalizeLanguageCode(
          localStorage.getItem(
            VOYLME_STORAGE.language,
          ),
        ),
      );
    };

    const handleLanguageChange = (
      event: Event,
    ) => {
      const customEvent =
        event as CustomEvent<unknown>;

      setLanguageCode(
        normalizeLanguageCode(
          customEvent.detail,
        ),
      );
    };

    syncLanguage();

    window.addEventListener(
      VOYLME_EVENTS.languageChange,
      handleLanguageChange,
    );

    window.addEventListener(
      "storage",
      syncLanguage,
    );

    window.addEventListener(
      "focus",
      syncLanguage,
    );

    return () => {
      window.removeEventListener(
        VOYLME_EVENTS.languageChange,
        handleLanguageChange,
      );

      window.removeEventListener(
        "storage",
        syncLanguage,
      );

      window.removeEventListener(
        "focus",
        syncLanguage,
      );
    };
  }, []);

  const language = useMemo(
    () => getLanguage(languageCode),
    [languageCode],
  );

  return {
    languageCode: language.code,
    language,
    isRtl:
      language.direction === "rtl",
  };
}
