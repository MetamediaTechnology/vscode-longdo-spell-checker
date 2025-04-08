
export class StringUtils {

    constructor() {
        // Constructor logic if needed
    }
    
    /**
     * Check if a string contains Thai characters
     * @param str - The string to check
     * @returns True if the string contains Thai characters, false otherwise
     */
    public static containsThai(str: string): boolean {
        const thaiPattern = /[\u0E00-\u0E7F]/;
        return thaiPattern.test(str);
    }
}