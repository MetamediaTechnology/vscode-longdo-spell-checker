import { postProof } from "./api";
import { Position, ProofResponse } from "./types";
import { dataToSend, findOriginalPosition } from "./text";

export async function spellCheckPromises() {
  const spell = dataToSend.map(async (data) => {
    try {
      const spell = await postProof(data.text);
      const results = spell?.result || [];
      const originalResults = results
        .map((item: ProofResponse) => ({
          ...item,
          originalPosition: findOriginalPosition(item.index, data.indices),
        }))
        .filter(
          (result: { originalPosition: Position }) => result.originalPosition
        );

      return originalResults;
    } catch (error) {
      throw error;
    }
  });

  const allResults = await Promise.all(spell);
  const flattenedResults = allResults.flat();
  return flattenedResults;
}
