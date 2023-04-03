<template>
<ul class="list-group">
    <li class="list-group-item" v-for="(contact, index) in contacts" :key="contact.id" :class="{ active: index === selected }" @click="select(index)">
        {{ contact.name }}
    </li>
</ul>
</template>

<script>
export default {
    props: {
        contacts: {
            type: Array,
            default: []
        },
        activeIndex: {
            type: Number,
            default: -1
        },
    },
    emits: ["update:activeIndex"],
    watch: {
        activeIndex(newValue) {
            if (newValue === -1) {
                this.selected = -1;
            }
        },
    },
    data() {
        return {
            selected: this.activeIndex,
        };
    },
    methods: {
        select(index) {
            this.selected = index;
            this.$emit("update:activeIndex", index);
        },
    },
};
</script>

<style>
</style>