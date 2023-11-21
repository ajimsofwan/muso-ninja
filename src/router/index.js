import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import CreatePlaylist from "../views/playlists/CreatePlaylist.vue";
import PlaylistDetails from "../views/playlists/PlaylistDetails.vue";
import NotFound from "../views/NotFound.vue";
import { auth } from "../firebase/config";

// auth protection
const requireAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    next({ name: "Login" });
  }
  next();
};

const requireNoAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (user) {
    next({ name: "Home" });
  }
  next();
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/playlists/create",
    name: "CreatePlaylist",
    component: CreatePlaylist,
    beforeEnter: requireAuth,
  },
  {
    path: "/playlists/:id",
    name: "PlaylistDetails",
    component: PlaylistDetails,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
