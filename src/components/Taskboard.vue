<template>
  <div style="height:100%">
    <Navbar buttonType="taskboard"  />
    <div class="container-fluid main-container scrollable-div">
      <div class="board-wrapper">
        <div class="board-details">
          <div class="project-name mb-2">
            <!-- <h3 v-if="showName">{{getBoardName}}</h3> -->
            <input type="text" :value="getBoardName" class="project-name-input form-control" @blur="editProjectName">
          </div>
          <!-- <p class="project-description">{{projectDescription}}</p> -->
          <input type="text" :value="projectDescription" class="project-desc-input form-control" @blur="editProjectDescription">
        </div>
        <draggable
          v-model="lists"
          class="row flex-nowrap"
          v-bind="getDragOptions"
        >
          <TaskList
            v-for="(listItem, index) in lists"
            :key="index"
            :board="getBoard"
            :list="listItem"
          ></TaskList>
        </draggable>
      </div>
    </div>
    <TaskDetailPopup />
  </div>
</template>

<script>
import Taskitem from "./Taskitem";
import Navbar from "./Navbar";
import TaskList from "./Tasklist";
import store from "./../store/index";
import draggable from "vuedraggable";
import { mapActions, mapGetters } from "vuex";
import TaskDetailPopup from './popups/TaskDetailPopup'

