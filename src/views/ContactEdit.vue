<template>
    <div>
        <div v-if="contact" class="page">
            <h4>Hiệu chỉnh Liên hệ</h4>
            <ContactFrom 
                :contact="contact" 
                @submit:contact="updateContact" 
                @delete:contact="deleteContact" 
            />
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import ContactService from '@/services/contact.service';
import ContactFrom from '@/components/ContactForm.vue';

export default {
    components: {
        ContactFrom,
    },
    props: {
        id: { type: String, require: true },
    },
    setup(props) {
        const contact = ref(null);
        const message = ref('');

        const getContact = async (id) => {
            try {
                contact.value = await ContactService.get(id);
            } catch (error) {
                console.log(error);
                //chuyển sang trang Notfound đồng thời giữ cho URl không thay đổi
                const path = props.$router.path.split('/').slice(1);
                props.$router.push({
                    name: 'NotFound',
                    params: {
                        pathMatch: path,
                    },
                    query: props.$route.query,
                    hash: props.$route.hash,
                });
            }
        };

        const updateContact = async (data) => {
            try {
                await ContactService.update(contact.value._id, data);
                message.value = 'Liên hệ được cập nhật thành công.';
                console.log(message.value);
            } catch (error) {
                console.log(error);
            }
        };

        const deleteContact = async () => {
            if (confirm('Bạn muốn xóa liên hệ này?')) {
                try {
                    await ContactService.delete(contact.value.id);
                    props.$router.push({ name: 'ContactBook' });
                } catch (error) {
                    console.log(error);
                }
            }
        };

        onMounted(() => {
            getContact(props.id);
            message.value = '';
        });

        return {
            contact,
            message,
            getContact,
            updateContact,
            deleteContact,
        };
    },
};
</script>