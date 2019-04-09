// code for upload image to server and add img patch in mongoDB
  document.querySelector('.upload_img').addEventListener('submit',uploadImg)
  function uploadImg(e){
    e.preventDefault()
    const url = `${window.location.href.split("/")[window.location.href.split("/").length-1]}`
    const files = document.querySelector('[type=file]').files
    const formData = new FormData()
    let fileName = new Headers
    fileName.append("fileName",encodeURI(document.getElementById("fileSelect").value.split("\\")[document.getElementById("fileSelect").value.split("\\").length-1]))
    for (let i = 0; i < files.length; i++) {
      let file = files[i]
  
      formData.append('files[]', file)
    }
    fetch(url, {
      method: 'POST',
      headers:fileName ,
      body: formData,
    }).then(response => {
      // document.getElementsByClassName("btn btn-primary d-none")[0].click()
      console.log(response)
      console.log(response)
    })
  }