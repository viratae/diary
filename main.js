// Class for diary (as a whole)
class Diary {
    constructor() {
        this.entries = [];
    }
    addEntry(entry) {
        this.entries.push(entry);
    }
}
const myDiary = new Diary();

// Class for entries
class Entry {
    constructor(dateInput, titleInput, descriptionInput) {
        this.dateInput = dateInput;
        this.titleInput = titleInput;
        this.descriptionInput = descriptionInput;
    }
}
// IIFE to control form
const form = (function formController() {
    const entryForm = document.querySelector('#entryForm');
    const modal = document.querySelector('#modal');
    const addNewButton = document.querySelector('#addNewButton');
    const closeModal = document.querySelector('#closeModal');
    addNewButton.addEventListener('click', () => {
        modal.classList.add('show');
    });
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });
    entryForm.addEventListener('submit', e => {
        e.preventDefault();
        const dateInput = document.querySelector('#dateInput').value;
        const titleInput = document.querySelector('#titleInput').value;
        const descriptionInput = document.querySelector('#descriptionInput').value;

        const newEntry = new Entry(dateInput, titleInput, descriptionInput);
        myDiary.addEntry(newEntry);
        console.log(myDiary);
        modal.classList.remove('show');
        entryForm.reset();
    });
    return { 

    }
})();
