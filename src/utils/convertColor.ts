/*****************************************************************************************************************************/
/* Purpose: Convert array of RGB to hex string
/* History: 20-MAR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export const rgbToHex = (colorList: number[]): string => 
{
  if (!colorList) return "";
  return "#".concat(colorList.map((x) => x.toString(16).padStart(2, "0")).join(""));
};
  

/*****************************************************************************************************************************/
/* Purpose: Convert hex strirng to array of RGB
/* History: 20-MAR-2025 D.Geisenhoff   Created
/*****************************************************************************************************************************/
export const hexToRgb = (color: string): [number, number, number] | null  =>
  {
    color = color.trim();
    
    // if the value comes in RGB format, i.e. "rgb(255, 0, 0)"
    if (color.startsWith("rgb")) {
      const result = color.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)/);
      if (result) {
        return [
          parseInt(result[1], 10),
          parseInt(result[2], 10),
          parseInt(result[3], 10)
        ];
      }
    } 
    // If the value comes in Hex format, i.e. "#ff0000" or "#f00"
    else if (color.startsWith("#")) {
      if (color.length === 7) { // Format: #rrggbb
        const r = parseInt(color.substr(1, 2), 16);
        const g = parseInt(color.substr(3, 2), 16);
        const b = parseInt(color.substr(5, 2), 16);
        return [r, g, b];
      } else if (color.length === 4) { // Format: #rgb
        const r = parseInt(color.charAt(1) + color.charAt(1), 16);
        const g = parseInt(color.charAt(2) + color.charAt(2), 16);
        const b = parseInt(color.charAt(3) + color.charAt(3), 16);
        return [r, g, b];
      }
    }
    return null;
  }
