<template>
  <div class="editor-box"></div>
</template>

<script>
import { addUser, updateUser, getUserList } from "@/api/user";
export default {
  data() {
    return {};
  },
  created() {
    this.parseGetUserList()
  },
  methods: {
    parseAddUser() {
      addUser({ name: "ceshi", passwd: "123456" })
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    parseUpdateUser() {
      updateUser({ id: 1, name: "akh33", passwd: "79822" })
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    parseGetUserList() {
      getUserList()
        .then(res => {
          console.log(res.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped lang="scss"></style>
