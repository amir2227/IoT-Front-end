<template>
  <main>
    <!-- Auth Layout -->
    <div class="auth-dashboard" v-if="this.$route.meta.layout === 'authLayout'">
      <div class="content">
        <div class="auth-content">
          <RouterView />
        </div>
      </div>
    </div>
    <!-- Auth Layout -->

    <!-- Dashboard Layout -->
    <div class="main-dashboard" v-if="this.$route.meta.layout === 'dashLayout'">
      <div class="content">
        <Sidebar />
        <div class="dashboard-content">
          <RouterView />
        </div>
      </div>
    </div>
    <!-- Dashboard Layout -->
  </main>
</template>
<script >
import Sidebar from "./components/Sidebar.vue";
export default {
    
    components: { Sidebar }
};
</script>
<style>
@import "@/assets/base.css";
main{
  display: contents;
}
#app,
.main-dashboard,
.auth-dashboard {
  height: 100%;
  position: absolute;
  width: 100%;
  direction: rtl;
}
.content {
  height: 100%;
  display: inline-flex;
  width: 100%;
}
.dashboard-content,
.auth-content {
  padding: 2rem 2rem;
  width: inherit;
}
.auth-content {
  margin: 6rem auto;
  max-width: 700px;
}
</style>
