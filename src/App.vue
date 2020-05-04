<template>
  <div id="app">
    <Taskboard/>
  </div>
</template>

<script>
import Taskboard from './components/Taskboard.vue'
import { mapGetters } from "vuex"
import { db } from './utils/db'
import {  mapActions } from "vuex";
import dataJson from './utils/data.json'

export default {
  name: 'app',
  components:{
    Taskboard
  },
  methods: {
    ...mapActions({
      fetchData: "fetchData",
      dataBoard: "fetchDataBoard"
    }),
    cleanedData(){
      var tickets = dataJson;
      const vm = this;
      tickets.forEach(ticket=>{
        vm.board2.lists.forEach(column=>{

          if(ticket.status == column.name){
            column.items.push(ticket);
          }
        });
      });
      
    }
  },
  created() {
    this.fetchData(this.projects)
    this.cleanedData();
    this.dataBoard(this.board2)
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      projects:[],
      board2: {
        name:"Board of tickets",
        description:"Board of tickets",
        lists:[
          {
            archived:false,
            headerColor:"#607d8b",
            id:"4a62105f-6d1c-a84d-c7bc-5ee29a13afa3",
            name:"On queue",
            items:[]
          },
          {
            archived:false,
            headerColor:"#607d8b",
            id:"e0984073-01ee-0f99-0226-4ce9985f3b85",
            name:'Up Next',
            items:[]
          },
          {
            archived:false,
            headerColor:"#607d8b",
            id:"2f820d90-d965-179b-9957-bf396622a887",
            name:"Being checked",
            items:[]
          },
          {
            archived:false,
            headerColor:"#607d8b",
            id:"521aeae2-e17c-97e2-f1fb-6134b3d6e795",
            name:"Under way",
            items:[]
          },
          {
            archived:false,
            headerColor:"#607d8b",
            id:"4f654d15-fc58-0885-89a9-2ce1b64320bf5",
            name:"Waiting for Approval",
            items:[]
          },
          {
            archived:false,
            headerColor:"#607d8b",
            id:"4a62105f-6d1c-a84d-c7bc-5ee29a13afa4",
            name:"Closed",
            items:[]
          },
          {
            archived:false,
            headerColor:"#607d8b",
            id:"4a62105f-6d1c-a84d-c7bc-5ee29a13afa5",
            name:"Paused",
            items:[]
          }

        ]
      }
    }
  },
  firebase: {
    projects: db.ref('projetcs'),
  },
  mounted(){
    console.log('projects ', this.projects);
    console.log('board', this.board);
    
  }
}
</script>

<style lang="scss">

</style>
