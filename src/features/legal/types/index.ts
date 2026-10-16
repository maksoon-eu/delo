export type LegalSection = {
  title: string;
  paragraphs: string[];
};

export type LegalDocument = {
  title: string;
  description: string;
  version: string;
  updatedAt: string;
  sections: LegalSection[];
};
