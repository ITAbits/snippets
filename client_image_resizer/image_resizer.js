function ImageResizer() {
    let image;
    let image_base64;
    let scale_factor;

    function load(base64, callback) {
        image = new Image();
        image_base64 = base64;
        scale_factor = 1;
        image.onload = () => {
            if (callback) {
                callback();
            }
        }
        image.src = base64;
    }
    function scale(factor) {
        scale_factor *= factor;
    }
    function clamp(maxWidth, maxHeight) {
        scale(Math.min(1, maxWidth / (image.width * scale_factor), maxHeight / (image.height * scale_factor)));
    }
    function toBase64() {
        if (scale_factor == 1) {
            return image_base64;
        }

        function scaleImage(image, factor) {
            let canvas = document.createElement("canvas");
            canvas.width = image.width * factor;
            canvas.height = image.height * factor;
            let g = canvas.getContext("2d");
            g.drawImage(image, 0, 0, canvas.width, canvas.height);
            return canvas;
        }
        
        let current_image = image;
        let current_scale_factor = scale_factor;

        while (current_scale_factor < 0.5) {
            current_image = scaleImage(current_image, 0.5);
            current_scale_factor *= 2;
        }
        current_image = scaleImage(current_image, current_scale_factor);

        let base64 = current_image.toDataURL();
        console.log(base64);
        return base64;
    }

    return { load, scale, clamp, toBase64 };
}