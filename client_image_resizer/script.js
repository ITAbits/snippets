const fileImage = document.getElementById("fileImage");
const btnResize = document.getElementById("btnResize");
const imgBefore = document.getElementById("imgBefore");
const imgAfter = document.getElementById("imgAfter");

btnResize.addEventListener("click", (e) => {
    e.preventDefault();

    if (!fileImage.files || !fileImage.files[0]) {
        return alert("Please select an image file.");
    }
    let reader = new FileReader();
    reader.onload = () => {
        imgBefore.src = reader.result;
        let image = new Image();
        let resizer = ImageResizer();
        resizer.load(reader.result, () => {
            resizer.clamp(500, 500);
            imgAfter.src = resizer.toBase64();
        });
    };
    reader.readAsDataURL(fileImage.files[0]);
});