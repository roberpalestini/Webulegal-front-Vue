import { defineStore } from 'pinia'

const BASE_API_URL = 'http://localhost:4000/api'
// const BASE_API_URL = 'https://webulegal.com/api';

export const useWritingStore = defineStore({
  id: 'writings',
  state: () => ({
    documents: [],
    document: null,
    activeDocumentId: null
  }),
  getters: {
    fixerEditMode: (state) => state.documents.map(document => ({
      ...document,
      _ext: {
        edit_title: false,
        edit_description: false,
      }
    }))
  },
  actions: {
    compartirPrivado(email, documentId) {
      return new Promise((resolve, reject) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            documentId
          })
        };
        fetch(BASE_API_URL + "/writings/share/private", requestOptions)
          .then(response => response.json())
          .then(() => {
            resolve(true)
          })
      })
    },
    loadAllDocuments(auth) {
      return new Promise((resolve, reject) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth,
          }),
        };
        fetch(BASE_API_URL + "/writings/get/documents", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            this.documents = data
            resolve(true)
          });
      })
    },
    loadFolders(auth) {
      return new Promise((resolve, reject) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth,
          }),
        };
        fetch(BASE_API_URL + "/writings/get/folders", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            resolve(data)
          });
      })
    },
    searchDocuments(auth, target) {
      return new Promise((resolve, reject) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth: auth,
            target: target,
          }),
        };
        fetch(BASE_API_URL + "/writings/search", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            this.documents = data;
            resolve(true)
          });
      })
    },
    loadDocument(auth, id) {
      return new Promise((resolve, reject) => {
        this.activeDocumentId = id
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth: auth,
            id: id,
          }),
        };
        fetch(BASE_API_URL + "/writings/get/document", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.code) {
              this.document = null;
              resolve(true);
            }
            if (data.empty) {
              this.document = null;
              resolve(true);
            }
            if (!data.error) {
              this.document = data;
              resolve(true);
            }
          });
      })
    },
  }
})
