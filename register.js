import { supabase } from "./supabase.js";

const statusText = document.getElementById("status");
const userIdDisplay = document.getElementById("userId");
const copyButton = document.getElementById("copyButton");

let currentUserId = "";

async function initialize() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  let user = data.session?.user;

  if (!user) {
    const { data: authData, error: authError } =
      await supabase.auth.signInAnonymously();

    if (authError) {
      throw authError;
    }

    user = authData.user;
  }

  if (!user || !user.is_anonymous) {
    throw new Error("匿名アカウントを確認できません。");
  }

  currentUserId = user.id;

  userIdDisplay.textContent = currentUserId;
  statusText.textContent = "登録完了！";
  copyButton.disabled = false;
}

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(currentUserId);
    statusText.textContent = "IDをコピーしました！";
  } catch {
    statusText.textContent = "IDを手動でコピーしてください。";
  }
});

initialize().catch((error) => {
  statusText.textContent = "エラー：" + error.message;
});
