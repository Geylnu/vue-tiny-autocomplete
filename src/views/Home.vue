<template>
  <div class="home">
    <BaseAutoComplete
      v-model="keywords"
      :fetch-suggestions="fetchSuggestions"
    ></BaseAutoComplete>
  </div>
</template>

<script>
import BaseAutoComplete from "@/components/BaseAutoComplete/index.vue";

export default {
  name: "Home",
  components: { BaseAutoComplete },
  data() {
    return {
      keywords: "",
    };
  },
  methods: {
    fetchSuggestions(keywords) {
      console.log(keywords);
      return [
        { value: "wonollivo-8662@yopmail.com" },
        { value: "nudduzuffad-8616@yopmail.com" },
        { value: "tuzuqudo-7454@yopmail.com" },
        { value: "testestesta" },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eeee;
}
</style>
