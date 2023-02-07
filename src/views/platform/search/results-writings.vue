<script setup="">
import columnLeft from "@/components/platform/left.vue";
import navBar from "@/components/platform/navbar.vue";
</script>

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
          class="col-md-10"
          style="height: calc(100vh - 70px); overflow: hidden"
        >
          <!-- ======================================= -->

          <div class="row">
            <div
              class="col-md-3"
              style="
                height: calc(100vh - 70px);
                overflow: hidden;
                overflow-y: auto;
                padding-top: 15px;
              "
            >
              <div class="col-12" style="padding: 0">
                <div class="row">
                  <div
                    class="col-2 text-center"
                    style="padding-top: 5px; padding-bottom: 5px"
                  >
                    <a href="@" @click.prevent="$router.go(-1)">
                      <img
                        src="@/assets/flecha-izquierda.svg"
                        style="height: 15px; width: 15px"
                      />
                    </a>
                  </div>
                  <div class="col-md-9" style="padding: 0; margin-bottom: 15px">
                    <form @submit.prevent="getResults()">
                      <input
                        type="text"
                        class="form-control type-input-4"
                        v-model="searchInput.target"
                      />
                      <button type="submit" hidden="true"></button>
                    </form>
                  </div>
                </div>
              </div>
              <div
                class="col-md-12"
                style="padding: 0px; font-size: 13px; margin-bottom: 15px"
              >
                Seleccioná carpetas y/o etiquetas, para obtener mejores
                resultados
              </div>
              <hr />
              <div class="col-md-12" style="padding: 0px; margin-bottom: 15px">
                <i class="fas fa-filter"></i> Filtros
              </div>
              <div class="col-md-12" style="padding: 0">
                <b
                  v-if="foldersFilters.length == 0 && tagFilters.length == 0"
                  style="font-size: 12px"
                  >No se han colocado filtros.</b
                >
                <ul style="margin: 0; padding: 0; list-style: none">
                  <li
                    style="padding: 7px"
                    v-for="(item, index) in foldersFilters"
                    v-if="foldersFilters.length > 0"
                  >
                    <a
                      href="#"
                      style="
                        padding: 5px 8px;
                        background: rgb(236, 236, 236);
                        border-radius: 30px;
                        font-size: 9.5px;
                        font-weight: 600;
                        margin-right: 10px;
                        margin-bottom: 5px;
                      "
                      >{{ item.title }}
                      <a
                        href="#"
                        style="margin-left: 10px"
                        @click="removeFilterFolder(index)"
                        ><i class="fas fa-times"></i
                      ></a>
                    </a>
                  </li>
                  <li v-if="foldersFilters.length > 0">
                    <hr />
                  </li>
                  <li
                    style="padding: 7px"
                    v-for="(item, index) in tagFilters"
                    v-if="tagFilters.length > 0"
                  >
                    <a
                      href="#"
                      style="
                        padding: 5px 8px;
                        background: rgb(236, 236, 236);
                        border-radius: 30px;
                        font-size: 9.5px;
                        font-weight: 600;
                        margin-right: 10px;
                        margin-bottom: 5px;
                      "
                      >{{ item.title }}
                      <a
                        href="#"
                        style="margin-left: 10px"
                        @click="removeFilterTag(index)"
                        ><i class="fas fa-times"></i></a
                    ></a>
                  </li>
                </ul>
              </div>

              <div
                class="col-md-12"
                style="
                  padding: 15px;
                  background: rgb(243 243 243);
                  padding-top: 3px;
                  padding-bottom: 3px;
                  font-size: 13px;
                  font-weight: 600;
                  color: #505050;
                  margin-bottom: 15px;
                  margin-top: 15px;
                  text-transform: uppercase;
                "
              >
                Carpetas
              </div>
              <div class="col-md-12">
                <Tree
                  id="my-tree-id"
                  ref="my-tree"
                  :custom-options="myCustomOptions2"
                  :custom-styles="myCustomStyles2"
                  :nodes="treeDisplayData"
                ></Tree>
              </div>

              <div
                class="col-md-12"
                style="
                  padding: 15px;
                  background: rgb(243 243 243);
                  padding-top: 3px;
                  padding-bottom: 3px;
                  font-size: 13px;
                  font-weight: 600;
                  color: #505050;
                  margin-bottom: 15px;
                  margin-top: 15px;
                  text-transform: uppercase;
                "
              >
                Etiquetas
              </div>

              <div class="col-md-12" style="padding: 0">
                <b v-if="searchTags.length == 0" style="font-size: 12px"
                  >No se han encontrado etiquetas.</b
                >
                <ul style="margin: 0; padding: 0; list-style: none">
                  <li
                    style="padding: 7px"
                    v-for="(item, index) in searchTags"
                    v-if="searchTags.length > 0"
                  >
                    <a
                      href="#"
                      style="
                        padding: 5px 8px;
                        background: rgb(236, 236, 236);
                        border-radius: 30px;
                        font-size: 9.5px;
                        font-weight: 600;
                        margin-right: 10px;
                        margin-bottom: 5px;
                      "
                      @click.prevent="selectTag(item._id, item.data.title)"
                      >{{ item.data.title }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="col-md-9 scroll-size-medium"
              style="
                height: calc(100vh - 70px);
                overflow: hidden;
                overflow-y: auto;
                padding-top: 15px;
              "
            >
              <div
                class="row"
                style="
                  border: 1px solid #d0cece;
                  border-radius: 8px;
                  width: 100%;
                "
              >
                <div
                  class="col-md-12"
                  style="
                    padding: 15px;
                    background: rgb(251 251 251);
                    padding-top: 3px;
                    padding-bottom: 3px;
                    font-size: 13px;
                    font-weight: 600;
                    color: #505050;
                    margin-bottom: 15px;
                    text-transform: uppercase;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                  "
                >
                  Resultados de busqueda
                </div>
                <div
                  style="
                    height: 80vh;
                    overflow: hidden;
                    overflow-y: auto;
                    width: 100%;
                  "
                >
                  <div
                    class="col-md-12"
                    style="border-bottom: 1px solid #d0cece; width: 100%"
                    v-for="(item, index) in filteredResources"
                    v-if="searchDocuments.length > 0"
                  >
                    <div class="row">
                      <div class="col-md-9">
                        <b
                          style="font-size: 14px; cursor: pointer"
                          @click="goToDocument(item._id)"
                          >{{ item.data.title }}</b
                        >
                        <p
                          style="font-size: 13px; cursor: pointer"
                          @click="goToDocument(item._id)"
                        >
                          {{ item.data.description }}
                        </p>
                      </div>
                      <div
                        class="col-md-3"
                        v-html="displayStars(item.data.cout_validate)"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ======================================= -->
        </div>
      </div>
    </div>
  </main>
</template>

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
<script>
import Tree from "vuejs-tree";

export default {
  data() {
    return {
      auth: localStorage.getItem("auth"),
      endpointSearchWriting: window.ENDPOINT + "/search/writing",
      endpointSearchDocument: window.ENDPOINT + "/search/document",
      endpointSearchTags: window.ENDPOINT + "/search/regex/tags",

      searchMode: "document",
      searchInput: {
        target: this.$route.query.search,
      },
      searchDocuments: [],
      searchFolders: [],
      searchTags: [],
      searchFoldersDocuments: [],
      teste: [],
      BestDocuments: [],
      bestWritings: [],

      tagFilters: [],
      foldersFilters: [],
      document: [
        {
          data: {
            title: null,
          },
        },
      ],
      treeDisplayData: [],
      accessSpeed: false,
    };
  },
  created() {
    console.log("BestDocuments", this.BestDocuments);
  },
  mounted() {
    if (this.$route.query.tag) {
      this.tagFilters.push({
        title: this.$route.query.tag,
        id: this.$route.query.id,
      });
    }

    this.getResults();
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
    filteredResources() {
      if (this.foldersFilters.length > 0 || this.tagFilters.length > 0) {
        //     var temp = [];
        //       for (var i = this.searchDocuments.length - 1; i >= 0; i--) {
        //           var item =  this.searchDocuments[i];
        //           if (this.foldersFilters.length > 0) {
        //                  for (var i = item.data.categories.length - 1; i >= 0; i--) {
        //                      var row =  item.data.categories[i]
        //                       for (var i = this.foldersFilters.length - 1; i >= 0; i--) {
        //                           var rowTarget =  this.foldersFilters[i];
        //                           if(row.id == rowTarget.id) {
        //                             temp.push(item);
        //                           }
        //                       }
        //                   }

        //               }

        //               if(this.tagFilters.length > 0) {
        //                     for (var i = item.data.tags.length - 1; i >= 0; i--) {
        //                      var row =  item.data.tags[i]
        //                       for (var i = this.tagFilters.length - 1; i >= 0; i--) {
        //                           var rowTarget =  this.tagFilters[i];
        //                           if(row._id == rowTarget.id) {
        //                             temp.push(item);
        //                           }
        //                       }
        //                   }

        //               }
        //               console.log(temp)
        //        return temp;
        //       }

        return this.searchDocuments.filter((item) => {
          if (this.foldersFilters.length > 0 && this.tagFilters.length == 0) {
            for (var i = item.data.categories.length - 1; i >= 0; i--) {
              var row = item.data.categories[i];
              for (var i = this.foldersFilters.length - 1; i >= 0; i--) {
                var rowTarget = this.foldersFilters[i];
                if (row.id == rowTarget.id) {
                  return item;
                }
              }
            }
          }

          if (this.tagFilters.length > 0 && this.foldersFilters.length == 0) {
            console.log("tags filter active");
            for (var i = item.data.tags.length - 1; i >= 0; i--) {
              var row = item.data.tags[i];
              for (var e = this.tagFilters.length - 1; e >= 0; e--) {
                var rowTarget = this.tagFilters[e];
                console.log(
                  "loop tags",
                  item.data.title,
                  row._id,
                  rowTarget.id
                );
                if (row._id == rowTarget.id) {
                  console.log("document active", row._id, rowTarget.id);
                  return item;
                }
              }
            }
          }

          if (
            this.foldersFilters.length > 0 &&
            this.tagFilters.length > 0
          ) {
            for (var i = item.data.categories.length - 1; i >= 0; i--) {
              var row = item.data.categories[i];
              for (var i = this.foldersFilters.length - 1; i >= 0; i--) {
                var rowTarget = this.foldersFilters[i];
                if (row.id == rowTarget.id) {
                  if (this.tagFilters.length > 0) {
                    console.log(this.tagFilters);
                    for (var i = item.data.tags.length - 1; i >= 0; i--) {
                      var row = item.data.tags[i];
                      console.log("search ", item.data.title);
                      for (var i = this.tagFilters.length - 1; i >= 0; i--) {
                        var rowTarget = this.tagFilters[i];
                        console.log("ids", row._id, rowTarget.id);
                        if (row._id == rowTarget.id) {
                          return item;
                        }
                      }
                    }
                  }

                  return item;
                }
              }
            }
          }

          // if(this.tagFilters.length > 0) {
          //   console.log(this.tagFilters)
          //   for (var i = item.data.tags.length - 1; i >= 0; i--) {
          //    var row =  item.data.tags[i]
          //    console.log('search ' , item.data.title)
          //     for (var i = this.tagFilters.length - 1; i >= 0; i--) {
          //         var rowTarget =  this.tagFilters[i];
          //         console.log('ids',row._id,rowTarget.id)
          //         if(row._id == rowTarget.id) {
          //           return item;
          //         }
          //     }
          // }

          // }
        });

        // return this.data.filter((item) => {
        //                   return item.data.title.toLowerCase().startsWith(this.search.target.toLowerCase());
        //                 })
      } else {
        return this.searchDocuments;
      }
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

    pathMoveSelectedRemove(index, nodeid) {
      delete this.pathMoveSelected[index];
      this.pathMoveSelected = this.pathMoveSelected.filter(function (a) {
        return typeof a !== "undefined";
      });
    },

    selectPathMove(node) {
      console.log(node);
      this.selectFolder(node.id, node.text);

      // if(this.pathMoveSelected.length < 1) {
      //    this.pathMoveSelected.push({id:node.id,text:node.text})
      // } else {
      //     this.$toast.show(
      //   "Solo puedes seleccionar una categoria..",
      //     {
      //        position: "bottom-right"
      //     }
      //   )
      // }
    },

    removeFilterTag(index) {
      this.tagFilters.splice(index, 1);
      this.getResults();
    },
    removeFilterFolder(index) {
      this.foldersFilters.splice(index, 1);
      this.getResults();
    },
    selectTag(id, title) {
      this.tagFilters.push({ id: id, title: title });
      this.getResults();
    },
    selectFolder(id, title) {
      this.foldersFilters.push({ id: id, title: title });
      this.getResults();
    },

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

    goToDocument(id) {
      this.$router.push({ name: "view-automatic-document", params: { id: id } });
    },

    gotoFolder(folder) {
      this.$router.push({ name: "search", query: { folder: folder } });
    },

    gotoTag(tag) {
      this.$router.push({ name: "search", query: { tag: tag } });
    },

    gotoSearch() {
      this.$router.push({
        name: "search",
        query: { search: this.searchInput.target },
      });
    },

    changeMode(mode) {
      this.searchMode = mode;
    },

    getResults() {
      return new Promise((resolve, reject) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth: this.auth,
            search: this.searchInput.target,
            tags: this.tagFilters,
            // folders : this.foldersFilters
            // tags : [],
            folders: [],
          }),
        };

        fetch(
          window.ENDPOINT + "/comunity/search/complete/writings",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.length == 0) {
              this.searchDocuments = [];
              this.searchAllTags().then((data) => {
                this.searchTags = data;
              });
            } else {
              this.searchDocuments = data;
              this.searchAllTags().then((data) => {
                this.searchTags = data;
              });
            }
          });
      });
    },

    getResultsStartSpeed() {
      return new Promise((resolve, reject) => {
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth: this.auth,
            search: this.searchInput.target,
            tags: this.tagFilters,
            // folders : this.foldersFilters
            folders: [],
          }),
        };

        fetch(
          window.ENDPOINT + "/comunity/search/complete/writings",
          requestOptions
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.length == 0) {
              this.searchDocuments = [];
              this.searchAllTags().then((data) => {
                this.searchTags = data;
              });
            } else {
              this.searchDocuments = data;
              this.searchAllTags().then((data) => {
                this.searchTags = data;
              });
            }
          });
      });
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
          var endpoint = this.endpointSearchDocument;
        } else {
          var endpoint = this.endpointSearchWriting;
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
            if (data.length == 0) {
              resolve([]);
            } else {
              resolve(data);
            }
          });
      });
    },

    searchAllFoldersDocuments() {
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
          var endpoint = window.ENDPOINT + "/search/folders/writings";
        } else {
          var endpoint = this.endpointSearchWriting;
        }

        fetch(endpoint, requestOptions)
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

    search() {
      //  searchDocuments:[],
      // searchFolders:[],
      // searchTags : [],
      this.$Progress.start();

      this.searchAllDocuments().then((data) => {
        this.searchDocuments = data;
      });

      this.searchAllTags().then((data) => {
        this.searchTags = data;
      });

      this.searchAllFoldersDocuments().then((data) => {
        this.searchFoldersDocuments = data;
      });

      this.$Progress.finish();
    },

    pause() {},
    hover() {},
  },
};
</script>
