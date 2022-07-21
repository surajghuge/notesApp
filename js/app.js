console.log("hello this is working");


let addBtn = document.getElementById('addBtn');
showNotes();
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    let addTitle = document.getElementById("addTitle");

    if (notes == null) {
        notesObj = [];
    }

    else {
        notesObj = JSON.parse(notes);
    }

    let myobj = {
        title : addTitle.value,
        text : addTxt.value
    }

    notesObj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    console.log(notesObj)
    showNotes();
})


function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                      <div class="card-body">
                          <h5 class="card-title">Note ${index + 1}</h5>
                          <h4>${element.title}</h4>
                          <p class="card-text"> ${element.text}</p>
                          <button id="${index}" onClick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                      </div>
                  </div>`;
        
    });

    let notesElm = document.getElementById("notes")

    if (notesObj.length != 0){
        notesElm.innerHTML = html;
    }else{
        notesElm.innerHTML =  `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

//Delete function


function deleteNote(index) {

    console.log('im deleting node')

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }else {
        notesObj = JSON.parse(notes);
    }
    
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    
}

//Seraching

let searchTxt = document.getElementById('searchTxt');

searchTxt.addEventListener('input', function () {

    let inputVal = searchTxt.value;
   // console.log(inputVal)
    
   let noteCard = document.getElementsByClassName('noteCard');

   Array.from(noteCard).forEach(function(element){
    let cardTxt = element.getElementsByTagName('p')[0].innerText;
    //console.log(cardTxt)

    if(cardTxt.includes(inputVal)){
        element.style.display = "block";
    }
    else{
        element.style.display = "none";
    }
   })
})

