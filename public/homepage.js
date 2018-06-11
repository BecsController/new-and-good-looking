window.onload = function () {
    document.addEventListener("keydown", function (evt) {
        if (evt.keyCode == 13) {
            evt.preventDefault;
            window.location = "/fight";
        }
    })
}