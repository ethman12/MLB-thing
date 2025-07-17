
document.getElementById('fileInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (file) {
    const img = new Image();
    img.onload = async () => {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const { data: { text } } = await Tesseract.recognize(canvas, 'eng', {
        logger: m => console.log(m)
      });
      document.getElementById('cardInfo').innerText = text.trim() || "No text detected.";
    };
    img.src = URL.createObjectURL(file);
  }
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
