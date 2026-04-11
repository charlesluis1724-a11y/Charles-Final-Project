// LINK: https://www.youtube.com/watch?v=CQmvRni563g&list=PLXAhCH9FJ8zViqdqhsSP7iyCrVDoUGb3P&index=6

const root = document.documentElement;


const fretboard = document.querySelector('.fretboard');
// this is option for other Instruments
const selectedInstrumentSelector = document.querySelector('#instrument-selector');
const accidentalSelector = document.querySelector('.accidental-selector');
const numberOfFretsSelector = document.querySelector('#number-of-frets');
const showAllnNotesSelector = document.querySelector('#show-all-notes');
const showMultipleNoteSelector = document.querySelector('#show-multiple-notes');

let allNotes;
let showMultipleNotes;


let numberOfFrets = 20;


const singleFretMarkPosition = [3, 5, 7, 9, 15, 17, 19, 21];
const doubleFretMarkPosition = [12, 24];

const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B",];
const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",];

let accidentals = 'Flats';
// const guitarTuning = [4, 11, 7, 2, 9, 4]

// this is option for other Instruments
const instrumentTuningPresets = {
    'Guitar': [4, 11, 7, 2, 9, 4],
    'Bass (4 Strings)': [7, 2, 9, 4],
    'Bass (5 Strings)': [7, 2, 9, 4, 11],
    'Ukelele': [9, 4, 0, 7]
};

let selectedInstrument = 'Guitar';

let numberOfStrings = instrumentTuningPresets[selectedInstrument].length;


const app = {
    init() {
        this.setupFretboard();
// this is option for other Instruments
        this.setupSelectedInstrumentSelector();

        this.setupEventListeners();
    },
    setupFretboard() {
        fretboard.innerHTML = '';
        root.style.setProperty('--number-of-strings', numberOfStrings); 
        // add strings to fretboard
        for (let i = 0; i < numberOfStrings; i++) {
            let string = tools.createElement('div');
            string.classList.add('string');
            fretboard.appendChild(string);
            // console.log('string numbers:', i)
                // create frets
                for (let fret = 0; fret <= numberOfFrets; fret++) {
                    let noteFret = tools.createElement('div');
                    noteFret.classList.add('note-fret');
                    string.appendChild(noteFret);

                    let noteName = this.generateNoteNames((fret + instrumentTuningPresets[selectedInstrument][i]), accidentals);
                    // console.log('Note name', noteName)
                    noteFret.setAttribute('data-note', noteName)

                    // add single fretmarks
                    if (i === 0 && singleFretMarkPosition.indexOf(fret) !== -1) {
                        noteFret.classList.add('single-fretmarks');
                    }
                    
                    // add double fretmarks
                    if (i === 0 && doubleFretMarkPosition.indexOf(fret) !== -1) {
                        let doubleFretMark = tools.createElement('div');
                        doubleFretMark.classList.add('double-fret');
                        noteFret.appendChild(doubleFretMark);
                    }
                }
        }
        allNotes = document.querySelectorAll('.note-fret');
    },
    generateNoteNames(noteIndex, accidentals) {
        noteIndex = noteIndex % 12;
        let noteName;
        if (accidentals === 'Flats') {
            noteName = notesFlat[noteIndex];
        } else if (accidentals === 'Sharp') {
            noteName = notesSharp[noteIndex];
        }
            return noteName;
    },
// this is option for other Instruments
    setupSelectedInstrumentSelector() {
        for (instrument in instrumentTuningPresets) {
            let instrumentOption = tools.createElement('option', instrument);
            selectedInstrumentSelector.appendChild(instrumentOption);
        }
    },
    shownoteDot (event) {
        if (event.target.classList.contains('note-fret')) {
            if (showMultipleNotes) {
                app.toggleMultipleNotes(event.target.dataset.note, 1)
            } else {
                event.target.style.setProperty('--noteDotOpacity', 1);
            }
                
            }
    },
    hideNoteDot (event) {
        if (showMultipleNotes) {
            app.toggleMultipleNotes(event.target.dataset.note, 0)
        } else {
            event.target.style.setProperty('--noteDotOpacity', 0);
        }
            event.target.style.setProperty('--noteDotOpacity', 0);
    },

    setupEventListeners() {
        fretboard.addEventListener('mouseover', this.shownoteDot);
        fretboard.addEventListener('mouseout', this.hideNoteDot);
// this is option for other Instruments
        selectedInstrumentSelector.addEventListener('change', (event) => {
            selectedInstrument = event.target.value;
            numberOfStrings = instrumentTuningPresets[selectedInstrument].length;
            this.setupFretboard(); 
        });

        accidentalSelector.addEventListener('click', (event) => {
            if (event.target.classList.contains('acc-select')) {
                accidentals = event.target.value;
                this.setupFretboard();
            } else {
                return;
            }
        });
        numberOfFretsSelector.addEventListener('change', () => {
            numberOfFrets = numberOfFretsSelector.value;
            this.setupFretboard(); 
        });
        showAllnNotesSelector.addEventListener('change', () => {
            if (showAllnNotesSelector.checked) {
                root.style.setProperty('--noteDotOpacity', 1);
                fretboard.removeEventListener('mouseover', this.shownoteDot);
                fretboard.removeEventListener('mouseout', this.hideNoteDot);
                this.setupFretboard();
            } else {
                root.style.setProperty('--noteDotOpacity', 0);
                fretboard.addEventListener('mouseover', this.shownoteDot);
                fretboard.addEventListener('mouseout', this.hideNoteDot);
                this.setupFretboard();
            }
        });
        showMultipleNoteSelector.addEventListener('change', () => {
            showMultipleNotes = !showMultipleNotes;
        });
    },
    toggleMultipleNotes(noteName, opacity) {
        
        for (let i = 0; i < allNotes.length; i++) {
            if (allNotes[i].dataset.note === noteName) {
                allNotes[i].style.setProperty('--noteDotOpacity', opacity);
            }
        }
    }
}



const tools = {
    createElement(element, content) {
        element = document.createElement(element);
        if (arguments.length > 1) {
            element.innerHTML = content;
        }
        return element;    
    }
}

app.init();