 <style>
  @import   '@/assets/platform.css';
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
        border: 1px solid #E3E3E3;
        color: #5C5C5C;
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
        border: 1px solid #E3E3E3;
        color: #5C5C5C;
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

     .popnewCategorie {
    position: fixed;
    bottom: 0px;
    right: 0px;
    margin: 15px;
    background: transparent;
    /* padding: 20px; */
    font-size: 12px;
    width: 300px;
     }

     .activeDocument {
    padding: 15px;
    border-bottom: 1px solid rgb(230, 230, 230);
    border-left: transparent !important;
    transition: all 250ms;
     background: #DBDBDB !important;
    opacity: 1 !important;
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
    color: #C4C4C4;
    font-size: 14px;
    padding-left: 13px !important;
    border-bottom: 1px solid #585858;
}

.nav-list > li > a:hover {
    background-color: #444444;
}
.folder-menu {
    padding:0;margin:0;width:100%;list-style:none
}
.folder-menu  li {
padding:0;margin:0;width:100%;list-style:none
}
.folder-menu li a {
    color:black;font-weight:600;font-size:12px;
}
.folder-menu li:hover > .icon-add{
    opacity: 1;
}

.folder-menu li .icon-add {
    opacity: 0;
    float: right;
    cursor: pointer;
}

.folder-menu-child {
       padding:0;margin:0;width:100%;list-style:none;padding-left:10px;
     }

     .folder-menu-child li {
      padding:0;margin:0;width:100%;list-style:none
     }

     .folder-menu-child li a{
      color:black;font-weight:600;font-size:12px;
     }

     .folder-menu-child li:hover > .icon-add{
    opacity: 1;
}

.folder-menu-child li   .icon-add {
    opacity: 0;
    float: right;
    cursor: pointer;
}
.row_data {
	height: 21px;
}

/*.folder_icon_active , .folder_icon {
    display: none !important;
}

input[type=checkbox], input[type=radio] {
      display: none !important;
}*/

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

.row_data:hover {
    color:  #0C00FF !important;
}
.folder {
	 transition: all .2s ease;
    padding-top: 20px;
    padding-bottom: 20px;
    min-height: 200px;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-direction: column !important;
    align-content: center !important;
    min-height: 100px;
    border-radius: 8px;
    background: #ffffff00;
    border: 1px solid #dddddd;
}
.folder:hover {
	 transition: all .2s ease;
	background: #D6E1E6;

}

.modal-content {
   
    border: none;
}

 </style>
<template>
    <navBar /> 
    <main>
        <div class="container-fluid">

            <div class="popnewCategorie">
                Si consideras que es necesario una nueva carpeta dentro de esta seccion, la podes solicitar <a href="#">aca</a>.
            </div>

            <form class="row" @submit.prevent="save()">
               <div class="col-md-2" style="height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;padding:0;"> 
                    <columnLeft />
                </div>
                <div class="col-md-10 text-center" style="padding:20px;border:1px solid #F3F3F3;background:rgb(255,255,255,0.1);height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;padding-top:60px">


                    <!-- Vista Categorias -->
                   <div class="row">
                    <div class="col-md-4"  style="height:calc(100vh - 70px);overflow:hidden;overflow-y:auto;" >
                         

                        <div class="col-md-12" >
                             <h4 style="font-weight:bold;text-align:left;font-size:17px">Navegacion</h4>
                         </div>
                        <div class="col-12 text-left" style="padding-top:30px;padding-bottom:30px">  
                     <a href="#" style="font-size:13pX;font-weight:600;" @click.prevent="openCreateFolderRootModal()"> <img src="@/assets/admin-add.png" style="width:20px;" /> Nueva carpeta raiz</a>

                              <hr />



<Tree
      id="my-tree-id"
      ref="my-tree"
      :custom-options="myCustomOptions2"
      :custom-styles="myCustomStyles2"
      :nodes="treeDisplayData"
    ></Tree>
 

<ul style="padding: 0px;list-style: none;width: 100%;display: flex;justify-content: flex-start;align-items: center;flex-direction: column;align-content: flex-start;">
    <li style="width: 100%;display: flex;justify-content: flex-start;align-items: flex-start;flex-direction: column;align-content: flex-start;margin-bottom:5px"  v-for="(item, index)   in pathMoveSelected"  >
         <a href="#" style="font-size: 12px;padding: 5px;background: rgb(234, 234, 234);border-radius: 30px;    display: flex;place-content: flex-start;align-items: center;flex-direction: row;padding-left:10px;padding-right:10px">{{item.text}} 
           <a href="#" style="margin-left:10px" @click="pathMoveSelectedRemove(index,item.id)"><i class="fas fa-times"></i></a>
          </a>
