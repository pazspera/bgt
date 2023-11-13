<template>
  <v-select 
    label="¿Quién ganó?" 
    color="primary" 
    :disabled="enableWinnerSelect"  
    item-title="Name" 
    item-value="Id"
    ></v-select>
</template>

<script>
export default {
    name: "SelectWinner",
    setup() {

    },
};
</script>

<style></style>
