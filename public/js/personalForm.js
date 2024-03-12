const img_input = document.getElementById('img-input');
img_input.addEventListener('change', (e) =>
  doSomethingWithFiles(e.target.files),
);

function displayImage(event) {
  const input = event.target;
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const imagePreview = document.getElementById('imagePreview');
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(input.files[0]); // Read the image as a data URL
  }
}
//js for done btn
