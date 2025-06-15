const uploadBox = document.getElementById('uploadBox');
const fileInput = document.getElementById('images');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');

uploadBox.addEventListener('click', function () {
  fileInput.click();
});

fileInput.addEventListener('change', () => {
   // clear previous previews

  Array.from(fileInput.files).forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const previewBox = document.createElement('div');
      previewBox.className = 'image-preview';

      const img = document.createElement('img');
      img.src = e.target.result;

      const cancelBtn = document.createElement('button');
      cancelBtn.innerHTML = '&times;';
      cancelBtn.title = 'Remove image';

      cancelBtn.onclick = () => {
        previewBox.remove();
        // You may choose to mark files for removal in a separate array if needed
      };

      previewBox.appendChild(img);
      previewBox.appendChild(cancelBtn);
      imagePreviewContainer.appendChild(previewBox);
    };

    reader.readAsDataURL(file);
  });
});

