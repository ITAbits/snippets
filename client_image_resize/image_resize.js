function clampImage(base64, maxWidth, maxHeight, callback) {
    if (!callback) return new Error("Missing callback");

    function scaleImage(image, factor) {
        let canvas = document.createElement("canvas");
        let g = canvas.getContext("2d");
        canvas.width = image.width * factor;
        canvas.height = image.height * factor;
        g.drawImage(image, 0, 0, canvas.width, canvas.height);
        return canvas;
    }

    let image = new Image();
    image.onload = () => {
        let scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
        if (scale == 1) {
            callback(base64);
        } else {
            let current_image = image;
            let current_scale = scale;

            while (current_scale < 0.5) {
                current_image = scaleImage(current_image, 0.5);
                current_scale *= 2;
            }
            current_image = scaleImage(current_image, current_scale);

            callback(current_image.toDataURL());
        }
    };
    image.src = base64;
}