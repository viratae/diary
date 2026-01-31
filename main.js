// Class for diary (as a whole)
class Diary {
    constructor() {
        this.entries = [];
    }
    addEntry(entry) {
        this.entries.push(entry);
    }
    removeEntryByID(id) {
        this.entries = this.entries.filter(function(entry) {
            return entry.id != id;
        })
    }
}
const myDiary = new Diary();

// Class for entries
class Entry {
    constructor(dateInput, titleInput, descriptionInput) {
        this.dateInput = dateInput;
        this.titleInput = titleInput;
        this.descriptionInput = descriptionInput;
        this.id = crypto.randomUUID();
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
        screen.render(myDiary);
    });
    return { 

    }
})();
// IIFE to handle the screen
const screen = (function screenController() {
    const recentEntriesCardSection = document.querySelector('#recentEntriesCardSection');
    const entryTemplate = document.querySelector('#entryTemplate');
    function render(diary) {
        recentEntriesCardSection.innerHTML = '';
        for (const entry of diary.entries) {
            const clone = entryTemplate.content.cloneNode(true);
            clone.querySelector(".date").textContent = entry.dateInput;
            clone.querySelector(".title").textContent = entry.titleInput;
            clone.querySelector(".description").textContent = entry.descriptionInput;
            const deleteButton = clone.querySelector(".deleteButton")
            deleteButton.addEventListener("click", () => {
                myDiary.removeEntryByID(entry.id);
                render(myDiary);
            });
            recentEntriesCardSection.appendChild(clone);

        }
    }
    return { 
        render,
    }
})();

// Adds initial entries and renders upon opening
const starterEntry1 = new Entry("1-1-2026", "Lorem Ipsum", "A beautiful desciption of a beautiful (or not so beautiful) day");
myDiary.addEntry(starterEntry1);
const starterEntry2 = new Entry("1-2-2026", "New Year, New Me", "My New Year's resolutions are already off to a great start!");
myDiary.addEntry(starterEntry2);
screen.render(myDiary);