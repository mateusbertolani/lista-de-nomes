<template>
  <v-container class="pa-4" style="max-width: 600px; margin: auto">
    <v-card-title>Lista de Nomes</v-card-title>
    <v-row justify="center">
      <v-col cols="12" md="9">
        <v-card color="#4169E1">
          <v-card-text>
            <v-row class="align-center">
              <v-col>
                <v-text-field
                  v-model="name"
                  variant="text"
                  placeholder="Digite o nome aqui: "
                  hide-details
                  density="comfortable"
                />
              </v-col>
              <v-col cols="auto">
                <v-btn variant="text"  @click="saveName()">
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <div>
          <v-card
            v-for="(item, index) in nameList"
            :key="index"
            color="#4169E1"
            style="border-top: 1px solid #ccc; border-radius: 0"
          >
            <v-card-text class="d-flex justify-space-between align-center">
              <div v-if="editingIndex === index" style="flex: 1">
                <v-text-field
                  v-model="nameEdit"
                  variant="underlined"
                  density="compact"
                  hide-details
                  autofocus
                  @keydown.enter="saveName"
                  @blur="saveName"
                />
              </div>

              <div v-else style="flex: 1">
                {{ item }}
              </div>
              
              <div class="d-flex" style="gap: 2px">
                <v-btn
                  icon
                  variant="text" 
                  density="compact" 
                  @click="editName(index)"
                  v-if="editingIndex !== index"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>

                <v-btn
                  v-if="editingIndex === index"
                  icon
                  variant="text"
                  density="compact"
                  @click="cancelEdit"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-btn
                  icon 
                  variant="text" 
                  density="compact" 
                  @click="deleteName(index)"
                >
                  <v-icon >mdi-delete</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col> 
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

  const name = ref("")
  const nameList = ref([])
  const editingIndex = ref(null)
  const nameEdit = ref("")

  onMounted(() => {
    const saved = localStorage.getItem("nameList")
    if (saved) {
      nameList.value = JSON.parse(saved)
    }
  })
  


  function saveName() {
    const trimmed = editingIndex.value !== null
      ? nameEdit.value.trim()
      : name.value.trim()

    if (!trimmed) return

    if (editingIndex.value !== null) {
      nameList.value[editingIndex.value] = trimmed
      editingIndex.value = null
      nameEdit.value = ""
    }
    else {
      nameList.value.push(trimmed)
      name.value = ""
    }
  }

  function deleteName(index) {
    nameList.value.splice(index, 1)
  }

  function editName(index) {
    nameEdit.value = nameList.value[index]
    editingIndex.value = index
  }

  function cancelEdit() {
    editingIndex.value = null
    nameEdit.value = ""
  }

  watch(nameList, (newList) => {
    localStorage.setItem("nameList", JSON.stringify(newList))
  }, {deep: true })
</script>

