import { defineStore } from 'pinia'
import { alphabetizeByProperty } from "@writetome51/alphabetize-by-property";


const BASE_API_URL = 'http://localhost:4000/api'
// const BASE_API_URL = 'https://webulegal.com/api';

export const useLibraryStore = defineStore({
  id: 'library',
  state: () => ({
    libraryDocuments: [],
    libraryFolders: [],
    libraryTags: []
  }),
  getters: {

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
        fetch(BASE_API_URL + "/library/get/documents", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            this.libraryDocuments = data
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
        fetch(BASE_API_URL + "/library/get/folders", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            this.libraryFolders = data
            resolve(data)
          });
      })
    },
    loadTags(auth) {
      return new Promise((resolve, reject) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth: auth,
          }),
        };
        fetch(BASE_API_URL + "/library/get/tags", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.empty) {
              this.loadingTags = false;
              this.itemsTags = [];
              this.libraryTags = data
              return;
            }
            if (data.error == true) {
            } else {
              alphabetizeByProperty("data.title", data);
              this.libraryTags = data;
              this.loadingTags = false;
              resolve(data)
            }
          });
      })
    }
  }
})
