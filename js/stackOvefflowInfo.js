// stackOverflowInfo.js

export async function fetchStackOverflowUserInfo(userId) {
  const url = `https://api.stackexchange.com/2.3/users/${userId}?site=stackoverflow`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0];
    } else {
      console.log("User not found or has no data");
    }
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
}

export async function fetchTopPercentageRanking(userId) {
  const url = `https://stackexchange.com/leagues/1/year/stackoverflow/2024-01-01/${userId}#${userId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    if (data.items && data.items.length > 0) {
      return data.items[0];
    } else {
      console.log("User not found or has no top ranking percentile data");
    }
  } catch (error) {
    console.error("Failed to fetch top ranking percentile:", error);
  }
}
