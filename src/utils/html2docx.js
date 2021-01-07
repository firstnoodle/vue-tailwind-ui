
export default htmlString => {
    const parsedHtml = new DOMParser().parseFromString(htmlString, 'text/html');
    const htmlObject = walkTree(parsedHtml.body);
    console.log(htmlObject.children);

    // const walker = parsedHtml.createTreeWalker(parsedHtml.body, NodeFilter.SHOW_ELEMENT, null, false);
    // let node = walker.nextNode();
    // while(node) {
    //     console.log(node);
    //     node = walker.nextNode();
    // }
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


// const renderNode = node => {
//     if(node.nodeName === 'P') {
//         return new Paragraph();
//     }
//     if(node.nodeName === '#text') {
//         return new TextRun(node.data);
//     }
//     if(node.nodeName === 'UL') {
//         return new Paragraph({ text: 'testing '});
//     }
//     if(node.nodeName === 'LI') {
//         return new TextRun(node.data)
//     }
//     return null;
// }
