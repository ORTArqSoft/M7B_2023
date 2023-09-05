const filterDocumentsByCriteria = (documents, criteria) => {
  return documents.filter((document) => {
    return criteria(document);
  });
};

const transformDocument = (document) => {
  document.modified = true;
  return document;
};

const processDocuments = (documents, filters) => {
  for (const filter of filters) {
    documents = filter(documents);
  }
  return documents;
};

//Ejemplo
const inputDocuments = [
  { id: 1, name: "Documento 1", value: 100 },
  { id: 2, name: "Documento 2", value: 200 },
  { id: 3, name: "Documento 3", value: 300 },
];

const filterCriteria = (document) => {
  return document.value > 150;
};

const filters = [filterDocumentsByCriteria, transformDocument];

const outputDocuments = processDocuments(inputDocuments, filters);

console.log(outputDocuments);
