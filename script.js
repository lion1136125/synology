document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("serviceForm");
  const successBox = document.getElementById("submitSuccess");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("custName").value.trim();
    const phone = document.getElementById("custPhone").value.trim();
    const area = document.getElementById("custArea").value.trim();
    const issue = document.getElementById("issueType").value;
    const detail = document.getElementById("issueDetail").value.trim();

    if (!name || !phone) {
      alert("성함과 연락처는 필수입니다.");
      return;
    }

    // ⭐ 제출 즉시 팝업 표시 (지연 없음)
    if (successBox) {
      successBox.style.display = "block";
    }

    // ⭐ 폼 초기화 (전송 후 리셋)
    form.reset();

    // ⭐ Synology 전용 Apps Script URL
    const url = "https://script.google.com/macros/s/AKfycbwR5_tF5BkhE5EVFeQsjDf4IUtw1wytJsNDb7I2C2IXFhljkjiThcjT2sCz3Pta4VsASg/exec";

    // ⭐ 백그라운드로 전송 (no-cors → CORS 우회, 실패여도 스크립트 계속)
    fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "성함": name,
        "연락처": phone,
        "지역/주소": area,
        "고장 증상": issue,
        "상세 설명": detail
      })
    }).catch((err) => {
      console.error("전송 오류:", err);
    });
  });
});
