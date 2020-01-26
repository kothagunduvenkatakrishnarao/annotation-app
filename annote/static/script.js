img=new Image();
function readURL(input){
    if(input.files && input.files[0]){
        var reader =  new FileReader();

        reader.onload = function(e){
            img.src=e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}
$('#file_input').change(function(){
    readURL(this);
});
console.log("ready");

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!(/^http:.*/.test(settings.url) || /^https:.*/.test(settings.url))) {
            // Only send the token to relative URLs i.e. locally.
            xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        }
    }
});

var canvas = document.getElementById("canvas"),
context = canvas.getContext("2d");
//document.body.appendChild(img);
var width=0;
var height=0;
// var filename = document.getElementById("filenameid").value;
// var liscencenumber = document.getElementById("linumid").value;
img.onload = () => {
    canvas.width=img.width;
    canvas.height=img.height;
    context.drawImage(img,0,0);
}


var canvasx = $(canvas).offset().left;
var canvasy = $(canvas).offset().top;
var last_mousex = last_mousey = 0;
var mousex = mousey = 0;
var mousedown = false;
var finalx=0;
var finaly=0;
//Mousedown
$(canvas).on('mousedown', function(e) {
    
    last_mousex = parseInt(e.clientX-canvasx);
    last_mousey = parseInt(e.clientY-canvasy);
    console.log("startx" + last_mousex);
    console.log("starty" + last_mousey);
    mousedown = true;
    
});

//Mouseup
$(canvas).on('mouseup', function(e) {
    mousedown = false;
    finalx=parseInt(e.clientX-canvasx);
    finaly=parseInt(e.clientY-canvasy);
    console.log("finalx" + finalx);
    console.log("finaly" + finaly);
    context.beginPath();
    width=finalx-last_mousex;
    height=finaly-last_mousey;
    context.rect(last_mousex,last_mousey,width,height);
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.stroke();
    
    
});
$(canvas).on('mousemove', function(e) {
    mousex = parseInt(e.clientX-canvasx);
	mousey = parseInt(e.clientY-canvasy);
    if(mousedown) {
        context.drawImage(img,0,0);
        context.beginPath();
        var width = mousex-last_mousex;
        var height = mousey-last_mousey;
        context.rect(last_mousex,last_mousey,width,height);
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.stroke();
    }
});

function submit_annotation(){
        
        var liscencenumber=document.getElementById("liscensenumber").value;
        var company = document.getElementById("company").value;
        var carmodel = document.getElementById("carmodel").value;
        var color = document.getElementById("colour").value;
        console.log(company);
        var data_dic={};
        data_dic['x1']=last_mousex;
        data_dic['y1']=last_mousey;
        data_dic['x2']=width;
        data_dic['y2']=height;
        var json_data= JSON.stringify(data_dic);
        var file = $('#file_input')[0].files[0];
        var formdata= new FormData();
        formdata.append('image',file);
        formdata.append('LisenceNumber',liscencenumber);
        formdata.append('company',company);
        formdata.append('carmodel',carmodel);
        formdata.append('colour',color);
        formdata.append('annotes',json_data);
        // var data1={
        //     'liscencenumber':liscencenumber,
        //     'company' : company,
        //     'carmodel' :carmodel,
        //     'color' : color,
        //     'json_data':JSON.stringify(data_dic),
        //     //'csrfmiddlewaretoken': '{{ csrf_token }}',
        // }
        console.log(formdata);
        $.ajax({
            type:"POST",
            url:'annotate',
            datatype:"json",
            data:formdata,
            // data:JSON.stringify(data1),
            //dataType: "text;charset=utf-8",
            contentType: false, 
            processData: false,
            success:function(){
            alert("sent to server");}
        });
}