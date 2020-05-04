<template>
  <div @mousedown="mousedownTask" @mouseup="mouseupTask">
    <li class="task-item">
      <div class="task-item-header">
        <!--<div
          class="task-priority"
          :class="item.priority"
          v-if="showTaskPriority"
          @click="changePriority"
        >{{item.priority}} Priority</div>
        <v-select
          v-model="item.priority"
          ref="vueDropdown"
          :options="['Low','Medium', 'High']"
          v-if="showTaskPriorityDropdown"
          @search:blur="setNewPriority"
          :clearable="false"
          :closeOnSelect="true"
          class="custom-v-select"
        ></v-select>-->
      <div style="text-align: right;">
        #{{this.item.id}}
      </div>
      </div>
      <div class="task-item-body">
        <!--<p class="task-title" @click="openTaskDetailPopoup(item)">{{this.item.text}}</p>-->
        <p class="task-title" @click="openTaskDetailPopoup(item)">{{this.item.title}}</p>
        <!-- <textarea type="text" class="form-control task-title" :value="task.title" rows="2"></textarea> -->
      </div>
      <div class="task-item-footer">
        <div class="comments-attachments">
          <div class="comments">
            <i class="far fa-comment-alt"></i> 1
          </div>
          <div class="attachment">
            <i class="fa fa-paperclip"></i> 2
          </div>
        </div>
        <div class="assigned-users" style="margin-right: 15px;">
          <div class="user-avatar">
            <img
              src="https://lh3.googleusercontent.com/-bgFoHk_lLYY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf2LrPUhb82RyJfhwKvr36tZ81NBg.CMID/s32-c/photo.jpg"
              
              alt
            />
          </div>
          <div class="user-avatar">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcfFZCBzWumfdKses7xLH669oYa6hVdNUM5WITqwPhw-wl8-EJRA"
              
              alt
            />
          </div>
          <div class="user-avatar">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj7x9Eh_d0nx-xnGCUBhcpL2_gs-_pRZAADsPDJCltX49ySU5xxA"
              
              alt
            />
          </div>



        </div>
      </div>
    </li>
  </div>
</template>

<script>
import store from "./../store/index";
import { mapActions, mapGetters } from "vuex";
import vSelect from "vue-select";
import { Bus } from "./../utils/bus";
import "vue-select/dist/vue-select.css";
import TaskDetailPopup from "./popups/TaskDetailPopup";

export default {
  name: "Taskitem",
  props: ["item", "list", "board","mousedownTask","mouseupTask"],
  components: {
    "v-select": vSelect,
    TaskDetailPopup
  },
  data() {
    return {
      showTaskPriorityDropdown: false,
      showTaskPriority: true
    };
  },
  watch: {},
  methods: {
    assignUser(user){
      this.item.assignedUsers.push(user)
      console.log(this.item);
      
    },
    changePriority() {
      this.showTaskPriorityDropdown = !this.showTaskPriorityDropdown;
      this.showTaskPriority = !this.showTaskPriority;
      this.$nextTick(() => {
        const input = this.$refs.vueDropdown.$el.querySelector("input");
        input.focus();
      });
    },
    setNewPriority(e) {
      this.showTaskPriorityDropdown = !this.showTaskPriorityDropdown;
      this.showTaskPriority = !this.showTaskPriority;
    },
    openTaskDetailPopoup(item) {
      console.log("clicked");

      Bus.$emit("open-task-detail-popup", item);
    }
  },
  created() {},
  computed: {}
};
</script>

<style scoped lang="scss" >
.assigned-users {
  .user-avatar {
    margin-right: -15px;
  }
}
.assigned-users .add-icon {
  margin-left: 20px;
  cursor: pointer;
}
.custom-v-select {
  font-size: 14px;
}
.assignee-selection .dropdown-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.4rem .8rem;
  .user-avatar {
    margin-right: 15px;
  }
  .user-name {
    font-size: 14px;
    font-weight: 400;
    color: rgb(45, 45, 82);
  }
}
</style>
