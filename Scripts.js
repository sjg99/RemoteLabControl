const DeviceRaspberry = "http://192.168.1.11:8000";
const CameraRaspberry = "http://192.168.1.9:8081";

$(document).ready(function () {
    SetCameraStraming();
});

function SetCameraStraming() {
    document.getElementById("CameraStreaming").src = CameraRaspberry;
}
$('#ShowConductivePaperWindow').click(function () {
    $('.WindowBack').fadeIn(100);
    $('.MainContainer, footer').css('filter', 'blur(2px)');
    $('.ConductivePaperWindow').css('display', 'block');
});
$('html').click(function () {
    setTimeout(function () {
        $('.WindowBack').fadeOut(100);
        $('.MainContainer, footer').css('filter', 'blur(0px)');
        $('.ConductivePaperWindow').css('display', 'none');
    }, 1);
});
$('.Window,.ConductivePaperWindow').click(function (e) {
    e.stopPropagation();
});

function set_pos(id) {
    try {
        document.getElementsByClassName("esf_click")[0].classList.remove('esf_click');
        document.getElementsByClassName("ln_click")[0].classList.remove('ln_click');
        document.getElementsByClassName("ln_click")[0].classList.remove('ln_click');
    } catch (error) {

    }

    let esf = document.getElementById(id).children[0];
    let ln1 = document.getElementById(id).children[1].children[0];
    let ln2 = document.getElementById(id).children[1].children[1];

    if (ln1.classList.contains("str3") && ln2.classList.contains("str3") && esf.classList.contains("fil0")) {
        esf.classList.add("esf_click");
        ln1.classList.add("ln_click");
        ln2.classList.add("ln_click");
    }
    console.log(id);
    var coords = id.split("-");
    var url = DeviceRaspberry + '/set_position';
    var model = {
        x_pos: parseInt(coords[0]),
        y_pos: parseInt(coords[1])
    };
    $('.AjaxLoading').fadeIn(50);
    $('html').click();
    var request = $.ajax({
        url: url,
        method: "POST",
        data: model,
        dataType: "json"
    });
    request.done(function () {
        console.log("Done");
        $('.AjaxLoading').fadeOut(50);
    });
    request.fail(function () {
        alert("Error en la conexion con el dispositivo");
        $('.AjaxLoading').fadeOut(50);
    });
}

function set_color(id) {
    let esf = document.getElementById(id).children[0];
    let ln1 = document.getElementById(id).children[1].children[0];
    let ln2 = document.getElementById(id).children[1].children[1];
    if (ln1.classList.contains("str3") && ln2.classList.contains("str3") && esf.classList.contains("fil0")) {
        esf.classList.add("esf_hover");
        ln1.classList.add("ln_hover");
        ln2.classList.add("ln_hover");
    }
}

function remove_color(id) {
    let esf = document.getElementById(id).children[0];
    let ln1 = document.getElementById(id).children[1].children[0];
    let ln2 = document.getElementById(id).children[1].children[1];
    esf.classList.remove('esf_hover');
    ln1.classList.remove('ln_hover');
    ln2.classList.remove('ln_hover');
}
$('#SaveLabNotes').click(function () {
    var LabNotes = document.getElementById("LabNotes").value;
    if (LabNotes.trim() != "") {
        var data = new Blob([LabNotes], {
            type: 'text/plain'
        });
        var textFile = window.URL.createObjectURL(data);
        var a = document.createElement('a');
        a.download = "ApuntesLaboratorio.txt";
        a.href = textFile;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } 
    else {
        alert("No ha registrado apuntes");
    }
});