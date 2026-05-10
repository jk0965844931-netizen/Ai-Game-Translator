async function processImage() {
const input = document.getElementById('imageInput');
if (!input.files[0]) return;
document.getElementById('loading').classList.remove('hidden');
document.getElementById('resultArea').classList.add('hidden');

const image = input.files[0];

try {
    // ส่วนที่ 1: อ่านข้อความจากรูปภาพ (OCR)
    const result = await Tesseract.recognize(image, 'jpn+eng');
    const detectedText = result.data.text;

    if (!detectedText || detectedText.trim() === "") {
        alert("❌ ไม่พบข้อความในรูปภาพ กรุณาลองรูปอื่นครับ");
        document.getElementById('loading').classList.add('hidden');
        return;
    }
    document.getElementById('originalText').innerText = detectedText;

    // ส่วนที่ 2: ส่งไปแปลเป็นภาษาไทย
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(detectedText)}&langpair=ja|th`);
    const data = await response.json();
    const translatedText = data.responseData.translatedText;

    document.getElementById('translatedText').innerText = translatedText;
    document.getElementById('resultArea').classList.remove('hidden');
} catch (error) {
    console.error(error);
    alert("เกิดข้อผิดพลาด: " + error);
} finally {
  
    document.getElementById('loading')classList.add('hidden');
}
