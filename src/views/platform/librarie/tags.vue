<template>
  <navBar />

  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2" style="
              height: calc(100vh - 70px);
              overflow: hidden;
              overflow-y: auto;
              padding: 0;
            ">
          <columnLeft />
        </div>
        <div class="col-md-10" style="height: calc(100vh - 70px); border: 1px solid #e2e2e2">
          <!-- ======================================= -->

          <div class="row">
            <div class="col-md-3" style="
                  height: calc(100vh - 70px);
                  overflow: hidden;
                  overflow-y: auto;
                ">
              <div class="col-12" style="
                    font-weight: 600;
                    color: black;
                    padding-top: 2.5px;
                    padding-bottom: 2.5px;
                    border-bottom: 1px solid #e6e6e6;
                  ">
                Etiquetas
              </div>

              <div class="col-12 text-center" style="
                    padding-top: 8.5px;
                    padding-bottom: 8.5px;
                    border-bottom: 1px solid #e5e5e5;
                  ">
                <input type="text" class="form-control type-input-3" v-model="searchTarget.target" @keyup="search()"
                  placeholder="Buscar etiqueta..." />
              </div>

              <div class="col-12" style="padding-top: 10px; padding-bottom: 10px">
                <div class="spinner-border spinner-border-sm" role="status" v-if="loadingFolders">
                  <span class="sr-only">Loading...</span>
                </div>

                <a href="#" style="font-size: 13px; font-weight: 600" @click.prevent="loadAllDocuments()">
                  Todos los documentos</a>

                <hr />
                <div class="col-12 text-left" style="padding: 0" v-if="tagsSelected.length > 0">
                  <p style="font-size: 13px; font-weight: 600">Filtros :</p>
                  <ul style="
                        padding: 0px;
                        list-style: none;
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        flex-direction: column;
                        align-content: flex-start;
                      ">
                    <li style="
                          width: 100%;
                          display: flex;
                          justify-content: flex-start;
                          align-items: flex-start;
                          flex-direction: column;
                          align-content: flex-start;
                          margin-bottom: 5px;
                        " v-for="(tagSelected, index) in tagsSelected">
                      <a href="#" style="
                            font-size: 12px;
                            padding-top: 5px;
                            padding-bottom: 5px;
                            background: rgb(206, 206, 206);
                            border-radius: 30px;
                            display: flex;
                            place-content: flex-start;
                            align-items: center;
                            flex-direction: row;
                            font-weight: 600;
                            padding-left: 10px;
                            padding-right: 10px;
                          ">{{ tagSelected.title }}
                        <a href="#" style="margin-left: 10px" @click="removeFilterTag(index, tagSelected.title)"><i
                            class="fas fa-times"></i></a>
                      </a>
                    </li>
                  </ul>
                  <hr />
                </div>

                <ul style="padding: 0; margin: 0; width: 100%; list-style: none" v-if="items.length > 0">
                  <li style="
                        padding: 0;
                        margin: 0;
                        width: 100%;
                        list-style: none;
                        line-height: 15px;
                        margin-bottom: 15px;
                      " v-for="item in filteredResources" :key="index" @click.prevent="
                        getDocumentsByTag(item._id, item.data.title)
                      ">
                    <a href="#" style="color: black; font-weight: 600; font-size: 12px">{{ item.data.title }}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-3" style="
                  border-left: 1px solid #e6e6e6;
                  border-right: 1px solid #e6e6e6;
                  padding: 0;
                  height: calc(100vh - 70px);
                  overflow: hidden;
                  overflow-y: auto;
                  position: relative;
                ">
              <!-- <div class="col-12" style="background:#e0dfdf;padding:15px;">
                						<b style="color:#858484;font-size:16px">Lorem ipsum dolor sit amet</b>
                					    <p style="color:#858484;font-size:13px">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                							tempor incididunt ut labore et dolore magna aliqua...</p>
                					</div>
                                     -->

              <div class="col-12" style="
                    padding: 15px;
                    border-bottom: 1px solid #e6e6e6;
                    cursor: pointer;
                  " v-for="(document, index) in documents" :key="index" @click="getDocument(document._id)"
                v-bind:class="{
                  activeDocument: document._id === activeDocumentId,
                }">
                <div class="col-12" style="padding: 0" v-if="document._ext.edit_title == false">
                  <span class="edit-mode">{{ document.data.title }}
                    <img src="@/assets/boligrafo.png" @click.prevent="document._ext.edit_title = true" />
                  </span>
                </div>

                <form @submit.prevent="saveEditMode(document._id, index)" class="col-12"
                  style="padding: 0; display: flex; margin-bottom: 10px" v-if="document._ext.edit_title">
                  <input type="text" class="form-control col-12" v-model="document.data.title" style="
                        font-size: 13px;
                        border-radius: 30px;
                        height: 30px;
                        min-height: 30px;
                        max-height: 30px;
                        background: white;
                        font-weight: 700;
                      " />
                  <button type="submit" hidden="true"></button>
                </form>

                <p class="edit-mode" style="color: #525252; font-size: 12px" v-if="!document._ext.edit_description">
                  {{ document.data.description }}
                  <img src="@/assets/boligrafo.png" @click.prevent="document._ext.edit_description = true" />
                </p>

                <form @submit.prevent="saveEditMode(document._id, index)" class="col-12" style="
                      padding: 0px;
                      display: flex;
                      flex-direction: row;
                      flex-wrap: wrap;
                      margin-bottom: 10px;
                    " v-if="document._ext.edit_description">
                  <input type="text" class="form-control" v-model="document.data.description" style="
                        font-size: 12px;
                        border-radius: 8px;
                        height: fit-content;
                        min-height: fit-content;
                        max-height: fit-content;
                        background: white;
                        margin-bottom: 5px;
                      " />
                  <button type="submit" hidden="true"></button>
                </form>

                <!-- <b style="color:black;font-size:15px">{{document.data.title}}</b>
                					    <p style="color:#525252;font-size:12px">{{document.data.description}}</p> -->

                <div style="position:absolute:top:0:right:0;height:100%">
                  <img src="@/assets/cerrar-con-llave.svg" style="height: 20px; width: 20px"
                    v-if="document.data.share == 0" />
                  <img src="@/assets/candado-abierto(2).png" style="height: 20px; width: 20px"
                    v-if="document.data.share == 1" />

                  <img src="@/assets/acortar.svg" style="height: 20px; width: 20px"
                    v-if="document.data.attachment.length > 0" />
                </div>
              </div>
            </div>
            <div class="col-md-6 scroll-size-medium" style="
                  border-left: 1px solid #e6e6e6;
                  border-right: 1px solid #e6e6e6;
                  padding: 0;
                  height: calc(100vh - 70px);
                  overflow: hidden;
                  overflow-y: auto;
                  position: relative;
                ">
              <div class="spinner-border spinner-border-sm" role="status" v-if="loadingDocument"
                style="position: absolute">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="col-12" v-if="document" style="padding: 10px">
                <div class="row">
                  <div class="col-md-8">
                    <b>{{ document.data.title }}</b>
                  </div>
                  <div class="col-md-4 text-right">
                    <a href="#" style="margin: 5px" @click="openFullScreen()">
                      <img src="@/assets/expandir.svg" style="width: 14px; height: 14px; margin-right: 5px" />
                    </a>

                    <buttonShare v-bind:id="document.data.id_share_comuniy" v-if="document.data.share == 1" />
                    <!-- <a href="#" style="margin:5px" v-if="document.data.share == 1 "><img src="@/assets/cuota.svg" style="width:14px;height:14px;margin-right:5px" /></a> -->
                  </div>
                </div>
              </div>

              <div id="editor2" style="width: 100%; padding: 20px; color: black" v-html="contentDocument"></div>
            </div>
          </div>

          <!-- ======================================= -->
        </div>
      </div>
    </div>
  </main>


  <!-- Modal -->
  <div class="modal fade FullScreenModal" id="FullScreenModal" tabindex="-1" role="dialog"
    aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="container-fluid">
            <div class="col-12" v-if="document" style="padding: 10px">
              <div class="row">
                <div class="col-md-8">
                  <b>{{ document.data.title }}</b>
                </div>
                <div class="col-md-4 text-right">
                  <buttonShare v-bind:id="document.data.id_share_comuniy" v-if="document.data.share == 1" />
                  <!-- <a href="#" style="margin:5px" v-if="document.data.share == 1 "><img src="@/assets/cuota.svg" style="width:14px;height:14px;margin-right:5px" /></a> -->
                </div>
              </div>
            </div>
            <div style="width: 100%; padding: 20px; color: black" v-html="contentDocument"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "@/assets/platform.css";

