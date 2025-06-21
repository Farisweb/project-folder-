function generatePoster() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const userName = document.getElementById('userName').value;
  const imageUpload = document.getElementById('imageUpload').files[0];

  const template = new Image();
  template.src = 'template.png';

  template.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(template, 0, 0, canvas.width, canvas.height);

    if (imageUpload) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const uploadedImg = new Image();
        uploadedImg.src = event.target.result;

        uploadedImg.onload = function() {
          // 💡 Position image exactly inside the white square (left: 68px, top: 90px, size: 200x250)
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(68, 90, 180, 180, 30); // same corner radius as in image
          ctx.clip();
          ctx.drawImage(uploadedImg, 68, 90, 180, 180);
          ctx.restore();

          // 📝 Position the name text below the image (centered under image)
          ctx.font = 'bold 28px sans-serif';
          ctx.fillStyle = '#000';
          ctx.textAlign = 'center';
          ctx.fillText(userName, 68 + 90, 290); // center X = 68 + half width

          showDownloadAndShare();
        };
      };
      reader.readAsDataURL(imageUpload);
    } else {
      ctx.font = 'bold 28px sans-serif';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.fillText(userName, 68 + 90, 290);
      showDownloadAndShare();
    }
  };
}

function showDownloadAndShare() {
  const canvas = document.getElementById('canvas');
  const downloadLink = document.getElementById('downloadLink');
  const shareLink = document.getElementById('shareLink');

  const imageData = canvas.toDataURL('image/png');
  downloadLink.href = imageData;
  downloadLink.style.display = 'inline-block';

  const whatsappURL = `https://wa.me/?text=Check%20out%20my%20ALNOOR%20Poster!%20Download:%20${encodeURIComponent(imageData)}`;
  shareLink.href = whatsappURL;
  shareLink.textContent = 'Share on WhatsApp';
  shareLink.style.display = 'inline-block';
}
