const form = document.querySelector('#postForm')
form.addEventListener('submit',uploadPost);
async function uploadPost(e){
    e.preventDefault();
    const imageInput=document.querySelector('#imageInput');
    const captionInput=document.querySelector('#caption');
    const imagedata=imageInput.files[0];
    const formData = new FormData();
    formData.append('description',captionInput.value)
    formData.append('image',imagedata)
    try{
        const response = await axios.post('/post',formData)
        console.log(response.post)
        alert('Post Uploaded')
    }
    catch(e){
        alert('Upload Failed')
    }
    console.log(formData)
    form.reset()
}