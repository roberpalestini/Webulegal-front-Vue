<template>
  <div id="quill" v-html="this.content"></div>
</template>
   
<script>
import { ref, defineComponent } from 'vue'
import { Quill, } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import QuillImageDropAndPaste from "quill-image-drop-and-paste";
import quillTable from "quill-table";




export default defineComponent({



  name: 'EditorTextos',
  components: {},
  methods: {
    openAddField() {
      $('#staticBackdrop4').modal('show');
    },
    imageHandler(imageDataUrl, type) {
      if (!type) type = "image/png";
      // base64 to blob
      // var blob = base64StringToBlob(imageDataUrl.replace(/^data:image\/\w+;base64,/, ''), type)
      // upload image to your server
      const index =
        (this.quill.getSelection() || {}).index || this.quill.getLength();
      if (index) this.quill.insertEmbed(index, "image", imageDataUrl, "user");
    },


  },

  setup() {

    Quill.register("modules/imageDropAndPaste", QuillImageDropAndPaste);

    Quill.register(quillTable.TableCell);
    Quill.register(quillTable.TableRow);
    Quill.register(quillTable.Table);
    Quill.register(quillTable.Contain);
    Quill.register('modules/table', quillTable.TableModule);

    var Parchment = Quill.import("parchment");
    let CustomClass = new Parchment.Attributor.Class('custom', 'ql-custom', {
      scope: Parchment.Scope.INLINE
    });

    Quill.register('modules/customClass', CustomClass);
    return {

    }
  },
  mounted() {

  },
  data() {



    const customButton = ''

    const maxRows = 10;
    const maxCols = 5;
    const tableOptions = [];
    for (let r = 1; r <= maxRows; r++) {
      for (let c = 1; c <= maxCols; c++) {
        tableOptions.push('newtable_' + r + '_' + c);
      }
    }

    var toolbarOptions = [
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

      [{ customClass: customButton }],

      ['clean']                                         // remove formatting button
    ];



    this.quill = new Quill('#editor3', {
      theme: 'snow',
      modules: {
        table: true,
        toolbar: toolbarOptions,
        imageDropAndPaste: {
          handler: this.imageHandler
        },

      }
    });


    // Enable all tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Can control programmatically too
    $('.ql-italic').mouseover();
    setTimeout(function () {
      $('.ql-italic').mouseout();
    }, 2500);


    this.quill = this.content;
    console.log(this.toolbarOptions)

    return {
      quill: null,
      table: null,
      content: null,
      toolbarOptions
    };
  },


})

</script>
 
 
 
<style>
/** All toolbar buttons are inside of .ql-formats */
.ql-formats button {
  position: relative
}

/** Set a tooltip with css pseudo-elements, when buttons are hover, active or focus  */
.ql-formats button:hover:after {
  position: absolute;
  background: rgba(0, 0, 0, .8);
  color: white;
  padding: .5em;
  border-radius: .5em;
  left: -50%;
  top: 100%;
  width: max-content;
  z-index: 1;
}

/** Set tooltip content for bold button **/
.ql-bold:hover:after,
.ql-bold:active:after,
.ql-bold:focus:after {
  content: 'Negrita - Bold';
}

/** Set tooltip content for Italic button **/
.ql-italic:hover:after,
.ql-italic:active:after,
.ql-italic:focus:after {
  content: 'Italic';
}



.ql-editor table {
  width: 100%;
  border-collapse: collapse;
}

.ql-editor table td {
  border: 1px solid black;
  padding: 5px;
  height: 25px;
}

.ql-formats button.ql-table::after,
.ql-formats .ql-picker.ql-table .ql-picker-label::before {
  content: " ";
  display: block;
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: contain;
}

.ql-picker.ql-table .ql-picker-label::before {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABcSURBVEhL3YsxDgBACML8/6fvNhd0aGCyCUuBOsULR5hGToStSHl8oB4fqMcH6rtIRZhGToStSHl8oB4fqMcH6rtIRZhGToStSHl8oB4fqMcH6rtIRZhGTk5Q9QFCcv8BMZAsCwAAAABJRU5ErkJggg==');
}

/* button.ql-table[value="append-row"]::after {
   background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC5SURBVEhL7ZNBCsIwFERzKxceQHGjqLcSFMHzKOpN1BOIe53BDgxJCjbRlX3woJnf/F9KEnq6MIE3+KyUPcYw4QpzG0q8wAQVa2nt0w8QfzpgCU/w0XiEc5ij84ANVC2WtRjVEuKLtoP8cs+EZzO4jbLsReP1ZkEvDeHZ1lR4doADW7PHCH4E/zc3tcHa/f1Yxs8H8LSwiRSe7RmUsoDeTHg2ZVDDGnpDdwW/Ao8iT4suGp+Z9dQSwgttSY+8S9IcOwAAAABJRU5ErkJggg==');
 } */

button.ql-table[value="append-col"] {
  padding-top: 0;
}

/* button.ql-table[value="append-col"]::after {
   background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADXSURBVEhL3ZVLCsJADIbnVi48gOJGUW8lqCuPo6g3UU8g7vX/GQMhnUdmUZR+8MGQyaOUlIbBMYMP+K7InCls5g5TDVPeYDNSXMOb1+FvBuzhKB7b8A5Ywwt8fT3DJaziGbCDkmflXRFJzMEn1w0FHVswkMMWWq5QNxN07MRADlto4fsu3fPuGY9pfj6A2yI5Ok/HjgzksIWWFdTNBB2bM5DDFqbYQt1Qu4FFJLEGV5HbIh8az8X1FLwDDnAcj214B3jzOvQ+oPcfDn+DLEw11DJnAgdPCB8kS4+90nxt3AAAAABJRU5ErkJggg==');
 } */

