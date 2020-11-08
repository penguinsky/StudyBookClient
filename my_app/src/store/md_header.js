export default {
  namespaced: true,
  state: {
    title: '',
    category: '',
    tags: []
  },
  mutations: {
    set_title(state, title) {
      state.title = title
    },
    set_category(state, category) {
      state.category = category
    },
    set_tags(state, tags) {
      state.currentTagId = 0
      state.tags = tags
    },
    set_tag(state, { tag, index }) {
      state.tags.splice(index, 1, tag)
    },
    delete_tag(state, { index }) {
      state.tags.splice(index, 1)
    }
  },
  actions: {
    update({ commit }, md_text) {
      var rows = md_text.split(/\r\n|\n/)
      var title = ''
      var category = ''
      var tags = []

      for (const row of rows) {
        if (row === '') {
          break
        }
        const columns = row.split(/:/)
        const dataCategory = columns[0].trim()
        const data = columns[1].trim()

        switch (dataCategory) {
          case 'title':
            title = data
            break
          case 'category':
            category = data
            break
          case 'tags':
            tags = data.split(/,/).map(tag => tag.trim())
            break
        }
      }
      commit("set_title", title)
      commit("set_category", category)
      commit("set_tags", tags)
    },
    createTag({ commit, state }, name) {
      const new_tags = state.tags.concat(name);
      commit("set_tags", new_tags)
    },
    editTag({ commit }, { tag, index }) {
      commit("set_tag", { tag: tag, index: index })
    },
    deleteTag({ commit }, { tag, index }) {
      commit("delete_tag", { tag: tag, index: index })
    }
  }
}
