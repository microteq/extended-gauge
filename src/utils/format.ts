/*****************************************************************************************************************************/
/* Purpose: Format values
/* History: 20-JUN-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
import { FrontendLocaleData } from "custom-card-helpers";


/*****************************************************************************************************************************/
/* Purpose: Number format option interface
/* History: 08-APR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export interface NumberFormatOptions 
{
    decimalPlaces?: number;
    decimalSeparator?: string;
    thousandSeparator?: string | null;
}


/*****************************************************************************************************************************/
/* Purpose: Format a number to a string
/* History: 20-JUN-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export const formatNumber = (value: number, locale: FrontendLocaleData, options: NumberFormatOptions = {}) : string =>
{
    if (typeof value === "string")
    {
        return ""
    }
    // Default values        
    const decimalPlaces = options.decimalPlaces !== undefined ? options.decimalPlaces : 0;
    let decimalSeparator = options.decimalSeparator;
    if (decimalSeparator == undefined)
    {
        decimalSeparator = new Intl.NumberFormat(locale.language).format(1.1).charAt(1);
    }
    const thousandSeparator = options.thousandSeparator !== undefined ? options.thousandSeparator : "";
    // Round to the numer of decimals and split integer from decimals
    let [integerPart, decimalPart = ""] = value.toFixed(decimalPlaces).split(".");
    
    // Insert thousands separators, if defined
    if (thousandSeparator !== undefined) 
    {
        // Save negative sign, if needed
        const isNegative = integerPart.startsWith("-");
        if (isNegative) 
            integerPart = integerPart.substring(1);
        
        // Use RegExp to insert thousand separators
        // (?=...) is a positive lookahead that checks if the following pattern matches without consuming it
        // (\d{3})+ means "one or more groups of exactly three digits"
        // $ means "at the end of the string"
        // The result: Insert thousandSeparator before every group of three digits
        // if it's at the end or followed by another group of three digits
        const regex = /\B(?=(\d{3})+(?!\d))/g;

        // Insert thoudands seperator with regula expressions
        integerPart = integerPart.replace(regex, thousandSeparator!);
        
        // Re-add sign, if needed
        if (isNegative) 
            integerPart = "-" + integerPart;
    }
    return decimalPlaces > 0 ? `${integerPart}${decimalSeparator}${decimalPart}` : integerPart;
}

