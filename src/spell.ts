import { postProof } from "./api";
import { Position, ProofResponse, TextIndex } from "./interface/types";
import { textProcessor } from "./text";

type SpellCheckResult = ProofResponse & { originalPosition: Position };

/**
 * Performs spell checking on all processed text segments
 * @returns Promise resolving to an array of spell check results with their original positions
 */
export async function spellCheckPromises(
  apiKey: string,
  textData: { text: string; indices: TextIndex[] }[] = []
): Promise<SpellCheckResult[]> {
  try {
    const spellCheckPromises = textData.map(async (data) => {
      const spell = await postProof(data.text, apiKey);
      const results = spell?.result || [];

      return results
        .map((item: ProofResponse) => ({
          ...item,
          originalPosition: textProcessor.findOriginalPosition(
            item.index,
            data.indices
          ),
        }))
        .filter(
          (result: any): result is SpellCheckResult =>
            result.originalPosition !== undefined &&
            result.originalPosition !== null
        );
    });

    const allResults = await Promise.all(spellCheckPromises);
    return allResults.flat();
  } catch (error) {
    throw error;
  }
}
