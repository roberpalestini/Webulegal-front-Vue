<style>
@import "@/assets/platform.css";
.ul-categories {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.ul-categories li {
  padding: 0;
  margin: 0;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
}

.ul-categories li a {
  padding: 10px;
  border-radius: 30px;
  border: 1px solid #e3e3e3;
  color: #5c5c5c;
  font-weight: 600;
  text-align: center;
  padding-left: 30px;
  padding-right: 30px;
}

.ul-categories-subcategorias {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.ul-categories-subcategorias li {
  padding: 0;
  margin: 0;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
}

.ul-categories-subcategorias li a {
  padding: 5px;
  border-radius: 30px;
  border: 1px solid #e3e3e3;
  color: #5c5c5c;
  font-weight: 600;
  font-size: 12.5px;
  text-align: center;
  padding-left: 30px;
  padding-right: 30px;
}
.ul-categories-subcategorias .arrow {
  height: 28px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0;
}

.activeDocument {
  padding: 15px;
  border-bottom: 1px solid rgb(230, 230, 230);
  border-left: transparent !important;
  transition: all 250ms;
  background: #b9b9b9 !important;
  opacity: 0.6 !important;
}
.activeFolder {
  color: #2b44ff !important;
  transition: all 250ms;
}

#column_left {
  background-color: #515151;
}

.nav-list li a {
  text-decoration: none;
  display: block;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #515151 !important;
  color: #9d9d9d;
}

.nav-list > li > a {
  color: #c4c4c4;
  font-size: 14px;
  padding-left: 13px !important;
  border-bottom: 1px solid #585858;
}

.nav-list > li > a:hover {
  background-color: #444444;
}
.folder-menu {
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none;
}
.folder-menu li {
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none;
}
.folder-menu li a {
  color: black;
  font-weight: 600;
  font-size: 12px;
}
.folder-menu li:hover > .icon-add {
  opacity: 1;
}

.folder-menu li .icon-add {
  opacity: 0;
  float: right;
  cursor: pointer;
}

.folder-menu-child {
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none;
  padding-left: 10px;
}

.folder-menu-child li {
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none;
}

.folder-menu-child li a {
  color: black;
  font-weight: 600;
  font-size: 12px;
}

.folder-menu-child li:hover > .icon-add {
  opacity: 1;
}

.folder-menu-child li .icon-add {
  opacity: 0;
  float: right;
  cursor: pointer;
}

.folder_icon_active,
.folder_icon {
  display: none !important;
}

input[type="checkbox"],
input[type="radio"] {
  display: none !important;
}

.expanded_icon {
  transform: rotate(0deg);
  transition: all 0.2s ease;
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: -2px 0 4px 8px;
  border-color: transparent transparent transparent #555;
}

.button-move-tree {
  background-image: url(/src/assets/boton-agregar.png);
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  display: block;
  margin-left: 5px;
}
.add_icon {
  background-image: url(/src/assets/boton-agregar.png);
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  display: block;
  margin-left: 5px;
}
.add_icon::before {
  display: none !important;
  content: "";
}

.row_data:hover {
  color: #0c00ff !important;
}
</style>
<template>
  <navBar />
  <main>
    <div class="container-fluid">
      <!--  <div class="popnewCategorie">
                Si consideras que es necesario una nueva carpeta dentro de esta seccion, la podes solicitar <a href="#">aca</a>.
            </div> -->

      <form class="row" @submit.prevent="save()">
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
            border: 1px solid #f3f3f3;
            background: rgb(255, 255, 255, 0.1);
            height: calc(100vh - 70px);
            overflow: hidden;
            overflow-y: auto;
          "
        >
          <div
            class="col-12 text-left"
            style="padding-top: 20px; padding-bottom: 20px"
          >
            <a href="@" @click.prevent="$router.go(-1)">
              <img
                src="@/assets/flecha-izquierda.svg"
                style="height: 20px; width: 20px"
              />
            </a>
          </div>

          <!--  <div class="popnewCategorie">
                Si consideras que es necesario una nueva carpeta dentro de esta seccion, la podes solicitar <a href="#">aca</a>.
            </div>
 -->

          <!-- Vista Categorias -->
          <div class="row">
            <div class="col-md-5">
              <div class="col-md-12">
                <h4
                  style="font-weight: bold; text-align: left; font-size: 17px"
                >
                  Clasifica el documento dentro de la categoria que corresponda.
                </h4>
              </div>
              <div
                class="col-12"
                style="padding-top: 30px; padding-bottom: 30px"
              >
                <Tree
                  id="my-tree-id"
                  ref="my-tree"
                  :custom-options="myCustomOptions2"
                  :custom-styles="myCustomStyles2"
                  :nodes="treeDisplayData"
                ></Tree>

                <ul
                  style="
                    padding: 0px;
                    list-style: none;
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    flex-direction: column;
                    align-content: flex-start;
                    margin-top: 30px;
                  "
                >
                  <li
                    style="
                      width: 100%;
                      display: flex;
                      justify-content: flex-start;
                      align-items: flex-start;
                      flex-direction: column;
                      align-content: flex-start;
                      margin-bottom: 5px;
                    "
                    v-for="(item, index) in pathMoveSelected"
                  >
                    <a
                      href="#"
                      style="
                        font-size: 12px;
                        padding: 5px;
                        background: rgb(234, 234, 234);
                        border-radius: 30px;
                        display: flex;
                        place-content: flex-start;
                        align-items: center;
                        flex-direction: row;
                        padding-left: 10px;
                        padding-right: 10px;
                      "
                      >{{ item.text }}
                      <a
                        href="#"
                        style="margin-left: 10px"
                        @click="pathMoveSelectedRemove(index, item.id)"
                        ><i class="fas fa-times"></i
                      ></a>
                    </a>
                  </li>
                </ul>

                <NewFolderModal />
              </div>
            </div>

            <div class="col-md-7" style="position: relative; padding-top: 0">
              <div style="position: sticky; top: 0; padding-top: 0">
                <ul
                  style="
                    padding: 0;
                    list-style: none;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    display: flex;
                    flex-wrap: wrap;
                    flex-direction: row;
                    margin-top: 0;
                    margin-bottom: 15px;
                  "
                >
                  <li
                    style="
                      padding: 5px;
                      background: #ececec;
                      border-radius: 30px;
                      font-size: 12px;
                      font-weight: 600;
                      margin-right: 10px;
                      padding-left: 8px;
                      padding-right: 8px;
                      margin-bottom: 5px;
                    "
                    v-for="(tag, index) in tagSelected"
                  >
                    {{ tag.data.title }}
                    <a href="#" @click="removeTag(index)">
                      <img
                        src="@/assets/cerrar-simbolo-de-boton-circular.png"
                        style="max-width: 15px; max-height: 15px"
                    /></a>
                  </li>
                </ul>

                <div class="col-12" style="padding-top: 0px">
                  <h4
                    style="font-weight: bold; text-align: left; font-size: 17px"
                  >
                    Asignale al documento como minimo tres etiquetas
                  </h4>
                  <input
                    type="text"
                    class="form-control input-search-dashboard"
                    placeholder="Escribe para agregar una etiqueta"
                    @keyup="searchTags"
                    v-model="searchInputTags.target"
                  />

                  <NewTagModal style="z-index: 1000" />
                </div>

                <div
                  class="col-12"
                  style="
                    border-radius: 8px;
                    margin-top: 10px;
                    max-height: 400px;
                    overflow: hidden;
                    overflow-y: auto;
                    padding: 0;
                  "
                  v-if="searchInputTags.target"
                >
                  <ul
                    style="width: 100%; padding: 0; margin: 0; list-style: none"
                    v-if="tags.length"
                  >
                    <li
                      style="
                        padding: 15px;
                        width: 100%;
                        text-align: left;
                        background: #f6f5f5;
                        border-bottom: 1px solid #e6e6e6;
                        font-size: 12px;
                        color: black;
                        font-weight: 500;
                      "
                      v-for="(searchTag, index) in tags"
                    >
                      {{ searchTag.data.title }}
                      <a
                        href="#"
                        style="font-size: 13px; font-weight: 600"
                        @click.prevent="selectTag(index)"
                        ><img
                          src="@/assets/boton-agregar.png"
                          style="width: 20px; height: 20px"
                        />
                      </a>
                    </li>
                  </ul>
                  <div v-else>
                    <p>Tag not found</p>
                  </div>
                </div>

                <div class="col-12" style="padding-top: 50px">
                  <h4
                    style="font-weight: bold; text-align: left; font-size: 17px"
                  >
                    Escribe un titulo para tu documento
                  </h4>
                  <input
                    type="text"
                    class="form-control input-search-dashboard"
                    placeholder="Escribir titulo"
                    v-model="data.title"
                    required="true"
                    maxlength="100"
                  />
                </div>

                <div class="col-12" style="padding-top: 50px">
                  <h4
                    style="font-weight: bold; text-align: left; font-size: 17px"
                  >
                    Escribe una descripcion para tu documento
                  </h4>
                  <input
                    type="text"
                    class="form-control input-search-dashboard"
                    placeholder="Escribir descripcion"
                    v-model="data.description"
                    required="true"
                    maxlength="350"
                  />
                </div>

                <div class="col-12 text-center" style="padding-top: 50px">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    style="width: 120px; position: relative"
                    v-if="!loadingSave"
                  >
                    Crear
                  </button>

                  <button
                    type="submit"
                    class="btn btn-primary"
                    style="width: 120px; position: relative"
                    disabled="true"
                    v-if="loadingSave"
                  >
                    <div
                      class="spinner-border text-light spinner-border-sm"
                      role="status"
                    >
                      <span class="sr-only">Loading...</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Vista Etiquetas -->

          <!-- Vista Informacion -->
        </div>
      </form>
    </div>
  </main>
</template>





 


 


<script>
import Tree from "vuejs-tree";
export default {
  data() {
    return {
      categories_view: true,
      tags_view: false,
      currentType: 0,
      currentName: null,
      searchInputTags: {
        target: null,
      },
      saveCreateLoading: false,
      loadingStart: true,
      loadingSave: false,
      data: {
        title: null,
        description: null,
      },
      auth: localStorage.getItem("auth"),
      endpointDocument: window.ENDPOINT + "/writings/get/document",
      endpointGetAll: window.ENDPOINT + "/folders/default/writings",
      endpointSave: window.ENDPOINT + "/writings/organize",
      endpointSearchTags: window.ENDPOINT + "/search/tags",

      modalCreate: false,
      inputCreate: null,
      categories: [],
      categoriesSelected: [],
      tags: [],
      tagSelected: [],
      title: null,
      description: null,
      id_document: this.$route.params.id,
      pathMoveSelected: [],
      treeDisplayData: [],
    };
  },
  created() {},
  mounted() {
    this.getFolderAll();
  },
  computed: {
    myCustomStyles() {
      return {
        tree: {
          style: {
            height: "auto",
            maxHeight: "300px",
            overflowY: "visible",
            display: "inline-block",
            textAlign: "left",
          },
        },
        row: {
          style: {
            width: "500px",
            cursor: "pointer",
          },
          child: {
            class: "",
            style: {
              height: "35px",
            },
            active: {
              style: {
                height: "35px",
              },
            },
          },
        },
        rowIndent: {
          paddingLeft: "20px",
        },
        text: {
          // class: "" // uncomment this line to overwrite the 'capitalize' class, or add a custom class
          style: {
            "font-weight": "600",
            "font-size": "12px",
          },
          active: {
            style: {
              "font-weight": "bold",
              color: "#1200FF",
              "font-size": "12px",
            },
          },
        },
      };
    },
    myCustomOptions() {
      return {
        treeEvents: {
          expanded: {
            state: true,
            fn: this.getDocumentsFromFolder,
          },
          collapsed: {
            state: true,
            fn: this.getDocumentsFromFolder,
          },
          selected: {
            state: false,
            fn: this.mySelectedFunction,
          },
          checked: {
            state: false,
            fn: this.myCheckedFunction,
          },
        },
        events: {
          expanded: {
            state: true,
          },
          selected: {
            state: true,
          },
          checked: {
            state: true,
          },
          editableName: {
            state: true,
            calledEvent: "expanded",
          },
        },
        addNode: {
          state: true,
          class: "add_icon",
          style: {
            color: "red",
          },
          fn: this.addNodeFunction,
          appearOnHover: true,
        },
        editNode: {
          state: true,
          fn: null,
          appearOnHover: true,
        },
        deleteNode: {
          state: true,
          fn: this.deleteNodeFunction,
          appearOnHover: true,
        },
        showTags: true,
      };
    },
    myCustomStyles2() {
      return {
        tree: {
          style: {
            height: "auto",
            maxHeight: "300px",
            overflowY: "visible",
            display: "inline-block",
            textAlign: "left",
          },
        },
        deleteNode: {
          class: "button-move-tree",
          style: {
            color: "#EE5F5B",
          },
        },
        row: {
          style: {
            width: "500px",
            cursor: "pointer",
          },
          child: {
            class: "",
            style: {
              height: "35px",
            },
            active: {
              style: {
                height: "35px",
              },
            },
          },
        },
        rowIndent: {
          paddingLeft: "20px",
        },
        text: {
          // class: "" // uncomment this line to overwrite the 'capitalize' class, or add a custom class
          style: {
            "font-weight": "600",
            "font-size": "12px",
          },
          active: {
            style: {
              "font-weight": "bold",
              color: "#1200FF",
              "font-size": "12px",
            },
          },
        },
      };
    },
    myCustomOptions2() {
      return {
        treeEvents: {
          expanded: {
            state: true,
            fn: (data) => {
              this.getChilds(data);
            },
          },
          collapsed: {
            state: true,
            fn: this.mySelectedFunction,
          },
          selected: {
            state: false,
            fn: this.mySelectedFunction,
          },
          checked: {
            state: false,
            fn: this.myCheckedFunction,
          },
        },
        events: {
          expanded: {
            state: true,
            // fn: this.testeoEvent,
          },
          selected: {
            state: true,
            // fn: this.testeoEvent,
          },
          checked: {
            state: true,
            // fn: this.testeoEvent,
          },
          editableName: {
            state: true,
            calledEvent: "expanded",
          },
        },
        addNode: {
          state: false,
          class: "add_icon",
          style: {
            color: "red",
          },
          fn: this.addNodeFunction,
          appearOnHover: true,
        },
        editNode: {
          state: false,
          fn: null,
          appearOnHover: true,
        },
        deleteNode: {
          state: true,
          fn: this.selectPathMove,
          appearOnHover: false,
        },
        showTags: true,
      };
    },
  },
  methods: {
    getFolderAll() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
        }),
      };
      fetch(window.ENDPOINT + "/folders/v2/default/writings", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          this.treeDisplayData = this.prepareArray(data);
        });
    },

    pathMoveSelectedRemove(index, nodeid) {
      delete this.pathMoveSelected[index];
      this.pathMoveSelected = this.pathMoveSelected.filter(function (a) {
        return typeof a !== "undefined";
      });
    },

    selectPathMove(node) {
      console.log(node);
      if (this.pathMoveSelected.length < 1) {
        this.pathMoveSelected.push({ id: node.id, text: node.text });
      } else {
        this.$toast.show("Solo puedes seleccionar una categoria", {
          position: "bottom-right",
        });
      }
    },

    mySelectedFunction: function (nodeId, state) {
      console.log(`is ${nodeId} selected ? ${state}`);
      console.log(this.$refs["my-tree"].getSelectedNode());
    },

    getDocument() {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          id: this.$route.params.id,
        }),
      };
      fetch(this.endpointDocument, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.document = data;
          this.$Progress.finish();
        });
    },
    save() {
      if (this.tagSelected.length < 3) {
        // temporary
      // if (this.searchInputTags.target.split(',').length < 3) {
        this.$toast.error("Por favor , selecciona como minimo 3 etiquetas", {
          position: "bottom-right",
        });
        return;
      }

      if (this.pathMoveSelected.length < 1) {
        this.$toast.error("Por favor , selecciona una categoria", {
          position: "bottom-right",
        });
        return;
      }

      // this.loadingSave = true;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          categories: this.pathMoveSelected,
          title: this.data.title,
          description: this.data.description,
          tags: this.tagSelected,
          id_document: this.id_document,
        }),
      };
      fetch(this.endpointSave, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.insertedId) {
            this.$router.push({
              name: "my-writings-folders",
            });

            this.$toast.success(
              "Gracias por compartir con la comunidad tu documento",
              { position: "bottom-right" }
            );
          } else {
            this.$toast.error("Ocurrio un error , por favor intente luego", {
              position: "bottom-right",
            });
          }
        });
    },
    selectCategorie(data) {
      this.categoriesSelected.push(data);
    },
    removeCategorie(index) {
      this.categoriesSelected.splice(index, 1);
    },
    removeTag(index) {
      this.tagSelected.splice(index, 1);
    },
    selectTag(index) {
      if (this.tagSelected.length < 5) {
        this.tagSelected.push(this.tags[index]);
      } else {
        this.$toast.show("Solo puedes seleccionar 5 etiquetas", {
          position: "bottom-right",
        });
      }
    },
    searchTags() {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          search: this.searchInputTags.target,
        }),
      };
      fetch(this.endpointSearchTags, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.empty) {
            this.tags = [];
          } else {
            this.tags = data;
          }
        });
    },

    getChilds(parent) {
      this.$Progress.start();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth: this.auth,
          parent: parent,
        }),
      };
      fetch(
        window.ENDPOINT + "/folders/v2/default/writings/childs",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          this.$refs["my-tree"].findNode(parent).nodes =
            this.prepareArray(data);
          this.nodeSelect = this.prepareArray(data);
          this.$Progress.finish();
        });
    },
    prepareArray(data) {
      var fix = [];
      for (var i = data.length - 1; i >= 0; i--) {
        fix.push({
          id: data[i]._id,
          text: data[i].data.text,
          nodes: [
            {
              id: "934",
              text: "Cargando carpetas..",
              nodes: [],
              state: {
                checked: false,
                selected: false,
                expanded: false,
              },
            },
          ],
          state: {
            checked: false,
            selected: false,
            expanded: false,
          },
        });
      }
      return fix;
    },
  },
};
</script>

 
 <script setup>
import NewFolderModal from "@/components/platform/new-folder-writings-suggest.vue";
import NewTagModal from "@/components/platform/new-tags-suggest.vue";

import columnLeft from "@/components/platform/left.vue";
import navBar from "@/components/platform/navbar.vue";
import { Editable } from "@livingdocs/editable.js/src/core";
</script>