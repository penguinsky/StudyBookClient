<template>
  <div class="note">
    <div v-if="note != null">
      <div class="header">
        <div class="file-path">
          {{ note.parent_directory_path_from_root.split('/').join(' > ') }} >
          {{ note.title }}
        </div>
        <div class="tags">
          <Tags :note="note" />
        </div>
      </div>
      <DisplayMd class="body" :md-data="noteBody" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DisplayMd from './DisplayMd.vue'
import Note from '@/models/Note'
import Tags from './Tags.vue'
import { readNoteBody } from './NoteCRUD'

export default {
  components: {
    DisplayMd,
    Tags
  },
  data: function() {
    return {
      noteBody: ''
    }
  },
  computed: {
    ...mapState('notes', {
      focusNote: state => state.focusNote
    }),
    note() {
      let note = Note.query()
        .whereId(1125899906911517)
        .with('category')
        .with('tags')
        .with('parent_directory')
        .first()
      if (note == null) return
      this.setNote(note)
      return note
    }
  },
  methods: {
    setNote(note) {
      readNoteBody(note.parent_directory_path_from_root, note.file_name).then(
        response => {
          this.noteBody = response
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.note {
  .header {
    background-color: #5eaaa8;
    height: 32px;
    font-size: 0.8em;
    padding: 3px 10px;
    white-space: nowrap;
    .file-path {
      vertical-align: middle;
      display: inline-block;
      color: #e5e5e5;
      margin-right: 10px;
    }
    .tags {
      display: inline-block;
    }
  }
  .body {
    padding: 10px 30px 20px 30px;
  }
}
</style>