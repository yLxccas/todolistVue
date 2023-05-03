<template>
  <div class="todoList-footer">
    <span>You have <span>{{count}}</span> pending tasks</span>
    <button id="clearall" class="btn" @click="$emit('clearAll')">Clear All</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'TodoCount',
  props: {
    count: {
      type: Number,
      required: true
    }
  }
})
</script>

<style scoped>
.todoList-footer{
  display: flex;
  justify-content: space-between;
  margin-left: 5px;
  width: 100%;
}
.todoList-footer span{
  padding-top: 5px;
}
.todoList-footer button{
  padding: 6px 10px;
  border-radius: 3px;
  border: none;
  outline: none;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  margin-left: 5px;
  background: #8E49E8;
  cursor: pointer;
  transition: all 0.3s ease;
}
.todoList-footer button.active{
  opacity: 1;
}
.todoList-footer button:hover{
  background: #721ce3;
}
</style>