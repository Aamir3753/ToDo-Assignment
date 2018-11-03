
var back = document.getElementById("backToHome");
var heading = document.getElementById("heading");
var detail = document.getElementById("detail");
var save = document.getElementById("addForm");
var headingError = document.getElementById("headingError");
var detailError = document.getElementById("detailError");
var datas = [];
back.onclick = () => {
    location.href = "./index.html";
}
heading.onblur = headingValidation;
function headingValidation() {
    if (heading.validity.valueMissing) {
        headingError.style.display = "block";
        headingError.className = "text-danger";
        headingError.innerText = "Please enter a heading";
    } else {
        headingError.style.display = "none";
    }
}
detail.onblur = detailValidation;
function detailValidation() {
    if (detail.validity.valueMissing) {
        detailError.style.display = "block";
        detailError.className = "text-danger";
        detailError.innerText = "Please enter  some description";
    } else {
        detailError.style.display = "none";
    }
}
save.onsubmit = e => {
    e.preventDefault();
    if (save.checkValidity()) {
        if(localStorage.getItem("userData")){
            datas = JSON.parse(localStorage.getItem("userData"));
        }
        var data = {
            heading: heading.value,
            detail: detail.value
        }
        location.href = "./view.html";
        datas.unshift(data);
        localStorage.setItem("userData", JSON.stringify(datas));

    } else {
        if (heading.validity.valueMissing) {
            heading.focus();
            headingValidation();
        }
        else if (detail.validity.valueMissing) {
            detail.focus();
            detailValidation();
        }
    }

}

