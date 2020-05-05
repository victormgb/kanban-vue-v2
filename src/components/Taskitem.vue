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
        <a target="_blank" :href="ticketLink"><p class="task-title" >{{this.item.title}}</p></a>
        <!-- <textarea type="text" class="form-control task-title" :value="task.title" rows="2"></textarea> -->
      </div>
      <div class="task-item-footer">
        <div class="comments-attachments">

          <span style="text-align: left;">due by:</span>
          <span style="text-align: left;">{{item.due_by | formatDate}}</span>

        </div>
        <div class="comments-attachments">
        <span>
          Designer: 
        </span>
        <div class="assigned-users" style="margin-left: auto;margin-right: auto;" >

          <div class="user-avatar" 
          v-b-tooltip
          :title="item.designer_name">
            <img
              :src="item.avatar"
              alt
            />
          </div>
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
      showTaskPriority: true,
      ticketLink: `http://thefutures.io/tickets/${this.item.id}/show`
    };
  },
  watch: {},
  methods: {
    openTicketInNewTab(){
      
    },
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
  computed: {
  }
};
</script>

<style scoped lang="scss" >

.tooltip{
  display:block!important;
  opacity:1!important;
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
.comments-attachments {
  flex-direction:column;
  align-items: flex-start;
}
</style>
