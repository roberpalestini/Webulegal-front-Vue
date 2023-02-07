export default {
    data() {
        return {
            auth: localStorage.getItem('auth'),
            endpoint: window.ENDPOINT + '/library/get/folders',
            endpointDocumentsAll: window.ENDPOINT + '/library/get/documents',
            endpointDocuments: 'http://api.webu.lt/libraries/folders/documents',
            endpointDocument: 'http://api.webu.lt/document/get',
            endpointGetAll: 'http://api.webu.lt/libraries/folders',
            endpointGetFolder: 'http://api.webu.lt/libraries/folders/parent',
            endpointCreate: 'http://api.webu.lt/libraries/folders/create',
            folders: [],
            documents: [],
            loadingFolders: true,
            loadingDocument: false,
            tagsSelected: [],
            contentDocument: null,
            activeDocumentId: null,
            document: null,
            searchTarget: null,
            createTitle: null,
            createId: 0,
            inputCreate: null,
            modalMoveDocument: false,
            modalRename: false,
            modalCreate: false,
            modalCreateTouchClose: false,
            loadingDocuments: true,
            activeFolderId: 0,
            showContextMenu: false,
            selected: {
                row: {},
                action: "",
                clientX: null,
                clientY: null
            },
            treeDisplayData: [],
        }
    },
    created() {
        document.addEventListener("click", () => {
            this.showContextMenu = false;
            this.selected.row = {};
            this.selected.clientX = null;
            this.selected.clientY = null;
            // setTimeout(() => {
            //    if(this.modalCreateTouchClose) {
            //    this.modalCreate = false;
            //    this.modalCreateTouchClose = false;
            // }
            // },500)
        });
    },
    mounted() {
        this.getAllDocuments();
        this.loadFolders();
    },
    computed: {
        filteredResources() {
            if (this.searchTarget) {
                return this.folders.filter((item) => {
                    console.log(item.title.startsWith(this.searchTarget))
                    return item.title.startsWith(this.searchTarget);
                })
            } else {
                console.log(this.folders)
                return this.folders;
            }
        },
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
                            "color": "#1200FF",
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
                        state: false,
                    },
                    collapsed: {
                        state: false,
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
                    class: 'add_icon',
                    style: {
                        color: 'red'
                    },
                    fn: this.addNodeFunction,
                    appearOnHover: true,
                },
                editNode: {
                    state: true,
                    fn: null,
                    appearOnHover: true
                },
                deleteNode: {
                    state: true,
                    fn: this.deleteNodeFunction,
                    appearOnHover: true,
                },
                showTags: true,
            };
        },
    },
    methods: {
        openContextmenu(evt, row) {
            this.showContextMenu = true;
            this.selected.row = row;
            this.selected.clientX = (evt.pageX || evt.clientX) + 1 + "px";
            this.selected.clientY = (evt.pageY || evt.clientY) + "px";
            console.log(this.selected)
        },
        getAllDocuments() {
            this.activeFolderId = 0;
            this.loadingDocuments = true;
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: this.auth,
                    // id_tag:idtag,
                    // name:tag
                })
            };
            fetch(this.endpointDocumentsAll, requestOptions).then(response => response.json()).then((data) => {
                console.log(data)
                if (data.error == true) {} else {
                    this.documents = data;
                    this.loadingDocuments = false;
                }
            })
        },
        getDocument(id) {
            this.activeDocumentId = id;
            this.loadingDocument = true;
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: this.auth,
                    id: id,
                    // id_tag:idtag,
                    // name:tag
                })
            };
            fetch(this.endpointDocument, requestOptions).then(response => response.json()).then((data) => {
                if (data.error == true) {} else {
                    this.document = data;
                    this.contentDocument = data.content;
                    this.loadingDocument = false;
                }
            })
        },
        getDocumentsFromFolder(idFolder) {
            this.activeFolderId = idFolder;
            this.loadingDocuments = true;
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: this.auth,
                    id: idFolder,
                })
            };
            fetch(this.endpointDocuments, requestOptions).then(response => response.json()).then((data) => {
                console.log(data)
                setTimeout(() => {
                    if (data.error == true) {} else {
                        this.documents = data;
                        this.loadingDocuments = false;
                    }
                }, 200)
            })
        },
        saveCreate(e) {
            e.preventDefault();
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: this.auth,
                    id_parent: this.createId,
                    title: this.inputCreate,
                })
            };
            fetch(this.endpointCreate, requestOptions).then(response => response.json()).then((data) => {
                console.log(data)
                setTimeout(() => {
                    if (data.error == true) {} else {
                        this.folders = data;
                        this.loadingFolders = false;
                        this.inputCreate = null;
                        this.modalCreate = false;
                    }
                }, 200)
            })
        },
        createfolder(id) {
            this.createId = id;
            this.modalCreate = true;
            this.modalCreateTouchClose = true;
        },
        loadSubFolders(id, index) {
            //   const requestOptions = {
            //       method: "POST",
            //       headers: {
            //           "Content-Type": "application/json"
            //       },
            //       body: JSON.stringify({
            //          auth:this.auth,
            //          id:id
            //       })
            //   };
            //   fetch(this.endpointGetFolder, requestOptions).then(response => response.json()).then((data) => {
            //  console.log(data)
            //        setTimeout(() => {
            //   if(data.error == true) { 
            //      } else {
            //        this.folders[index]['childs'] = data;
            //        this.folders = this.listToTree(this.folders)
            //        this.loadingFolders = false;
            //      } 
            // },200)
            //   })
        },
        loadFolders() {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: this.auth
                })
            };
            fetch(this.endpoint, requestOptions).then(response => response.json()).then((data) => {
                console.log(data)
                setTimeout(() => {
                    if (data.error == true) {} else {
                        this.treeDisplayData = data[0].folders;
                        this.loadingFolders = false;
                    }
                }, 200)
            })
        },
        loadAllDocuments() {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: this.auth
                })
            };
            fetch(this.endpointGetAll, requestOptions).then(response => response.json()).then((data) => {
                this.documents = data;
            })
        },
        search() {
            console.log(this.searchTarget);
        },
        removeFilterTag(index, name) {
            delete this.tagsSelected[index];
            this.tagsSelected = this.tagsSelected.filter(function(a) {
                return typeof a !== 'undefined';
            })
            this.loadingDocuments = true;
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: this.auth,
                    tags: this.tagsSelected,
                    // id_tag:idtag,
                    // name:tag
                })
            };
            fetch(this.endpointDocuments, requestOptions).then(response => response.json()).then((data) => {
                if (data.error == true) {} else {
                    this.documents = data;
                    this.loadingDocuments = false;
                }
            })
        },
        pause() {},
        hover() {},
        myCheckedFunction: function(nodeId, state) {
            console.log(`is ${nodeId} checked ? ${state}`);
            console.log(this.$refs["my-tree"].getCheckedNodes("id"));
            console.log(this.$refs["my-tree"].getCheckedNodes("text"));
        },
        mySelectedFunction: function(nodeId, state) {
            console.log(`is ${nodeId} selected ? ${state}`);
            console.log(this.$refs["my-tree"].getSelectedNode());
        },
        deleteNodeFunction: function(node) {
            const nodePath = this.$refs["my-tree"].findNodePath(node.id);
            const parentNodeId = nodePath.slice(-2, -1)[0];
            if (parentNodeId === undefined) {
                // 'root' node
                const nodeIndex = this.$refs["my-tree"].nodes.findIndex((x) => x.id !== node.id) - 1;
                this.$refs["my-tree"].nodes.splice(nodeIndex, 1);
            } else {
                // child node
                const parentNode = this.$refs["my-tree"].findNode(parentNodeId);
                const nodeIndex = parentNode.nodes.findIndex((x) => x.id !== node.id) - 1;
                parentNode.nodes.splice(nodeIndex, 1);
            }
            console.log("example: remove node", node.id);
        },
        addNodeFunction: function(node) {
            const newNode = {
                text: "Grandchild 2xxs",
                id: Math.floor(Math.random() * 100),
                "state": {
                    "checked": false,
                    "selected": false,
                    "expanded": false
                },
            };
            console.log("example: add node", newNode);
            console.log(node)
            if (node.nodes === undefined) {
                // the node doesn't have childs
                // I use $set to ensure that VueJs detect the change
                node.nodes = [];
                node.nodes.push(newNode);
                // this.$set(node, "nodes", [newNode]);
            } else {
                node.nodes.push(newNode);
            }
            var test = this.treeDisplayData;
            this.treeDisplayData = [];
            this.treeDisplayData = test;
            console.log(this.treeDisplayData)
        },
    }
}