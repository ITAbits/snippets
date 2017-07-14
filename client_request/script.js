const fileInput = document.getElementById("fileInput");
const btnSend = document.getElementById("btnSend");

btnSend.addEventListener("click", (e) => {
    upload("http://localhost:8000/upload", { abacaxi: "banana", file: fileInput.files[0] }, (data) => {
        console.log(data);
    });
});