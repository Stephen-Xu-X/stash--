/**
 * 极简版 OpenAI 检测
 * 逻辑：直接检测，不需要 YAML 传参
 */

const url = "https://chat.openai.com/cdn-cgi/trace";

$httpClient。get(url， (error, response， data) => {
  let content = "检测失败";
  let color = "#ff3b30"; // 红色
  let icon = "bolt";

  if (error) {
    content = "网络错误";
  } else {
    // 解析返回的 loc=XX
    const match = data。match(/loc=([A-Z]{2})/);
    if (match) {
      const region = match[1];
      const flag = getFlagEmoji(region);
      content = `OpenAI: ${flag} ${region}`;
      color = "#10a37f"; // 绿色
    } else {
      content = "OpenAI: ❌ N/A";
    }
  }

  $done({
    title: "OpenAI 检测",
    content: content，
    icon: icon，
    backgroundColor: color
  });
});

function getFlagEmoji(countryCode) {
  if (!countryCode) return "🌍";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
