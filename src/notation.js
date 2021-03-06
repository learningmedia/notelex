import Vex from "vexflow";

var vexFlow = Vex.Flow;
var noteNames = ["c", "c#", "d", "eb", "e", "f", "f#", "g", "g#", "a", "bb", "b"];

function createNoteRenderer(canvas) {

    function renderNotesAsScale(staveNotes) {
        var vexFlowStaveNotes = [],
            staveNote,
            i;

        for (i = 0; i < staveNotes.length; i++) {
            staveNote = new vexFlow.StaveNote({ keys: [staveNotes[i].noteName + "/" + staveNotes[i].octave], duration: "w" });
            if (staveNotes[i].accidental) {
                staveNote = staveNote.addAccidental(0, new vexFlow.Accidental(staveNotes[i].accidental));
            }
            vexFlowStaveNotes.push(staveNote);
        }

        return vexFlowStaveNotes;
    }

    function renderNotesAsChord(staveNotes) {
        var staveNote,
            i,
            staveNoteKeys = staveNotes.map(function(x) {
                return x.noteName + "/" + x.octave;
            });

        staveNote = new vexFlow.StaveNote({ keys: staveNoteKeys, duration: "w" });
        for (i = 0; i < staveNotes.length; i++) {
            if (staveNotes[i].accidental) {
                staveNote = staveNote.addAccidental(i, new vexFlow.Accidental(staveNotes[i].accidental));
            }
        }

        return [staveNote];
    }

    function createStaveNotes(keys) {
        var staveNotes = [],
            staveNote,
            noteName,
            previousNoteName,
            previousOctave,
            octave,
            key,
            mod,
            i,
            hasRootNoteCollisions = false;

        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            mod = key % 12;
            noteName = noteNames[mod];
            octave = (key - mod) / 12;
            staveNote = { noteName: noteName, octave: octave, accidental: null };

            if (noteName.length === 2) {
                staveNote.accidental = noteName[1];
            }

            if (typeof previousNoteName !== "undefined" && previousNoteName[0] === noteName[0]) {
                hasRootNoteCollisions = true;
                if (noteName.length === 1 && previousOctave === octave) {
                    staveNote.accidental = "n";
                }
            }

            staveNotes.push(staveNote);
            previousNoteName = noteName;
            previousOctave = octave;
        }

        if (hasRootNoteCollisions || staveNotes.length > 7) {
            return renderNotesAsScale(staveNotes);
        } else {
            return renderNotesAsChord(staveNotes);
        }
    }

    return {
        renderKeys: function(keys) {
            var renderer = new vexFlow.Renderer(canvas, vexFlow.Renderer.Backends.CANVAS);
            var ctx = renderer.getContext();
            ctx.clear();

            var stave = new vexFlow.Stave(0, 0, canvas.width - 2); // Subtract 2 to ensure we see the bar line at the end...
            stave.addClef("treble").setContext(ctx).draw();

            if (keys.length === 0) {
                return;
            }

            // Create the notes
            var notes = createStaveNotes(keys);

            // Create a voice
            var voice = new vexFlow.Voice({
                "num_beats": notes.length,
                "beat_value": 1,
                "resolution": vexFlow.RESOLUTION
            });

            // Add notes to voice
            voice.addTickables(notes);

            // Format and justify the notes
            new vexFlow.Formatter().joinVoices([voice]).format([voice], canvas.width - 40);

            // Render voice
            voice.draw(ctx, stave);
        }
    };
}

export default { createNoteRenderer };
