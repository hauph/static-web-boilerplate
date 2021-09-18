/* eslint-disable no-use-before-define */

export const retain = () => {
  const model = {
    init() {
      if (!localStorage.notes) {
        localStorage.notes = JSON.stringify([]);
      }
    },
    add(obj) {
      const data = JSON.parse(localStorage.notes);
      data.push(obj);
      localStorage.notes = JSON.stringify(data);
    },
    getAllNotes() {
      return JSON.parse(localStorage.notes);
    },
  };

  const view = {
    init() {
      this.noteList = $('#notes');
      const newNoteForm = $('#new-note-form');
      const newNoteContent = $('#new-note-content');
      newNoteForm.submit((e) => {
        octopus.addNewNote(newNoteContent.val());
        newNoteContent.val('');
        e.preventDefault();
      });
      view.render();
    },
    render() {
      let htmlStr = '';
      octopus.getNotes().forEach((note) => {
        htmlStr += `<li class="note">
          <p class="note-date">${new Date(note.date)}</p>
          <br />${note.content}
        </li>`;
      });
      this.noteList.html(htmlStr);
    },
  };

  const octopus = {
    addNewNote(noteStr) {
      model.add({
        content: noteStr,
        date: Date.now(),
      });
      view.render();
    },

    getNotes() {
      return model.getAllNotes();
    },

    init() {
      model.init();
      view.init();
    },
  };

  octopus.init();
};
