export interface ApiResponse<T = any> {
  status: number;
  result?: T;
  message?: string;
}

export interface errorMessage {
  message: string;
}

export interface ProofResponse {
  word: string;
  index: number;
  suggests: string[];
}

export interface ErrorsResult {
  word: string;
  index: number;
  suggests: string[];
  originalPosition: Position;
}

export interface Position {
  line: number;
  start: number;
  end: number;
  word?: string;
}

export interface TextIndex {
  line: number;
  start: number;
  end: number;
  text: string;
  globalStart: number;
  globalEnd: number;
}

export interface TextEditing {
  type_count: number;
  text: string;
}