.edit-mode {
  color: black;
  font-size: 15px;
}

.edit-mode img {
  visibility: collapse;
  width: 15px;
  height: 15px;
}

.edit-mode:hover img {
  visibility: visible;
}
</style>

<script setup="">
import columnLeft from "@/components/platform/left.vue";
import navBar from "@/components/platform/navbar.vue";

import buttonShare from "@/components/platform/share-button-document-private.vue";
</script>

<script>
import { alphabetizeByProperty } from "@writetome51/alphabetize-by-property";

import JsonSearch from "search-array";

export default {
  data() {
    return {
      auth: localStorage.getItem("auth"),
      endpoint: window.ENDPOINT + "/library/get/tags",
      endpointDocuments: window.ENDPOINT + "/library/get/tags/documents",
      endpointDocument: window.ENDPOINT + "/library/get/document",
      endpointGetAll: window.ENDPOINT + "/library/get/documents",
      items: [],
      documentsSearch: [],
      documents: [],
      loadingFolders: true,
      loadingDocument: false,
      tagsSelected: [],
      contentDocument: null,
      activeDocumentId: null,
      document: null,
      searchTarget: {
        target: null,
      },
      temp: {
        editFont: "Arial",
      },
    };
  },
  created() { },
  mounted() {
    this.loadAllDocuments();
    this.loadTags();

    if (this.$route.query.id) {
      this.activeDocumentId = this.$route.query.id;
      this.getDocument(this.activeDocumentId);
    }
  },

  computed: {
    searchTagsInResults() {
      return this.documentsSearch.filter((item) => {
        if (this.tagsSelected.length > 0) {
          for (var i = item.data.tags.length - 1; i >= 0; i--) {
            var row = item.data.tags[i];
            for (var i = this.tagsSelected.length - 1; i >= 0; i--) {
              var rowTarget = this.tagsSelected[i];
              if (row._id == rowTarget.id) {
                return item;
              }
            }
          }
        } else {
          return item;
        }
      });
    },
    filteredResources() {
      console.log("filterresources");
      if (this.searchTarget.target) {
        this.searchDocuments();
        return this.items.filter((item) => {
          return item.data.title
            .toLowerCase()
            .startsWith(this.searchTarget.target.toLowerCase());
        });
      } else {
        return this.items;
      }
    },
  },
  methods: {
    openFullScreen() {
      $(".FullScreenModal").modal("show");
    },
    searchDocuments() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          target: this.searchTarget.target,
        }),
      };
      fetch(window.ENDPOINT + "/library/search", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            if (data.length > 0) {
              for (var i = data.length - 1; i >= 0; i--) {
                data[i]._ext = { edit_title: false, edit_description: false };
              }
            }

            this.documents = data;
          }
          this.$Progress.finish();
        });
    },
    saveEditMode(id, index) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: id,
          data: {
            title: this.documents[index].data.title,
            description: this.documents[index].data.description,
          },
        }),
      };
      fetch(window.ENDPOINT + "/library/edit", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.documents[index]._ext.edit_title = false;
          this.documents[index]._ext.edit_description = false;
          this.$Progress.finish();
          this.$toast.success("Documento editado...", {
            position: "bottom-right",
          });
          if (this.document._id == id) {
            this.document.data.title = this.documents[index].data.title;
            this.document.data.description =
              this.documents[index].data.description;
          }
        });
    },
    actionTeste(event, role) {
      if (role == "font") {
        document.execCommand("fontName", false, this.temp.editFont);
        return;
      }

      switch (role) {
        case "h1":
        case "h2":
        case "p":
          document.execCommand("formatBlock", false, role);
          break;
        default:
          document.execCommand(role, false, null);
          break;
      }
    },
    download(file, text, type) {
      //creating an invisible element
      var element = document.createElement("a");
      element.setAttribute("href", file);
      element.setAttribute("download", text);
      element.setAttribute("target", "_blank");

      // Above code is equivalent to
      // <a href="path of file" download="file name">

      document.body.appendChild(element);

      //onClick property
      element.click();

      document.body.removeChild(element);
    },
    exportPDF() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: this.activeDocumentId,
        }),
      };
      fetch(window.ENDPOINT + "/library/export/pdf", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$toast.show("Descargando...", {
            position: "bottom-right",
          });

          this.download(
            window.ENDPOINTEXPORTS + "/" + data.name,
            data.name,
            "data:application/pdf"
          );

          this.$Progress.finish();
          console.log(data);
        });
    },
    exportWord() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: this.activeDocumentId,
        }),
      };
      fetch(window.ENDPOINT + "/library/export/word", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.$toast.show("Descargando...", {
            position: "bottom-right",
          });

          this.download(
            window.ENDPOINTEXPORTS + "/" + data.name,
            data.name,
            "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          );
          this.$Progress.finish();
          console.log(data);
        });
    },
    loadTags() {
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
      fetch(this.endpoint, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            this.tags = [];
            this.loadingFolders = false;
            this.$Progress.finish();
            return;
          }

          if (data.error == true) {
          } else {
            alphabetizeByProperty("data.title", data);
            this.items = data;
            // this.items = data;
            this.loadingFolders = false;
            this.$Progress.finish();
          }
        });
    },
    loadAllDocuments() {
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
      fetch(this.endpointGetAll, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            this.documents = [];
            this.loadingDocuments = false;
            this.$Progress.finish();
            return;
          }

          if (data.length > 0) {
            for (var i = data.length - 1; i >= 0; i--) {
              data[i]._ext = { edit_title: false, edit_description: false };
            }
          }
          this.documents = data;
          this.$Progress.finish();
        });
    },
    search() {
      console.log(this.searchTarget);
    },
    removeFilterTag(index, name) {
      this.$Progress.start();

      delete this.tagsSelected[index];
      this.tagsSelected = this.tagsSelected.filter(function (a) {
        return typeof a !== "undefined";
      });

      if (this.tagsSelected.length == 0) {
        this.loadAllDocuments();
        return;
      }

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          tags: this.tagsSelected,
          // id_tag:idtag,
          // name:tag
        }),
      };
      fetch(this.endpointDocuments, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            this.documents = [];
            this.loadingDocuments = false;
            this.$Progress.finish();
            return;
          }

          if (data.error == true) {
          } else {
            if (data.length > 0) {
              for (var i = data.length - 1; i >= 0; i--) {
                data[i]._ext = { edit_title: false, edit_description: false };
              }
            }
            this.documents = data;
            this.$Progress.finish();
          }
        });
    },
    getDocument(id) {
      this.$Progress.start();
      this.activeDocumentId = id;
      this.loadingDocument = true;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: id,
          // id_tag:idtag,
          // name:tag
        }),
      };
      fetch(this.endpointDocument, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.error == true) {
          } else {
            this.document = data;
            this.contentDocument = data.data.content;
            this.contentDocument = data.data.content.replace("http://", "https://");

            this.loadingDocument = false;
            this.$Progress.finish();
          }
        });
    },
    getDocumentsByTag(idtag, tag) {
      this.$Progress.start();
      this.tagsSelected.push({
        title: tag,
        id: idtag,
      });
      this.loadingDocuments = true;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          tags: this.tagsSelected,
        }),
      };
      fetch(this.endpointDocuments, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            this.documents = [];
            this.loadingDocuments = false;
            this.$Progress.finish();
            return;
          }

          if (data.error == true) {
          } else {
            if (data.length > 0) {
              for (var i = data.length - 1; i >= 0; i--) {
                data[i]._ext = { edit_title: false, edit_description: false };
              }
            }
            this.documents = data;
            this.loadingDocuments = false;
            this.$Progress.finish();
          }
        });
    },
    pause() { },
    hover() { },
  },
};
</script>
