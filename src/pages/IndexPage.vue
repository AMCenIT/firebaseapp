<!-- eslint-disable vue/valid-v-for -->
<template>
  <q-page>
    <div>
      <!-- <q-file v-model="fileme" label="Standard" />
      <q-btn
        color="accent"
        label="Upload"
        class="q-pa-lg"
        @click="uplaod()"
        flat
        dense
      /> -->
      <q-btn
        color="accent"
        icon="add"
        class="q-pa-lg"
        label="Create Product"
        @click="addModal()"
        flat
        dense
      />
      <q-dialog v-model="openedAddModal">
        <q-card class="q-ma-md" width="500px">
          <q-card-section>
            <q-input
              label="Name"
              lazy-rules
              :rules="[(val) => !!val || 'Please enter account  Name']"
              v-model="name"
            >
            </q-input>

            <q-input

              v-model="description"
              label="Description"
            >
            </q-input>

            <q-input

              v-model="specifications"
              label="Specifications"
            >
            </q-input>
            <q-input

              v-model.number="price"
              label="Price"
            >
            </q-input>
            <q-input

              v-model.number="pricebefore"
              label="Price Before"
            >
            </q-input>
            <q-input

              v-model="brand"
              label="Brand"
            >
            </q-input>
            <q-rating
              v-model="ratings"
              max="5"
              size="3.5em"
              color="yellow"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              no-dimming
            />
            <q-separator />
            <br />
            <q-file
              filled
              bottom-slots
              v-model="fileme"
              label="Product Image"
              counter
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="fileme = null"
                  class="cursor-pointer"
                />
              </template>

              <template v-slot:hint> Field hint </template>
            </q-file>
            <br />
            <q-file
              filled
              bottom-slots
              v-model="fileme"
              label="Product View Image"
              counter
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop.prevent />
              </template>
              <template v-slot:append>
                <q-icon
                  name="close"
                  @click.stop.prevent="fileme = null"
                  class="cursor-pointer"
                />
              </template>

              <template v-slot:hint> Field hint </template>
            </q-file>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              color="accent"
              label="Save"
              class="q-pa-lg"
              @click="Add()"
              flat
              dense
            />
          </q-card-actions>
        </q-card>
      </q-dialog >
      <div class="q-pa-md row items-start q-gutter-md">
      <q-card class="my-card" :key="item.id" v-for="item in datassss" @click=" editData(item) ">
        <q-img width="300px"  height="300px" :src="item.image" />
      <q-card-section>
        <div class="text-h6" style=" white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 250px;">{{ item.name }}</div>
        <div class="text-h5 text-orange"> <span>&#8369;</span> {{ item.price }}</div>
        <div  class="text-subtitle2 text-grey"> <span>&#8369;</span> <span style="text-decoration-line: line-through">{{ item.pricebefore }}</span> - <span class="text-black text-caption">{{item.percent}}%</span></div>
        <div>   <q-rating
              v-model="item.ratings"
              max="5"
              size="1.5em"
              color="yellow"
              icon="star_border"
              icon-selected="star"
              icon-half="star_half"
              no-dimming
            />
            <span class="text-grey">(123)</span>
            </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
      </q-card-section>
      <q-card-section align="right">
        <q-btn
        icon="close"
        @click="openedpassData(item)">

        </q-btn>
      </q-card-section>
    </q-card>
    </div>
      <!-- edit item -->
      <q-dialog v-model="editModal" width="700px">
        <q-form @submit="onSubmitUpdate" width="700px">
          <q-card style="width: 700px">
            <q-card-section>
              <div class="text-subtitle2">
                <q-input
                  v-model="docName"
                  label="docName"
                />
                <q-input
                  v-model="docDesc"
                  label="docDesc"
                />
              </div>
            </q-card-section>

            <q-card-actions>
              <q-btn
                label="Cancel"
                type="reset"
                v-close-popup
                class="col"
                unelevated
              />
              <q-btn
                unelevated
                type="submit"
                label="Save"
                class="col"
              />
            </q-card-actions>
          </q-card>
        </q-form>
      </q-dialog>

      <!-- delete item -->
      <q-dialog v-model="opened">
        <q-card class="my-card bg-purple text-white">
          <q-card-section>
            <div class="text-subtitle2">
              Are your sure you want do delete this item {{ docName }}?
            </div>
          </q-card-section>

          <q-card-actions>
            <q-btn flat v-close-popup="opened">Cancel</q-btn>
            <q-btn flat @click="confirmed">Confirm</q-btn>
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { useQuasar } from "quasar";
import "firebase/firestore";
import { initializeApp, getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  ref as storageRef,
  getDownloadURL as stogegetDownloadURL,
} from "@firebase/storage";

