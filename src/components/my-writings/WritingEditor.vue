<script setup>
import { ref, onMounted } from 'vue'
import DocumentDropdown from '@/components/platform/DocumentDropdown.vue'
import buttonShare from '../platform/share-button-writting-private.vue'
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { Quill, QuillEditor } from "@vueup/vue-quill";
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import quillTable from "quill-table";

Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);
Quill.register(quillTable.TableCell);
Quill.register(quillTable.TableRow);
Quill.register(quillTable.Table);
Quill.register(quillTable.Contain);
Quill.register('modules/table', quillTable.TableModule);


defineProps({
  loadingDocument: {
    type: Boolean,
    default: false
  },
  document: {
    type: Object,
    required: true
  },
})

const quill = ref(null)


onMounted(() => {
  const maxRows = 10;
  const maxCols = 5;
  const tableOptions = [];
  for (let r = 1; r <= maxRows; r++) {
    for (let c = 1; c <= maxCols; c++) {
      tableOptions.push('newtable_' + r + '_' + c);
    }
  }

  const addCampos = 'ql-customb'

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['image', 'video'],
    [{ table: tableOptions }, { table: 'append-row' }, { table: 'append-col' }],


    ['clean']                                         // remove formatting button
  ];

  setTimeout(() => {
    quill.value = new Quill('#editor-full', {
      theme: 'snow',
      placeholder: 'Inicializando la aplicacion',
      modules: {
        table: true,
        toolbar: toolbarOptions,
        // imageDropAndPaste: {
        //   handler: imageHandler
        // },
      }
    });
    //   quill.value = new Quill('#editor-full2', {
    //     theme: 'snow',
    //     placeholder: 'Edit text',
    //     modules: {
    //       // table: true,
    //       // toolbar: this.toolbarOptions,
    //       // imageDropAndPaste: {
    //       //     handler: this.imageHandler
    //       // },
    //     }
    //   });
    // }, 1000);
    // quill.value = new Quill('#editor-modal', {
    //   theme: 'snow',
    //   placeholder: 'Edit text',
    //   modules: {
    //     // table: true,
    //     // toolbar: this.toolbarOptions,
    //     // imageDropAndPaste: {
    //     //     handler: this.imageHandler
    //     // },
    //   }
    // });
  }, 200)
})

</script>

