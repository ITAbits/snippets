const fileInput = document.getElementById("fileInput");
const btnSend = document.getElementById("btnSend");

btnSend.addEventListener("click", (e) => {
    // file: { name, size, type }
    // file.name - file name with extension
    // file.type - mime type
    // file.size - size in bytes
    let file = fileInput.files[0];
    upload("http://localhost:8000/upload", { abacaxi: "banana", file: file }, (data) => {
        console.log(data);
    });
});
