export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDateSeparator(date) {
  const messageDate = new Date(date);
  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isToday = messageDate.toDateString() === today.toDateString();
  const isYesterday = messageDate.toDateString() === yesterday.toDateString();

  const time = messageDate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  if (isToday) {
    return `Today at ${time}`;
  }

  if (isYesterday) {
    return `Yesterday at ${time}`;
  }

  return messageDate.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function shouldShowDateSeparator(currentMessage, previousMessage) {
  if (!previousMessage) return true;

  const currentTime = new Date(currentMessage.createdAt);
  const previousTime = new Date(previousMessage.createdAt);

  const differentDay =
    currentTime.toDateString() !== previousTime.toDateString();

  const gapInMinutes = (currentTime - previousTime) / (1000 * 60);

  return differentDay || gapInMinutes >= 60;
}