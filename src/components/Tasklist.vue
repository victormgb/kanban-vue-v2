<template>
  <div>
    <div class="task-board" :data-board-name="list.name">
      <input type="text" class="form-control" :value="this.list.name"  v-if="isEditing"  @blur="saveTaskListName">
      <div class="board-header">
        <p class="board-name" >{{ list.name }}</p>
        
      </div>
      <div class="board-content">
        <ul class="task-list">
          <draggable  :component-data="getComponentData()" v-model="items" v-bind="dragOptions" class="list-group" :move="checkMove" @end="onEndDragItem">
            <transition-group type="transition" :name="!drag ? 'flip-list' : null">
              <Taskitem
                v-for="item in items"
                :item="item"
                :list="list"
                :board="board"
                :key="item.id"
                :mousedownTask="boardMousedownTask"
                :mouseupTask="boardMouseupTask"
              />
            </transition-group>
          </draggable>
          <taskItemTemplate v-if="showTemplate" :list="list" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Taskitem from "./Taskitem";
import taskItemTemplate from "./TaskItemTemplate";
import { Bus } from "./../utils/bus";
import { mapActions,mapGetters } from "vuex";
export default {
  components: {
    Taskitem,
    draggable,
    taskItemTemplate
  },
  props: ["board", "list"],
  data() {
    return {
      drag: false,
      showTemplate: false,
      isEditing: false,
      taskListName:this.list.name,
      from_item:null,
      to_item:null,
      data_to_different_column:[]
      
    };
  },
  created() {
    Bus.$on("remove-template", this.removeTemplate);
  },
  computed: {
    ...mapGetters({
      itemsToSend:"getItemsToSend"
    }),
    defaultItem() {
      return {
        id: "",
        text: ""
      };
    },
    dragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        group: "kanban-board-list-items"
        // disabled: this.isEditing || !this.shouldAllowTaskItemsReorder
      };
    },
    items: {
      get() {
        return this.list.items;
      },
      set(reorderedListItems) {
        const payload = {
          board: this.board,
          listId: this.list.id,
          items: reorderedListItems
        };
        this.reorderTaskListItemsBoard(payload);
      }
    },
    shouldAllowTaskItemsReorder() {
      return this.isDesktop || this.isTablet;
    }
  },
  methods: {
    ...mapActions({
      reorderTaskListItems: "reorderTaskListItems",
      saveTaskListItem: "saveTaskListItem",
      deleteTaskList:"deleteTaskList",
      reorderTaskListItemsBoard:"reorderTaskListItemsBoard",
      replaceNewItemStatus:"replaceNewItemStatus",
      refreshDataInOtherColumn:"refreshDataInOtherColumn",
      refreshDataInSameColumn:"refreshDataInSameColumn",
      cleanItemsToSend:'cleanItemsToSend'
    }),
    boardMousedownTask(){
      document.body.style.cursor = "move" ;
      
      
    },
    boardMouseupTask(){
      document.body.style.cursor = "default" ;
    },
    saveTaskListName(e){
     this.list.name = e.target.value  
      console.log('this.list.name', this.list.name);
      this.isEditing = !this.isEditing
    },
    deleteWholeTaskList(){
      console.log(this.list);
      const payload = {
          boardId: this.board.id,
          listId: this.list.id
        };
      this.deleteTaskList(payload)
    },
    removeTemplate(data) {
      console.log("remove template ", data);
      this.showTemplate = false;
    },
    createNewTask() {
      // console.log('list ', )
      this.showTemplate = true;

      // this.saveTaskListItem({
      //   boardId: this.$route.params.id,
      //   listId:this.list.id,
      //   item:{id:5},
      //   name:"hello"}
      // )
    },
    itemEditing() {
      this.isEditing = true;
    },
    itemEdited() {
      this.isEditing = false;
    },
    itemCancelled() {
      this.isEditing = false;
    },
    getComponentData(){
      return{
        attrs:{
          list:this.list
        }
      }
    },
    checkMove(evt){
      let from_item = this.from_item = evt.draggedContext.element;
      

      //Its means that the item is moving to other column
      if(evt.relatedContext.component.componentData.attrs.list.name !== from_item.status) {  
        this.data_to_different_column = [evt.relatedContext.component.componentData.attrs.list,from_item]
      }
    },
    onEndDragItem(evt){
      document.body.style.cursor = "default" ;
      //Here start the logic

      //If a ticket change of column
      if(this.data_to_different_column.length !== 0){
        const [list,item] = this.data_to_different_column;
        const payload = {
          list,
          item
        }
        //replacing old status
        this.replaceNewItemStatus(payload);

        //HTTP request to change the status of one ticket
        console.log(`axios.post('api/change-ticket-status/${item.id}')`);

        const payload2 = {
          list,
          actualList:this.list
        }
        //change position of items of old column and new column
        this.refreshDataInOtherColumn(payload2);

        console.log('sending',this.itemsToSend);

        this.cleanItemsToSend();

        console.log(`axios.post('api/change-tickets-positions',data)`)


      }else {
        //change positions of items of present column
        const payload = {
          list:this.list
        }
        this.refreshDataInSameColumn(payload);
        console.log('sending',this.itemsToSend);

        this.cleanItemsToSend();

        console.log(`axios.post('api/change-tickets-positions',data)`)

      }



    }
  }
};
</script>

<style lang="scss">
.sortable-chosen.ghost .task-item {
  background: repeating-linear-gradient(
    145deg,
    transparent,
    transparent 5px,
    #e8eaf1 5px,
    #e8eaf1 10px
  );
  border: 2px solid#e2e2e2;
}

.flip-list-move {
  transition: transform 0.2s;
}
.no-move {
  transition: transform 0s;
}
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
.task-board {
  .board-header {
    .options {
      padding: 5px 5px;
    }
    .dropdown-menu {
      min-width: 10rem;
    }
  }
}
</style>
