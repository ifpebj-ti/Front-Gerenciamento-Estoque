export default function base64ToBlob(
  base64: string,
  mimeType = "image/png"
): string {
  const byteCharacters = atob(base64); // Decodifica a string Base64
  const byteNumbers = Array.from(byteCharacters).map((char) =>
    char.charCodeAt(0)
  ); // Converte para array binário
  const byteArray = new Uint8Array(byteNumbers); // Converte para um Uint8Array
  return URL.createObjectURL(new Blob([byteArray], { type: mimeType }));
}
