interface RegisterCardParams 
{
  type: string;
  name: string;
  description: string;
}


/*****************************************************************************************************************************/
/* Purpose: Register custom card in Home assistant
/* History: 28-MAY-2025 D. Geisenhoff   Created
/*****************************************************************************************************************************/
export function registerCustomCard(params: RegisterCardParams) 
{
  const windowWithCards = window as unknown as Window & 
  {
    customCards: unknown[];
  };
  windowWithCards.customCards = windowWithCards.customCards || [];

  windowWithCards.customCards.push(
  {
    ...params,
    preview: true,
    documentationURL: `https://github.com/microteq/extended-gauge`,
  });
}
