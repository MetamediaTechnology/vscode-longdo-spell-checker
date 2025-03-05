export interface ApiResponse<T = any> {
  success: boolean;
  result?: T;
}

export interface ProofResponse {
  word: string;
  index: number;
  suggests: string[];
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
