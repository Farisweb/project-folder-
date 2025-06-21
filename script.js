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
          // Draw uploaded photo in the reserved area (customize dimensions)
          ctx.drawImage(uploadedImg, 100, 200, 300, 300);

          // Draw name text (customize position/font)
          ctx.font = 'bold 40px Arial';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(userName, 100, 600);

          showDownloadAndShare();
        };
      };
      reader.readAsDataURL(imageUpload);
    } else {
      // Only name entered
      ctx.font = 'bold 40px Arial';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(userName, 100, 600);
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

  const whatsappURL = `https://wa.me/?text=Check%20out%20my%20poster!%20Download%20here:%20${encodeURIComponent(imageData)}`;
  shareLink.href = whatsappURL;
  shareLink.textContent = 'Share on WhatsApp';
  shareLink.style.display = 'inline-block';
}
