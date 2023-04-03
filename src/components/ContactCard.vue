<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ contact.name }}
        </div>

        <div class="p-1">
            <strong>Email:</strong>
            {{ contact.email }}
        </div>

        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ contact.address }}
        </div>

        <div class="p-1">
            <strong>Điện thoại:</strong>
            {{ contact.phone }}
        </div>

        <div class="p-1">
            <strong>Liên hệ yêu thích:&nbsp;</strong>
            <i v-if="contact.favorite" class="fas fa-check"></i>
            <i v-else class="fas fa-times"></i>
        </div>
    </div>
</template>
  
<script>
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
    props: {
        contact: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const { contact } = toRefs(props);

        return {
            contact,
        };
    },
});
</script>