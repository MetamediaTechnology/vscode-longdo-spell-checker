
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

    /**
        * Check if a string is a valid URL/link, including Markdown link format
        * @param str - The string to check
        * @returns True if the string is a valid URL/link, false otherwise
        */
        public static markdownLink(str: string): boolean {
           // Check for Markdown links: [text](url)
           const markdownPattern = /\[.*?\]\((https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)\)/i;
           if (markdownPattern.test(str)) {
              return true;
           }      
           // Check for regular URLs
           const urlPattern = /^(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/i;
           return urlPattern.test(str);
        }
}