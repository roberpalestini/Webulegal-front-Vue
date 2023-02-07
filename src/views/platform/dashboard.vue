<style>
.activeMode {
  border-radius: 30px;
  font-weight: 600;
  padding: 4px;
  background: #2b44ff !important;
  color: white !important;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
<template>
  <navBar />

  <main>
    <div class="container-fluid">
      <div class="row">
        <div
          class="col-md-2"
          style="
            height: calc(100vh - 70px);
            overflow: hidden;
            overflow-y: auto;
            padding: 0;
          "
        >
          <columnLeft />
        </div>
        <div
          class="col-md-10 text-center"
          style="
            padding: 20px;
            border: 1px solid #e2e2e2;
            background: white;
            height: calc(100vh - 70px);
            overflow: hidden;
            overflow-y: auto;
            border-bottom: 1px solid #e5e5e5;
          "
        >
          <div class="row justify-content-center">
            <div class="col-md-6 text-center">
              <img src="@/assets/Logocompleto.svg" style="max-width: 300px" />
              <br /><br />

              <div class="d-flex justify-content-center">
                <ul
                  style="
                    list-style: none;
                    display: flex;
                    width: fit-content;
                    background: rgb(236 234 234 / 46%);
                    border-radius: 30px;
                    height: auto;
                    padding: 1px;
                  "
                >
                  <li>
                    <a
                      style="
                        border-radius: 30px;
                        font-weight: 600;
                        padding: 4px;
                        background: rgb(236 234 234 / 46%);
                        font-size: 14px;
                        padding-left: 10px;
                        padding-right: 10px;
                        cursor: pointer;
                      "
                      @click="
                        changeMode('document');
                        searchInput.holder =
                          'Buscar doctrina, jurisprudencia y legislación';
                      "
                      v-bind:class="{ activeMode: searchMode === 'document' }"
                      >Bibilioteca</a
                    >
                  </li>
                  <li>
                    <a
                      style="
                        border-radius: 30px;
                        font-weight: 600;
                        padding: 4px;
                        background: rgb(236 234 234 / 46%);
                        font-size: 14px;
                        padding-left: 10px;
                        padding-right: 10px;
                        cursor: pointer;
                      "
                      @click="
                        changeMode('writing');
                        searchInput.holder =
                          'Buscar modelos de escritos automatizados';
                      "
                      v-bind:class="{ activeMode: searchMode === 'writing' }"
                      >Escritos</a
                    >
                  </li>
                </ul>
              </div>

              <form style="position: relative" @submit.prevent="gotoSearch()">
                <div style="position: relative">
                  <input
                    type="text"
                    class="form-control imput-search input-search-dashboard"
                    @keyup="search"
                    v-model="searchInput.target"
                    :placeholder="searchInput.holder"
                  />

                  <img
                    src="@/assets/search(1).svg"
                    style="
                      width: 20px;
                      height: 20px;
                      margin-right: 10px;
                      position: absolute;
                      top: 0;
                      left: 0;
                      margin: 15px;
                      margin-left: 24px;
                    "
                  />
                </div>

                <div
                  style="
                    position: absolute;
                    top: 0;
                    width: 100%;
                    height: auto;
                    background: white;
                    z-index: 500;
                    border: 1px solid #cccccc;
                    border-radius: 8px;
                    margin-top: 60px;
                    max-height: 400px;
                    overflow: hidden;
                    overflow-y: auto;
                  "
                  v-if="searchInput.target"
                >
                  <ul
                    style="width: 100%; padding: 0; margin: 0; list-style: none"
                  >
                    <li
                      style="
                        padding: 15px;
                        width: 100%;
                        text-align: left;
                        background: rgb(248 248 248);
                        border-bottom: 1px solid #e6e6e6;
                      "
                      v-for="(searchTagItem, index) in searchTags"
                      v-if="searchTags.length > 0"
                    >
                      <a
                        href="#"
                        style="font-size: 11px; font-weight: 600"
                        @click.prevent="
                          gotoTag(searchTagItem.data.title, searchTagItem._id)
                        "
                        >{{ searchTagItem.data.title }}</a
                      >
                    </li>

                    <li
                      style="
                        background: rgb(241 241 241);
                        padding: 7px;
                        padding-top: 7px;
                        padding-bottom: 7px;
                        text-align: left;
                        font-weight: 600;
                        color: #636363;
                        font-size: 12px;
                      "
                      v-if="searchDocuments.length > 0"
                    >
                      TEXTUAL
                    </li>
                    <li
                      style="
                        padding: 15px;
                        width: 100%;
                        text-align: left;
                        background: rgb(248 248 248);
                        border-bottom: 1px solid #e6e6e6;
                      "
                      v-for="(searchDocument, index) in searchDocuments"
                    >
                      <a
                        href="#"
                        style="font-size: 13px; font-weight: 600; color: black"
                        @click="
                          goToDocument(
                            searchDocument._id,
                            searchDocument.data.type,
                            $event
                          )
                        "
                        >{{ searchDocument.data.title }}</a
                      >

                      <p style="font-size: 12px">
                        {{ searchDocument.data.description }}
                      </p>
                    </li>
                  </ul>
                </div>
              </form>
            </div>

            <div
              class="col-md-8"
              style="
                background: rgb(236 234 234 / 46%);
                border-radius: 8px;
                margin-top: 30px;
                padding-right: 0px;
              "
              v-if="searchMode === 'document'"
            >
              <div
                class="row"
                style="
                  padding-top: 8px;
                  padding-bottom: 8px;
                  border-bottom: 1px solid #d1d1d1;
                  margin-right: 0;
                "
              >
                <div
                  class="col-md-12 text-left"
                  style="
                    font-weight: 600;
                    font-size: 14px;
                    color: #696969;
                    text-transform: uppercase;
                  "
                >
                  Lo más destacado en Biblioteca
                </div>
              </div>
              <div
                style="overflow-y: scroll; overflow-x: hidden; max-height: 40vh"
              >
                <div
                  class="row"
                  style="
                    padding-top: 15px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #d1d1d1;
                  "
                  v-for="document in BestDocuments"
                  v-if="BestDocuments.length > 0 || bestWritings.empty"
                >
                  <div class="col-md-8 text-left">
                    <a
                      href="#"
                      @click="
                        goToDocument(document._id, document.data.type, $event)
                      "
                      style="font-weight: 600; font-size: 15px; color: #696969"
                      >{{ document.data.title }}</a
                    >
                  </div>
                  <div
                    class="col-md-4 text-right pr-4"
                    v-html="displayStars(document.data.cout_validate)"
                  ></div>
                </div>
              </div>
            </div>

            <div
              class="col-md-8"
              v-if="searchMode === 'document'"
              style="margin-top: 15px"
            >
              <div
                class="row"
                v-if="BestDocuments.length == 0 || BestDocuments.empty == true"
              >
                <div
                  class="col-md-12 text-left"
                  style="
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    background: #5d5d5d;
                    padding: 15px;
                  "
                >
                  No se encontraron documentos.
                </div>
              </div>
            </div>

            <div
              class="col-md-8"
              style="
                background: rgb(236 234 234 / 46%);
                border-radius: 8px;
                margin-top: 30px;
                padding-right: 0px;
              "
              v-if="searchMode == 'writing'"
            >
              <div
                class="row"
                style="
                  padding-top: 8px;
                  padding-bottom: 8px;
                  border-bottom: 1px solid #d1d1d1;
                  margin-right: 0;
                "
              >
                <div
                  class="col-md-12 text-left"
                  style="
                    font-weight: 600;
                    font-size: 14px;
                    color: #696969;
                    text-transform: uppercase;
                  "
                >
                  Lo más destacado en Escritos
                </div>
              </div>
              <div
                style="overflow-y: scroll; overflow-x: hidden; max-height: 40vh"
              >
                <div
                  class="row"
                  style="
                    padding-top: 15px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #d1d1d1;
                  "
                  v-for="document in bestWritings"
                  v-if="bestWritings.length > 0 || bestWritings.empty"
                >
                  <div class="col-md-8 text-left">
                    <a
                      href="#"
                      @click="
                        goToDocument(document._id, document.data.type, $event)
                      "
                      style="font-weight: 600; font-size: 15px; color: #696969"
                      >{{ document.data.title }}</a
                    >
                  </div>
                  <div
                    class="col-md-4 text-right pr-4"
                    v-html="displayStars(document.data.cout_validate)"
                  ></div>
                </div>
              </div>
            </div>

            <div
              class="col-md-8"
              v-if="searchMode === 'writing'"
              style="margin-top: 15px"
            >
              <div
                class="row"
                v-if="bestWritings.length == 0 || bestWritings.empty == true"
              >
                <div
                  class="col-md-12 text-left"
                  style="
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    background: #5d5d5d;
                    padding: 15px;
                  "
                >
                  No se encontraron documentos.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
@import "@/assets/platform.css";
</style>

<script setup="">
import columnLeft from "@/components/platform/left.vue";
import navBar from "@/components/platform/navbar.vue";
</script>

<script>
export default {
  data() {
    return {
      auth: localStorage.getItem("auth"),
      endpointSearchWriting: window.ENDPOINT + "/search/writing",
      endpointSearchDocument: window.ENDPOINT + "/search/document",
      endpointSearchTags: window.ENDPOINT + "/search/tags",

      searchMode: "document",
      searchInput: {
        target: null,
        holder: "Buscar doctrina, jurisprudencia y legislación",
      },
      searchDocuments: [],
      searchFolders: [],
      searchTags: [],
      searchFoldersDocuments: [],
      teste: [],
      BestDocuments: [],
      bestWritings: [],
      document: [
        {
          data: {
            title: null,
          },
        },
      ],
    };
  },
  created() {},
  mounted() {
    this.getBestDocuments();
    this.getbestWritings();
  },
  computed: {},
  methods: {
    getStars(count) {
      if (count <= 10) {
        return 1;
      }

      if (count <= 20) {
        return 2;
      }
      if (count <= 30) {
        return 3;
      }

      if (count <= 40) {
        return 4;
      }
      if (count <= 50) {
        return 5;
      }

      if (count >= 50) {
        return 5;
      }
    },
    displayStars(count) {
      var svg = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" style="fill: #ead723"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"/></g></svg>`;
      var stars = this.getStars(count);
      var e = 1;
      var out = "";
      while (e <= stars) {
        out = out + svg;
        // statement
        e++;
      }
      return out;
    },
    getBestDocuments() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
        }),
      };
      fetch(window.ENDPOINT + "/comunity/best/documents", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            this.BestDocuments = [];
            return;
          }

          this.BestDocuments = data;
          console.log("BestDocuments", this.BestDocuments);
          this.$Progress.finish();
        });
    },

    getbestWritings() {
      this.$Progress.start();

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
        }),
      };
      fetch(window.ENDPOINT + "/comunity/best/writings", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            this.bestWritings = [];
            return;
          }

          this.bestWritings = data;

          this.$Progress.finish();
        });
    },

    goToDocument(id, type, event) {
      event.preventDefault();
      if (type == "writing") {
        this.$router.push({
          name: "view-automatic-document",
          params: { id: id },
        });
      } else {
        this.$router.push({ name: "view-document", params: { id: id } });
      }
    },

    gotoFolder(folder) {
      if (this.searchMode == "writing") {
        this.$router.push({
          name: "search-writings",
          query: { folder: folder, search: this.searchInput.target },
        });
        return;
      }
      this.$router.push({
        name: "search",
        query: { folder: folder, search: this.searchInput.target },
      });
    },

    gotoTag(tag, id) {
      if (this.searchMode == "writing") {
        this.$router.push({
          name: "search-writings",
          query: { tag: tag, id: id },
        });
        return;
      }
      this.$router.push({ name: "search", query: { tag: tag, id: id } });
    },

    gotoSearch() {
      if (this.searchMode == "writing") {
        this.$router.push({
          name: "search-writings",
          query: { search: this.searchInput.target },
        });
        return;
      }
      this.$router.push({
        name: "search",
        query: { search: this.searchInput.target },
      });
    },

    changeMode(mode) {
      this.searchMode = mode;
    },

    searchAllDocuments() {
      return new Promise((resolve, reject) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth: this.auth,
            search: this.searchInput.target,
          }),
        };
        if (this.searchMode == "document") {
          var endpoint = window.ENDPOINT + "/comunity/search/document";
        } else {
          var endpoint = window.ENDPOINT + "/comunity/search/writing";
        }
        fetch(endpoint, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.length == 0) {
              resolve([]);
            } else {
              resolve(data);
            }
          });
      });
    },

    searchAllTags() {
      return new Promise((resolve, reject) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth: this.auth,
            search: this.searchInput.target,
          }),
        };
        fetch(this.endpointSearchTags, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.empty) {
              resolve([]);
            } else {
              resolve(data);
            }
          });
      });
    },

    // searchAllFoldersDocuments() {
    //   return new Promise((resolve, reject) => {
    //   const requestOptions = {
    //          method: "POST",
    //          headers: {
    //              "Content-Type": "application/json"
    //          },
    //          body: JSON.stringify({
    //             auth:this.auth,
    //             search:this.searchInput.target,
    //          })
    //      };
    //       if(this.searchMode == 'document') {
    //           var endpoint =  window.ENDPOINT + '/search/folders/documents';
    //      } else {
    //           var endpoint =window.ENDPOINT + '/search/folders/writings';
    //      }

    //      fetch(endpoint, requestOptions).then(response => response.json()).then((data) => {
    //       if(data.empty) {
    //         resolve([]);
    //       } else {
    //         resolve(data);
    //       }
    //      })
    //    })
    // },

    search() {
      this.$Progress.start();

      this.searchAllDocuments().then((data) => {
        this.searchDocuments = data;
        console.log("sear", this.searchDocuments);
      });

      this.$Progress.finish();
    },

    pause() {},
    hover() {},
  },
};
</script>
