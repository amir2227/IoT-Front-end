<template>
  <va-sidebar :minimized="minimized" textColor="dark" minimizedWidth="64px">
    <div style="height: 50px; background: #97a2ad; text-align: center" @click="minimized = !minimized">
      <va-icon name="sync_alt" style="margin-top: 10px" />
    </div>
    <template v-for="item in items" :key="item.to">
      <va-sidebar-item :active="item.active">
        <router-link :to="item.link">
          <va-sidebar-item-content>
            <va-icon :name="item.icon" />
            <va-sidebar-item-title v-if="!minimized" style="height: 24px">
              {{ item.title }}
            </va-sidebar-item-title>
          </va-sidebar-item-content>
        </router-link>
      </va-sidebar-item>
    </template>
  </va-sidebar>
</template>
<script >
export default {
  data() {
    return {
      minimized: false,
      items: [
        {
          title: "داشبورد",
          icon: "dashboard",
          // active: true,
          link: "/dashboard",
        },
        { title: "مدیریت سنسور", icon: "sensors", link: "/sensors" },
        { title: "مدیریت عملگر", icon: "emoji_objects", link: "/operators" },
        { title: "مدیریت لوکیشن", icon: "room", link: "/locations" },
        { title: "بقیه موراد", icon: "loop", link: "#" },
      ],
    };
  },
};
</script>

<style scoped>
.va-icon{
  padding-left: 20px;
}
</style>