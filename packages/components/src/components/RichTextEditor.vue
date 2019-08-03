<template>
  <quill-editor class="rich-text-editor" v-if="content"
    :value="content"
    @input="$emit('input', $event.target.value)"
    :options="editorOption">
  </quill-editor>
</template>

<script>
import hljs from 'highlight.js'
import { Quill } from 'vue-quill-editor'

function imageHandler() {
  var range = this.quill.getSelection();
  var value = prompt('What is the image URL');
  if(value){
    this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
  }
}

export default {
  props: {
    initialContent: String
  },
  data() {
    return {
      content: this.initialContent,
      editorOption: {
        modules: {
          toolbar: {
            handlers: {
              image: imageHandler
            },
            container: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean'],
              ['link', 'image', 'video']
            ]
          },
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    }
  },
  watch: {
    initialContent(after, before) {
      if (before !== after) this.content = after
    }
  }
}
</script>