</li>
</ul>




                        </div> 
                    </div>

                     <div class="col-md-8  text-left"  style="    height: calc(100vh - 70px);
    border-left: 1px solid #e0e0e0;
   
    border-top: 1px solid #e0e0e0;
    padding: 20px; overflow:hidden;overflow-y:auto;" @contextmenu.prevent="openContextmenu($event, document)" > 


                     	<h4 style="text-align:left">{{nodeSelect.text}}</h4>

                       <span v-if="nodeSelect.nodes">
                          <span  v-if="nodeSelect.nodes.length === 0"> No se encontraron carpetas..</span>
                        </span>

                        <span v-if="!nodeSelect.nodes">
                          No se encontraron carpetas.. 
                        </span>

                         

                     	<div class="row" >

                     		<div class="col-3" style="padding:5px" v-for="(folder,index) in nodeSelect.nodes">
                				<div class="col-12 text-center folder"    >
                				  <img src="@/assets/admin-folder.png"    style=" cursor: pointer;" @click.prevent="selectPathMoveChild(folder)"   />
                				  <p class="text-center" style="font-size:13px;font-weight:500; cursor: pointer;" @click.prevent="selectPathMoveChild(folder)"    >{{folder.text}}</p>
                				  
                          <a style="position:absolute;top:0;right:0;margin:5px" href="#" @click.prevent="openModalEdit(folder,index)"> <img src="@/assets/boligrafo.png" style="width:15px;height:15px" /></a>


                           <a style="position:absolute;top:30;right:0;margin:5px" href="#" @click.prevent="deleteFolder(folder,index)"> <img src="@/assets/delete.png" style="width:15px;height:15px" /></a>
                			    </div>
                			</div> 

                			 

                		</div>

                        
                             

                         
                     </div>

                </div>

 


                </div>
            </form> 
        </div>
    </main> 

    <div class="box" @contextmenu="onContextMenu($event)" style="position:fixed;z-index:1000;background:#fdfafa;width:auto;height:auto;padding:0; 
    border: 1px solid #e1e1e1; border:1px solid #E2E2E2 !important;
    background: #f3f1f1;  transition: all .2s ease;" :style="{ top: selected.clientY   ,left : selected.clientX  }">
  <ul style="padding:0;margin:0;list-style:none">
   <!--  <li style="padding:0;margin:0;list-style:none;padding-top:6px;padding-bottom:6px; border-bottom: 1px solid rgb(225 225 225 / 48%)">
        <a href="#" style="font-size:11px;font-weight:600;color:black;" @click="modalRename = true;">Cambiar nombre</a>
    </li> -->
    <li style="padding:0;margin:0;list-style:none;padding-top:6px;padding-bottom:6px;padding:10px" @click="openModalCreateFolder()">
        <a href="#" style="font-size:11px;font-weight:600;color:black;"  > <img src="@/assets/admin-add.png" /> Carpeta nueva</a>
    </li> 

     

     
</ul>
</div>

















<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <form class="modal-content" @submit.prevent="createFolder()">
      <div class="modal-header" style="border:none">
        <h5 class="modal-title" id="staticBackdropLabel" style="font-size:15px;">Nueva carpeta</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control" style="    border: 1px solid #DDDDDD;
    border-radius: 5px;
    height: 30px;
    padding: 5px;
    max-height: 30px;
    min-height: 36px;background:transparent"    v-model="nameNewFolder.title" required="true" />
      </div>
      <div class="modal-footer" style="border:none"> 
        <button type="submit" class="btn btn-primary" style="font-size:15px">Crear carpeta</button>
      </div>
    </form>
  </div>
</div>




<div class="modal fade" id="staticBackdrop3" data-backdrop="static" data-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <form class="modal-content" @submit.prevent="createFolderRoot()">
      <div class="modal-header" style="border:none">
        <h5 class="modal-title" id="staticBackdropLabel" style="font-size:15px;">Nueva carpeta</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control" style="    border: 1px solid #DDDDDD;
    border-radius: 5px;
    height: 30px;
    padding: 5px;
    max-height: 30px;
    min-height: 36px;background:transparent"    v-model="nameNewFolder.title" required="true" />
      </div>
      <div class="modal-footer" style="border:none"> 
        <button type="submit" class="btn btn-primary" style="font-size:15px">Crear carpeta</button>
      </div>
    </form>
  </div>
</div>





<!-- Modal -->
<div class="modal fade" id="staticBackdrop2" data-backdrop="static" data-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <form class="modal-content" @submit.prevent="editFolder()">
      <div class="modal-header" style="border:none">
        <h5 class="modal-title" id="staticBackdropLabel" style="font-size:15px;">Editar carpeta</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control" style="    border: 1px solid #DDDDDD;
    border-radius: 5px;
    height: 30px;
    padding: 5px;
    max-height: 30px;
    min-height: 36px;background:transparent"    v-model="nameEditFolder.title" required="true" />
      </div>
      <div class="modal-footer" style="border:none"> 
        <button type="submit" class="btn btn-primary" style="font-size:15px">Guardar</button>
      </div>
    </form>
  </div>