export default {
  name: "Taskboard",
  props: ["board"],
  components: {
    Taskitem,
    TaskList,
    draggable,
    Navbar,
    TaskDetailPopup
  },
  data() {
    return {
      projectName: "",
      projectDescription: "",
      currentBoard:{
        achieved:false,
        description:'website for multiple clients',
        id:"d033c156-5972-4767-ceb0-8a91a5c282db",
        lists:[{"archived":false,"headerColor":"#607d8b","id":"4a62105f-6d1c-a84d-c7bc-5ee29a13afa3","items":[{"assignedUsers":[{"id":"01234","imgURL":"https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg","name":"Ayaz Sayyed"},{"id":"01235","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj7x9Eh_d0nx-xnGCUBhcpL2_gs-_pRZAADsPDJCltX49ySU5xxA","name":"Chang Yu"},{"id":"01236","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcfFZCBzWumfdKses7xLH669oYa6hVdNUM5WITqwPhw-wl8-EJRA","name":"Michael S"}],"id":"6fb2c8e6-5980-9403-f847-51407ab4597a","priority":"High","text":"Build the feature #1"},{"assignedUsers":[{"id":"01234","imgURL":"https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg","name":"Ayaz Sayyed"},{"id":"01235","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj7x9Eh_d0nx-xnGCUBhcpL2_gs-_pRZAADsPDJCltX49ySU5xxA","name":"Chang Yu"}],"id":"c7f25d4b-6a72-d0d5-7d03-fc0b8794fb94","priority":"Medium","text":"Test the feature #1"},{"assignedUsers":[{"id":"01236","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcfFZCBzWumfdKses7xLH669oYa6hVdNUM5WITqwPhw-wl8-EJRA","name":"Michael S"}],"id":"78ab7725-ddee-ba6a-c039-b581ea10e20e","priority":"Low","text":"Commit feature #1 to the repository"},{"assignedUsers":[{"id":"01234","imgURL":"https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg","name":"Ayaz Sayyed"},{"id":"01236","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcfFZCBzWumfdKses7xLH669oYa6hVdNUM5WITqwPhw-wl8-EJRA","name":"Michael S"}],"id":"49ad2dd1-5c3e-42e7-c2f0-5c9b193fb676","priority":"High","text":"Deploy the feature #1"}],"name":"To Do"},{"archived":false,"headerColor":"#607d8b","id":"e0984073-01ee-0f99-0226-4ce9985f3b85","items":[{"assignedUsers":[{"id":"01234","imgURL":"https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg","name":"Ayaz Sayyed"},{"id":"01235","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj7x9Eh_d0nx-xnGCUBhcpL2_gs-_pRZAADsPDJCltX49ySU5xxA","name":"Chang Yu"},{"id":"01236","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcfFZCBzWumfdKses7xLH669oYa6hVdNUM5WITqwPhw-wl8-EJRA","name":"Michael S"}],"id":"081107d7-acb8-93bf-1e49-86da87bbbaf7","priority":"Medium","text":"Build the demo app"},{"assignedUsers":[{"id":"01234","imgURL":"https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg","name":"Ayaz Sayyed"},{"id":"01235","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj7x9Eh_d0nx-xnGCUBhcpL2_gs-_pRZAADsPDJCltX49ySU5xxA","name":"Chang Yu"}],"id":"065d84e2-85e9-5845-23a8-64bfba70f2b3","priority":"High","text":"Put in some sample data in app"},{"assignedUsers":[{"id":"01234","imgURL":"https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg","name":"Ayaz Sayyed"}],"id":"30cba164-c4c6-6eb0-99af-4ff86b3ed4ae","priority":"Low","text":"Test the app before launching"}],"name":"Doing"},{"archived":false,"headerColor":"#607d8b","id":"2f820d90-d965-179b-9957-bf396622a887","items":[{"assignedUsers":[{"id":"01236","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcfFZCBzWumfdKses7xLH669oYa6hVdNUM5WITqwPhw-wl8-EJRA","name":"Michael S"}],"id":"850ca944-ea57-40dd-dc53-1993c0a724d2","priority":"Medium","text":"Set up app landing page"},{"assignedUsers":[{"id":"01234","imgURL":"https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg","name":"Ayaz Sayyed"},{"id":"01235","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj7x9Eh_d0nx-xnGCUBhcpL2_gs-_pRZAADsPDJCltX49ySU5xxA","name":"Chang Yu"},{"id":"01236","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcfFZCBzWumfdKses7xLH669oYa6hVdNUM5WITqwPhw-wl8-EJRA","name":"Michael S"}],"id":"e773b655-8314-23f1-9188-3d295b700cb2","priority":"High","text":"Send out email invitations to the subscribers"}],"name":"Done"},{"archived":false,"headerColor":"#607d8b","id":"521aeae2-e17c-97e2-f1fb-6134b3d6e795","items":[{"assignedUsers":[{"id":"01234","imgURL":"https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg","name":"Ayaz Sayyed"},{"id":"01236","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcfFZCBzWumfdKses7xLH669oYa6hVdNUM5WITqwPhw-wl8-EJRA","name":"Michael S"}],"id":"3b93acb4-41cf-05e0-55d0-886930342e6e","priority":"High","text":"Send notification to the customer"},{"assignedUsers":[{"id":"01234","imgURL":"https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg","name":"Ayaz Sayyed"}],"id":"8d084b74-1e56-7b03-1c46-ebd5e15d6fc4","priority":"Low","text":"Project go live"}],"name":"Deploy"},{"archived":false,"headerColor":"#607d8b","id":"4f654d15-fc58-0885-89a9-2ce1b64320bf5","items":[{"assignedUsers":[{"id":"01234","imgURL":"https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg","name":"Ayaz Sayyed"},{"id":"01235","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj7x9Eh_d0nx-xnGCUBhcpL2_gs-_pRZAADsPDJCltX49ySU5xxA","name":"Chang Yu"},{"id":"01236","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcfFZCBzWumfdKses7xLH669oYa6hVdNUM5WITqwPhw-wl8-EJRA","name":"Michael S"}],"id":"2e855cd8-244d-9f18-3f9d-310b75ff1801","priority":"Medium","text":"Gather post project feedback"},{"assignedUsers":[{"id":"01234","imgURL":"https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg","name":"Ayaz Sayyed"},{"id":"01236","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcfFZCBzWumfdKses7xLH669oYa6hVdNUM5WITqwPhw-wl8-EJRA","name":"Michael S"}],"id":"5ca2a09d-62b9-39da-c0b0-510694cf6d13","priority":"Low","text":"Analyze feedback and assess for any amends to internal processes"},{"assignedUsers":[{"id":"01234","imgURL":"https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg","name":"Ayaz Sayyed"},{"id":"01235","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj7x9Eh_d0nx-xnGCUBhcpL2_gs-_pRZAADsPDJCltX49ySU5xxA","name":"Chang Yu"},{"id":"01236","imgURL":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcfFZCBzWumfdKses7xLH669oYa6hVdNUM5WITqwPhw-wl8-EJRA","name":"Michael S"}],"id":"fe8abdb4-41b6-b577-660c-ab4466bcea83","priority":"High","text":"Update internal processes"}],"name":"Wrap up"}]

      }
    };
  },
  created() {
    // console.log("this.getBoard ", this.getBoard);
  },
  computed: {
    ...mapGetters({
      boards: "allBoards",
      isLoading: "isLoading"
    }),
    getBoardName() {
      let that = this;
      this.boards.find(function(b) {
        if (b.id == that.param) {

          that.projectName = b.name;
          that.projectDescription = b.description;
        }
      });
      return this.projectName;
    },
    getDragOptions() {
      return {
        animation: "200",
        ghostClass: "ghost",
        handle: ".board-header",
        group: "kanban-board-lists"
      };
    },

    param() {
      return this.$route.params.id;
    },
    shouldAllowListOrder() {
      return this.isDesktop || this.isTablet;
    },
    getBoard() {
      return this.currentBoard;
    },
    lists: {
      get() {
        return this.getBoard ? ( this.getBoard.lists ? this.getBoard.lists.filter(l => !l.archived ) : []): [];
      },
      async set(value) {
        await this.reorderTaskLists({
          boardId: this.param,
          lists: value
        });
      }
    }
  },
  methods: {
    // ...mapActions(["addTaskToBoard", "reorderTaskLists"]),
    ...mapActions({
      reorderTaskLists: "reorderTaskLists",
      setActiveTaskBoard: "setActiveTaskBoard",
      saveTaskBoard:"saveTaskBoard"
    }),
    editProjectName(e){
      this.currentBoard.name = e.target.value.trim()
      this.saveTaskBoard(this.currentBoard)
    },
    editProjectDescription(e){
      this.currentBoard.description = e.target.value.trim()
      this.saveTaskBoard(this.currentBoard)
    },
    createNewTask(key) {
      let newTask = {
        title: "",
        priority: "Low",
        comments: [],
        attachmets: [],
        assignedUsers: []
      };
      this.addTaskToBoard({ key, newTask });
    }
  }
};
</script>

<style lang="scss" scoped>
.board-details {
  .project-name {
    display: flex;
    // justify-content: center;
    align-items: center;
    
    &:hover {
      .name-edit-icon {
        display: block;
      }
    }
  }
  .name-edit-icon {
    display: none;
    width: 50px;
    text-align: center;
    cursor: pointer;
  }
  .project-name-input, .project-desc-input{
    padding: 0;
    font-size: 24px;
    color: #525f7f;
    border: 1px solid transparent;
    background: transparent;
    width: 50%;
    padding-left: 10px;
    &:hover{
      border: 1px solid #cad1d7;
    }
    &:focus{
      border: 1px solid #98a8fb ;
    }
  }
  .project-desc-input{
    font-size: 15px;
    height: 30px;
  }
}
</style>
