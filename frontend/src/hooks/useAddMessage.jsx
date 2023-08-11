export const useAddMessage = () => {
  const addMessage = async (user1_id, user2_id, content) => {
    const response = await fetch(
      "http://localhost:4000/conversation/add_message",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user1_id, user2_id, content }),
      }
    );

    const json = await response.json();

    if (response.ok) {
      console.log(json);
    }
  };

  return { addMessage };
};