.ql-table,
.ql-contain {
  width: auto !important;
  margin-right: 0;
}

.ql-picker.ql-table {
  font-size: 11px;
  font-weight: normal;
}

.ql-picker.ql-table svg {
  display: none;
}

.ql-picker.ql-table .ql-picker-label {
  padding: 2px 3px;
}

.ql-picker.ql-table .ql-picker-options {
  width: 178px;
}

.ql-picker.ql-table .ql-picker-item {
  display: block;
  float: left;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 0px;
  margin: 1px;
}

.ql-picker.ql-table .ql-picker-item {
  border: 1px solid #444;
  color: #444;
}

.ql-picker.ql-table .ql-picker-item:hover {
  border-color: #06c;
}

.ql-picker-item:nth-child(5):before {
  clear: both;
  display: block;
  content: "";
  width: 100%;
}

.ql-picker-item[data-value=newtable_1_1]:before {
  content: "1x1";
}

.ql-picker-item[data-value=newtable_1_2]:before {
  content: "1x2";
}

.ql-picker-item[data-value=newtable_1_3]:before {
  content: "1x3";
}

.ql-picker-item[data-value=newtable_1_4]:before {
  content: "1x4";
}

.ql-picker-item[data-value=newtable_1_5]:before {
  content: "1x5";
}

.ql-picker-item[data-value=newtable_2_1]:before {
  content: "2x1";
}

.ql-picker-item[data-value=newtable_2_2]:before {
  content: "2x2";
}

.ql-picker-item[data-value=newtable_2_3]:before {
  content: "2x3";
}

.ql-picker-item[data-value=newtable_2_4]:before {
  content: "2x4";
}

.ql-picker-item[data-value=newtable_2_5]:before {
  content: "2x5";
}

.ql-picker-item[data-value=newtable_3_1]:before {
  content: "3x1";
}

.ql-picker-item[data-value=newtable_3_2]:before {
  content: "3x2";
}

.ql-picker-item[data-value=newtable_3_3]:before {
  content: "3x3";
}

.ql-picker-item[data-value=newtable_3_4]:before {
  content: "3x4";
}

.ql-picker-item[data-value=newtable_3_5]:before {
  content: "3x5";
}

.ql-picker-item[data-value=newtable_4_1]:before {
  content: "4x1";
}

.ql-picker-item[data-value=newtable_4_2]:before {
  content: "4x2";
}

.ql-picker-item[data-value=newtable_4_3]:before {
  content: "4x3";
}

.ql-picker-item[data-value=newtable_4_4]:before {
  content: "4x4";
}

.ql-picker-item[data-value=newtable_4_5]:before {
  content: "4x5";
}

.ql-picker-item[data-value=newtable_5_1]:before {
  content: "5x1";
}

.ql-picker-item[data-value=newtable_5_2]:before {
  content: "5x2";
}

.ql-picker-item[data-value=newtable_5_3]:before {
  content: "5x3";
}

.ql-picker-item[data-value=newtable_5_4]:before {
  content: "5x4";
}

.ql-picker-item[data-value=newtable_5_5]:before {
  content: "5x5";
}

.ql-picker-item[data-value=newtable_6_1]:before {
  content: "6x1";
}

.ql-picker-item[data-value=newtable_6_2]:before {
  content: "6x2";
}

.ql-picker-item[data-value=newtable_6_3]:before {
  content: "6x3";
}

.ql-picker-item[data-value=newtable_6_4]:before {
  content: "6x4";
}

.ql-picker-item[data-value=newtable_6_5]:before {
  content: "6x5";
}

.ql-picker-item[data-value=newtable_7_1]:before {
  content: "7x1";
}

.ql-picker-item[data-value=newtable_7_2]:before {
  content: "7x2";
}

.ql-picker-item[data-value=newtable_7_3]:before {
  content: "7x3";
}

.ql-picker-item[data-value=newtable_7_4]:before {
  content: "7x4";
}

.ql-picker-item[data-value=newtable_7_5]:before {
  content: "7x5";
}

.ql-picker-item[data-value=newtable_8_1]:before {
  content: "8x1";
}

.ql-picker-item[data-value=newtable_8_2]:before {
  content: "8x2";
}

.ql-picker-item[data-value=newtable_8_3]:before {
  content: "8x3";
}

.ql-picker-item[data-value=newtable_8_4]:before {
  content: "8x4";
}

.ql-picker-item[data-value=newtable_8_5]:before {
  content: "8x5";
}

.ql-picker-item[data-value=newtable_9_1]:before {
  content: "9x1";
}

.ql-picker-item[data-value=newtable_9_2]:before {
  content: "9x2";
}

.ql-picker-item[data-value=newtable_9_3]:before {
  content: "9x3";
}

.ql-picker-item[data-value=newtable_9_4]:before {
  content: "9x4";
}

.ql-picker-item[data-value=newtable_9_5]:before {
  content: "9x5";
}

.ql-picker-item[data-value=newtable_10_1]:before {
  content: "10x1";
}

.ql-picker-item[data-value=newtable_10_2]:before {
  content: "10x2";
}

.ql-picker-item[data-value=newtable_10_3]:before {
  content: "10x3";
}

.ql-picker-item[data-value=newtable_10_4]:before {
  content: "10x4";
}

.ql-picker-item[data-value=newtable_10_5]:before {
  content: "10x5";
}
</style>