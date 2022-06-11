<template>
  <div class="row">
     <va-input
      class="flex mb-2 md3"
      placeholder="Filter..."
      v-model="filter"
      @keyup="fetchData"
    />
    <div class="flex md12 lg12">
      <div class="va-table-responsive">
        <table class="va-table va-table--hoverable">
          <thead>
            <tr>
              <th>ردیف</th>
              <th>عنوان</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(plant, index) in plants" :key="plant.id">
              <td>{{ index + 1 }}</td>
              <td @click="getPlant(plant.id)">{{ plant.title }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="page">
      <va-pagination v-model="page" :pages="totalPage" :visible-pages="7" @click="fetchData" />
    </div>
  </div>
  <va-modal
    v-model="showModal"
    fullscreen
    :message="content"
    :title="title"
    hide-default-actions
  />
</template>
<script>
import { API_URL } from "../constant";
import { getToken } from "../utility";
export default {
  data() {
    return {
      plants: [],
      filter: "",
      page: 1,
      getPage: 0,
      totalPage: 0,
      content: "",
      title: "",
      showModal: false,
    };
  },
  methods: {
    fetchData() {
      this.getPage = Number(this.page) - 1;
      const URL =
        API_URL + "/api/plant/?key=" + this.filter + "&page=" + this.getPage;
      this.axios.get(URL).then((response) => {
        this.plants = response.data.content;
        this.totalPage = response.data.totalPages;
      });
    },
    getPlant(id) {
      const URL = API_URL + "/api/plant/" + id;
      this.axios.get(URL).then((response) => {
        this.content =  response.data.content;
        this.title = response.data.title;
        this.showModal = !this.showModal;
      });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
<style scoped>
.va-table {
  width: 70%;
}
.va-table td,
.va-table th {
  text-align: center;
}
.va-table-responsive {
  display: flex;
  justify-content: center;
}
.va-pagination {
  direction: ltr;
}
.page {
  margin-top: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
}

</style>
<style >
.va-modal__message{
  text-align: justify;
  line-height: 2rem;
  width: 100%;
  font-size: 18px;
}
.va-modal__inner{
  max-width: 1000px;
}
.va-modal__title{
  font-size: 2.5rem;
  font-weight: bold;
  margin-top: 20px;
}
</style>