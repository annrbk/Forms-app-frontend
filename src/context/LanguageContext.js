import React, { useState } from "react";
import { createContext, useContext } from "react";
import { messages_be } from "../lang/be/be";
import { messages_en } from "../lang/en/en";
import PropTypes from "prop-types";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");

  const changeLanguage = (newLocale) => {
    setLocale(newLocale);
  };

  const messages = {
    en: messages_en,
    be: messages_be,
  };

  return (
    <LanguageContext.Provider value={{ messages, locale, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguageContext = () => useContext(LanguageContext);
export { LanguageContext };
