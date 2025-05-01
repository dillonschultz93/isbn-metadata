export type OpenLibraryResponse = {
  type: {
    type: string;
  };
  title: string;
  authors: {
    key: string;
  }[];
  publish_date: string;
  source_records: string[];
  number_of_pages: number;
  publishers: string[];
  isbn_10: string[];
  isbn_13: string[];
  physical_format: string;
  full_title: string;
  subtitle: string;
  notes: {
    type: string;
    value: string;
  }[];
  covers: number[];
  works: {
    key: string;
  }[];
  key: string;
  local_id: string[];
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string;
  };
  last_modified: {
    type: string;
    value: string;
  };
};
