// toggler function for list items
function toggler(index) {
    var details = document.getElementById("details_" + index);
    details.classList.toggle("show");
    var minus = document.getElementById("minus_" + index);
    minus.classList.toggle("show");
    var plus = document.getElementById("plus_" + index);
    plus.classList.toggle("hide");
};

// toggler function for create list item form
function toggleCreate() {
    var createForm = document.getElementById("create_task");
    createForm.classList.toggle("show");
    var togglerButton = document.getElementById("plus-minus");
    togglerButton.classList.toggle("fa-minus");
    togglerButton.classList.toggle("fa-plus");
};