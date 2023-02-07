<script setup>


defineProps({
  document: {
    required: true
  },
})

const emit = defineEmits(['goEditPrivate', 'goEditDocumentPrivate', 'openModalMoveDocument', 'openModalAddTags', 'saveShare', 'deleteDocument', 'openCompartirPrivada'])

const goEditPrivate = () => {
  emit('goEditPrivate')
}

const goEditDocumentPrivate = () => {
  emit('goEditDocumentPrivate')
}


const openModalMoveDocument = () => {
  emit('openModalMoveDocument')
}

const openModalAddTags = () => {
  emit('openModalAddTags')
}

const saveShare = () => {
  emit('saveShare')
}

const deleteDocument = () => {
  emit('deleteDocument')
}

const openCompartirPrivada = () => {
  emit('openCompartirPrivada')
}
</script>

<template>
  <div v-if="document.data.complete == 0">
    <div class="dropdown" style="margin: 5px; display: inline">
      <a type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
        <img src="@/assets/menu.svg" v-tooltip="'Menu'" style="width: 14px; height: 14px; margin-right: 5px;" />
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#" @click.prevent="goEditPrivate()">
          <img src="@/assets/edit.svg" style="width: 14px; height: 14px; margin-right: 5px;" />
          Editar</a>


        <a class="dropdown-item" href="#" @click="openModalMoveDocument()">
          <img src="@/assets/mover-carpeta.png" style="width: 14px; height: 14px; margin-right: 5px;" />
          Mover</a>


        <a class="dropdown-item" href="#" @click="openModalAddTags()">
          <img src="@/assets/etiquetas.png" style="width: 14px; height: 14px; margin-right: 5px;" />
          Agregar etiquetas (Privadas)</a>

        <a class="dropdown-item" href="#" v-if="document.data.share == 0" @click="saveShare()">
          <img src="@/assets/candado-abierto(1).png" style="width: 14px; height: 14px; margin-right: 5px;" />
          Hacer Publico</a>

        <a class="dropdown-item" href="#" @click.prevent="openCompartirPrivada()"
          v-if="document.data.share == 1 && document.data.idUser == document.data.idUser">
          <img src="@/assets/users.svg" style="width: 14px; height: 14px; margin-right: 5px;" />
          Compartir de forma privada</a>

        <a class="dropdown-item" href="#" @click="deleteDocument()">
          <img src="@/assets/tacho-de-basura.png" style="width: 14px; height: 14px; margin-right: 5px;" />
          Eliminar</a>
      </div>
    </div>
  </div>


  <div v-else-if="document.data.complete == 1">
    <div class="dropdown" style="margin: 5px; display: inline">
      <a type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
        <img src="@/assets/menu.svg" style="width: 14px; height: 14px; margin-right: 5px;" />
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#" @click="openModalMoveDocument()">
          <img src="@/assets/mover-carpeta.png" style="width: 14px; height: 14px; margin-right: 5px;" />
          Mover</a>


        <a class="dropdown-item" href="#" @click="openModalAddTags()">
          <img src="@/assets/etiquetas.png" style="width: 14px; height: 14px; margin-right: 5px;" />
          Agregar etiquetas (Privadas)</a>

        <a class="dropdown-item" href="#" @click.prevent="openCompartirPrivada()" v-if="document._id">
          <img src="@/assets/users.svg" style="width: 14px; height: 14px; margin-right: 5px;" />
          Compartir de forma privada</a>

        <a class="dropdown-item" href="#" @click="deleteDocument()">
          <img src="@/assets/tacho-de-basura.png" style="width: 14px; height: 14px; margin-right: 5px;" />
          Eliminar</a>
      </div>
    </div>
  </div>

  <div v-else="document.data.type == 'document' && document.data.complete != 1">
    <div class="dropdown" style="margin: 5px; display: inline">
      <a type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
        <img src="@/assets/menu.svg" v-tooltip="'Menu'" style="width: 14px; height: 14px; margin-right: 5px;" />
      </a>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#" @click.prevent="goEditDocumentPrivate()">
          <img src="@/assets/edit.svg" style="width: 14px; height: 14px; margin-right: 5px;" />
          Editar</a>


        <a class="dropdown-item" href="#" @click="openModalMoveDocument()">
          <img src="@/assets/mover-carpeta.png" style="width: 14px; height: 14px; margin-right: 5px;" />
          Mover</a>


        <a class="dropdown-item" href="#" @click="openModalAddTags()">
          <img src="@/assets/etiquetas.png" style="width: 14px; height: 14px; margin-right: 5px;" />
          Agregar etiquetas (Privadas)</a>

        <a class="dropdown-item" href="#" v-if="document.data.share == 0" @click="saveShare()">
          <img src="@/assets/candado-abierto(1).png" style="width: 14px; height: 14px; margin-right: 5px;" />
          Hacer Publico</a>

        <a class="dropdown-item" href="#" @click.prevent="openCompartirPrivada()"
          v-if="document.data.share == 1 && document.data.idUser == document.data.idUser">
          <img src="@/assets/users.svg" style="width: 14px; height: 14px; margin-right: 5px;" />
          Compartir de forma privada</a>

        <a class="dropdown-item" href="#" @click="deleteDocument()">
          <img src="@/assets/tacho-de-basura.png" style="width: 14px; height: 14px; margin-right: 5px;" />
          Eliminar</a>
      </div>
    </div>
  </div>
</template>