// scroll to top
$(document).ready(function () {
    var scrollTop = $(".scrollTop");
    $(window).scroll(function () {
        var topPos = $(this).scrollTop();
        if (topPos > 100) {
            $(scrollTop).css("opacity", "1");
        } else {
            $(scrollTop).css("opacity", "0");
        }
    });
    $(scrollTop).click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
});


$(document).ready(function () {
    $('.delete-note').on('click', function (e) {
        if (confirm("Delete?")){
        $target = $(e.target);
        const id = $target.attr('data-id');

        $.ajax({
            type: 'DELETE',
            url: '/notes/' + id,
            success: function (response) {

                window.location.href = '/';
            },
            error: function (err) {
                console.error(err);
            }
        });
    }});
});

$(".note").each(function (index) {
    $(this).attr("id", 'card' + index);
});
$(".to-do").each(function (index) {
    $(this).attr("id", 'todo' + index);
});


//-----------------
//delete todo

$('.delete-todo').on('click', function (e) {
    if (confirm("Delete?")){
    $target = $(e.target);
    const id = $target.attr('data-id');

    $.ajax({
        type: 'DELETE',
        url: '/todos/' + id,
        success: function (response) {

            window.location.href = '/';
        },
        error: function (err) {
            console.error(err);
        }
    });
}});

//add todo new version

$('#addNewTodo').on('click', async function (e) {
    e.preventDefault();
    const todoList = [];
    const elems = document.getElementsByClassName('listItem');
    await [].forEach.call(elems, element => {
        let listItem = {};
        if (element.style[0] !== "display") {
            listItem.text = element.innerText;
            if (element.className == "checked listItem" || element.className == "listItem checked") {
                listItem.checked = true;
            } else {
                listItem.checked = false;
            }
            todoList.push(listItem);
        }
    });
    let body = {
        title: $('#todoTitle').val(),
        body: todoList
    };
    if (body.title == "" || body.body.length == 0) {
        document.getElementById("openModal").click()
    } else {
        fetch('/todos/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(function (response) {
            if (response.ok) {
                window.location.href = '/';
            }
        }).catch(function (error) {
            console.log('There has been some problem: ' + error.message);
        });
    }
});

  // edit todo title

  $('.todo-title').on('click',  function () {
    $(this).removeAttr( "readonly")
  });

  //update todolist 

  $('#exitAndUpdateTodo').on('click', async function (e) {
    e.preventDefault();
    const todoList = [];
    const elems = document.getElementsByClassName('listItem');
    await [].forEach.call(elems, element => {
        let listItem = {};
        if (element.style[0] !== "display") {
            listItem.text = element.innerText;
            if (element.className == "checked listItem" || element.className == "listItem checked") {
                listItem.checked = true;
            } else {
                listItem.checked = false;
            }
            todoList.push(listItem);
        }
    });
    await todoList.sort((elementA,elementB)=>elementA.checked-elementB.checked)
    let body = {
        id: $('#inputId').val(),
        title: $('.todo-title').val(),
        body: todoList
    };

    if (body.body.length == 0) {
        document.getElementById("openModal").click()
    } else {
        fetch('/todos/edit/' + body.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(function (response) {
            if (response.ok) {
                window.location.href = '/';
            }
        }).catch(function (error) {
            console.log('There has been some problem: ' + error.message);
        });
    }
});
//js for todoList 

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByClassName("listItem");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("I");
    span.className = "close fas fa-skull-crossbones";
    myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Add a "checked" symbol when clicking on a list item

if (~window.location.href.split("/").indexOf("todos")){
var list = document.getElementById('myUL');
list.addEventListener('click', function (ev) {
if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
}
}, false);
var addBtn = document.querySelector('.addBtn');
addBtn.addEventListener('click', newElement);
myInput.addEventListener('keypress', function (e) {
 var key = e.which || e.keyCode;
 if (key === 13) { newElement()
 }
});
}
// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    li.className = 'listItem';
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
        document.getElementById("openModal").click();
    } else {
        document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";

    var span = document.createElement("I");
    span.className = "close fas fa-skull-crossbones";
    li.appendChild(span);
    var close = document.getElementsByClassName("close");
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}
if(window.location.pathname==="/"){
    $(".top-links").toggleClass("d-none")
}
function scrollToAnchor(aid){
    var aTag = $("#"+aid);
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}
$("#linktodo").click(function() {
    scrollToAnchor('todo_block');
 });
 $("#linknote").click(function() {
    scrollToAnchor('notes_block');
 });
 // Ninja code section by Mixail =)
 function checkFields (){

    if ([].reduce.call(document.getElementsByClassName("form-control"),function (acc,element) {
        return element.nodeName=="SPAN"||element.placeholder ? acc : element.value==""||element.innerText?false:acc},true)&&(typeof todoTitle == "undefined" || todoTitle.value!=""))
    {
        (typeof fileSelect == "undefined"|| fileSelect.value =="") ?  document.getElementsByClassName("btn btn-primary d-none")[0].click() :fileForm.dispatchEvent(new Event("submit"));
    }else{  document.getElementById("openModal").click()}
 }
 if (window.location.pathname!="/")submit.addEventListener("click",checkFields)