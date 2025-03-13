# Longdo Spell Checker for VS Code 

![Build Status](https://github.com/MetamediaTechnology/vscode-longdo-spell/actions/workflows/node.js.yml/badge.svg)

Longdo Spell Checker is a VSCode extension for Thai spell checking. It highlights errors and suggests corrections, helping you write accurate Thai text effortlessly. 🚀


![Longdo Spell Checker](https://raw.githubusercontent.com/MetamediaTechnology/vscode-longdo-spell/main/docs/preview.gif)
<hr>

### การติดตั้ง

1. เมื่อท่านติดตั้งเสร็จแล้ว จำเป็นต้องมี API Key ซึ่งสามารถใช้งานได้ฟรี 100,000 ครั้ง/เดือน
  - สมัครเพื่อใช้งานได้ที่เว็บไซต์ [Longdo Account](https://map.longdo.com/console/)

2. ตั้งค่า API Key โดยเลือกวิธีใดวิธีหนึ่ง:
  
  **วิธีที่ 1: ตั้งค่าผ่าน VS Code Settings**
  - เปิดการตั้งค่า VS Code
    - Windows/Linux: `File > Preferences > Settings`
    - MacOS: `Code > Preferences > Settings`
  - ค้นหา "Longdo Spell Checker"
  - ใส่ค่า API Key ของท่าน

  ![Longdo Spell Checker](https://raw.githubusercontent.com/MetamediaTechnology/vscode-longdo-spell/main/docs/setup_1.png)
  
  **วิธีที่ 2: ตั้งค่าผ่าน settings.json**
  - เปิด settings.json
    - Windows/Linux: `File > Preferences > Settings` > เลือกไอคอน `{}` ด้านบนขวา
    - MacOS: `Code > Preferences > Settings` > เลือกไอคอน `{}` ด้านบนขวา
  - เพิ่มการตั้งค่า:
    ```json
    "longdo-spell-checker.apiKey": "YOUR_API_KEY"
    ```

### การใช้งาน

* ใช้งานผ่าน UI
    * Longdo Spell Checker เมื่อทำการติดตั้งเสร็จเรียบร้อยแล้วในส่วนของ __Status bar__ ด้านขวาล่างจะแสดง Longdo Spell ท่านสามารถคลิกและเลือกคำสั่งตามที่ต้องการได้ เช่น ตรวจคำผิด หรือ ล้างค่า
* ใช้งานผ่าน Command
    * เปิดหน้าต่างสำหรับพิพม์คำสั่ง
      * Windows: Ctrl + Shift + p
      * MacOS:  Cmd + Shift + p
    * จากนั้นพิมพ์คำสั่ง ```Longdo Spell Checker``` หรือ ```Longdo Spell Clear``` เพื่อล้างคำสั่ง



### Features 💕

* Quick fix suggestions for correcting Thai spelling errors
* Comprehensive Thai spell checking
* Support for multiple Thai document types
* Customizable settings


### Language Support

| Language | Support Level |
|----------|---------------|
| Thai     | Full          |
| English  | None          |


### Files Extension Support

| Language                                       | Support       |
|------------------------------------------------|---------------|
| Markdown .md, JavaScript .js, TypeScript .ts   | ✅            |
| Python .py, PHP .php, Vue .vue, Go .go         | ✅            |
| HTML .html, CSS .css, JSON .json, Dart .dart   | ✅            |
| Ruby .rb, Java .java, C .c, C++ .cpp           | ✅            |
| C# .cs, XML .xml, YAML .yml/.yaml, Plain Text .txt | ✅        |
| Shell Script .sh, SQL .sql, Rust .rs           | ✅            |


### Terms of Use | ข้อกำหนดการใช้งาน 

> Since the spell check requires a server for processing, an API Key is required. You can register at Longdo Console and it's all free. However, there is a limit of 100,000 requests per month. If the text is longer than 1024 characters, it will be split into multiple requests. For example, if you have a text of 1025 characters, it will be split into 2 requests.

เนื่องด้วยในการตรวจคำจำเป็นต้องใช้ Server ในการประมวลผล ซึ่งจำเป็นต้องมี API Key ก่อนครับ สมัครได้ที่ [Longdo Console](https://map.longdo.com/console/) และ **ทั้งหมดนี้ ฟรี !!**. ครับ แต่ก็มีจำกัดบ้าง คือ 100,000 ครั้งต่อเดือน กล่าวคือใช้คำสั่งตรวจได้ 100,000 ครั้ง แต่ถ้าข้อความเรายาวจริง ๆ ที่มากกว่า 1024 ตัวอักษร ก็ตัดไปเป็นอีก 1 Request ให้ครับ เช่น พิมพ์ยาวมากเลยเป็นเรียงความ นับได้ 1025 ตัว ก็ตัด 1024 ตัวไปถาม 1 ครั้ง อีก 1 ตัวที่เหลือก็ยิงไปถามอีก 1 ครั้งรวมเป็น 2 แอบไม่คุ้มแต่ก็คิดว่าใช้ยังไงก็น่าจะไม่หมดถ้าไม่ถล่ม

### Privacy Policy | นโยบายความเป็นส่วนตัว
No information is stored on our servers. All Thai language data sent is used solely for word analysis and classification purposes.


