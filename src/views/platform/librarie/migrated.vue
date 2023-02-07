<script setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import { useLibraryStore } from '@/stores/library.js'
import NavBar from '@/components/platform/navbar.vue'
import ColumnLeft from "@/components/platform/left.vue";
import LibraryFolder from "@/components/my-library/LibraryFolder.vue";
import LibraryTags from "@/components/my-library/LibraryTags.vue";
import LibraryDocuments from "@/components/my-library/LibraryDocuments.vue";

const libraryStore = useLibraryStore()
const internalInstance = getCurrentInstance()

const auth = computed(() => localStorage.getItem("auth"))

const documents = ref(libraryStore.libraryDocuments)
const loadingDocuments = ref(false)
const loadingFolders = ref(false)
const loadingTags = ref(false)
const treeDisplayDataFolders = ref(libraryStore.treeDisplayDataFolders)
const tagsSelectedTags = ref()





const tags = ref(libraryStore.libraryTags)

const isActive = ref('folders')
const target = ref('')
const document = ref(documents[0])

const myTree = ref(null)

const setActive = (feat) => {
  isActive.value = feat
}

const loadAllDocuments = async () => {
  loadingDocuments.value = true
  internalInstance.appContext.config.globalProperties.$Progress.start();
  await libraryStore.loadAllDocuments(auth.value)
  // loadingDocuments.value = false
  internalInstance.appContext.config.globalProperties.$Progress.finish();
}


const loadFolders = () => {
  libraryStore.loadFolders(auth.value)
    .then(data => {
      setTimeout(() => {
        if (data.empty) {
          treeDisplayDataFolders.value = [];

          loadingFolders.value = false;
          return;
        }

        if (data.error !== true) {
          treeDisplayDataFolders.value = data;
          // alert(this.treeDisplayData.length)
          loadingFolders.value = false;
        }
      }, 200);
    })
}

const loadTags = () => {
  libraryStore.loadTags(auth.value)
    .then(data => {
      setTimeout(() => {
        if (data.empty) {
          tags.value = [];

          loadingTags.value = false;
          return;
        }

        if (data.error !== true) {
          tags.value = data;
          // alert(this.treeDisplayData.length)
          loadingTags.value = false;
        }
      }, 200);
    })
}

const modalDeleteFolder = () => {
  const nodePath = myTree.value.findNodePath(this.temp.node.id);
  const parentNodeId = nodePath.slice(-2, -1)[0];
  if (parentNodeId === undefined) {
    var test = myTree.value.nodes.findIndex(
      (x) => x.id == this.temp.node.id
    );
    myTree.value.nodes.splice(test, 1);
  } else {
    const parentNode = myTree.value.findNode(parentNodeId);
    // child node
    if (parentNode.nodes === undefined) {
      var test = myTree.value.nodes.findIndex(
        (x) => x.id == this.temp.node.id
      );
      myTree.value.nodes.splice(test, 1);
      $("#staticBackdrop4").modal("hide");
      this.deleteForlderRequest(this.temp.node.id);
      // this.saveFolders();
      return;
      // console.log('CHILD',parentNode.nodes);
    }
    const nodeIndex = parentNode.nodes.findIndex(
      (x) => x.id == this.temp.node.id
    );
    parentNode.nodes.splice(nodeIndex, 1);
  }

  $("#staticBackdrop4").modal("hide");


  this.deleteForlderRequest(this.temp.node.id);
  // this.saveFolders(true);
}

const createDocument = () => {
  this.$Progress.start();
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth: this.auth,
      id: this.documentModal._id,
      doc_original: this.documentModal._id,
      fields: this.documentModal.data.fields,
      content: this.documentModal.data.content,
    }),
  };
  fetch(
    window.ENDPOINT + "/writings/document/create/writing",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      if (this.tagsSelected.length > 0) {
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
            console.log(data);
            if (data.error == true) {
            } else {
              loadingDocuments.value = false;
            }
          });
      } else {
        loadAllDocuments();
      }
      internalInstance.appContext.config.globalProperties.$Progress.finish();
      internalInstance.appContext.config.globalProperties.$toast.success("Documento creado correctamente", {
        position: "bottom-right",
      });
      $("#exampleModalLong").modal("hide");
    });
}

function fixerEditMode(docs) {
  for (var i = docs.length - 1; i >= 0; i--) {
    this.docs[i]._ext = {
      edit_title: false,
      edit_description: false
    }
  }
  return docs;
}

