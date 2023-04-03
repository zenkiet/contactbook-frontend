<template>
    <div>
        <div class="page">
            <h4>Thêm liên hệ Liên hệ</h4>
            <ContactFrom :contact="contact" @submit:contact="addContact" />
        </div>
    </div>
</template>

<script>
import ContactService from "@/services/contact.service";
import ContactFrom from "@/components/ContactForm.vue";
import { reactive } from "vue";

export default {
    components: {
        ContactFrom,
    },
    setup() {
        const contact = reactive({
            name: "",
            phone: "",
            email: "",
            address: "",
        });

        const message = reactive({
            value: "",
        });

        async function addContact(data) {
            try {
                await ContactService.create(data);
                message.value = "Liên hệ được thêm thành công.";
                console.log(message.value);
            } catch (error) {
                console.log(error);
            }
        }

        return { contact, message, addContact };
    },
};
</script>
