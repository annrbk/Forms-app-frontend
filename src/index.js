import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/UserContext";
import {
  LanguageProvider,
  useLanguageContext,
} from "./context/LanguageContext";
import { IntlProvider } from "react-intl";

const AppWithIntl = () => {
  const { locale, messages } = useLanguageContext();

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <UserProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </UserProvider>
    </IntlProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageProvider>
    <AppWithIntl />
  </LanguageProvider>
);
reportWebVitals();
