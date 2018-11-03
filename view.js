var dataContainer = document.getElementById("dataContainer");
var datas = JSON.parse(localStorage.getItem("userData"));
var heading = document.getElementById("heading");
var detail = document.getElementById("detail");
var save = document.getElementById("addForm");
var globalId;
var counter = -1;
if (datas.length !== 0) {
    for (data of datas) {
        counter++;
        dataContainer.innerHTML += `
        <div class="col-md-4">
        <div>
        <h1>${data.heading}</h1>
        <p>${data.detail}</p>
        <div class="btn-container">
        <button class="btn btn-success" id="${counter}" data-toggle="modal" onclick="edit(id)" data-target="#editModal">Edit</button>
        <button class="btn btn-primary" id="${counter}" onclick="del(id)">Delete</button>
        </div>
        </div>
        </div>
        `;
    }
} else {
    dataContainer.innerHTML = `
    <div class="col">
    <h1 class="display-1 text-center"> No record Found</h1>
    </div>
    `;
}
function del(id) {
    datas.splice(Number(id), 1);
    localStorage.setItem("userData", JSON.stringify(datas));
    location.href = location.href;
}
function edit(id) {
    globalId = Number(id);
    heading.value = datas[globalId].heading;
    detail.value = datas[globalId].detail
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
        var data = {
            heading: heading.value,
            detail: detail.value
        }
        datas.splice(globalId, 1);
        datas.unshift(data);
        localStorage.setItem("userData", JSON.stringify(datas));
        console.log("hello");
        location.href = location.href;
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