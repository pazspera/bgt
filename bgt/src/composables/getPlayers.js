import { ref } from "vue";

const getPlayers = () => {
  const players = ref([]);
  const error = ref(null);

  const load = async () => {
    try {
      let data = await fetch("http://localhost:3000/players");
      // check if the data is ok
      // if not, throw error
      if (!data.ok) {
        throw Error("No data available");
      }
      // if ok, parse to JSON and save to players
      players.value = await data.json();

      console.log(data);
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return { players, error, load };
};

export default getPlayers;
