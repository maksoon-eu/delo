const DOCUMENT_FILE_NAME_SEPARATOR = '~';

export function sanitizeDocumentFileName(filename: string) {
  return filename
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9а-яА-ЯёЁ._-]/g, '')
    .slice(0, 120);
}

export function getDocumentFileName(url: string) {
  const filename = url.slice(url.lastIndexOf('/') + 1);

  return decodeURIComponent(filename.split(DOCUMENT_FILE_NAME_SEPARATOR)[1]);
}

export function buildStoredDocumentFileName(uuid: string, filename: string) {
  return `${uuid}${DOCUMENT_FILE_NAME_SEPARATOR}${filename}`;
}
