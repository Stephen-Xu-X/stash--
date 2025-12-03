// streamcheck.js

const fetch = require("node-fetch");  // 使用 node-fetch 来发送 HTTP 请求

const CHATGPT_TEST_URL = "https://api.openai.com/v1/completions";  // ChatGPT API URL（用于检测是否可以访问）
const TEST_PROMPT = "Hello, ChatGPT! Can you respond to this test request?";

// 获取当前 IP 的地区（返回国家缩写）
async function getIPRegion() {
  try {
    const ipInfoResponse = await fetch("https://ipinfo.io/json");  // 使用 ipinfo.io 获取当前 IP 地区
    const ipInfo = await ipInfoResponse.json();
    const country = ipInfo.country || "未知";  // 获取国家缩写
    return country;
  } catch (error) {
    console。error("无法获取 IP 地区:"， error);
    return "未知";
  }
}

// 检查当前网络是否能访问 ChatGPT
async function checkChatGPTConnection() {
  try {
    const response = await fetch(CHATGPT_TEST_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }，
      body: JSON。stringify({
        model: "gpt-3.5-turbo",  // 选择合适的模型进行测试
        messages: [{ role: "user", content: TEST_PROMPT }],
      })，
    });

    const region = await getIPRegion();  // 获取当前 IP 地区

    if (response.ok) {
      return `【OpenAI 图标】ChatGPT：${region}【支持】`;  // 返回支持的结果
    } else {
      return `【OpenAI 图标】ChatGPT：${region}【不支持】`;  // 返回不支持的结果
    }
  } catch (error) {
    console.error("连接检测失败:", error);
    const region = await getIPRegion();  // 获取当前 IP 地区
    return `【OpenAI 图标】ChatGPT：${region}【不支持】`;  // 返回不支持的结果
  }
}

// 更新磁贴显示的内容
async function updateTile() {
  const result = await checkChatGPTConnection();
  console.log("更新检测结果:", result);
  return result;  // 返回更新的内容（磁贴展示内容）
}

// 执行检测并更新磁贴内容
updateTile().catch((err) => {
  console.error("检测脚本执行出错:", err);
});
