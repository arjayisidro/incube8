export const onTicketMove = (
  ticket,
  status,
  updateTicket,
  setIsLoading,
  isMoving
) => {
  setIsLoading(isMoving);
  const newObj = {
    ...ticket,
    status,
    isMoving,
  };
  return new Promise((resolve) => {
    setTimeout(() => {
      updateTicket(newObj);
      setIsLoading(false);
    }, 1000);
  });
};
