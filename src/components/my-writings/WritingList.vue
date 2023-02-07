<script setup>
import { toRefs, computed, ref, getCurrentInstance } from 'vue'
import { useWritingStore } from '@/stores/writings'


const props = defineProps({
  loadingDocument: {
    type: Boolean,
    default: false
  }
})

const internalInstance = getCurrentInstance()

const { loadingDocument } = toRefs(props)

const writingStore = useWritingStore()
const auth = computed(() => localStorage.getItem("auth"))

const fixerEditMode = computed(() => writingStore.fixerEditMode)
const document = computed(() => writingStore.document)



const getDocument = (id) => {
  internalInstance.appContext.config.globalProperties.$Progress.start();
  loadingDocument.value = true;
  writingStore.loadDocument(auth.value, id)
    .then(() => {
      loadingDocument.value = false;
      // document.value = doc
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    })
}
const getDocumentModal = (id) => {
  internalInstance.appContext.config.globalProperties.$Progress.start();
  loadingDocument.value = true;
  writingStore.loadDocument(auth.value, id)
    .then(() => {

      if (!document.value.data.version) {
        // this.version = '1.00';
      }

      if (data.data.complete == 0) {
        if (data.data.form_complete) {
          // documentModal = data
          // contentDocument = data.content;

          if (data.data.version) {
            // this.version = '2.00';
          }

          openmodalcomplete();
        }
      }
      loadingDocument.value = false;
      internalInstance.appContext.config.globalProperties.$Progress.finish();
    })
}

const previewText = () => {
  // const requestOptions = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     auth: this.auth,
  //     id: this.documentModal._id,
  //     fields: this.documentModal.data.fields,
  //   }),
  // };
  // fetch(this.endpointTextPreview, requestOptions)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     this.documentModal.data.content = data.content;
  //     console.log(data.content)
  //   });
}

const openmodalcomplete = () => {
  $("#exampleModalLong").modal("show");
  previewText();
}
</script>

<template>
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

    <div class="spinner-border spinner-border-sm" role="status" v-if="loadingDocument" style="position: absolute">
      <span class="sr-only">Loading...</span>
    </div>

    <div v-else class="col-12"
      style="padding: 15px; border-bottom: 1px solid #e6e6e6; cursor: pointer; position: relative;"
      v-for="(document, index) in fixerEditMode" :key="index" @click="getDocument(document._id)"
      @contextmenu.prevent="openContextmenu($event, document, index)">
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

      <a href="#" v-tooltip="'Editar Descripcion'">
        <p class="edit-mode" style="color: #525252; font-size: 12px" v-if="!document._ext.edit_description">
          {{ document.data.description }}
          <img src="@/assets/boligrafo.png" @click.prevent="document._ext.edit_description = true" />

        </p>
      </a>


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




      <div style="position:absolute:top:0:right:0;height:100%">
        <a href="#" v-tooltip="'Documento privado'">
          <img src="@/assets/cerrar-con-llave.svg" style="height: 20px; width: 20px" v-if="document.data.share == 0" />

        </a>
        <a href="#" v-tooltip="'Documento publico'">
          <img src="@/assets/candado-abierto(2).png" style="height: 20px; width: 20px"
            v-if="document.data.share == 1" />

        </a>
        <a href="#" v-tooltip="'Automatizado'">
          <img src="@/assets/automatizado.svg" style="height: 20px; width: 20px" v-if="document.data.complete == 1" />
        </a>
        <a href="#" v-tooltip="'Modelo'">
          <span v-if="document.data.complete == 0">
            <img src="@/assets/a-automatizar.svg" style="height: 20px; width: 20px; cursor: pointer"
              v-if="document.data.form_complete" @click="getDocumentModal(document._id)" />
          </span>
        </a>
      </div>
    </div>
  </div>
</template>