<template>
    <div class="input-group">
        <input type="text" class="form-control" 
            placeholder="Nhập thông tin cần tìm" 
            :value="modelValue"
            @input="updateModelValue" 
            @keyup.enter="submit" />
        <div class="input-group-append">
            <button class="btn btn-outline-secondary" 
                type="button" 
                @click="submit">
                <i class="fa fa-search"></i> Tìm Kiếm
            </button>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        modelValue: { type: String, default: "" },
    },
    emits: ["submit", "update:modelValue"],
    setup(props, { emit }) {
        const modelValue = ref(props.modelValue);

        const updateModelValue = (e) => {
            modelValue.value = e.target.value;
            emit("update:modelValue", modelValue.value);
        };

        const submit = () => {
            emit("submit");
        };

        return {
            modelValue,
            updateModelValue,
            submit,
        };
    },
});
</script>
