<template>
<ul class="todoList-storage">
  <div class="todolist-storageAll">
    <div class="todolist-storageTimer">
      <div class="todolist-text">
        <input id="checkbox" type="checkbox" v-model="checked" @change="$emit('changeCompleted', !checked)"/>
        <span :class="{ checked }"> {{title}} </span>
        <button id="removerTarefa" class="btn" @click="$emit('remover')"><font-awesome-icon id="iconTask" icon="trash"/></button>
      </div>
    <div class="show-button">
      <div v-show="toggle"><Pomodoro/></div>
      <button @click='toggle = !toggle' id="arrow"><font-awesome-icon :class="{transition : true, rotate: toggle}" icon="angle-down"/></button>
    </div>
    </div>
  </div>
</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Pomodoro from './Pomodoro.vue'
import "@/assets/css/button.css"

export default defineComponent({
components: {Pomodoro},
name: 'TodoItem',
data () {
  return {
    checked: false,
    toggle: false
  }
},
props: {
  completed: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    required: true
  }
},
mounted () {
  this.checked = this.completed
}
});
</script>

<style scoped>
.todolist-storageAll{
  width: 100%;
  height: 100%;
  background: #F2F2F2;
}
.todoList-storage{
  margin: 3px 0;
  width: 100%;
}
.checked{
  text-decoration: line-through;
  color: gray;
}
.transition {
  margin-right: 30px;
  transition: transform 0.5s;
}
.transition.rotate{
  transform: rotate(180deg);

}
.todoList-storage input{
  margin-top: 13px;
  margin-left: 15px;
}
.todoList-storage span{
  margin-top: 10px;
  margin-left: 50px;
}
.todolist-text{
  display: flex;
  justify-content: space-between;
}
.todoList-storage #removerTarefa{
  padding: 6px 10px;
  width: 50px;
  height: 25%;
  border: none;
  color: #fff;
  margin-left: 50px;
  font-size: 21px;
  background: #d75151;
  cursor: pointer;
  transition: all 0.3s ease;
}
.todoList-storage #removerTarefa.active{
  opacity: 1;
}
.todoList-storage #removerTarefa:hover{
  background: #f43737;
}
.todoList-storage #arrow{
  border: none;
  color: rgb(0, 0, 0);
  margin-left: 10px;
  font-size: 21px;
  background: #F2F2F2;
  cursor: pointer;
}
</style>