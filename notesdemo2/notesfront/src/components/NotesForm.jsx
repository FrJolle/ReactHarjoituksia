import { useState } from "react";

const NotesForm = ({submitHandler}) => {
    const [newNote, setNewNote] = useState("");
    const [newImportance, setNewImportance] = useState(false);
    return(
        <form onSubmit={e=> submitHandler(e, newNote, newImportance)}>
            Muistiinpano:
            <input onChange={e=>setNewNote(e.target.value)} 
                   name="note" 
                   value={newNote} 
                   type="text" />
                           

            <input onChange={e=>setNewImportance(!newImportance)} 
                   type="checkbox" 
                   name="importance" 
                   checked={newImportance}/>
            <input type="submit" value="tallenna" />
        </form>
    )
}

export default NotesForm;