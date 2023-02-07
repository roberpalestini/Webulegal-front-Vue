<script setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import { useWritingStore } from '@/stores/writings'
import NavBar from '@/components/platform/navbar.vue'
import ColumnLeft from "@/components/platform/left.vue";
import WritingFolder from "@/components/my-writings/WritingFolder.vue";
import WritingTags from "@/components/my-writings/WritingTags.vue";
import WritingList from "@/components/my-writings/WritingList.vue";
import WritingEditor from '../../../components/my-writings/WritingEditor.vue';

const writingStore = useWritingStore()
const internalInstance = getCurrentInstance()

const auth = computed(() => localStorage.getItem("auth"))

const documents = ref(writingStore.documents)
const document = computed(() => writingStore.document)
const activeDocumentId = ref(writingStore.activeDocumentId)
const loadingDocuments = ref(false)
const loadingTags = ref(false)
const isActive = ref('folders')
const target = ref('')

const myTree = ref(null)

const setActive = (feat) => {
  isActive.value = feat
  console.log(writingStore)
}

const loadAllDocuments = async () => {
  loadingDocuments.value = true
  internalInstance.appContext.config.globalProperties.$Progress.start();
  await writingStore.loadAllDocuments(auth.value)
  loadingDocuments.value = false
  internalInstance.appContext.config.globalProperties.$Progress.finish();
}
const search = () => {
  if (!target.value) {
    loadAllDocuments();
    return;
  }

  internalInstance.appContext.config.globalProperties.$Progress.start();
  loadingDocuments.value = true;
  writingStore.searchDocuments(auth.value, target.value)
    .then(() => {
      loadingDocuments.value = false;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
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

// What about the private share, and when it send mail , set shared-with userid ? its working?
// whatahoookk
// idid, using pinia, gettin all documents, then save in state document[], so there we have the array of documents we get in the first request
// there is a lot to change though. Take a look into stores/writings.js
// currently im hating this base we got, but this will be areson to recontractor me/us again when PO watch old-new versions
// im going to push branch in github so there he will be diffs
// now im going to continue to clean all cards as i can in trello, 
// Sure, I think share in private is complete yesterday (?)
// I am not sure though. I will try to share with you. What is your user email?
// mine is robertoadrianpalestini@yahoo.com.arm
// , open for a meet?
// after this
// ok i think its okey if u are focus
// Already shared, please check your email
// got email, and i have the link in <a> lets open
// okey, atm the link with https://webulegal.com/platform/document/638e9d5903e1c2280e8c697a hass baseurl from webu, im handling the url just 1 time, i preffer to dont touch this
// sure
// your user can read the file with this id? http://localhost:3000/platform/document/638e9d5903e1c2280e8c697a
// ah yes, that's one is the issue, I am still troubleshooting it
// for now, if we safe this file, the page will be broken. I will try to migare it from option api (below) to composition api (current with setup beside script)
onMounted(async () => {
  await loadAllDocuments(auth.value)
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
                  <WritingFolder :items="documents" @load-all-documents="loadAllDocuments" />
                </div>
                <div class="tab-pane fade" :class="{ 'active show': isActive === 'tags' }" id="tags">
                  <div class="col-12 text-center"
                    style="padding-top: 8.5px; padding-bottom: 8.5px; border-bottom: 1px solid #e5e5e5;">
                    <input type="text" class="form-control type-input-3" v-model="target" @keyup="search()"
                      placeholder="Buscar..." />
                  </div>
                  <WritingTags :items="documents" :loading-tags="loadingTags" />
                </div>
              </div>
            </div>


            <WritingList :loading-documents="loadingDocuments" />

            <WritingEditor :document="document" :active-document-id="activeDocumentId" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style>
@import '@/assets/platform.css';
</style>

