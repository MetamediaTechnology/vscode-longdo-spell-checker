# Longdo Spell Checker for VS Code

![Build Status](https://github.com/MetamediaTechnology/vscode-longdo-spell-checker/actions/workflows/node.js.yml/badge.svg)

Longdo Spell Checker is a VSCode extension for Thai spell checking. It highlights errors and suggests corrections, helping you write accurate Thai text effortlessly. 🚀

![Longdo Spell Checker](https://raw.githubusercontent.com/MetamediaTechnology/vscode-longdo-spell-checker/refs/heads/main/docs/preview.gif)

## 🌐 Language / ภาษา  
- [English](#english)  
- [ภาษาไทย](#ภาษาไทย)  

## English

### 🔧 Installation

### 1. Get an API Key (Free)

To use Longdo Spell Checker, you need an API key, which allows up to **100,000 free requests per month**.  
🔗 **Register for free** at [Longdo Account](https://map.longdo.com/console/).  
![LongdoConsole](https://raw.githubusercontent.com/MetamediaTechnology/vscode-longdo-spell-checker/refs/heads/main/docs/setup_3.png)

### 2. Configure the API Key

Choose one of the following methods:

#### **Option 1: Set via VS Code Settings**

1. Open **VS Code Settings**
   - **Windows/Linux:** `File > Preferences > Settings`
   - **MacOS:** `Code > Preferences > Settings`
2. Search for **"Longdo Spell Checker"**
3. Enter your **API Key**

![Settings](https://raw.githubusercontent.com/MetamediaTechnology/vscode-longdo-spell-checker/refs/heads/main/docs/setup_1.png)

#### **Option 2: Set via `settings.json`**

1. Open **settings.json**
   - **Windows/Linux:** `File > Preferences > Settings` > Click `{}` (top right)
   - **MacOS:** `Code > Preferences > Settings` > Click `{}` (top right)
2. Add the following configuration:
   ```json
   "longdo-spell-checker.apiKey": "YOUR_API_KEY"
   ```

---

## ✨ How to Use

### ✅ **Using the UI**

Once installed, you'll see **Longdo Spell** in the **status bar (bottom right)**.

- Click on it to access options such as **Check Spelling (Current Tab)** or **Clear All Errors (Current Tab)**.

### 🎯 **Using Commands**

1. Open the **Command Palette**:
   - **Windows/Linux:** `Ctrl + Shift + P`
   - **MacOS:** `Cmd + Shift + P`
2. Type and select:
   - `Longdo Spell Checker: Check Spelling (Current Tab)` → Check spelling
   - `Clear All Errors (Current Tab)` → Clear suggestions

---

## 💡 Features

✅ **Thai spell checking with suggestions**  
✅ **Quick fix for spelling errors**  
✅ **Supports multiple file types**  
✅ **Customizable settings**  
✅ **Add dictionary**

---

## 🌏 Language Support

| Language   | Support Level              |
| ---------- | -------------------------- |
| 🇹🇭 Thai    | Full Support            |
| 🇬🇧 English | JSON, Markdown, JavaScript |


## 📜 Terms of Use

The extension **requires an API key** because spell checking is processed on a server.

- **Free Tier**: 100,000 requests/month
- **Text Limit**: If your text exceeds **1,024 characters**, it will be split into multiple requests.

📌 Example:

- A **1,025-character** text = **2 requests**
- A **5,000-character** text = **5 requests**
- 
## 🔒 Privacy

### Data Processing
- All text checking is processed on [Longdo servers](https://longdo.com/)
- We do not store your text content permanently
- Text is only used for spell checking purposes

### Data Collection
- We collect anonymous usage statistics to improve the service
- This includes:
   - Number of requests
   - Size of content checked
   - Types of errors detected

### Data Security
- All data is transmitted securely through HTTPS
- API keys are used only to authenticate requests
- No personal information is required beyond the API key


🔗 **Register for an API Key:** [Longdo Console](https://map.longdo.com/console/) (It's free!)

## ภาษาไทย

## 🛠️ การติดตั้ง

### 1. ขอรับ API Key (ฟรี)

เพื่อใช้งาน Longdo Spell Checker คุณจำเป็นต้องมี API Key ซึ่งจะให้สิทธิ์ใช้งานฟรีสูงสุด **100,000 ครั้งต่อเดือน**  

🔗 **สมัครใช้งานฟรี** ได้ที่ [Longdo Account](https://map.longdo.com/console/)  
![LongdoConsole](https://raw.githubusercontent.com/MetamediaTechnology/vscode-longdo-spell-checker/refs/heads/main/docs/setup_3.png)

> โดยปกติแล้วหากไม่ตั้งค่า API KEY ท่านสามารถใช้งานได้ฟรี โดยจะนับการใช้งานรวมกับบุคคลอื่น

### 2. ตั้งค่า API Key

เลือกวิธีใดวิธีหนึ่งในการตั้งค่าต่อไปนี้:

#### **วิธีที่ 1: ตั้งค่าผ่าน VS Code Settings**

1. เปิด **VS Code Settings**  
   - **Windows/Linux:** `File > Preferences > Settings`  
   - **MacOS:** `Code > Preferences > Settings`
2. ค้นหาคำว่า **"Longdo Spell Checker"**
3. กรอก **API Key** ของคุณ

![Settings](https://raw.githubusercontent.com/MetamediaTechnology/vscode-longdo-spell-checker/refs/heads/main/docs/setup_1.png)

#### **วิธีที่ 2: ตั้งค่าผ่าน `settings.json`**

1. เปิดไฟล์ **settings.json**  
   - **Windows/Linux:** `File > Preferences > Settings` > คลิกที่ปุ่ม `{}` มุมขวาบน  
   - **MacOS:** `Code > Preferences > Settings` > คลิกที่ปุ่ม `{}` มุมขวาบน
2. เพิ่มค่าดังนี้ลงไปในไฟล์:
   ```json
   "longdo-spell-checker.apiKey": "YOUR_API_KEY"
    ```

---

## ✨ วิธีใช้งาน

### ✅ **ใช้งานผ่าน UI**

หลังติดตั้งแล้ว จะมี **Longdo Spell** แสดงอยู่ที่ **แถบสถานะด้านล่างขวา**

- คลิกเพื่อเลือกตัวเลือก เช่น **ตรวจคำสะกดในแท็บปัจจุบัน** หรือ **ล้างข้อผิดพลาดทั้งหมด**

### 🎯 **ใช้งานผ่านคำสั่ง**

1. เปิด **Command Palette**  
   - **Windows/Linux:** `Ctrl + Shift + P`  
   - **MacOS:** `Cmd + Shift + P`
2. พิมพ์และเลือกคำสั่งต่อไปนี้:  
   - `Longdo Spell Checker: Check Spelling (Current Tab)` → ตรวจคำสะกด  
   - `Clear All Errors (Current Tab)` → ล้างข้อเสนอแนะทั้งหมด

## 💡 ฟีเจอร์ที่รองรับ

✅ **ตรวจคำสะกดภาษาไทย พร้อมคำแนะนำ**  
✅ **แก้ไขคำผิดแบบรวดเร็ว (Quick fix)**  
✅ **รองรับหลายประเภทไฟล์**  

---

## 🌏 ภาษาที่รองรับ

| ภาษา        | ระดับการรองรับ                  |
| ----------- | ------------------------------ |
| 🇹🇭 ภาษาไทย  | รองรับทุกนามสกุลไฟล์            |
| 🇬🇧 ภาษาอังกฤษ | JSON, Markdown, JavaScript |

---

## 📜 เงื่อนไขการใช้งาน

ส่วนขยายนี้ **จำเป็นต้องใช้ API Key** เพราะการตรวจคำสะกดจะดำเนินการบนเซิร์ฟเวอร์

- **ฟรี:** ใช้งานได้ 100,000 ครั้ง/เดือน  
- **ข้อจำกัดของข้อความ:** ถ้าข้อความเกิน **1,024 ตัวอักษร** จะถูกแบ่งเป็นหลายคำขอ (request)

📌 ตัวอย่าง:

- ข้อความยาว **1,025 ตัวอักษร** = **2 คำขอ**  
- ข้อความยาว **5,000 ตัวอักษร** = **5 คำขอ**

🔗 **สมัครขอ API Key:** [Longdo Console](https://map.longdo.com/console/) (ฟรี!)

## 🔒 ความเป็นส่วนตัว

### การประมวลผลข้อมูล
- การตรวจสอบข้อความทั้งหมดดำเนินการบนเซิร์ฟเวอร์ของ [Longdo](https://longdo.com/)
- ในการตรวจสอบคำผิดในชุดคำสั่งจะไม่เก็บเนื้อหาข้อความไว้
- ข้อความจะถูกใช้เพื่อวัตถุประสงค์ในการตรวจสอบการสะกดเท่านั้น

### การเก็บรวบรวมข้อมูล
- เก็บสถิติการใช้งานแบบไม่ระบุตัวตนเพื่อปรับปรุงบริการ
- ข้อมูลนี้รวมถึง:
   - จำนวนคำขอ
   - ขนาดของเนื้อหาที่ตรวจสอบ

### ความปลอดภัยของข้อมูล
- ข้อมูลทั้งหมดถูกส่งผ่าน HTTPS ซึ่งมีความปลอดภัย
- API key ใช้เพื่อยืนยันคำขอเท่านั้น
- ไม่มีนโยบายหรือเก็บหรือต้องใช้ข้อมูลส่วนบุคคลใด ๆ นอกเหนือจาก API key

