export default {
  namespaced: true,
  state: {
    filteredMyLists: [],
    focusMyList: null,
    focusMyListNote: null,
    searchParams: '',
    filteringCategoryId: null
  },
  mutations: {
    setFilteredMyLists(state, ids) {
      state.filteredMyLists = ids
    },
    setFocusMyList(state, id) {
      state.focusMyList = id
    },
    setFocusMyListNote(state, id) {
      state.focusMyListNote = id
    },
    setSearchParams(state, params) {
      state.searchParams = params
    },
    setfilteringCategoryId(state, categoryId) {
      state.filteringCategoryId = categoryId
    }
  }
}
