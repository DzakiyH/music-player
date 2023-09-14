<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <AppUpload ref="upload" :addSong="addSong" />
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">{{ $t('manage.my_songs') }}</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem
              v-for="(song, i) in songs"
              :key="song.docId"
              :song="song"
              :index="i"
              :updateSong="updateSong"
              :removeSong="removeSong"
              :updateUnsavedFlag="updateUnsavedFlag"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CompositionItem from '../components/CompositionItem.vue'

// import useUserStore from '@/stores/user'
import AppUpload from '../components/Upload.vue'
import { auth, db } from '@/includes/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

export default {
  name: 'Manage',
  components: {
    AppUpload,
    CompositionItem
  },
  data() {
    return {
      songs: [],
      unsavedFlag: false
    }
  },
  async created() {
    const songsRef = collection(db, 'songs')
    const q = query(songsRef, where('uid', '==', auth.currentUser.uid))
    const snapshot = await getDocs(q)

    snapshot.forEach(this.addSong)
  },
  methods: {
    addSong(document) {
      const song = {
        ...document.data(),
        docID: document.id
      }

      this.songs.push(song)
    },
    updateSong(i, values) {
      this.songs[i].modifiedName = values.modifiedName
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i, 1)
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value
    }
  },
  beforeRouteLeave(to, from, next) {
    if (this.unsavedFlag) {
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
      next(leave)
    }
    next()
  }
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUpload()
  //   next()
  // }
  // beforeRouteEnter(to, from, next) {
  //   const store = useUserStore()

  //   if (store.userLoggedIn) {
  //     next()
  //   } else {
  //     next({ name: 'home' })
  //   }
  // }
}
</script>
