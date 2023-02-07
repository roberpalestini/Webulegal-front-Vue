<script setup>
defineProps({
  loadingDocuments: {
    type: Boolean,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  selectedDocument: {
    type: Array,
    default: () => []
  },
  documents: {
    type: Array,
    default: () => []
  },
  document: {
    type: {
      data: {
        title: null,
        description: null,
        complete: 0,
      }
    },
  }
})


const fixerEditMode = (documents) => {
  for (var i = documents.length - 1; i >= 0; i--) {
    documents[i]._ext = {
      edit_title: false,
      edit_description: false
    }
  }
  return documents;
}

</script>

<template>
  <div class="spinner-border spinner-border-sm" role="status" v-if="loadingDocuments" style="position:absolute">
    <span class="sr-only">Loading...</span>
  </div>


  <div class="col-12" style="padding:15px;border-bottom:1px solid  #e6e6e6;cursor:pointer;position:relative"
    v-for="(document, index) in fixerEditMode(documents)" :key="index" @click="getDocument(document._id)"
    v-bind:class="{ activeDocument: (document._id === activeDocumentId) }"
    @contextmenu.prevent="openContextmenu($event, document, index)">


    <div class="col-12" style="padding:0" v-if="document._ext.edit_title == false">
      <span class="edit-mode">{{ document.data.title }} <img src="@/assets/boligrafo.png"
          @click.prevent="document._ext.edit_title = true" /> </span>
    </div>

    <form @submit.prevent="saveEditMode(document._id, index)" class="col-12 "
      style="padding:0;display:flex;margin-bottom:10px" v-if="document._ext.edit_title">
      <input type="text" class="form-control col-12" v-model="document.data.title"
        style="font-size:13px;border-radius:30px;height:30px;min-height:30px;max-height:30px;background:white;font-weight:700" />
      <button type="submit" hidden="true"></button>
    </form>


    <p class="edit-mode" style="color:#525252;font-size:12px" v-if="!document._ext.edit_description">{{
        document.data.description
    }} <img src="@/assets/boligrafo.png" @click.prevent="document._ext.edit_description = true" />
    </p>


    <form @submit.prevent="saveEditMode(document._id, index)" class="col-12 "
      style="    padding: 0px;display: flex;flex-direction: row;flex-wrap: wrap;margin-bottom:10px"
      v-if="document._ext.edit_description">
      <input type="text" class="form-control" v-model="document.data.description"
        style="font-size:12px;border-radius:8px;height:fit-content;min-height:fit-content;max-height:fit-content;background:white;margin-bottom:5px" />
      <button type="submit" hidden="true"></button>
    </form>


    <DocumentDropdown :document="document" @go-edit-private="goEditPrivate(document)"
      @open-modal-move-document="openModalMoveDocument()" @open-modal-add-tags="openModalAddTags()"
      @save-share="saveShare(1, activeDocumentId)" @delete-document="deleteDocument(activeDocumentId)"
      @open-compartir-privada="openCompartirPrivada()" />


    <div style="position:absolute:top:0:right:0;height:100%">
      <img src="@/assets/cerrar-con-llave.svg" style="height:20px;width:20px;" v-if="document.data.share == 0" />
      <img src="@/assets/candado-abierto(2).png" style="height:20px;width:20px;" v-if="document.data.share == 1" />

      <img src="@/assets/automatizado.svg" style="height:20px;width:20px;" v-if="document.data.complete == 1" />


      <span v-if="document.data.complete == 0">
        <img src="@/assets/a-automatizar.svg" style="height:20px;width:20px;cursor:pointer"
          v-if="document.data.form_complete" @click="getDocumentModal(document._id)" />
      </span>
    </div>
  </div>
</template>

<style>
@import '@/assets/platform.css';

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

.nav-list>li>a {
  color: #C4C4C4;
  font-size: 14px;
  padding-left: 13px !important;
  border-bottom: 1px solid #585858;
}

.nav-list>li>a:hover {
  background-color: #444444;
}

.folder-menu {
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none
}

.folder-menu li {
  padding: 0;
  margin: 0;
  width: 100%;
  list-style: none
}

.folder-menu li a {
  color: black;
  font-weight: 600;
  font-size: 12px;
}

.folder-menu li:hover>.icon-add {
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
  list-style: none
}

.folder-menu-child li a {
  color: black;
  font-weight: 600;
  font-size: 12px;
}

.folder-menu-child li:hover>.icon-add {
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

input[type=checkbox],
input[type=radio] {
  display: none !important;
}

.expanded_icon {
  transform: rotate(0deg);
  transition: all .2s ease;
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
  content: '';
}

.row_data:hover {
  color: #0C00FF !important;
}

.expanded_icon {
  transform: rotate(0deg);
  transition: all .2s ease;
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: -2px 0 4px 8px;
  border-color: transparent transparent transparent #555;
}




.button-add-tree {
  background-image: url('/src/assets/add(1).png');
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  display: block;
  margin-left: 5px;
}

.button-edit-tree {
  background-image: url(/src/assets/trash.png);
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
  display: block;
  margin-left: 5px;
}


.button-move-tree {
  background-image: url(/src/assets/angle-small-right.png);
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
  content: '';
}

.edit-mode {
  color: black;
  font-size: 15px
}

.edit-mode img {
  visibility: collapse;
  width: 15px;
  height: 15px
}

.edit-mode:hover img {
  visibility: visible;
}
</style>

