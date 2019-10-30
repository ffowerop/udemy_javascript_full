class Options {
    /// height, width, bg, fontSize, textAlign
    constructor(height, width, bg, fontSize, textAlign) {
        this._height = height;
        this._width = width;
        this._bg = bg;
        this._fontSize = fontSize;
        this._textAlign = textAlign;
    }

    get height() {
        return this._height;
    }

    set height(height) {
        this._height = height;
    }

    get width() {
        return this._width;
    }

    set width(width) {
        this._width = width;
    }

    get bg() {
        return this._bg;
    }

    set bg(bg) {
        this._bg = bg;
    }

    get fontSize() {
        return this._fontSize;
    }

    set fontSize(fontSize) {
        this._fontSize = fontSize;
    }

    get textAlign() {
        return this._textAlign;
    }

    set textAlign(textAlign) {
        this._textAlign = textAlign;
    }

    appendDiv(text, parent) {
        let div = document.createElement('div');
        div.style.height = this._height;
        div.style.width = this._width;
        div.style.background = this._bg;
        div.style.fontSize = this._fontSize;
        div.style.textAlign = this._textAlign;
        div.textContent = text;
        parent.appendChild(div);
        return div;
    }
}

let div = new Options('400px', '800px', 'grey', '40pt', 'center');
div.appendDiv('Bla Bla Bla', document.body);