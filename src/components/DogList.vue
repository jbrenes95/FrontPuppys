<template>
  <q-item clickable tag="a" target="_blank">
    <q-avatar>
      <img v-bind:src="image" />
    </q-avatar>

    <q-item-section>
      <q-item-label clickable style="text-align: center">{{
        name
      }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
<script>
export default {
  name: "doglist",
  props: {
    id: "",
    name: "",
    image: "",
  },
};
</script>
