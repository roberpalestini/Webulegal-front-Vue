<script setup>
import NewTagModal from "@/components/platform/new-tags-suggest.vue";

defineProps({
  loadingTags: {
    type: Boolean,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  tagsSelectedTags: {
    type: Array,
    default: () => []
  }
})



</script>

<template>
  <div class="col-12" style="padding-top: 10px; padding-bottom: 10px">
    <div class="spinner-border spinner-border-sm" role="status" v-if="loadingTags">
      <span class="sr-only">Loading...</span>
    </div>
    <a href="#" style="font-size: 13px; font-weight: 600" @click.prevent="openNewTag()">
      <img src="@/assets/admin-add.png" style="width: 20px" />
      Nueva etiqueta</a>
    <NewTagModal style="z-index: 1000" />


    <hr />
    <a href="#" style="font-size: 13px; font-weight: 600" @click.prevent="loadAllDocuments()">
      Todos los documentos</a>
    <hr />

    <div class="col-12 text-left" style="padding: 0" v-if="tagsSelectedTags.length > 0">
      <p style="font-size: 13px; font-weight: 600">Filtros :</p>
      <ul
        style="padding: 0px; list-style: none; width: 100%; display: flex; justify-content: flex-start; align-items: center; flex-direction: column; align-content: flex-start;">
        <li
          style="width: 100%; display: flex; justify-content: flex-start; align-items: flex-start; flex-direction: column; align-content: flex-start; margin-bottom: 5px;"
          v-for="(tagSelectedTags, index) in tagsSelectedTags">
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
                          ">{{ tagSelectedTags.title }}
            <a href="#" style="margin-left: 10px" @click="removeFilterTags(index, tagSelectedTags.title)"><i
                class="fas fa-times"></i></a>
          </a>
        </li>
      </ul>
      <hr />
    </div>

    <ul style="padding: 0; margin: 0; width: 100%; list-style: none" v-if="items">
      <li style="
                        padding: 0;
                        margin: 0;
                        width: 100%;
                        list-style: none;
                        line-height: 15px;
                        margin-bottom: 15px;
                      " v-for="item in filteredResourcesTags" :key="index" @click.prevent="
                        getDocumentsByTag(item._id, item.data.title)
                      ">
        <a href="#" style="color: black; font-weight: 600; font-size: 12px">{{ item.data.title }}</a>
      </li>
    </ul>
  </div>
</template>