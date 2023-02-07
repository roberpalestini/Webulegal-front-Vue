<script setup>
import { ref, onMounted, computed } from 'vue'
import Tree from "vuejs-tree";
import { useWritingStore } from '@/stores/writings'

defineProps({
  items: {
    type: Array,
    required: true
  },
})

const emit = defineEmits(['loadAllDocuments'])

const items = ref([])
const treeDisplayData = ref([])
const loadingFolders = ref(false)
const modalCreateNode = ref(null)
const temp = ref({
  index: null,
  node: null,
})
const tagsSelected = ref([])

const writingStore = useWritingStore()
const auth = computed(() => localStorage.getItem("auth"))

const myCustomOptions = computed(() => ({
  treeEvents: {
    expanded: {
      state: true,
      fn: (data, data2) => {
        alert(data);
      },
    },
    collapsed: {
      state: true,
      fn: (data, data2) => {
        alert(data);
      },
    },
    selected: {
      state: false,
      fn: (nodeId, state) => {
        console.log(`is ${nodeId} selected ? ${state}`);
        console.log(this.$refs["my-tree"].getSelectedNode());
        // this.$refs['my-tree-2'].getSelectedNode().$el.classList.add('some-class')
      },
    },
    checked: {
      state: false,
      fn: () => { },
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
    fn: (node) => {
      $("#staticBackdrop2").modal("show");
      modalCreateNode.value = node;
    },
    appearOnHover: true,
  },
  editNode: {
    state: true,
    fn: (node, index) => {
      console.log("deleteforlder", node, index);
      temp.value = {
        index: index,
        node: node,
      };
      $("#staticBackdrop4").modal("show");
      return;
    },
    appearOnHover: true,
  },
  deleteNode: {
    state: false, //mostrar opc
    fn: () => { },
    appearOnHover: true,
  },
  showTags: true,
}))

const myCustomStyles = computed(() => ({
  tree: {
    style: {
      height: "auto",
      maxHeight: "300px",
      overflowY: "visible",
      display: "inline-block",
      textAlign: "left",
    },
  },
  editNode: {
    class: "button-edit-tree",
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
}))

const prepareArray = (data) => {
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
}

const loadFolders = async () => {
  writingStore.loadFolders(auth.value)
    .then(data => {
      setTimeout(() => {
        if (data.empty) {

          treeDisplayData.value = [];
          items.value = []
          loadingFolders.value = false;
          return;
        }

        if (data.error !== true) {
          treeDisplayData.value = prepareArray(data);
          // alert(this.treeDisplayData.length)
          loadingFolders.value = false;
          items.value = data
        }
      }, 200);
    })
}

const loadDocuments = () => {
  emit('loadAllDocuments')
}

function filteredResources() {
  if (this.searchTargetFolders.target) {
    return items.filter((item) => {
      console.log(item.text.startsWith(this.searchTargetFolders.target));
      return item.text.startsWith(this.searchTargetFolders.target);
    });
  } else {
    return items.value;
  }
}

onMounted(async () => {
  await loadFolders(auth.value).then((x) => {
    console.log(x)
    console.log(items)
    console.log(writingStore)
  })
})
</script>

<template>
  <div class="col-12" style="padding-top: 10px; padding-bottom: 0">
    <div class="spinner-border spinner-border-sm" role="status" v-if="loadingFolders.value">
      <span class="sr-only">Loading...</span>
    </div>
    <ul style="padding: 0; margin: 0; width: 100%; list-style: none" v-if="items.length > 0">
      <li style="padding: 0; margin: 0; width: 100%; list-style: none;" v-for="item in filteredResources" :key="index"
        @click.prevent="getDocumentsByTag(item.id, item.text)">
        <a href="#" style="color: black; font-weight: 600">
          {{ item.text }}
        </a>
      </li>
    </ul>
  </div>

  <div class="col-12" style="padding-top: 10px; padding-bottom: 10px">
    <a href="#" style="font-size: 13px; font-weight: 600" @click.prevent="openCreateFolderRootModal()">
      <img src="@/assets/admin-add.png" style="width: 20px" />
      Nueva carpeta raiz</a>

    <hr />

    <a href="#" style="font-size: 13px; font-weight: 600" @click.prevent="loadDocuments()">
      Todos los documentos</a>

    <hr />

    <Tree id="my-tree-id" ref="my-tree" :custom-options="myCustomOptions" :custom-styles="myCustomStyles"
      :nodes="treeDisplayData"></Tree>

    <span style="font-size: 12px; font-weight: 500" v-if="treeDisplayData.length == 0">No se
      encontraron
      carpetas.</span>
  </div>

  <div class="col-12 text-center" style="padding-top: 8.5px; padding-bottom: 8.5px; border-bottom: 1px solid #e5e5e5">
    <ul
      style="padding: 0px; list-style: none; width: 100%; display: flex; justify-content: flex-start; align-items: center; flex-direction: column; align-content: flex-start">
      <li
        style="width: 100%; display: flex; justify-content: flex-start; align-items: flex-start; flex-direction: column; align-content: flex-start; margin-bottom: 5px"
        v-for="(tagSelected, index) in tagsSelected"> <!-- <-- where is this coming from? -->
        <a href="#" style="
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
        ">
          {{ tagSelected.text }}
          <a href="#" style="margin-left: 10px" @click="removeFilterTag(index, tagSelected.text)">
            <i class="fas fa-times"></i>
          </a>
        </a>
      </li>
    </ul>
  </div>
</template>