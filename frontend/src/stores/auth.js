import { ref } from "vue";
import api from "../api";

export const user = ref(null);
export const isAuthenticated = ref(false);

export const fetchUser = async () => {
  try {
    const res = await api.get("/whoiam");
    user.value = res.data;
    isAuthenticated.value = true;
  } catch (error) {
    user.value = null;
    isAuthenticated.value = false;
    alert(error.response.data.error);
  }
};

export const logout = async () => {
  try {
    await api.post("/logout");
    user.value = null;
    isAuthenticated.value = false;
  } catch (error) {
    alert(error.response.data.error);
  }
};
