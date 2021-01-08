// import { Document, Footer, Header, Packer, Paragraph } from "docx";
// import { saveAs } from 'file-saver';

// export const exportRequirements = requirements => {

//     const doc = new Document({ styles });

//     const title = new Paragraph({
//         style: "heading",
//         text: "Requirements",
//     });
    
//     const newLine = new Paragraph({ style: "body" });

//     doc.addSection({
//         children: [
//             title, 
//             newLine,
//             ...requirements.map(requirement => {
//                 return new Paragraph({
//                     style: "body",
//                     text: requirement.description
//                 });
//             })
//         ]
//     });

//     Packer.toBlob(doc).then(blob => {
//         saveAs(blob, "requirements.docx");
//     });
// }
