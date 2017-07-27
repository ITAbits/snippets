// callbacks: { success, error, progress }
function upload(url, params, callbacks) {
    function tryJSONParse(string) {
        try {
            return JSON.parse(string);
        } catch (err) {
            console.log(err);
        }
        return string;
    }

    let formData = new FormData();
    for (let field in params) {
        formData.append(field, params[field]);
    }
    let http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.onload = () => {
        if (http.status === 200) {
            if (callbacks.success) {
                callbacks.success(tryJSONParse(http.responseText));
            }
        } else {
            if (callbacks.error) {
                callbacks.error(tryJSONParse(http.responseText));
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
            callbacks.error(tryJSONParse(http.responseText));
        }
    }
    http.send(formData);
}