<template>
  <div class="col-md-6 scroll-size-medium" style="
    border-left: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6;
    padding: 0;
    height: calc(100vh - 70px);
    overflow: hidden;
    overflow-y: auto;
    position: relative;
  ">
    <div v-if="!document" class="spinner-border spinner-border-sm" role="status" style="position: absolute">
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else class="col-12" style="padding: 10px">
      <div class="row">
        <div class="col-md-8">
          <!-- <b>{{ document.data.title }}</b> -->
        </div>
        <div class="col-md-4 text-right">

          <DocumentDropdown :document="document" @go-edit-private="goEditPrivate(document)"
            @open-modal-move-document="openModalMoveDocument()" @open-modal-add-tags="openModalAddTags()"
            @save-share="saveShare(1, activeDocumentId)" @delete-document="deleteDocument(activeDocumentId)"
            @open-compartir-privada="openCompartirPrivada()" />

          <span v-if="document.data.complete == 0">
            <a href="#" style="margin:5px" class="textHover" v-tooltip="'Expandir'" v-if="document.data.form_complete"
              @click="getDocumentModal(document._id)">
              <img src="@/assets/expandir.svg" style="width:14px;height:14px;margin-right:5px" />
              <span>Expandir</span>
            </a>

          </span>

          <a href="#" style="margin:5px" class="textHover" v-tooltip="'Expandir'" v-if="document.data.complete == 1"
            @click="openFullScreen()">
            <img src="@/assets/expandir.svg" style="width:14px;height:14px;margin-right:5px" />
            <span>Expandir</span>
          </a>


          <component v-if="document.data.complete == 1">
            <div class="dropdown" style="margin: 5px; display: inline">
              <button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-expanded="false">
                <img src="@/assets/descargar.svg" style="
                  width: 14px;
                  height: 14px; 
                  margin-right: 5px;
                " />
              </button>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" @click.prevent="exportWord()">Documento Word</a>
                <a class="dropdown-item" href="#" @click.prevent="exportPDF()">Documento PDF</a>
              </div>
            </div>
          </component>

          <buttonShare v-bind:id="document.data.id_share_comuniy" v-if="document.data.share == 1" />
          <!-- Droption Document Component -->
          <DocumentDropdown :document="document" @go-edit-private="goEditPrivate(document)"
            @open-modal-move-document="openModalMoveDocument()" @open-modal-add-tags="openModalAddTags()"
            @save-share="saveShare(1, activeDocumentId)" @delete-document="deleteDocument(activeDocumentId)"
            @open-compartir-privada="openCompartirPrivada()" />

          <!-- <component v-bind:document="document" v-if="document.data.complete == 0">
          <div class="dropdown" style="margin: 5px; display: inline">
            <a type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
              <img src="@/assets/menu.svg" style="width: 14px;
                  height: 14px;
                  margin-right: 5px;" />
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="#" @click.prevent="goEditPrivate(document)">
                <img src="@/assets/edit.svg" style="width: 14px;
                  height: 14px;
                  margin-right: 5px;" />
                Editar</a>


              <a class="dropdown-item" href="#" @click="openModalMoveDocument()">
                <img src="@/assets/mover-carpeta.png" style="width: 14px;
                  height: 14px;
                  margin-right: 5px;" />
                Mover</a>


              <a class="dropdown-item" href="#" @click="openModalAddTags()">
                <img src="@/assets/etiquetas.png" style="width: 14px;
                  height: 14px;
                  margin-right: 5px;" />
                Agregar etiquetas (Privadas)</a>

              <a class="dropdown-item" href="#" @click="saveShare(1, activeDocumentId)">
                <img src="@/assets/candado-abierto(1).png" style="width: 14px;
                  height: 14px;
                  margin-right: 5px;" />
                Hacer Publico</a>

              <a class="dropdown-item" href="#" @click="deleteDocument(activeDocumentId)">
                <img src="@/assets/tacho-de-basura.png" style="width: 14px;
                  height: 14px;
                  margin-right: 5px;" />
                Eliminar</a>
            </div>
          </div>
        </component> -->

          <!-- <component v-bind:document="document" v-if="document.data.complete == 1">
          <div class="dropdown" style="margin: 5px; display: inline">
            <a type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
              <img src="@/assets/menu.svg" style="width: 14px;
                  height: 14px;
                  margin-right: 5px;" />
            </a>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">


              <a class="dropdown-item" href="#" @click="openModalMoveDocument()">
                <img src="@/assets/mover-carpeta.png" style="width: 14px;
                  height: 14px;
                  margin-right: 5px;" />
                Mover</a>


              <a class="dropdown-item" href="#" @click="openModalAddTags()">
                <img src="@/assets/etiquetas.png" style="width: 14px;
                  height: 14px;
                  margin-right: 5px;" />
                Agregar etiquetas (Privadas)</a>

              <a class="dropdown-item" href="#" @click.prevent="openCompartirPrivada(document)"
                v-if="document._id">
                <img src="@/assets/users.svg" style="width: 14px;
                  height: 14px;
                  margin-right: 5px;" />
                Compartir de forma privada</a>

              <a class="dropdown-item" href="#" @click="deleteDocument(activeDocumentId)">
                <img src="@/assets/tacho-de-basura.png" style="width: 14px;
                  height: 14px;
                  margin-right: 5px;" />
                Eliminar</a>
            </div>
          </div>
        </component> -->
        </div>
      </div>
    </div>



    <div v-html='"Para completar este escrito hacé click aca."' @click="getDocumentModal(document._id)" id="editor-full"
      contenteditable="false" style="width: 100%;
            padding: 20px;
            overflow: hidden;
            height: calc(100vh - 206px); 
            overflow-y: auto;
            color:black;">
    </div>
    <!-- <div v-else-if="(!loadingDocument)" id="editor-full2" v-html="contentDocument" contenteditable="true" style=" 
        width: 100%;
        padding: 20px;
        overflow: hidden;
        height: calc(100vh - 206px);
        overflow-y: auto;
        color:black;">
    </div> -->

  </div>
</template>