</div>





<!-- Modal -->
<div class="modal fade" id="staticBackdrop4" data-backdrop="static" data-keyboard="true" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-sm">
    <form class="modal-content" @submit.prevent="modalDeleteFolder()">
      <div class="modal-header" style="border:none">
        <h5 class="modal-title" id="staticBackdropLabel" style="font-size:15px;">Eliminar carpeta</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body text-danger">
      Esta accion no se puede deshacer
      </div>
      <div class="modal-footer" style="border:none"> 
        <button type="submit" class="btn btn-primary" style="font-size:15px">Eliminar</button>
      </div>
    </form>
  </div>
</div>


</template>





 


 


<script>
import Tree from 'vuejs-tree'
export default {
    data() {
        return {
           
            data: {},
            auth: localStorage.getItem('auth'),
       
              
            endpointGetAll: window.ENDPOINT + '/folders/default/documents',

            endpointSave: window.ENDPOINT + '/folders/default/documents/edit',

           

            leaveFolderItem : false,
            targetEditIndex : 0,
            nameEditFolder:{ title : null },
 
             showContextMenu: false,
            selected: {
                row: {},
                action: "",
                clientX: null,
                clientY: null
            },


            showContextMenuFolder: false,
            selectedFolder: {
                row: {},
                action: "",
                clientX: null,
                clientY: null
            },


             


           nameNewFolder : { title : null },


            modalCreate: false,
            inputCreate: null,
            categories: [],
            categoriesSelected: [],
            tags: [],
            tagSelected: [],
            title: null,
            description: null,
            id_document: this.$route.params.id,
            nodeSelect :  [],
            pathMoveSelected:[],
            treeDisplayData: [],
            temp:{
                index : null,
                node : null
            }
        }
    },
    created() {
      document.addEventListener("click", () => {
            this.showContextMenu = false;
            this.selected.row = {};
            this.selected.clientX = null;
            this.selected.clientY = null; 
        });


  },
    mounted() {
        this.getFolderAll();
    },
    computed: {
       
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
               addNode: {
                    class: 'button-add-tree',
                    style: {
                        color: '#EE5F5B'
                    }
                },
                 editNode: {
                    class: 'button-edit-tree',
                    style: {
                        color: '#EE5F5B'
                    }
                },
                deleteNode: {
                    class: 'button-move-tree',
                    style: {
                        color: '#EE5F5B'
                    }
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
        myCustomOptions2() {
            return {
                treeEvents: {
                    expanded: {
                        state: true,
                        fn: this.expandTreeFunction,
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
                    state: true, 
                    fn: (node) => {
                          this.nodeSelect = node;
                          this.openModalCreateFolder();
                    },
                    appearOnHover: false,
                },
                editNode: {
                    state: true,
                    fn: this.deleteFolder,
                    appearOnHover: false
                },
                deleteNode: {
                    state: true,
                    fn: this.selectPathMove,
                    appearOnHover: false,
                },
                showTags: true,
            };
        },
    },
    methods: {
        modalDeleteFolder() {
 console.log('target delete',this.temp)
           

            const nodePath = this.$refs["my-tree"].findNodePath(this.temp.node.id);


       

      const parentNodeId = nodePath.slice(-2, -1)[0];
      if (parentNodeId === undefined) { 
        console.log('noCHILD');
       var test =    this.$refs["my-tree"].nodes.findIndex((x) => x.id == this.temp.node.id)  
        this.$refs["my-tree"].nodes.splice(test, 1); 
      } else {
        const parentNode = this.$refs["my-tree"].findNode(parentNodeId);

        // child node
        if(parentNode.nodes === undefined) {
            var test =    this.$refs["my-tree"].nodes.findIndex((x) => x.id == this.temp.node.id)  
            this.$refs["my-tree"].nodes.splice(test, 1); 
            $('#staticBackdrop4').modal('hide')
            this.saveFolders();
         return;

          // console.log('CHILD',parentNode.nodes);
        }
         
        const nodeIndex =
        parentNode.nodes.findIndex((x) => x.id == this.temp.node.id);
        parentNode.nodes.splice(nodeIndex, 1);
      } 
       $('#staticBackdrop4').modal('hide')
       this.saveFolders();


        },
      deleteFolder(node,index) {
      console.log('deleteforlder',node,index)

       this.temp = {
                index : index,
                node : node
            };

      $('#staticBackdrop4').modal('show')
      return;
 
  //     const nodePath = this.$refs["my-tree"].findNodePath(node.id);


       

  //     const parentNodeId = nodePath.slice(-2, -1)[0];
  //     if (parentNodeId === undefined) { 
  //      var test =    this.$refs["my-tree"].nodes.findIndex((x) => x.id == node.id)  
  //       this.$refs["my-tree"].nodes.splice(test, 1); 
  //     } else {
  //       // child node
  //       const parentNode = this.$refs["my-tree"].findNode(parentNodeId);
  //       const nodeIndex =
  //       parentNode.nodes.findIndex((x) => x.id == node.id);
  //       parentNode.nodes.splice(nodeIndex, 1);
  //     } 
  // this.saveFolders();
    },


      editFolder()  {
        this.nodeSelect.nodes[this.targetEditIndex].text = this.nameEditFolder.title;
        this.nameEditFolder = {title : null};
        $('#staticBackdrop2').modal('hide') 

          this.saveFolders();
           
      },

      openModalEdit(folder,index)  {
        this.targetEditIndex = index;
        $('#staticBackdrop2').modal('show')
           
      },
    	openModalCreateFolder() {
    		$('#staticBackdrop').modal('show')
    	},

        openCreateFolderRootModal() {
                $('#staticBackdrop3').modal('show')
            },
    	expandTreeFunction(nodeId) { 
          this.selectPathMove(this.$refs['my-tree'].findNode(nodeId))
    	},

   
    	 openContextmenu(evt, row) {
         // console.log('context',evt,row)
            this.showContextMenu = true;
            this.selected.row = row;
            this.selected.clientX = (evt.pageX || evt.clientX) + 1 + "px";
            this.selected.clientY = (evt.pageY || evt.clientY) + "px";
            this.selectedIdDocument = row._id;

            this.pathMoveSelected = row.data.categories; 
        },

        createFolderRoot() {
            const newNode = {
                text: this.nameNewFolder.title,
                id: Math.floor(Math.random() * 100),
                "state": {
                    "checked": false,
                    "selected": false,
                    "expanded": false
                },
            }; 
         
                this.treeDisplayData.push(newNode);
           
            $('#staticBackdrop3').modal('hide')
             this.nameNewFolder = {title:null};
             this.$Progress.finish(); 
            this.saveFolders();
        },

        createFolder(e = null) {
           this.$Progress.start();
            // e.preventDefault();
            const newNode = {
                text: this.nameNewFolder.title,
                id: Math.floor(Math.random() * 100),
                "state": {
                    "checked": false,
                    "selected": false,
                    "expanded": false
                },
            }; 
            
            if (this.nodeSelect.nodes === undefined) {
                // the node doesn't have childs
                // I use $set to ensure that VueJs detect the change
                this.nodeSelect.nodes = [];
                this.nodeSelect.nodes.push(newNode);
                // this.$set(node, "nodes", [newNode]);
            } else {
                this.nodeSelect.nodes.push(newNode);
            }
            $('#staticBackdrop').modal('hide')
             this.nameNewFolder = {title:null};
            this.$Progress.finish();
            

            this.saveFolders();
        },
    	 pathMoveSelectedRemove(index,nodeid) {
            delete this.pathMoveSelected[index];
            this.pathMoveSelected = this.pathMoveSelected.filter(function(a) {
                return typeof a !== 'undefined';
            })
        },

        selectPathMove(node) { 
    	 	this.nodeSelect = node;
            // this.pathMoveSelected.push({id:node.id,text:node.text}) 
            // console.log(this.nodeSelect)
            
        },

         

        selectPathMoveChild(node) { 
    	 	this.nodeSelect = node;
    	 	this.nodeSelect.state =   {
            "checked": true,
            "selected": true,
            "expanded": true
          }
            // this.pathMoveSelected.push({id:node.id,text:node.text}) 
            // console.log('child',this.nodeSelect)
            
        },


        mySelectedFunction: function(nodeId, state) {
            // console.log(`is ${nodeId} selected ? ${state}`);
            // console.log(this.$refs["my-tree"].getSelectedNode()); 
        },

     
        getFolderAll() {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: this.auth,
                })
            };
            fetch(this.endpointGetAll, requestOptions).then(response => response.json()).then((data) => {
                this.treeDisplayData = data; 
            })
        },
        saveFolders() {
            this.$Progress.start();
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    auth: this.auth,
                    data : this.treeDisplayData
                })
            };
            fetch(this.endpointSave, requestOptions).then(response => response.json()).then((data) => {
                  this.$Progress.finish();
            })
        }


 
    }
}
</script>

 
 <script setup>
    import columnLeft from '@/components/platform/left.vue';
    import navBar from '@/components/platform/navbar.vue';
    import {Editable} from '@livingdocs/editable.js/src/core';
</script>