import {
  FETCH_PUBLISH_ANSWER,
  FETCH_PUBLISH_QUESTION,
} from './type/actions'

import {
  SET_EDIT_IMAGES,
  SET_EDIT_TAGS,
  SET_EDIT_WORDS,
  DELETE_EDIT_IMAGES,
  DELETE_EDIT_TAGS,
  SET_PORGRESSING,
  END_PORGRESSING,
} from './type/mutations'
import { QuestionService } from '@/common/service/api';

const initialState = {
  words: '',
  tags: [],
  image: [],
  isProgressing: false,
}

const state = { ...initialState }

const actions = {
  async [FETCH_PUBLISH_QUESTION] ({ commit, state }) {
    commit(SET_PORGRESSING)
    const { data } = await QuestionService.post({
      content: state.words,
      tags: state.tags.map(item=>{
        return { id: item }
      }),
      photo: [],
    })
    commit(END_PORGRESSING)
  }
}

const mutations = {
  [SET_EDIT_IMAGES] (state, base64) {
    state.image.push(base64)
  },
  [DELETE_EDIT_IMAGES] (state, index) {
    state.image.splice(index, 1)
  },
  [SET_EDIT_TAGS] (state, tagId) {
    state.tags.push(tagId)
  },
  [DELETE_EDIT_TAGS] (state, tagId) {
    state.tags = state.tags.filter(item => item !== tagId)
  },
  [SET_EDIT_WORDS] (state, words) {
    state.words = words
  },
  [SET_PORGRESSING] (state) {
    state.isProgressing = true
  },
  [END_PORGRESSING] (state) {
    state.isProgressing = false
    state.words = ''
    state.image = []
    state.tags = []
  }
}

const getters = {
  editImage() {
    return state.image
  },
  editWord() {
    return state.words
  },
  editTags() {
    return state.tags
  },
  editProgress() {
    return state.isProgressing
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}