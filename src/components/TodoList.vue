<template>
  <div class="todoList">
    <div id="wrapper" class="wrapper">
      <div id="title" class="todoList-header">
        {{titulo}}
      </div>
      <div class="todoList-input">
        <TodoTask
          :task="task"
          @addTarefas="addTarefas"
        />
      </div>
      <ul class="todoList-item">
        <TodoItem 
          v-for="(tarefa, index) in tarefas"
          :key="index"
          :completed="tarefa.completed"
          :title="tarefa.task"
          @changeCompleted="updateCompleted(tarefa, $event)"
          @remover="remover(tarefa)"
        />
      </ul>
      <div class="todoList-count">
        <TodoCount
          :count="count"
          @clearAll="clearAll(tarefa)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TodoCount from './TodoCount.vue';
import TodoItem from './TodoItem.vue';
import TodoTask from './TodoTask.vue';

export default defineComponent({
  components: { TodoItem, TodoCount, TodoTask},
  name: 'TodoList',
   data() {
    return {
      titulo: 'Todo App',
      task: "",
      tarefas: [
      {
        task: 'Testando',
        completed: false
      }
    ]
    }
  },
  computed: {
    count(): number {
      return this.tarefas.length
    }
  },
  methods: {
    addTarefas(task: string) {
      let _tarefa = {
        completed: false,
        task: task
      }
      this.tarefas.push(_tarefa);
    },
    remover(tarefa: any) {
      let indice = this.tarefas.indexOf(tarefa);
      this.tarefas.splice(indice, 1);
    },
    clearAll() {
      this.tarefas = []
    },
    updateCompleted(tarefa: any, completed: any) {
      tarefa.completed = completed
      console.log(tarefa, completed)
    }
  }
});
</script>

<style scoped>
::selection{
  color: #ffff;
  background: rgb(142, 73, 232);
}
.todoList{
  width: 100%;
  height: 100vh;
  padding: 10px;
  background: linear-gradient(to bottom, #68EACC 0%, #497BE8 100%);
}
.wrapper{
  background: #fff;
  max-width: 400px;
  width: 100%;
  margin: 120px auto;
  padding: 25px;
  border-radius: 5px;
  box-shadow: 0px 10px 15px rgba(0,0,0,0.1);
}
.wrapper header{
  font-size: 30px;
  font-weight: 600;
}
.wrapper .todoList-input{
  margin: 20px 0;
  width: 100%;
  display: flex;
}
.todoList-header{
  font-weight: bold;
  color: black;
  margin-right: 19px;
}
.wrapper .todoList{
  max-height: 250px;
  overflow-y: auto;
}
.todoList li{
  position: relative;
  height: 45px;
  line-height: 45px;
  margin-bottom: 8px;
  background: #f2f2f2;
  border-radius: 3px;
  padding: 0 15px;
  overflow: hidden;
}
.todoList li .icon{
  position: absolute;
  right: -45px;
  background: #e74c3c;
  width: 45px;
  text-align: center;
  color: #fff;
  border-radius: 0 3px 3px 0;
  cursor: pointer;
  transition: all 0.2s ease;
}
.todoList li:hover .icon{
  right: 0px;
}
.wrapper .todoList-count{
  display: flex;
  width: 100%;
  margin-top: 20px;
  align-items: center;
  justify-content: space-between;
}
</style>