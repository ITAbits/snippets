// callbacks: { success, error, progress }
function upload(url, params, callbacks) {
    let formData = new FormData();
    for (let field in params) {
        formData.append(field, params[field]);
    }
    let http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.onload = () => {
        if (http.status === 200) {
            if (callbacks.success) {
                callbacks.success(http.responseText);
            }
        } else {
            if (callbacks.error) {
                callbacks.error(http.responseText);
            }
        }
    }
    http.upload.onprogress = (e) => {
        if (e.lengthComputable) {
            if (callbacks.progress && e.total > 0) {
                callbacks.progress(e.loaded / e.total);
            }
        }
    }
    http.onerror = () => {
        if (callbacks.error) {
            callbacks.error(http.responseText);
        }
    }
    http.send(formData);
}