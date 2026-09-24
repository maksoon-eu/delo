export const ORDER_DOCUMENT_MAX_BYTES = 5 * 1024 * 1024;

export const ORDER_DOCUMENT_ALLOWED_TYPES = ['application/pdf'] as const;

export const ORDER_DOCUMENT_ACCEPT = ORDER_DOCUMENT_ALLOWED_TYPES.join(',');
