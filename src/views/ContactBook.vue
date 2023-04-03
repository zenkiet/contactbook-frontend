<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="state.searchText" />
        </div>
        <div class="mt-3 col-md-10">
            <h4>
                Danh bạ
                <i class="fas fa-address-book"></i>
            </h4>
            <ContactList v-if="filteredContactsCount > 0" :contacts="filteredContacts"
                v-model:activeIndex="state.activeIndex" />
            <p v-else>Không có liên hệ nào.</p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddContact">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="removeAllContacts">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>

            <div class="mt-3 col-md-6">
                <div v-if="activeContact">
                    <h4>
                        Chi tiết Liên hệ
                        <i class="fas fa-address-card"></i>
                    </h4>
                    <ContactCard :contact="activeContact" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, computed, watch, onMounted } from "vue";

import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";

export default {
    components: {
        ContactCard,
        InputSearch,
        ContactList,
    },

    setup() {
        const state = reactive({
            contacts: [],
            activeIndex: -1,
            searchText: "",
        });

        const contactStrings = computed(() => {
            return state.contacts.map((contact) => {
                const { name, email, address, phone } = contact;
                return `${name} ${email} ${address} ${phone}`;
            });
        });

        const filteredContacts = computed(() => {
            if (!state.searchText) {
                return state.contacts;
            }
            const searchTextLowerCase = state.searchText.toLowerCase();
            return state.contacts.filter((contact) => {
                const contactString =
                    `${contact.name} ${contact.phone} ${contact.email}`.toLowerCase();
                return contactString.includes(searchTextLowerCase);
            });
        });

        const activeContact = computed(() => {
            if (state.activeIndex < 0) return null;
            return filteredContacts.value[state.activeIndex];
        });

        const filteredContactsCount = computed(() => {
            return filteredContacts.value.length;
        });

        const retrieveContacts = async () => {
            try {
                state.contacts = await ContactService.getAll();
            } catch (error) {
                console.log(error);
            }
        };

        const refreshList = () => {
            retrieveContacts();
            state.activeIndex = -1;
        };

        const removeAllContacts = async () => {
            if (confirm("Bạn có chắc chắn muốn xóa tất cả?")) {
                try {
                    await ContactService.deleteAll();
                    refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        };

        const goToAddContact = () => {
            router.push({
                name: "contact.add",
            });
        };

        watch(
            () => state.searchText,
            (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    state.activeIndex = -1;
                }
            }
        );

        onMounted(() => {
            refreshList();
        });

        return {
            state,
            filteredContacts,
            activeContact,
            filteredContactsCount,
            retrieveContacts,
            refreshList,
            removeAllContacts,
            goToAddContact,
        };
    },
};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 800px;
}
</style>
