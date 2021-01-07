// import { Paragraph, TextRun } from "docx";
export default htmlString => {
    const parsedHtml = new DOMParser().parseFromString(htmlString, 'text/html');
    const htmlObject = walkTree(parsedHtml.body);
    
    for(const item of htmlObject.children) {
        console.log(item);
    }
};

const walkTree = rootNode => {
    const structure = {
        tag: rootNode.nodeName,
        data: rootNode.data,
        children: []
    };

    if(rootNode.hasChildNodes()) {
        for(const node of rootNode.childNodes) {
            structure.children.push(walkTree(node));
        }
    }
    return structure;
};


// const renderNode = item => {
//     if(item.tag === 'P') {
//         return new Paragraph();
//     }
//     if(item.tag === 'STRONG') {
//         return new TextRun(item.data);
//     }
//     if(item.tag === '#text') {
//         return new TextRun(item.data);
//     }
//     if(item.tag === 'UL') {
//         return new Paragraph({ text: 'testing '});
//     }
//     if(item.tag === 'LI') {
//         return new TextRun(item.data)
//     }
//     return null;
// }
