document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notes-list');
    const titleInput = document.getElementById('title');
    const contentInput = document.getElementById('content');
    const colorInput = document.getElementById('color');
    const pinInput = document.getElementById('pin');
    const addNoteButton = document.getElementById('add-note');

   
    const getNotes = () => {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    };

    
    const saveNotes = (notes) => {
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    
    const renderNotes = () => {
        const notes = getNotes();
        notesList.innerHTML = '';

        const pinnedNotes = notes.filter(note => note.pin);
        const unpinnedNotes = notes.filter(note => !note.pin);

        [...pinnedNotes, ...unpinnedNotes].forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.style.backgroundColor = note.color;

            noteElement.innerHTML = `
                <div class="note-title">${note.title}</div>
                <div class="note-content">${note.content}</div>
                <div class="note-date">Utworzono: ${new Date(note.date).toLocaleString()}</div>
                <div class="note-buttons">
                    <button class="edit-note" data-index="${index}">Edytuj</button>
                    <button class="delete-note" data-index="${index}">Usuń</button>
                </div>
            `;

            noteElement.querySelector('.edit-note').addEventListener('click', () => {
                editNote(index);
            });

          
            noteElement.querySelector('.delete-note').addEventListener('click', () => {
                deleteNote(index);
            });

            notesList.appendChild(noteElement);
        });
    };

    const addNote = () => {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        const color = colorInput.value;
        const pin = pinInput.checked;

        if (title === '' || content === '') {
            alert('Tytuł i treść są wymagane!');
            return;
        }

        const newNote = {
            title,
            content,
            color,
            pin,
            date: new Date().toISOString()
        };

        const notes = getNotes();
        notes.push(newNote);
        saveNotes(notes);
        renderNotes();

        titleInput.value = '';
        contentInput.value = '';
        colorInput.value = '#ffffff';
        pinInput.checked = false;
    };

    const editNote = (index) => {
        const notes = getNotes();
        const note = notes[index];

      
        titleInput.value = note.title;
        contentInput.value = note.content;
        colorInput.value = note.color;
        pinInput.checked = note.pin;

       
        deleteNote(index);
    };

    const deleteNote = (index) => {
        const notes = getNotes();
        notes.splice(index, 1);
        saveNotes(notes);
        renderNotes();
    };

  
    addNoteButton.addEventListener('click', addNote);

    
    renderNotes();
});