const app = getCurrentInstance().appContext.config.globalProperties;

// Your web app's Firebase configuration
const datassss = ref([]);
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const description = ref("");
const name = ref("");
const specifications = ref("")
const price = ref(0)
const pricebefore = ref(0)
const ratings = ref(2.3);
const brand = ref("")
const order_quatity = (0)
const images = ("")
const opened = ref(false);
const docId = ref("");
const docName = ref("");
const docDesc = ref("");
const fileme = ref(null);
const image = ref("");
const editModal = ref(false);
const openedAddModal = ref(false);
const firebaseConfig = {
  apiKey: "AIzaSyDbjhOcP2TgjTn1Me9NxaGLJYjF8i8ktZE",
  authDomain: "fire-tut-981d2.firebaseapp.com",
  databaseURL:
    "https://fire-tut-981d2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fire-tut-981d2",
  storageBucket: "fire-tut-981d2.appspot.com",
  messagingSenderId: "935943220581",
  appId: "1:935943220581:web:e551613f36c35b1c41058c",
  measurementId: "G-TH1TFB65DG",
};

// Initialize Firebase
const app1 = initializeApp(firebaseConfig);
const db = getFirestore(app1);
const storage = app.$getStorage();

async function addModal() {
  openedAddModal.value = true;
}

async function Add() {
  const forestRef = ref(storage, fileme.value.name.toString());
  console.log("forestRef", forestRef);
  const mountainsRef = storageRef(storage, fileme.value.name.toString());
  await app.$uploadBytes(mountainsRef, fileme.value).then((snapshot) => {
    console.log("storage", snapshot);
  });
  try {
    await stogegetDownloadURL(
      storageRef(storage, fileme.value.name.toString())
    ).then((url) => {
      console.log(url);
      image.value = url;
    });
    const docRef = await addDoc(collection(db, "iam"), {
      name: name.value,
      description: description.value,
      specifications: specifications.value,
      price: price.value,
      pricebefore: pricebefore.value,
      ratings: ratings.value,
      brand: brand.value,
      image: image.value,
      ratings: ratings.value,
      percent: 40
    });
    openedAddModal.value = false;
    (name.value = ""),
      (description.value = ""),
      console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function editData(item) {
  editModal.value = true;
  docName.value = item.name;
  docId.value = item.id;
  docDesc.value = item.description;
}
async function openedpassData(item) {
  docId.value = item.id;
  docName.value = item.name;
  opened.value = true;
}
async function confirmed() {
  opened.value = false;
  await deleteDoc(doc(db, "iam", docId.value));
}

// async function Test(){
const q = query(collection(db, "iam"));
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
    // console.log('ddd', change)

    // datassss.value =change
    var data = {
      ...change.doc.data(),
      ...{ id: change.doc.id },
    };
    if (change.type === "added") {
      datassss.value.push(data);
    }
    if (change.type === "modified") {
      console.log("Modified city: ", data);
    }
    if (change.type === "removed") {
      const index = datassss.value.findIndex(
        (d) => d.name === change.doc.data().name
      );
      console.log("Removed city: ", change.doc.data(), change.doc.id);
      datassss.value.splice(index, 1);
    }
  });
});
</script>
