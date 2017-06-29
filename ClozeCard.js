function ClozeCard(text, cloze){
    if(this instanceof ClozeCard){
        this.text = text;
        this.cloze = cloze;
    } else {
        return new ClozeCard(text, cloze)
    }
}

ClozeCard.prototype.partialText = function(){
    return this.text.replace(this.cloze, "...");
}

ClozeCard.prototype.fullText = function(){
    return this.text;
}

ClozeCard.prototype.clozeExist = function(){
    if(!this.text.includes(this.cloze)){
        throw "the cloze value does not exist in the full text";
    }
}