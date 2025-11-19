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

    // ✅ 팝업 표시
    successBox.classList.add("show");

    // 폼 초기화
    form.reset();

    // ✅ Google Apps Script POST
    fetch("https://script.google.com/macros/s/AKfycbwtkqOjshmlxwRVdpz2_HRcHfksm7J7dzNdRM_uKgmo1WPJgHKsljnGAXNiQYIiwJdpeQ/exec", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      },
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

    // 팝업 6초 후 자동 종료
    setTimeout(() => {
      successBox.classList.remove("show");
    }, 6000);
  });
});
