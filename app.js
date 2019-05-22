//INITIALIZE
const title = document.querySelector('#note-title');
const content = document.querySelector('#note-content');
const notes = document.querySelector('#all-notes');
const color = document.getElementById('color');
const selecttag = document.getElementById('selecttag');
const tag = document.querySelector('#tag');
const mytags = document.querySelector('#my-tags');
// const mytags = document.querySelector('#my-tags');


//EVENT LISTENERS

notes.addEventListener('click', deleteNote);
mytags.addEventListener('click', deleteTag);
mytags.addEventListener('click', filter);
document.addEventListener('DOMContentLoaded', displayTags);
document.addEventListener('DOMContentLoaded', displayNotes);
//ADD A NOTE
document.querySelector('#add-note').addEventListener('click', function () {
  addNewNote(title.value, content.value, color.value, selecttag.value);
});
//ADD TAG
tag.addEventListener('submit', addTag);


//FUNCTIONS
//STORE IN LOCAL STORAGE
function storeInLS(title, content, color, tag) {
  let notes;
  if (localStorage.getItem('notes') === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem('notes'));
  }
  let note = {
    title: title,
    content: content,
    tag: tag,
    color: color
  }
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
}

function storeTag(tag) {
  let tags = '';
  if (localStorage.getItem('tags') === null) {
    tags = [];
  } else {
    tags = JSON.parse(localStorage.getItem('tags'));
  }
  // console.log(tag);
  tags.push(tag);
  localStorage.setItem('tags', JSON.stringify(tags));
}

//DISPLAY
function displayTags() {
  let tags = '';
  if (localStorage.getItem('tags') === null) {
    tags = [];
  } else {
    tags = JSON.parse(localStorage.getItem('tags'));
  }
  let tagx = '',
    tagsel = '<option value="" disabled selected>Choose tag</option>';
  tags.forEach(function (tag) {
    tagx += `    
      <a class="collection-item">
      <span>${tag}</span>
      <span class="right">
          <i class="fa fa-times delete-tag"></i>
      </span>
      </a>`;

    tagsel += `<option value="${tag}">${tag}</option>`;
    console.log(tagsel);
  })
  document.querySelector('#selecttag').innerHTML = tagsel;
  mytags.innerHTML = tagx;
}

function displayNotes() {
  if (localStorage.getItem('notes') === null) {
    notesdisp = [];
  } else {
    notesdisp = JSON.parse(localStorage.getItem('notes'));
  }
  let newNote = '';
  notesdisp.forEach(function (note) {
    newNote += `
    <div class="notes col s12 m6 l4">
      <div class="card ${note.color}">
      <div class="card-content">
          <span class="card-title note-title">${note.title}</span>
          <p id="content">${note.content}</p>
      </div>
      <div class="card-action note-content no-padding" >
          <a style="color: #616161" class="delete-note waves-effect waves-dark btn-flat  "><i class="fa fa-trash-alt"></i></a>
          <span class="btn-flat right tag">${note.tag}</span>
      </div>
      </div>
      </div>
    `;
  });

  notes.innerHTML = newNote;

}

//ADD WITH UI
function addTag(e) {
  const tagContent = document.querySelector('#tag-content');
  console.log(tagContent.value);
  let newTag;

  if (mytags == null) {
    newTag = '';
  } else {
    newTag = mytags.innerHTML;
  }
  newTag += `
    <a class="collection-item">
    <span>${tagContent.value}</span>
    <span class="right">
        <i class="fa fa-times delete-tag"></i>
    </span>
    </a>
    `;

  mytags.innerHTML = newTag;
  storeTag(tagContent.value);
  displayTags();
  tagContent.value = '';


  e.preventDefault();
}

function addNewNote(title, content, color, tag) {
  let newNote;
  // let selColor = color.options[e.selectedIndex].value;
  if (title === '' || content === '') {
    console.log('Walang laman');
  } else {
    if (notes == null) {
      newNote = '';
    } else {
      newNote = notes.innerHTML;
    }

    newNote += `
    <div class="notes col s12 m6 l4">
      <div class="card ${color}">
      <div class="card-content">
          <span class="card-title note-title">${title}</span>
          <p id="content">${content}</p>
      </div>
      <div class="card-action note-content no-padding" >
          <a style="color: #616161" class="delete-note waves-effect waves-dark btn-flat  "><i class="fa fa-trash-alt"></i></a>
          <span class="btn-flat right tag">${tag}</span>
      </div>
      </div>
      </div>
    `;

    // console.log(selColor);
    notes.innerHTML = newNote;
    storeInLS(title, content, color, tag);
    clearInput();
  }


}

function clearInput() {
  title.value = '';
  content.value = '';
}

//DELETE FROM UI 
function deleteNote(e) {
  if (e.target.parentElement.classList.contains('delete-note')) {
    console.log();

    e.target.parentElement.parentElement.parentElement.parentElement.remove();
  }

  removeFromLS(e.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild);
  e.preventDefault();
}

function deleteTag(e) {
  if (e.target.classList.contains('delete-tag')) {
    console.log(e.target.parentElement.parentElement.parentElement);
    removeTagFromLS(e.target.parentElement.previousElementSibling);
    e.target.parentElement.parentElement.remove();
  }
  e.preventDefault();
}

//REMOVE FROM LOCAL STORAGE
function removeFromLS(noteItem) {
  let notes;
  if (localStorage.getItem('notes') === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem('notes'));
  }
  notes.forEach(function (note, index) {

    if (noteItem.textContent === note.title) {
      notes.splice(index, 1);

    }
  });

  localStorage.setItem('notes', JSON.stringify(notes));
}

function removeTagFromLS(tagItem) {
  //DELETE NOTES ASSOCIATED TO TAGS
  let tags;
  if (localStorage.getItem('tags') === null) {
    tags = [];
  } else {
    tags = JSON.parse(localStorage.getItem('tags'));
  }

  tags.forEach(function (tag, index) {
    let notes;
    if (localStorage.getItem('notes') === null) {
      notes = [];
    } else {
      notes = JSON.parse(localStorage.getItem('notes'));
    }
    notes.forEach(function (note, index) {
      if (tagItem.textContent === note.tag) {
        notes.splice(index, 1);
      }
    });

    notes.forEach(function (note, index) {
      if (tagItem.textContent === note.tag) {
        notes.splice(index, 1);
      }
    });
    localStorage.setItem('notes', JSON.stringify(notes));

    //DELETE TAG
    if (tagItem.textContent === tag) {
      tags.splice(index, 1);
    }
  });

  localStorage.setItem('tags', JSON.stringify(tags));
  displayNotes();
  displayTags();


}

//FILTER 
function filter(e) {
  document.querySelectorAll('.notes').forEach(function (note) {
    const notetag = note.querySelector('.tag').textContent;
    if (notetag.toLowerCase().indexOf(e.target.querySelector('span').textContent.toLowerCase()) != -1) {

      note.style.display = 'block';
    } else {
      note.style.display = 'none';
    }
  });
}