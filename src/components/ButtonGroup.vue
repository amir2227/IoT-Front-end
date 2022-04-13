<template>
  <!-- <va-button-group flat class="mb-4"> -->
  <div>
    <va-button icon="visibility" color="info" />

    <va-button icon="edit" color="info" @click="showModal = !showModal" />

    <va-modal
      v-model="showModal"
      title="ویرایش"
      hide-default-actions
      overlay-opacity="0.5"
    >
      <component
        :is="{ ...editComp }"
        :operator-id="operatorId"
        :fetch-data="fetchData"
        :hide-modal="closeModal"
      ></component>
    </va-modal>
    <va-button icon="delete" color="danger" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    closeModal() {
      this.showModal = !this.showModal;
    },
  },

  props: ["editComp", "operatorId", "fetchData"],
};
</script>

<style scoped>
.va-button {
  margin-left: 9px;
}
</style>