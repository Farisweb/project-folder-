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
          // Draw square photo in top-left placeholder (approx. 140x140 px starting at 40, 40)
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(40, 40, 200, 200, 20); // rounded square
          ctx.clip();
          ctx.drawImage(uploadedImg, 40, 40, 200, 200);
          ctx.restore();

          // Draw name below image (adjust if needed)
          ctx.font = 'bold 30px Arial';
          ctx.fillStyle = '#000000';
          ctx.textAlign = 'left';
          ctx.fillText(userName, 40, 270);

          showDownloadAndShare();
        };
      };
      reader.readAsDataURL(imageUpload);
    } else {
      ctx.font = 'bold 30px Arial';
      ctx.fillStyle = '#000000';
      ctx.fillText(userName, 40, 270);
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
