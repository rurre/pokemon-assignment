export function toSentenceCase(str: string): string 
{
  str = str.toString(); 
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() +
    txt.substring(1).toLowerCase());
}