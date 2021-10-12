function toggler(index) {
    var details = document.getElementById("details_" + index);
    details.classList.toggle("show");
    var minus = document.getElementById("minus_" + index);
    minus.classList.toggle("show");
    var plus = document.getElementById("plus_" + index);
    plus.classList.toggle("hide");
};
