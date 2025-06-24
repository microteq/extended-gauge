/*#########################################################################################*/
/* MAYBE THIS CAN BE REPLACED LATER BY HASS.LOCALIZE BY SETTING THE TRANSLATED TEXTS
/* INTO THE TRANSLATIONS DIRECTORY OF THE INTEGRATION PART OF THIS CARD. THE TRANSLATION
/* KEYS WILL THEN HAVE TO BE PREFIXED WITH ui.card.microteq-gauge...
/* HAS TO BE TESTED.
/*##########################################################################################*/
/*****************************************************************************************************************************/
/* Purpose: Licalizing string that are not covered by Home Assistant localization system
/* History: 20-JUN-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
import * as en from "./languages/en.json";
import * as de from "./languages/de.json";
import * as fr from "./languages/fr.json";
import * as it from "./languages/it.json";
import * as es from "./languages/es.json";


/*****************************************************************************************************************************/
/* Purpose: Supported languages
/* History: 20-JUN-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
const languages: Record<string, unknown> = 
{
  en,
  de,
  fr,
  it,
  es
};
const defaultLang = "en";


/*****************************************************************************************************************************/
/* Purpose: translate text key into a localized string
/* History: 20-JUN-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
function getTranslatedString(key: string, lang: string): string | undefined 
{
  try 
  {
    return key
      .split(".")
      .reduce(
        (o, i) => (o as Record<string, unknown>)[i],
        languages[lang]
      ) as string;
  } 
  catch (_) 
  {
    return undefined;
  }
}


/*****************************************************************************************************************************/
/* Purpose: Do custom localization of a text key. Take english as default. Return key, if no translation found.
/* History: 20-JUN-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export function setupCustomlocalize(key: string) 
{
  const lang = (localStorage.getItem("selectedLanguage") || "en")
    .replace(/['"]+/g, "")
    .replace("-", "_");

  let translated = getTranslatedString(key, lang);
  if (!translated) 
    translated = getTranslatedString(key, defaultLang);
  return translated ?? key;
}


/*****************************************************************************************************************************/
/* Purpose: SetupCustomLocalize is default function of this file.
/* History: 20-JUN-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export default setupCustomlocalize;
