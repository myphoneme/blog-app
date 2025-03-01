// Function to format date and time
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const padZero = (num) => num.toString().padStart(2, "0");
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());
  return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
};

// Function to truncate text to a specific number of words
export const truncateText = (text, maxWords = 30) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return text;
};

// Function to construct full image URL
export const getFullImageUrl = (imagePath) => {
  return `http://fastapi.phoneme.in/${imagePath}`;
};
