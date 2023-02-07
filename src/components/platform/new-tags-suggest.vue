<template>
    <div class="popNewTag">
             Si consideras que es necesario una nueva etiqueta,podes solicitarla <a href="#" @click.prevent="open()" >acá</a>.
    </div>

  
    <!-- Modal -->
    <div class="modal fade" id="newTagSuggest" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true" style="z-index:1000">
      <div class="modal-dialog modal-dialog-centered modal-sm" role="document" style="z-index:1000">
        <div class="modal-content" style="border-radius:10px;border:none;z-index:1000">
          <div class="modal-header text-center" style="background : #dedcdc;color:#454545;border-top-left-radius: 10px;border-top-right-radius: 10px">
            <h5 class="modal-title" style="    font-size: 15px;font-weight: 600;text-align: center !important;display: block !important;width: 100%;">Agregar etiqueta</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="save()" class="modal-body">
            Escribí el nombre de la nueva etiqueta.
            <div class="col-md-12" style="margin-top:20px;">
               <input type="text" class="form-control" v-model="temp.input" style="height: 30px;min-height: 33px;border-radius:30px;border-radius: 30px;border: 1px solid rgb(199, 199, 199);background: rgb(231, 231, 231);">
            </div>
            <div class="col-md-12 text-center" style="margin-top:20px;">
               <button type="submit" class="btn btn-primary" style="width:120px;position:relative" >Solicitar</button>
           </div>
        </form> 
        </div>
      </div>
    </div>


</template>


<style scoped> 
    .popNewTag {
       margin-top: 15px;
       margin-bottom: 15px;
       text-align: left;
       font-size: 12px;
    }
 
</style>

<script>

   export default {
   data() {
       return {
           temp : {
               input : null
           },
           endpoint: window.ENDPOINT +  '/requests/new/tag',
       }
   },
   created() {},
   mounted() {},
   computed: {},
   methods: {
       open() {
           $('#newTagSuggest').modal('show')
       },
       save() {
            const requestOptions = {
               method: "POST",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
                   rol:'writings',
                   message: this.temp.input,
                    auth:localStorage.getItem('auth')
               })
           };
           fetch(this.endpoint, requestOptions).then(response => response.json()).then((data) => {
                this.$toast.success( "Tu solicitud ha sido procesada. Muchas gracias por ayudarnos a mejorar.",{position: "bottom-right" })
                $('#newTagSuggest').modal('hide')
                this.temp.input = null;
           })

 

       }
   }
}
</script>


