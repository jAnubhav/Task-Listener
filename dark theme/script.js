let notes = localStorage.getItem("notes");
let notesObj = [];
if (notes != null) {
    notesObj = JSON.parse(notes);
}
let index = notesObj.length;

let createNote = (content, num) => {
    let card = document.createElement('div');
    card.id = `card-${num}`;
    card.innerHTML = `
    <div class="card"
        <h3>Note ${num}</h3>
        <p>${content}</p>
        <div class="btn-box">
            <button class="success" onclick="editNote('${num}')">Update</button>
            <button class="alert" onclick="deleteNote(${num})">Delete</button>
        </div>
    </div>
    `;
    document.getElementById("text").style.display = "none";
    document.getElementById("notes").append(card);
}

let displayNotes = () => {
    notesObj.forEach((element, index) => {
        createNote(element, index + 1);
    })
}

let addNote = () => {
    let content = document.getElementById("content");
    let text = content.value;
    if (text != "") {
        notesObj.push(text);
        localStorage.setItem("notes", JSON.stringify(notesObj));
        index++;
        createNote(text, index);
        content.value = "";
    } else {
        alert("Write something in the note box");
    }
}

let deleteNote = (num) => {
    let note = document.getElementById(`card-${num}`);
    notesObj.splice(notesObj.indexOf(note.querySelector('p').innerText), 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    note.remove();
    index--;
    if (index == 0) {
        document.getElementById("text").style.display = "block";
    }
}

let editNote = (num) => {
    let content = document.getElementById(`card-${num}`).querySelector('p').innerText;
    document.getElementById("pop-up").style.display = "flex";
    document.getElementById("original").value = content;
    document.getElementById("edit-text").value = content;
}

let updateNote = () => {
    let oldText = document.getElementById("original").value;
    let newText = document.getElementById("edit-text").value;
    let cardIndex = notesObj.indexOf(oldText);
    notesObj[cardIndex] = newText;
    document.getElementById("notes").querySelectorAll("p")[cardIndex].innerText = newText;
    localStorage.setItem("notes", JSON.stringify(notesObj));
    document.getElementById("pop-up").style.display = "none";
}