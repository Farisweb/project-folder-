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
          // 📍 Draw image: 200x250 at X=68, Y=90
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(68, 90, 200, 250, 30); // rounded corners
          ctx.clip();
          ctx.drawImage(uploadedImg, 68, 90, 200, 250);
          ctx.restore();

          // 📝 Draw name below the image (centered)
          ctx.font = 'bold 28px sans-serif';
          ctx.fillStyle = '#000';
          ctx.textAlign = 'center';
          ctx.fillText(userName, 68 + 100, 360); // center X = 68 + 100
          
          showDownloadAndShare();
        };
      };
      reader.readAsDataURL(imageUpload);
    } else {
      ctx.font = 'bold 28px sans-serif';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.fillText(userName, 68 + 100, 360);
      showDownloadAndShare();
    }
  };
}
