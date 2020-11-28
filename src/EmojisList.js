import React, {Component} from "react";
import Button from 'react-bootstrap/Button';
import {emojiDetailsList} from "./EmojiDetailsList";

class EmojisList extends Component {

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCopy = this.handleCopy.bind(this);
        this.state = {
            shownItemsList: emojiDetailsList
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="search-box">
                    <input name="search" className="form-control" onChange={this.handleSearch}/>
                </div>
                <ul className="list-group">
                    {/*create a line for each emojiDetails object in the list*/}
                    {this.state.shownItemsList.map(emojiDetails => (
                        <li className="list-group-item">
                            {/*Show the emoji itself, and then its name in words*/}
                            {emojiDetails.emoji} {emojiDetails.name}
                            {/*Copy button*/}
                            <Button variant="outline-dark" className="copy-button"
                                    onClick={() => this.handleCopy(emojiDetails.emoji)}>Copy</Button>
                        </li>

                    ))}
                </ul>

            </React.Fragment>
        );
    }

    /**
     * Filter the emojis shown  in accordance with the user's search.
     * Update the list in the state so the list shown to the user will be updated.
     * @param e the React event of changing the text in the search-box.
     */
    handleSearch(e) {
        //searchTerm is the text the user typed in the search-box
        let searchTerm = e.target.value;
        //Get all the emojis that their description contains the search term
        let emojis_filtered = emojiDetailsList.filter(value => (value["tags"].some(s => s.includes(searchTerm))));
        this.setState({shownItemsList: emojis_filtered});

    }

    /**
     * Copy an emoji to the clipboard (as if the user copied it using ctrl-c)
     * @param emoji  - the emoji to copy to the clipboard
     */
    handleCopy(emoji) {
        navigator.clipboard.writeText(emoji);
    }

}

export default EmojisList;