function filteredResourcesTags() {
  console.log("filterresources");
  if (this.searchTargetTags.target) {
    this.searchDocuments();
    return this.itemsTags.filter((item) => {
      return item.data.title
        .toLowerCase()
        .startsWith(this.searchTargetTags.target.toLowerCase());
    });
  } else {
    return this.itemsTags;
  }
}

onMounted(async () => {
  await loadAllDocuments(auth.value).then(() => {
    console.log('load then')

  })
  await loadFolders(auth.value)
  await loadTags(auth.value)

})



</script>

<template>
  <NavBar />

  <main>

    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2" style="height: calc(100vh - 70px); overflow: hidden; overflow-y: auto; padding: 0;">
          <ColumnLeft />
        </div>
        <div class="col-md-10" style="height: calc(100vh - 70px); border: 1px solid #e2e2e2; position: relative;">
          <div class="row" style="padding-right: 0px; padding-left: 0px;">


            <!-- Columna Tags y Folders -->
            <div class="col-md-3"
              style="position: relative; overflow: hidden; overflow-y: auto; margin: 0; padding-right: 0px; padding-left: 0px; height: calc(100vh - 70px);">
              <ul class="nav nav-tabs nav-justified">
                <li class="nav-item">
                  <a class="nav-link" @click.prevent="setActive('folders')"
                    :class="{active: isActive === 'folders' }">Carpetas</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" @click.prevent="setActive('tags')"
                    :class="{ active: isActive === 'tags' }">Etiquetas</a>
                </li>
              </ul>
              <div class="tab-content py-3" id="myTabContent">
                <div class="tab-pane fade" :class="{ 'active show': isActive === 'folders' }" id="folders">
                  <div class="col-12 text-center"
                    style="padding-top: 8.5px; padding-bottom: 8.5px; border-bottom: 1px solid #e5e5e5;">
                    <input type="text" class="form-control type-input-3" v-model="target" @keyup="search()"
                      placeholder="Buscar..." />
                  </div>
                  <LibraryFolder :items="treeDisplayDataFolders" :loading-folders="loadingFolders" />
                </div>
                <div class="tab-pane fade" :class="{ 'active show': isActive === 'tags' }" id="tags">
                  <div class="col-12 text-center"
                    style="padding-top: 8.5px; padding-bottom: 8.5px; border-bottom: 1px solid #e5e5e5;">
                    <input type="text" class="form-control type-input-3" v-model="target" @keyup="search()"
                      placeholder="Buscar..." />
                  </div>
                  <LibraryTags :items="tags" :loading-tags="loadingTags" :tagsSelectedTags="tagsSelectedTags" />
                </div>
              </div>
            </div>


            <!-- Columna with documents or writings -->
            <div class="col-md-3"
              style="border-left:1px solid  #e6e6e6;border-right:1px solid  #e6e6e6;padding:0;height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;position:relative">

              <LibraryDocuments @:emits="fixerEditMode(documents)" :documents="documents" />





            </div>

            <!-- Text editor -->
            <div class="col-md-6 scroll-size-medium"
              style="border-left:1px solid  #e6e6e6;border-right:1px solid  #e6e6e6;padding:0;height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;position:relative">
              <div class="spinner-border spinner-border-sm" role="status" v-if="loadingDocument"
                style="position:absolute">
                <span class="sr-only">Loading...</span>
              </div>
              <div class="col-12" v-if="document" style="padding:10px">
                <div class="row">
                  <div class="col-md-8">
                    <b>{{ document.data.title }}</b>
                  </div>
                  <div class="col-md-4 text-right">
                    <!-- this full screen is repeated block code, and this.. -->
                    <a href="#" style="margin:5px" @click="openFullScreen()">
                      <img src="@/assets/expandir.svg" style="width:14px;height:14px;margin-right:5px" />
                    </a>


                    <component v-if="document.data.complete == 0">
                      <div class="dropdown" style="margin:5px;display:inline">
                        <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton"
                          data-toggle="dropdown" aria-expanded="false">
                          <img src="@/assets/descargar.svg" style="width:14px;height:14px;margin-right:5px" />
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" href="#" @click.prevent="exportWord()">Documento Word</a>
                          <a class="dropdown-item" href="#" @click.prevent="exportPDF()">Documento PDF</a>
                        </div>
                      </div>
                    </component>

                    <buttonShare v-bind:id="document.data.id_share_comuniy" v-if="document.data.share == 1" />

                  </div>
                </div>
              </div>

              <div id="editor2" style="width:100%;padding:20px;color:black" v-html="contentDocument">
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  </main>

</template>


<style>
@import '@/assets/platform.css';
</style>

