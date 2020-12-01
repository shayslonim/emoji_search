import React, {/*Component,*/ useState} from "react";
import Button from 'react-bootstrap/Button';
import {EmojiDetails, emojiDetailsList} from "./EmojiDetailsList";

/**
 * The EmojiList component shows the list of emojis and the search bar above it
 */
function EmojisList() {
    //shownItemsList is a list of the emojis shown to the user
    const [shownItemsList, setShownItemsList] = useState(emojiDetailsList);
    return (
        <React.Fragment>
            <div className="search-box">
                <input name="search" className="form-control" onChange={e => handleSearch(e, setShownItemsList)}/>
            </div>
            <ul className="list-group">
                {/*create a line for each emojiDetails object in the list*/}
                {shownItemsList.map(emojiDetails => (
                    <li className="list-group-item">
                        {/*Show the emoji itself, and then its name in words*/}
                        {emojiDetails.emoji} {emojiDetails.name}
                        {/*Copy button*/}
                        <Button variant="outline-dark" className="copy-button"
                                onClick={() => handleCopy(emojiDetails.emoji)}>Copy</Button>
                    </li>
                ))}
            </ul>

        </React.Fragment>
    );
}


/**
 * Copy an emoji to the clipboard (as if the user copied it using ctrl-c)
 * @param emoji  - the emoji to copy to the clipboard
 */
function handleCopy(emoji: string) {
    navigator.clipboard.writeText(emoji);
}

/**
 * Filter the emojis shown  in accordance with the user's search.
 * Update the list in the state so the list shown to the user will be updated.
 * @param e - the React event of changing the text in the search-box.
 * @param setShownItemsList - the function that updates the shownItemsList
 */
function handleSearch(e: React.ChangeEvent<HTMLInputElement>,
                      setShownItemsList: React.Dispatch<React.SetStateAction<EmojiDetails[]>>) {
    //searchTerm is the text the user typed in the search-box
    let searchTerm = e.target.value;
    //Get all the emojis that their description contains the search term
    let emojis_filtered = emojiDetailsList.filter(value => (value["tags"].some(s => s.includes(searchTerm))));
    setShownItemsList(emojis_filtered);
}

export default EmojisList;
