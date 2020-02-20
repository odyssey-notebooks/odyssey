<template>
  <div class="record-inspector">
    <template v-if="selectedRecordId">
      <div class="current-view">       
        <div class="view-switcher">
          <div class="view-switcher-option"
            :class="{ active: currentView === 'fields' }"
            @click="currentView = 'fields'"
          ><span class="mdi mdi-table"/></div>
          <div class="view-switcher-option"
            :class="{ active: currentView === 'json' }"
            @click="currentView = 'json'"
          ><span class="mdi mdi-json"/></div>
        </div>  
        <template v-if="currentView === 'fields'">
          <h4 style="font-family:sans-serif;">ID: {{ selectedRecordId }}</h4>
          <template v-for="field in fields">
            <inline-text-field
              v-if="field.type === 'inline-text'" 
              :key="field.key + ' - ' + selectedRecordId" 
              :value="field.value"
              :label="field.label"
              @input="value => patchField(field.key, value )"
              editable
            />
            <markdown-field
              v-else-if="field.type === 'markdown'" 
              :key="field.key + ' - ' + selectedRecordId"
              :value="field.value"
              :tags="$store.getters.tags"
              :label="field.label"
              @input="value => patchField(field.key, value )"
              editable
            />
            <input type="number" 
              v-else-if="field.type === 'number'" 
              :key="field.key + ' - ' + selectedRecordId"
              :value="field.value"
              @input="e => patchField(field.key, Number(e.target.value))"
            >
            <dropdown-field 
              v-else-if="field.type === 'reference'" 
              :key="field.key + ' - ' + selectedRecordId"
              :value="field.value"
              :label="$store.getters.archetypes.find(arch => arch._id === field.archetype).name"
              :options="$store.getters.instances
                .filter(inst => inst.__meta__.archetype === field.archetype)
                .map(record => ({
                  id: record._id,
                  text: resolvedRecordToString($store.getters.resolved(record)) || '(no text provided)'
                }))"
              @input="value => patchField(field.key, value)"
              editable
            />
            <checkbox-field
              v-else-if="field.type === 'checkbox'" 
              :key="field.key + ' - ' + selectedRecordId"
              :value="field.value"
              :label="field.label"
              @input="value => patchField(field.key, value)"
              editable
            />
            <multiple-choice-field 
              v-else-if="field.type === 'referenceSet'" 
              :key="field.key + ' - ' + selectedRecordId"
              :value="field.value" 
              :label="field.label" 
              :options="$store.getters.instances
                .filter(inst => (inst.__meta__.archetype === field.archetype) && !(inst._id === record._id))
                .map(inst => ({
                  value: inst._id,
                  label: resolvedRecordToString($store.getters.resolved(inst)) || '(no text provided)'
                }))" 
              @input="value => patchField(field.key, value)"
              editable
            />
            <multiple-choice-field 
              v-else-if="field.type === 'selfReferenceSet'" 
              :key="field.key + ' - ' + selectedRecordId"
              :value="field.value" 
              :label="field.label" 
              :options="$store.getters.instances
                .filter(inst => (inst.__meta__.archetype === record.__meta__.archetype) && !(inst._id === record._id))
                .map(inst => ({
                  value: inst._id,
                  label: resolvedRecordToString($store.getters.resolved(inst)) || '(no text provided)'
                }))" 
              @input="value => patchField(field.key, value)"
              editable
            />
            <icon-field
              v-else-if="field.type === 'icon'" 
              :key="field.key + ' - ' + selectedRecordId"
              :value="field.value"
              :label="field.label"
              @input="value => patchField(field.key, value)"
              editable
            />
          </template>
        </template>
        <template v-else-if="currentView === 'json'">
          <json-field
            v-model="recordJson" 
            :key="selectedRecordId+'-json'" 
            editable
            label="Raw JSON"
          />
          <json-field
            :value="JSON.stringify($store.getters.selectedRecordResolved, null, 2)" 
            :key="selectedRecordId+'-resolved-json'" 
            label="Resolved JSON"
          />
        </template>
      </div>
      <hr>
      <button class="delete-btn" @click="deleteButtonClicked">Delete This Record</button>
    </template>
  </div>
</template>

<script>
import { 
  TitleField,
  InlineTextField,
  MarkdownField,
  JsonField,
  DropdownField,
  CheckboxField,
  MultipleChoiceField,
  IconField
} from 'odyssey-components';
import { resolvedRecordToString } from 'odyssey-core';

export default {
  components: {
    TitleField,
    InlineTextField,
    MarkdownField,
    JsonField,
    DropdownField,
    CheckboxField,
    MultipleChoiceField,
    IconField
  },
  data() {
    return {
      currentView: 'fields',
      resolvedRecordToString
    }
  },
  computed: {
    record() {
      return this.$store.getters.liveRecord
    },
    recordJson: {
      get() {
        const { _id, ...safeRecord} = this.record
        return JSON.stringify(safeRecord || '', null, 2)
      },
      set(val) {
        const currentRecord = this.record
        const newRecord = JSON.parse(val)
        if (newRecord._id) {
          throw new Error("top-level key '_id' is reserved")
          return
        }
        this.$db.update(this.selectedRecordId, newRecord)
      }
    },
    selectedRecordId() {
      return this.record._id
    },
    fields() {
      const { __meta__, _id, ...fields } = this.$store.getters.selectedRecordResolved || {}
      return Object.values(fields)
    }
  },
  methods: {
    deleteButtonClicked(e) {
      if (e.shiftKey || confirm('Are you sure you want to delete this record?\n\n(tip: Bypass this confirmation by holding Shift when deleting.)')) {
        this.removeSelectedRecord()
      }
    },
    patchField(fieldName, patchedData) {
      this.$db.patch(this.selectedRecordId, { [fieldName]: patchedData })
    },
    removeSelectedRecord() {
      this.$db.remove(this.selectedRecordId)
      this.$store.commit('resetSelectedRecord')
    }
  }
};
</script>

<style scoped>
.record-inspector {
  width: 100%;
  height: 100%;
  padding: 1rem 2rem;
  overflow: auto;
}
.current-view {
  position: relative;
  width: 100%;
}
.view-switcher {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
}
.view-switcher-option {
  font-size: 2rem;
  padding: 0.25rem;
  opacity: 0.4;
  transition: opacity 250ms;
  cursor: pointer;
}
.view-switcher-option:hover {
  opacity: 0.6;  
}
.view-switcher-option.active {
  opacity: 0.8;
}
hr {
  margin: 4rem 0;
  border-color: rgba(0,0,0,0.2);
}
.delete-btn {
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: rgba(255,0,0,0.1);
  border: 1px solid rgba(255,0,0,0.3);
  cursor: pointer;
}
</style>
