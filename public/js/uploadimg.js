const submitBtn = document.getElementById('submitBtn');
const fileInput = document.getElementById('fileInput');
const gallery = document.getElementById('gallery');

var myWidget = cloudinary.createUploadWidget({
    cloudName: 'my_cloud_name', 
    uploadPreset: 'my_preset'}, (error, result) => { 
      if (!error && result && result.event === "success") { 
        console.log('Done! Here is the image info: ', result.info); 
      }
    }
  )
  
  document.getElementById("upload_widget").addEventListener("click", function(){
      myWidget.open();
    }, false);


submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('submitting');
    const files = [...fileInput.files];
    files.forEach(files => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            uploadImage(reader.result)
        };
        reader.onerror = () => {
            console.error('Invalid');
        };
    }
    )
});

const uploadImage = async (base64EncodedImage) => {
    try {
        const res = await fetch('/.netlify/functions/upload', {
            method: 'POST',
            body: base64EncodedImage
        })
    } catch (err) {
        console.error(err);
    }
}

fileInput.addEventListener('change', () => {
    const files = fileInput.files;
    handleFiles(files);
});
const handleFiles = () => {
    gallery.innerHTML = '';
    const copiedFiles = [...files]
    copiedFiles.forEach(previewFiles)
}


const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (data) => {
        console.log('Finished loading');
        const img = document.createElement('img');
        img.width = 300;
        img.src = reader.result;
        gallery.appendChild(img);

    }

}

