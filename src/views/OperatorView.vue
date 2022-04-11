<template>
 <div class="row">
    <va-input
      class="flex mb-2 md3"
      type="number"
      placeholder="Items..."
      label="Items per page"
      v-model.number="perPage"
    />

    <va-input
      class="flex mb-2 md3"
      type="number"
      placeholder="Page..."
      label="Current page"
      v-model.number="currentPage"
    />

    <va-input
      class="flex mb-2 md3"
      placeholder="Filter..."
      v-model="filter"
    />
  </div>
   <va-data-table
    :items="operators"
    :columns="columns"
    :per-page="perPage"
    :current-page="currentPage"
    :selectable="false"
    :filter="filter"
    @filtered="filtered = $event.items"
  >
    <template #bodyAppend>
      <tr><td colspan="8" class="table-example--pagination">
        <va-pagination
          v-model="currentPage"
          input
          :pages="pages"
        />
      </td></tr>
    </template>
  </va-data-table>
</template>
<script>
import { API_URL } from "../constant";
import { getToken } from "../utility";
import ButtonGroup from "../components/ButtonGroup.vue";

export default {
    data() {
       const columns = [
      { key: 'ردیف', sortable: true, width: '60px' },
      { key: 'نام', sortable: true, width: '120px' },
      { key: 'نوع', sortable: true, width: '170px' },
      { key: 'لوکیشن', sortable: true, width: '250px' },
      { key: 'وضعیت' },
    ]
        return {
            operators: [],
            columns,
            perPage: 3,
            currentPage: 1,
            filter: '',
            
        };
        
    },
    mounted() {
        const URL = API_URL + "/api/device/operator";
        const token = getToken();
        this.axios
            .get(URL, {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
            console.log(response.data);
            this.operators = response.data;
            
        });
       
    },
    components: { ButtonGroup },
    
};
</script>
<style scoped>
.va-table {
width: 100%;
}

</style>