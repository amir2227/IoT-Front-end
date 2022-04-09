<template>
  <div class="main-dashboard">
    <div class="content" >
    <Sidebar />
      <div class="dashboard-content">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script >
import Sidebar from "./components/Sidebar.vue";
export default {
    data() {
        return {
            items: [
                {
                    title: "داشبورد",
                    icon: "dashboard",
                    // active: true,
                    link: "/dashboard",
                },
                { title: "مدیریت سنسور", icon: "room", link: "/sensors" },
                { title: "بقیه موراد", icon: "loop", link: "dump" },
            ],
        };
    },
    components: { Sidebar }
};
</script>
<style>
@import "@/assets/base.css";
#app,
.main-dashboard {
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
.dashboard-content {
  padding: 2rem 2rem;
  width: inherit;
}
</style>
