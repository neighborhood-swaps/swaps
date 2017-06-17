// much of the contents in the file comes from
// https://github.com/flyingsparx/NodeDirectUploader.git


$(document).ready(function() {

    function uploadFile(file, signedRequest, url) {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', signedRequest);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // document.getElementById('preview').src = url;
                    // document.getElementById('avatar-url').value = url;
                    console.log("Uploaded File");
                } else {
                    alert('Could not upload file.');
                }
            }
        };
        xhr.send(file);
    }

    function getSignedRequest(file) {
        console.log("In Sign");
        // var n = Date.now();
        // var filename = n + file.name
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log("success" + file.name)
                    const response = JSON.parse(xhr.responseText);
                    uploadFile(file, response.signedRequest, response.url);
                    console.log(response);
                    $("#my-file-selector").attr("value", response.url);
                } else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    }

    function initUpload() {

        const files = document.getElementById('my-file-selector').files;
        const file = files[0];
        if (file == null) {
            return alert('No file selected.');
        } else {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#preview').attr('src', e.target.result);
            }
            reader.readAsDataURL(file);
        }
        console.log("getting Signed");
        getSignedRequest(file);
    }

    // document.getElementById("my-file-selector").onchange = function() {
    //     var reader = new FileReader();

    //     reader.onload = function(e) {
    //         // get loaded data and render thumbnail.
    //         document.getElementById("preview").src = e.target.result;
    //     };

    //     // read the image file as a data URL.
    //     reader.readAsDataURL(this.files[0]);
    // };

    (() => {
        document.getElementById('my-file-selector').onchange = initUpload;
    })();

});