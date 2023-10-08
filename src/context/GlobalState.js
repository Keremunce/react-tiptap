import { createContext, useState } from "react";
import {
    FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify,
    FormatBold, FormatColorText, FormatItalic, FormatUnderlined, FormatListBulleted,
    FormatListNumbered, FormatStrikethrough, Code, Superscript, Subscript, BorderColor, FormatQuote, Redo, Undo
} from '@mui/icons-material';
export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
    const [alignment, setAlignment] = useState('left');
    const [heading, setHeading] = useState('');
    const [selectedControls, setSelectedControls] = useState([]);

    const getSelectedText = () => {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            return range.cloneContents();
        }
        return null;
    };

    const handleProperty = (className) => {
        const selectedText = getSelectedText();
        if (!selectedText) return; // Eğer hiçbir şey seçili değilse, işlem yapma
        else {
            // Yoksa yeni bir span oluştur ve className'leri ekle
            const span = document.createElement('span');
            span.className = className;
            span.appendChild(selectedText);

            // Şimdi span'ı seçili metin aralığına ekleyelim
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0);
                console.log('====================================');
                console.log(range.nextElementsibling());
                console.log('====================================');
                range.deleteContents();
                range.insertNode(span);
            }
        }
    }




    const [properties, setProperties] = useState({
        headings: [
            { name: 'heading 1', function: () => handleProperty('text-5xl font-extrabold'), component: <p className="text-md font-extrabold">H1</p> },
            { name: 'heading 2', function: () => handleProperty('text-4xl font-bold'), component: <p className="text-md font-bold">H2</p> },
            { name: 'heading 3', function: () => handleProperty('text-3xl font-bold'), component: <p className="text-md font-bold">H3</p> },
            { name: 'heading 4', function: () => handleProperty('text-2xl font-bold'), component: <p className="text-md font-bold">H4</p> },
            { name: 'heading 5', function: () => handleProperty('text-xl font-bold'), component: <p className="text-md font-bold">H5</p> },
            { name: 'heading 6', function: () => handleProperty('text-lg font-medium'), component: <p className="text-md font-medium">H6</p> }
        ],
        paragraph: [
            { name: 'alignLeft', function: () => handleProperty('left'), component: <FormatAlignLeft></FormatAlignLeft> },
            { name: 'alignCenter', function: () => handleProperty('center'), component: <FormatAlignCenter></FormatAlignCenter> },
            { name: 'alignRight', function: () => handleProperty('right'), component: <FormatAlignRight></FormatAlignRight> },
            { name: 'alignJustify', function: () => handleProperty('justify'), component: <FormatAlignJustify></FormatAlignJustify> },
        ],
        controls: [
            { name: 'bold', function: () => handleProperty(), component: <FormatBold></FormatBold>, },
            { name: 'colorText', function: () => handleProperty(), component: <FormatColorText></FormatColorText>, },
            { name: 'italic', function: () => handleProperty(), component: <FormatItalic></FormatItalic>, },
            { name: 'underlined', function: () => handleProperty(), component: <FormatUnderlined></FormatUnderlined>, },
            { name: 'listBulleted', function: () => handleProperty(), component: <FormatListBulleted></FormatListBulleted>, },
            { name: 'listNumbered', function: () => handleProperty(), component: <FormatListNumbered></FormatListNumbered>, },
            { name: 'strikeThrough', function: () => handleProperty(), component: <FormatStrikethrough></FormatStrikethrough>, },
            { name: 'code', function: () => handleProperty(), component: <Code></Code>, },
            { name: 'superScript', function: () => handleProperty(), component: <Superscript></Superscript>, },
            { name: 'subScript', function: () => handleProperty(), component: <Subscript></Subscript>, },
            { name: 'borderColor', function: () => handleProperty(), component: <BorderColor></BorderColor>, },
            { name: 'quote', function: () => handleProperty(), component: <FormatQuote></FormatQuote>, },
            { name: 'undo', function: () => handleProperty(), component: <Undo></Undo>, },
            { name: 'redo', function: () => handleProperty(), component: <Redo></Redo>, },
        ]
    })
    const Data = {
        alignment, setAlignment, heading, setHeading,
        properties, setProperties,
        handleProperty, selectedControls, setSelectedControls

    }

    return (
        <GlobalContext.Provider value={Data}>
            {props.children}
        </GlobalContext.Provider>
    )
}