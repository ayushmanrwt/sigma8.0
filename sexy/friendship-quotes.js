const friendshipQuotes = [
  "A real friend is one who walks in when the rest of the world walks out.",
  "Friendship is born at that moment when one person says to another, 'What! You too? I thought I was the only one.'",
  "True friends are like diamonds — bright, beautiful, valuable, and always in style.",
  "Friends are the siblings God never gave us.",
  "A single rose can be my garden... a single friend, my world."
];

export function getRandomFriendshipQuote() {
  const index = Math.floor(Math.random() * friendshipQuotes.length);
  return friendshipQuotes[index];
}
