<template>
      <va-sidebar :minimized="minimized" textColor="dark" minimizedWidth="64px">
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
};
</script>
