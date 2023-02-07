<template>
	
</template>
<style>
    @import   '@/assets/platform.css';
 
</style>

<script setup="">
import columnLeft from '@/components/platform/left.vue';
import navBar from '@/components/platform/navbar.vue';
 
</script>
 
<script>

 export default {
  data() {
    return {
      auth:localStorage.getItem('auth'), 
      endpointSearchWriting: window.ENDPOINT + '/search/writing',
      endpointSearchDocument: window.ENDPOINT + '/search/document',
      searchMode:'document',
      searchInput:null,
      searchDocuments:[],
      searchFolders:[],
      teste:[],
      BestDocuments: [],
      bestWritings: [],
      document : [{ data : {
        title:null
      }}]
    }
  },
    created() {
      
    },
    mounted() {  
      this.getBestDocuments();
      this.getbestWritings();


    }, 
    computed: { 
  }, 
  methods: { 
    getStars(count) {
      if(count <= 10) {
          return 1;
        }

         if(count <= 20) {
          return 2;
        }
         if(count <= 30) {
          return 3;
        }

         if(count <= 40) {
          return 4;
        }
         if(count <= 50) {
          return 5;
        }

         if(count >= 50) {
          return 5;
        }
    },
    displayStars(count) {
      var svg = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" style="fill: #ead723"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"/></g></svg>`;
       var stars = this.getStars(count); 
        var e = 1;
        var out = '';
        while (e <= stars) {
          out  = out + svg;
          // statement
          e++;
        }
        console.log(stars,e,out)
        return out;


    },
    getBestDocuments() {
      this.$Progress.start();
 
      const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                auth:this.auth, 
             })
         }; 
         fetch(window.ENDPOINT + '/comunity/best/documents', requestOptions).then(response => response.json()).then((data) => { 
            this.BestDocuments = data;
          console.log('best',data) 
          this.$Progress.finish();
 
         }) 
      
    },

    getbestWritings() {
      this.$Progress.start();
 
      const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                auth:this.auth, 
             })
         }; 
         fetch(window.ENDPOINT + '/comunity/best/writings', requestOptions).then(response => response.json()).then((data) => { 
            this.bestWritings = data;
         
            this.$Progress.finish();
   
         }) 
      
    },

     
    goToDocument(id,type,event) {
      event.preventDefault();
      if(type == 'writing') {
        this.$router.push({ name: 'view-automatic-document', params: { id: id } }) 
      } else {
        this.$router.push({ name: 'view-document', params: { id: id }  }) 
      }
    },
    changeMode(mode) {
       this.searchMode = mode;
    },
    search() {
       this.$Progress.start();
 
 
      const requestOptions = {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify({
                auth:this.auth, 
                search:this.searchInput,
             })
         };
         if(this.searchMode == 'document') {
              var endpoint = this.endpointSearchDocument;
         } else {
              var endpoint = this.endpointSearchWriting;
         }
         fetch(endpoint, requestOptions).then(response => response.json()).then((data) => { 
          this.searchDocuments = data;
          this.teste = data.documents;
          console.log(this.searchDocuments) 
            this.$Progress.finish();
         }) 
       
    }, 
    
    pause() {
       
    },
    hover() {
       
    } 
  }
}
 
</script>

