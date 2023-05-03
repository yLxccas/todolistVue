<template>
  <div id="inputField" class="inputField">
    <input id="input" type="text" placeholder="Add your new todo" v-model="task"/>
    <button id="addTarefa" class="btn btnInput" @click="onClick(task)"><font-awesome-icon icon="plus"/></button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TodoTask',
  data () {
    return{
      task: ""
    }
  },
  methods: {
    onClick (task: string) {
      if (task.length > 0) {
        this.$emit('addTarefas', task)
        this.task = ""
      } else {
        alert("Tarefa não informada")
      }
    }
  }
});
</script>


<style scoped>
.inputField{
  display: flex;
  width: 100%;
  min-height: 45px;
}
.inputField input{
  width: 85%;
  height: 100%;
  border-radius: 3px;
  border: 1px solid #ccc;
  font-size: 17px;
  padding-left: 15px;
  transition: all 0.3s ease;
}
.inputField input:focus{
  border-color: #8E49E8;
}
.inputField button{
  width: 50px;
  height: 100%;
  border: none;
  color: #fff;
  margin-left: 5px;
  font-size: 21px;
  background: #8E49E8;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.3s ease;
}
.inputField button:hover{
  background: #721ce3;
}
.inputField button.active{
  opacity: 1;
}
</style>
