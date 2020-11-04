const tickets = {
  state: [],
  reducers: {
    addTicket(state, ticket) {
      return [...state, ticket];
    },
    removeTicket(state, { id }) {
      return state.filter(ticket => ticket.id !== id);
    },
    updateTicket(state, payload) {
      const newArray = state.map(item => {
        return item.id === payload.id ? Object.assign({}, item, payload) : item;
      });
      return newArray;
    }
  }
};

export default tickets;
